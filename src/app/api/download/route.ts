import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { checkDependencies, getYT_DLP_BIN, getFFMPEG_BIN } from "@/lib/dependencies";
import { ensureDirectory, sanitizeFileName, DOWNLOADS_DIR } from "@/lib/server-utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    console.log("BODY RECEIVED:", body);

    let { url, format, quality } = body;
    
    if (!url) {
      return NextResponse.json({ 
        success: false, 
        error: "Missing URL",
        step: "validation"
      }, { status: 400 });
    }

    // Default values
    if (!format) format = "mp4";
    if (!quality) quality = "best";

    const isAudio = format === "mp3";
    const videoTitle = body.videoTitle || "download"; // Optional title
    
    // 1. Check Dependencies
    const deps = await checkDependencies();
    if (!deps.ytDlp && !deps.pythonYtDlp) {
      return NextResponse.json({ 
        success: false, 
        error: "yt-dlp not found. Please install dependencies.",
        step: "dependencies"
      }, { status: 500 });
    }
    if (!deps.ffmpeg) {
      return NextResponse.json({ 
        success: false, 
        error: "ffmpeg not found. Please install dependencies.",
        step: "dependencies"
      }, { status: 500 });
    }

    // 2. Setup Directories
    ensureDirectory(DOWNLOADS_DIR);

    const safeTitle = sanitizeFileName(videoTitle);
    const internalFileBase = `vytrixe_${Date.now()}`;
    
    const finalUserFileName = isAudio 
      ? `${safeTitle}-${quality || '128'}kbps.mp3`
      : `${safeTitle}-${quality || 'video'}.mp4`;

    const YT_DLP_BIN = getYT_DLP_BIN();
    const FFMPEG_BIN = getFFMPEG_BIN();

    // 3. Command Construction
    let formatStr = isAudio ? 'bestaudio/best' : (quality === 'best' ? 'mp4' : quality);
    
    // We use a safe internal name for the filesystem but return the clean name to the user
    const internalName = `${internalFileBase}.%(ext)s`;
    const outputPath = path.join(DOWNLOADS_DIR, internalName);
    
    let command = "";
    if (isAudio) {
      command = `"${YT_DLP_BIN}" -x --audio-format mp3 -o "${outputPath}" "${url}" --ffmpeg-location "${FFMPEG_BIN}"`;
    } else {
      command = `"${YT_DLP_BIN}" -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4/best" -o "${outputPath}" "${url}" --ffmpeg-location "${FFMPEG_BIN}"`;
    }

    console.log(`🛠️ [Vytrixe API] Executing: ${command}`);

    // 4. Execution
    return new Promise((resolve) => {
      exec(command, { shell: 'cmd.exe' }, (error, stdout, stderr) => {
        if (error) {
          console.error("❌ [Vytrixe API] DOWNLOAD ERROR:", error);
          
          return resolve(NextResponse.json({ 
            success: false, 
            error: error.message,
            details: String(stderr || error),
            step: "download | convert | save"
          }, { status: 500 }));
        }

        finalize();

        function finalize() {
          const files = fs.readdirSync(DOWNLOADS_DIR);
          const targetFile = files.find(f => f.startsWith(internalFileBase) && (f.endsWith('.mp4') || f.endsWith('.mp3')));

          if (!targetFile) {
            return resolve(NextResponse.json({ 
              success: false, 
              error: "Could not find final converted file.",
              step: "save"
            }, { status: 500 }));
          }

          const host = req.headers.get("host");
          const protocol = host?.includes('localhost') || host?.includes('192.168') ? 'http' : 'https';
          const downloadUrl = `${protocol}://${host}/downloads/${targetFile}`;

          return resolve(NextResponse.json({
            success: true,
            downloadUrl,
            filename: finalUserFileName,
            format: isAudio ? "mp3" : "mp4"
          }));
        }
      });
    });

  } catch (error: any) {
    console.error("❌ [Vytrixe API] Global Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Internal Server Error",
      step: "response"
    }, { status: 500 });
  }
}
