import { NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_TEXT_LENGTH = 40_000;
const AI_TIMEOUT_MS = 20_000;
const ALLOWED_MODES = new Set(["fix", "improve"]);
const DEFAULT_MODELS = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];

function fallbackRefine(input: string, mode: string): string {
  let refined = input
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1");

  if (refined.length > 0) {
    refined = refined.charAt(0).toUpperCase() + refined.slice(1);
  }

  refined = refined.replace(/([.!?]\s+)([a-záéíóúñ])/gi, (match, p1, p2) => p1 + p2.toUpperCase());

  if (mode === "fix") {
    return refined;
  }

  return refined.replace(/([.!?])\s+/g, "$1\n\n");
}

function getGeminiKey() {
  return process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
}

function getModelCandidates() {
  return [process.env.GEMINI_MODEL, ...DEFAULT_MODELS].filter((model, index, models): model is string => {
    return Boolean(model && models.indexOf(model) === index);
  });
}

function buildPrompt(text: string, mode: string) {
  if (mode === "fix") {
    return `Actua como un corrector de estilo profesional.
Corrige la ortografia, gramatica y puntuacion del siguiente texto transcrito.
Manten el significado exacto y no agregues informacion nueva.
Devuelve SOLO el texto corregido sin explicaciones.

Texto:
${text}`;
  }

  return `Refina y mejora el siguiente texto transcrito para que sea mas legible y profesional.
- Elimina muletillas cuando no aporten significado.
- Mejora la fluidez de las oraciones.
- Manten un tono natural pero pulido.
- Devuelve SOLO el texto mejorado sin introducciones ni comentarios.

Texto:
${text}`;
}

type GeminiResponseLike = {
  text?: () => string;
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Error desconocido";
}

function extractTextFromGeminiResponse(response: GeminiResponseLike): string {
  try {
    const directText = response.text?.();
    if (typeof directText === "string" && directText.trim()) {
      return directText.trim();
    }
  } catch {
    // Some blocked/partial Gemini responses throw when response.text() is read.
  }

  const parts = response?.candidates?.[0]?.content?.parts;
  if (Array.isArray(parts)) {
    return parts
      .map((part) => (typeof part?.text === "string" ? part.text : ""))
      .join("")
      .trim();
  }

  return "";
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("Tiempo de espera agotado en IA")), ms);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalido" }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Solicitud invalida" }, { status: 400 });
  }

  const rawText = (payload as { text?: unknown }).text;
  const rawMode = (payload as { mode?: unknown }).mode;
  const text = typeof rawText === "string" ? rawText : "";
  const mode = typeof rawMode === "string" && ALLOWED_MODES.has(rawMode) ? rawMode : "improve";

  if (!text.trim()) {
    return NextResponse.json({ error: "Texto requerido" }, { status: 400 });
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json({ error: "Texto demasiado largo" }, { status: 413 });
  }

  const geminiKey = getGeminiKey();
  if (!geminiKey) {
    return NextResponse.json({
      refinedText: fallbackRefine(text, mode),
      warning: "IA no disponible, se aplico mejora basica local",
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(geminiKey);
    let refinedText = "";
    let lastModelError: unknown;

    const candidates = getModelCandidates();
    if (candidates.length === 0) {
        throw new Error("No hay modelos de IA configurados");
    }

    for (const modelName of candidates) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          ],
        });

        const prompt = buildPrompt(text, mode);
        const result = await withTimeout(model.generateContent(prompt), AI_TIMEOUT_MS);
        const response = await result.response;
        refinedText = extractTextFromGeminiResponse(response);
        
        if (refinedText && refinedText.length > 5) {
            console.log(`[ViralAuthority] Refined text with ${modelName}`);
            break;
        }
      } catch (modelError: unknown) {
        lastModelError = modelError;
        console.warn("REFINE_TEXT_MODEL_FALLBACK", {
          model: modelName,
          message: getErrorMessage(modelError),
        });
      }
    }

    if (!refinedText || refinedText.length < 5) {
      console.warn("[ViralAuthority] AI failed or returned empty, using fallback.");
      return NextResponse.json({
        refinedText: fallbackRefine(text, mode),
        warning: "La IA no devolvió un resultado válido. Se aplicó mejora básica.",
      });
    }

    return NextResponse.json({ refinedText });
  } catch (error: unknown) {
    console.error("REFINE_TEXT_CRITICAL_ERROR", {
      message: getErrorMessage(error),
      mode,
      textLength: text.length,
    });

    return NextResponse.json({
      refinedText: fallbackRefine(text, mode),
      warning: "Error crítico en el motor de IA. Se aplicó mejora básica local.",
    });
  }
}
