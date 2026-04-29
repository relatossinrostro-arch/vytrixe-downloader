import { NextResponse } from "next/server";
import { pipeline, env } from "@xenova/transformers";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import os from "os";
// @ts-ignore
import { WaveFile } from "wavefile";
import { getVideoInfo } from "@/lib/video";

const execAsync = promisify(exec);
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Configure Transformers to not try looking for local filesystem models first (prevents errors)
// and cache the model in the Node environment.
env.allowLocalModels = false;
env.useBrowserCache = false; 

// Singleton for the transcriber so it only loads into memory once per server lifecycle
let transcriberWorker: any = null;

async function getTranscriber() {
  if (!transcriberWorker) {
    console.log("[Vytrixe AI] Initializing Whisper-Tiny Model...");
    transcriberWorker = await pipeline("automatic-speech-recognition", "Xenova/whisper-tiny");
  }
  return transcriberWorker;
}

/**
 * Filter to remove hallucinated repetition loops commonly found in smaller Whisper models.
 * Detects patterns that repeat more than 3 times consecutively.
 */
function cleanRepetitions(text: string): string {
  if (!text) return "";
  
  // Pattern 1: Catch "word word word" or "1. 1. 1."
  // Look for 3 or more repetitions of a sequence (at least 2 chars long)
  let cleaned = text.replace(/(.{2,})\1{3,}/gi, (match, group) => {
    console.log(`[Vytrixe AI] Pruning repetitive sequence: "${group.substring(0, 20)}..."`);
    return group; 
  });

  // Pattern 2: Single char repetitions (> 5 times) like ".........."
  cleaned = cleaned.replace(/(.)\1{10,}/g, (match, group) => {
    return group.repeat(3);
  });

  return cleaned.trim();
}

/**
 * Advanced formatting: Adds punctuation, capitalization, and logical paragraphs
 * based on audio timestamps and silence detection.
 */
function formatTranscription(output: any): string {
  const chunks = output.chunks || [];
  if (chunks.length === 0) return output.text || "";

  let formatted = "";
  let lastEndTime = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    let chunkText = chunk.text.trim();
    if (!chunkText) continue;

    const startTime = Array.isArray(chunk.timestamp) ? chunk.timestamp[0] : 0;
    const endTime = Array.isArray(chunk.timestamp) ? chunk.timestamp[1] : startTime + 5;

    // Detect silence (> 1.2 seconds) to insert a paragraph break
    const isNewParagraph = formatted.length > 0 && (startTime - lastEndTime > 1.2);
    
    if (isNewParagraph) {
      if (!/[.!?]$/.test(formatted.trim())) formatted = formatted.trim() + ".";
      formatted += "\n\n";
    } else if (formatted.length > 0 && !formatted.endsWith("\n\n") && !formatted.endsWith(" ")) {
      formatted += " ";
    }

    // SMART CAPITALIZATION: Only capitalize if it's the absolute start OR after a sentence-ending punctuation
    const trimmedFormatted = formatted.trim();
    const shouldCapitalize = trimmedFormatted.length === 0 || 
                             trimmedFormatted.endsWith("\n\n") || 
                             /[.!?]$/.test(trimmedFormatted);
                             
    if (shouldCapitalize) {
      chunkText = chunkText.charAt(0).toUpperCase() + chunkText.slice(1);
    } else {
      // Ensure the chunk doesn't carry an accidental leading capital from Whisper
      chunkText = chunkText.charAt(0).toLowerCase() + chunkText.slice(1);
    }

    formatted += chunkText;
    lastEndTime = endTime;
  }

  // Final Cleanup
  formatted = formatted.trim();
  if (formatted && !/[.!?]$/.test(formatted)) formatted += ".";

  return formatted;
}

