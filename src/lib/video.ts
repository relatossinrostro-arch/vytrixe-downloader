import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface VideoFormat {
  url: string;
  ext: string;
  quality: string;
  filesize: number;
  format_id: string;
  premium?: boolean;
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
  console.log("🔍 [Vytrixe Frontend] Fetching info from:", API_URL);
  try {
    const response = await axios.post(`${API_URL}/info`, { url: videoUrl });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching video info:", error);
    throw new Error(error.response?.data?.error || "Failed to get video info");
  }
}

export async function downloadVideo(
  videoUrl: string, 
  format?: string, 
  quality?: string
): Promise<{ downloadUrl: string; filename: string }> {
  try {
    // Validate URL before sending
    if (!videoUrl || !videoUrl.startsWith("http")) {
      throw new Error("Pega un enlace válido");
    }

    const payload = { 
      url: videoUrl, 
      formatId: format || "best",
      qualityLabel: quality || "best"
    };

    // Call the advanced backend directly
    const response = await axios.post(`${API_URL}/download`, payload);
    return {
      downloadUrl: `${API_URL}${response.data.url}`,
      filename: response.data.fileName
    };
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.message || "Error descargando";
    console.error("AXIOS FULL ERROR:", JSON.stringify(error.response?.data, null, 2) || error.message);
    
    const customError = new Error(errorMsg) as any;
    customError.details = error.response?.data?.details || "";
    throw customError;
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
