import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

export async function GET() {
  const winYtDlp = "C:\\Users\\georg\\AppData\\Local\\Microsoft\\WinGet\\Links\\yt-dlp.exe";
  const winFfmpeg = "C:\\Users\\georg\\AppData\\Local\\Microsoft\\WinGet\\Packages\\yt-dlp.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-N-123778-g3b55818764-win64-gpl\\bin\\ffmpeg.exe";

  const rawYtDlp = process.env.YT_DLP_PATH || winYtDlp;
  const rawFfmpeg = process.env.FFMPEG_PATH || winFfmpeg;

  try {
    const { stdout: ytVer } = await execAsync(`"${rawYtDlp}" --version`);
    const { stdout: ffVer } = await execAsync(`"${rawFfmpeg}" -version`);
    
    return NextResponse.json({
      status: "Ok",
      yt: ytVer.trim(),
      ff: ffVer.split('\n')[0].trim(),
      envYt: process.env.YT_DLP_PATH || "Not set",
      envFf: process.env.FFMPEG_PATH || "Not set"
    });
  } catch (err: any) {
    return NextResponse.json({
      status: "Error",
      message: err.message,
      stderr: err.stderr,
      paths: { yt: rawYtDlp, ff: rawFfmpeg }
    }, { status: 500 });
  }
}
