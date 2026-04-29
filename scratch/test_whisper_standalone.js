const { pipeline } = require("@xenova/transformers");
const { exec } = require("child_process");
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { WaveFile } = require("wavefile");

const execAsync = promisify(exec);

// Hardcoded paths from the user's .env for testing
const YT_DLP_PATH = "C:\\Users\\georg\\AppData\\Local\\Microsoft\\WinGet\\Links\\yt-dlp.exe";
const FFMPEG_PATH = "C:\\Users\\georg\\AppData\\Local\\Microsoft\\WinGet\\Packages\\yt-dlp.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-N-123778-g3b55818764-win64-gpl\\bin\\ffmpeg.exe";

async function test() {
  const url = "https://www.youtube.com/watch?v=ScMzIvxBSi4";
  const tempFilePath = path.join(os.tmpdir(), `test_whisper.wav`);

  try {
    console.log("[Test] Extracting audio...");
    const command = `"${YT_DLP_PATH}" "${url}" -f "bestaudio/best" -x --audio-format wav --audio-quality 0 --postprocessor-args "-ar 16000 -ac 1" --ffmpeg-location "${FFMPEG_PATH}" -o "${tempFilePath}"`;
    
    await execAsync(command);
    console.log("[Test] Audio extracted to:", tempFilePath);

    console.log("[Test] Initializing Transcriber...");
    const transcriber = await pipeline("automatic-speech-recognition", "Xenova/whisper-tiny-en");

    console.log("[Test] Reading WAV...");
    const wavBuffer = fs.readFileSync(tempFilePath);
    const wav = new WaveFile(wavBuffer);
    wav.toBitDepth('32f'); 
    wav.toSampleRate(16000); 
    const audioData = wav.getSamples(false, Float32Array);

    console.log("[Test] Transcribing...");
    const output = await transcriber(Array.isArray(audioData) ? audioData[0] : audioData);
    console.log("[Test] Result:", output.text);

  } catch (err) {
    console.error("[Test] FAILED:", err);
  } finally {
    if (fs.existsSync(tempFilePath)) {
      // fs.unlinkSync(tempFilePath);
    }
  }
}

test();
