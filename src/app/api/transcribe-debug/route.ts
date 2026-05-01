import { execFile } from "child_process";
import { promisify } from "util";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const execFileAsync = promisify(execFile);

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Dependency check failed";
}

function getErrorStderr(error: unknown) {
  return typeof error === "object" && error !== null && "stderr" in error && typeof error.stderr === "string"
    ? error.stderr
    : "";
}

export async function GET() {
  const rawYtDlp = process.env.YT_DLP_PATH || "C:\\Users\\georg\\AppData\\Local\\Microsoft\\WinGet\\Links\\yt-dlp.exe";
  const rawFfmpeg = process.env.FFMPEG_PATH || "C:\\Users\\georg\\AppData\\Local\\Microsoft\\WinGet\\Packages\\yt-dlp.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-N-123778-g3b55818764-win64-gpl\\bin\\ffmpeg.exe";

  try {
    const [{ stdout: ytVer }, { stdout: ffVer }] = await Promise.all([
      execFileAsync(rawYtDlp, ["--version"], { timeout: 10_000, windowsHide: true }),
      execFileAsync(rawFfmpeg, ["-version"], { timeout: 10_000, maxBuffer: 1024 * 1024, windowsHide: true }),
    ]);

    return NextResponse.json({
      status: "ok",
      yt: ytVer.trim(),
      ff: ffVer.split("\n")[0].trim(),
      envYt: process.env.YT_DLP_PATH || "Not set",
      envFf: process.env.FFMPEG_PATH || "Not set",
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: "error",
        message: getErrorMessage(error),
        stderr: getErrorStderr(error),
        paths: { yt: rawYtDlp, ff: rawFfmpeg },
      },
      { status: 500 },
    );
  }
}
