import { NextRequest, NextResponse } from "next/server";
import { downloadVideo } from "@/lib/video";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get("url");
  const formatId = searchParams.get("formatId");

  if (!videoUrl || !formatId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const { filePath, fileName } = await downloadVideo(videoUrl, formatId);

    const fileBuffer = fs.readFileSync(filePath);
    
    // Create the response with the file buffer
    const response = new NextResponse(fileBuffer);

    // Set headers for download
    response.headers.set("Content-Type", "video/mp4");
    response.headers.set("Content-Disposition", `attachment; filename="${fileName}"`);

    // We don't delete immediately here as it might break the stream if not using buffers
    // But since we use readFileSync, the buffer is in memory and we can delete the file
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error("Failed to delete temp file:", err);
    }

    return response;
  } catch (error: any) {
    console.error("Proxy Download Error:", error);
    return NextResponse.json({ error: `Failed to download video: ${error.message}` }, { status: 500 });
  }
}