export async function POST(request: Request) {
  let tempFilePath = "";
  
  try {
    const formData = await request.formData();
    const url = formData.get("url") as string;
    const file = formData.get("file") as File;
    const targetLanguage = (formData.get("targetLanguage") as string) || "auto";
    const userId = formData.get("userId") as string; // Optional: Pass from frontend if logged in

    console.log(`[Vytrixe AI] RECIBIDO - Modo: ${file ? 'Archivo' : 'URL'}, Idioma: ${targetLanguage}, User: ${userId || 'Guest'}`);

    if (!url && !file) {
      return NextResponse.json({ error: "Please provide a Video URL or upload a File" }, { status: 400 });
    }

    // Paths
    const winYtDlp = "C:/Users/georg/AppData/Local/Microsoft/WinGet/Links/yt-dlp.exe";
    const winFfmpeg = "C:/Users/georg/AppData/Local/Microsoft/WinGet/Packages/yt-dlp.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-N-123778-g3b55818764-win64-gpl/bin/ffmpeg.exe";
    const ytDlpPath = path.normalize(process.env.YT_DLP_PATH || winYtDlp);
    const ffmpegPath = path.normalize(process.env.FFMPEG_PATH || winFfmpeg);

    let tempDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tempDir)) {
      try {
        fs.mkdirSync(tempDir, { recursive: true });
      } catch (e) {
        tempDir = os.tmpdir();
      }
    }
    
    tempFilePath = path.join(tempDir, `vyt_audio_${Date.now()}.wav`);

    if (file) {
      // --- FILE UPLOAD PROCESSING ---
      console.log(`[Vytrixe AI] Processing PRO Upload: ${file.name} (${file.size} bytes)`);
      
      const inputTempPath = path.join(tempDir, `vyt_input_${Date.now()}_${file.name.replace(/[^a-z0-9.]/gi, '_')}`);
      const arrayBuffer = await file.arrayBuffer();
      fs.writeFileSync(inputTempPath, Buffer.from(arrayBuffer));

      console.log(`[Vytrixe AI] Processing media...`);
      try {
        const ffmpegCmd = `"${ffmpegPath}" -y -i "${inputTempPath}" -vn -ar 16000 -ac 1 -c:a pcm_s16le "${tempFilePath}"`;
        await execAsync(ffmpegCmd);
        
        // Duration Check for Files (Optional, but good for enforcement)
        try {
          const ffprobeCmd = `"${ffmpegPath.replace('ffmpeg.exe', 'ffprobe.exe')}" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${inputTempPath}"`;
          const { stdout } = await execAsync(ffprobeCmd);
          const duration = parseFloat(stdout);
          if (duration > 300 && !userId) {
            throw new Error("Video exceeds 5 minutes. This is a Freemium limit. Unlock unlimited transcriptions with Vytrixe Pro.");
          }
        } catch (e: any) {
          console.warn("[Vytrixe AI] Duration check failed, continuing...", e.message);
        }

        if (fs.existsSync(inputTempPath)) fs.unlinkSync(inputTempPath);
      } catch (fErr: any) {
        if (fs.existsSync(inputTempPath)) fs.unlinkSync(inputTempPath);
        throw fErr;
      }
    } else {
      // --- URL PROCESSING ---
      console.log(`[Vytrixe AI] PRO Download Start: ${url}`);
      
      // Duration Check for URLs
      try {
        const info = await getVideoInfo(url);
        if (info.duration && info.duration > 300 && !userId) {
           // We allow it if the user IS premium, but the backend doesn't know easily without a token.
           // For now, we'll return a specific error that the frontend can handle or we check if userId is provided.
           // In a real app, we'd verify the JWT from Supabase here.
           throw new Error("Video exceeds 5 minutes. Upgrade to Vytrixe Pro for unlimited access.");
        }
      } catch (e: any) {
        console.warn("[Vytrixe AI] URL info check failed, continuing...", e.message);
        if (e.message.includes("Upgrade")) throw e;
      }

      const command = `"${ytDlpPath}" "${url}" -f "bestaudio/best" -x --audio-format wav --audio-quality 0 --postprocessor-args "-ar 16000 -ac 1" --ffmpeg-location "${ffmpegPath}" -o "${tempFilePath}"`;
      try {
        await execAsync(command);
      } catch (dlErr: any) {
        throw new Error("Enlace no soportado o caído.");
      }
    }

    if (!fs.existsSync(tempFilePath)) {
      throw new Error("Error crítico: No se generó el flujo de audio para la IA.");
    }

    console.log("[Vytrixe AI] Audio Ready. Loading AI model (Tiny Mode for Stability)...");

    // Convert WAV file to Float32Array
    const wavBuffer = fs.readFileSync(tempFilePath);
    const wav = new WaveFile(wavBuffer);
    wav.toBitDepth('32f'); 
    wav.toSampleRate(16000); 
    const audioData = wav.getSamples(false, Float32Array);

    // Using 'tiny' for guaranteed stability and memory efficiency
    if (!transcriberWorker) {
      console.log("[Vytrixe AI] Initializing Whisper-Tiny Model...");
      transcriberWorker = await pipeline("automatic-speech-recognition", "Xenova/whisper-tiny");
    }

    console.log("[Vytrixe AI] Transcribing... (Whisper Fast Engine)");
    const output = await transcriberWorker(Array.isArray(audioData) ? audioData[0] : audioData, {
      chunk_length_s: 30,
      stride_length_s: 5,
      repetition_penalty: 1.2,
      no_repeat_ngram_size: 4,
      return_timestamps: true,
    });

    console.log("[Vytrixe AI] Applying Master NLP Protocol via Gemini...");
    const finalText = formatTranscription(output);

    // AI Polish with Gemini 1.5 PRO - MAXIMUM ACCURACY PROTOCOL
    const geminiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    let superChargedText = finalText;

    if (geminiKey && finalText) {
      try {
        console.log("[Vytrixe AI] Super-Charging with Gemini 1.5 PRO (Expert Narrator)...");
        const genAI = new GoogleGenerativeAI(geminiKey);
        // Using PRO model for better instruction following and context reasoning
        const model = genAI.getGenerativeModel({ 
          model: "gemini-1.5-pro",
          safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          ]
        });
        
        const prompt = `ACTÚA COMO UN EDITOR LITERARIO Y EXPERTO EN NLP DE NIVEL SUPERIOR.
        
        TU OBJETIVO: Convertir esta transcripción desastrosa en un relato profesional, fluido y con gramática perfecta.
        
        REGLA DE ORO: Si Whisper escribió una palabra que no tiene sentido en el contexto del relato, TIENES PROHIBIDO escribirla. Debes adivinar la palabra correcta por contexto.
        
        EJEMPLOS DE CORRECCIÓN OBLIGATORIA (CASOS REALES):
        - "luces de las aulas están incendidas" → "luces de la sala están encendidas"
        - "sus urros" → "susurros"
        - "creyos yo" / "creció un mamá" → "creyó que su mamá"
        - "conojaba" → "enojaba"
        - "aulas" → "sala" (si el contexto es una casa)
        - "cementir" → "mentira"
        - "azala" → "sala"
        - "medraición no" → "me traicionó"
        - "sonta" → "tonta"
        
        PROTOCOLOS ESTRICTOS:
        1. COHERENCIA NARRATIVA: Mantén siempre la 3ª persona ("Ella") si es la historia de una seguidora.
        2. RITMO LITERARIO: Usa párrafos dramáticos, puntos y comas para dar pausas de lectura (Storytime).
        3. LIMPIEZA TOTAL: Borra muletillas, repeticiones y ruidos del habla.
        4. GRAMÁTICA RAE: Ortografía y puntuación impecable.
        
        TEXTO CRUDO (PARA RECONSTRUIR):
        "${finalText}"
        
        RESPUESTA: Devuelve ÚNICAMENTE el texto final pulido.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const refined = response.text().trim();
        if (refined) superChargedText = refined;
        console.log("[Vytrixe AI] Gemini 1.5 PRO Analysis Completed.");
      } catch (geminiErr) {
        console.error("[Vytrixe AI] Gemini PRO Failed:", geminiErr);
      }
    }

    // Final Cleanup
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
    console.log("[Vytrixe AI] Request Completed.");

    return NextResponse.json({ text: superChargedText });

  } catch (error: any) {
    console.error("Transcription API Fatal Error:", error);
    if (tempFilePath && fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);

    return NextResponse.json(
      { error: error.message || "Fallo crítico en el motor de transcripción." },
      { status: 500 }
    );
  }
}
