export const dynamic = "force-static";
import { NextResponse } from "next/server";

const BASE_URL = "https://www.vytrixe.com";

const routes = [
  "",
  "/download-tiktok-video",
  "/download-instagram-video",
  "/download-instagram-reels",
  "/download-youtube-video",
  "/download-facebook-video",
  "/download-pinterest-video",
  "/tiktok-downloader-no-watermark",
  "/facebook-video-downloader",
  "/instagram-video-downloader",
  "/pinterest-video-downloader",
  "/free-youtube-downloader",
  "/free-tiktok-video-downloader",
  "/download-video-without-watermark",
  "/download-mp4-from-link",
  "/free-video-downloader-online",
  "/best-video-downloader-2026",
  "/video-to-text",
  "/image-editor",
  "/premium",
  "/download-instagram-stories",
  "/facebook-story-downloader",
  "/download-audio",
  "/privacy",
  "/terms",
];

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map((route) => {
          return `
            <url>
              <loc>${BASE_URL}${route}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>${route === "" ? "1.0" : "0.8"}</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
