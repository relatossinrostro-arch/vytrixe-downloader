import { NextRequest, NextResponse } from "next/server";
import { getVideoInfo, getVideoMeta, cleanupTempFiles } from "@/lib/video";

// Basic in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 20; // 20 requests
const WINDOW = 60 * 1000; // per 1 minute

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    const ip = req.headers.get("x-forwarded-for") || "anonymous";

    // Rate limiting check
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, lastReset: now };
    
    if (now - rateData.lastReset > WINDOW) {
      rateData.count = 0;
      rateData.lastReset = now;
    }

    if (rateData.count >= LIMIT) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    rateData.count++;
    rateLimitMap.set(ip, rateData);

    // URL Validation
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const isValidUrl = /^https?:\/\/.+/i.test(url);
    if (!isValidUrl) {
      return NextResponse.json(
        { error: "Invalid URL. Please paste a valid video link from TikTok, Instagram, YouTube, Facebook or Pinterest." },
        { status: 400 }
      );
    }

    // Trigger cleanup (async, don't wait)
    cleanupTempFiles().catch(console.error);

    // Support staged progressive loading
    const { isMeta } = await (req.json().catch(() => ({})));
    const info = isMeta ? await getVideoMeta(url) : await getVideoInfo(url);
    
    return NextResponse.json(info);
  } catch (error: any) {
    console.error("Download Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch video information. Make sure the URL is valid and public." },
      { status: 500 }
    );
  }
}
