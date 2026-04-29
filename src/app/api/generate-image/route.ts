import { NextResponse } from "next/server";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let prompt = searchParams.get("prompt");
  const useGemini = searchParams.get("gemini") === "true";
  const seed = searchParams.get("seed") || Math.floor(Math.random() * 100000);

  if (!prompt) {
    return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
  }

  try {
    // 1. Optional Gemini Prompt Enhancement
    if (useGemini) {
      const geminiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
      if (geminiKey) {
        try {
          console.log("[Vytrixe AI] Enhancing Image Prompt with Gemini Nano Banana Pro...");
          const genAI = new GoogleGenerativeAI(geminiKey);
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          
          const enhancementPrompt = `Act as an expert prompt engineer for Flux.1 Pro.
          Your goal is to take a user prompt and expand it into a detailed Masterpiece description.
          
          CRITICAL RULES FOR TYPOGRAPHY:
          1. If the user includes text in quotes (e.g. "PSICOTRADING"), you MUST ensure that this exact text is the central focus of the image.
          2. Describe the typography in detail: "Massive 3D silver and gold professional cinematic font, sharp edges, perfectly spelled, centered".
          3. Flux.1 is excellent at rendering text, so describe the text clearly as part of the composition.
          
          General Guidelines:
          1. DO NOT change the main subject.
          2. ADD technical details like: "8k resolution, photorealistic, cinematic lighting, hyper-detailed, high-end commercial aesthetic".
          
          User Prompt: "${prompt}"
          
          OUTPUT ONLY THE REWRITTEN PROMPT IN ENGLISH. NO INTROS. NO QUOTES.`;

          const result = await model.generateContent(enhancementPrompt);
          const enhanced = result.response.text().trim();
          if (enhanced) {
            console.log("[Vytrixe AI] Enhanced Prompt:", enhanced);
            prompt = enhanced;
          }
        } catch (geminiErr) {
          console.error("[Vytrixe AI] Gemini Prompt Refinement failed:", geminiErr);
        }
      }
    }

    const aiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt || "")}?width=1024&height=1024&nologo=true&seed=${seed}&model=flux`;
    console.log("Generating image from:", aiUrl);

    // Proxy the request using Axios to bypass Node 18 fetch TLS fingerprint blocks from Cloudflare
    const response = await axios({
      method: "GET",
      url: aiUrl,
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "image/jpeg, image/webp, image/png, */*",
      },
      timeout: 30000,
    });

    return new NextResponse(response.data, {
      status: 200,
      headers: {
        "Content-Type": response.headers["content-type"] || "image/jpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error: any) {
    console.error("AI Proxy Generation Error:", error.message || error);
    return NextResponse.json({ error: "Failed to generate AI image." }, { status: 500 });
  }
}

