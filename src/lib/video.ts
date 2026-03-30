import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://167.86.74.3:3001";

export interface VideoFormat {
  url: string;
  ext: string;
  quality: string;
  filesize: number;
  format_id: string;
}

export interface VideoInfo {
  title: string;
  thumbnail: string;
  url: string;
  duration?: number;
  platform?: string;
  formats?: VideoFormat[];
}

export async function getVideoInfo(videoUrl: string): Promise<VideoInfo> {
  try {
    const response = await axios.post(`${API_URL}/info`, { url: videoUrl });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching video info:", error);
    throw new Error(error.response?.data?.error || "Failed to get video info");
  }
}

export async function downloadVideo(videoUrl: string, formatId: string): Promise<{ filePath: string; fileName: string }> {
  // This function is now mostly used for the proxy download in route.ts
  // However, with the VPS, we can either proxy it or return the direct link.
  // The user wants a robust system, so we'll keep the API signature but call the VPS.
  try {
    const response = await axios.post(`${API_URL}/download`, { url: videoUrl, formatId });
    return response.data;
  } catch (error: any) {
    console.error("Error downloading video:", error);
    throw new Error(error.response?.data?.error || "Download failed");
  }
}

// Keeping getVideoMeta for backward compatibility if needed
export async function getVideoMeta(videoUrl: string): Promise<VideoInfo> {
  return getVideoInfo(videoUrl);
}

// Cleanup is now handled by the VPS
export async function cleanupTempFiles() {
  // No-op on the frontend
}
