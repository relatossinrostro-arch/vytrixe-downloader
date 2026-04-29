import { removeBackground } from "@imgly/background-removal";

export async function removeImageBackground(imageSrc: string): Promise<string> {
  try {
    const config = {
      progress: (key: string, current: number, total: number) => {
        console.log(`AI Background Removal: ${key} ${Math.round((current / total) * 100)}%`);
      },
      publicPath: "https://static.vytrixe.com/models/background-removal/", // Example CDN or local path
    };

    const blob = await removeBackground(imageSrc, config as any);
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("AI BG Removal Error:", error);
    throw error;
  }
}

export async function upscaleImage(imageSrc: string): Promise<string> {
  // Simple simulation of upscale by drawing to a larger canvas with sharp interpolation
  // Real upscale would require a heavier model like Real-ESRGAN
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      } else {
        resolve(imageSrc);
      }
    };
  });
}
