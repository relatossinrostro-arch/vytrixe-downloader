const express = require('express');
const cors = require('cors');
const { create: createYtDlp } = require('yt-dlp-exec');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

// Global CORS - allowing all for simplicity, but in production we should limit this
app.use(cors());
app.use(express.json());

const PLATFORM_MAP = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
  facebook: "Facebook",
  pinterest: "Pinterest",
};

// Helper function to get video info
async function getVideoInfo(videoUrl) {
  try {
    const ytDlp = createYtDlp('yt-dlp');
    const data = await ytDlp(videoUrl, {
      dumpSingleJson: true,
      noPlaylist: true,
      noWarnings: true,
      noCheckCertificate: true,
      skipDownload: true,
    });

    return {
      title: data.title,
      thumbnail: data.thumbnail,
      duration: data.duration,
      url: videoUrl,
      platform: PLATFORM_MAP[data.extractor_key.toLowerCase()] || data.extractor_key,
      formats: (data.formats || [])
        .filter((f) => f.vcodec !== "none" || f.acodec !== "none")
        .map((f) => ({
          url: f.url,
          ext: f.ext,
          quality: f.format_note || (f.height ? f.height + "p" : "HD"),
          filesize: f.filesize || f.filesize_approx || 0,
          format_id: f.format_id,
        }))
        .reverse(),
    };
  } catch (error) {
    console.error("Failed to get info:", error);
    throw new Error(`Failed to get video info: ${error.message}`);
  }
}

// Routes
app.post('/info', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const info = await getVideoInfo(url);
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/download', async (req, res) => {
  const { url, formatId } = req.body;
  if (!url || !formatId) return res.status(400).json({ error: "URL and formatId are required" });

  try {
    // For the VPS version, we'll return the direct format URL or we can proxy it.
    // Proxying is better for "no watermark" and bypass CORS on client side.
    const ytDlp = createYtDlp('yt-dlp');
    const data = await ytDlp(url, {
      dumpSingleJson: true,
      format: formatId,
      noWarnings: true,
    });

    const format = data.formats.find(f => f.format_id === formatId) || data;
    
    res.json({ 
      url: format.url, 
      fileName: `${data.title}.${format.ext}`.replace(/[\\/:"*?<>|]/g, "_")
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
