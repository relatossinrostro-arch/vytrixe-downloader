# VIDXOR Downloader - Premium Video Downloader

A full-featured, production-ready video downloader built with Next.js 15, TypeScript, and TailwindCSS.

## Features

- **Multi-Platform Support:** Download videos from TikTok, Instagram, YouTube, and Facebook.
- **Premium Design:** Clean, white, Apple-style UI with smooth animations.
- **HD Quality:** Automatically detects and fetches the best available quality.
- **SEO Optimized:** Dedicated pages for each platform with long-form SEO content.
- **Fast & Reliable:** Uses `yt-dlp` for robust video extraction.

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, TailwindCSS, Framer Motion.
- **Backend:** Node.js API Routes, `yt-dlp` (via child\_process), Axios.
- **Icons:** Lucide React.

## Prerequisites

To run this application, you must have the following installed on your system:

1.  **Node.js** (v18.0.0 or later)
2.  **yt-dlp:** This is the core engine for video extraction.
    - [Install yt-dlp](https://github.com/yt-dlp/yt-dlp#installation)
3.  **FFmpeg:** Required for merging video and audio streams (especially for high quality).
    - [Install FFmpeg](https://ffmpeg.org/download.html)

## Setup Instructions

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure environment variables:**
    Create a `.env.local` file based on `.env.example`.
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  **Build for production:**
    ```bash
    npm run build
    npm start
    ```

## Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable UI components.
- `src/lib`: Backend utilities and video extraction logic.
- `src/app/globals.css`: Global styles and Tailwind 4 design tokens.

## Deployment

### VPS (Recommended)
This app is best suited for VPS deployment (DigitalOcean, Linode, AWS EC2) where you have full control over the environment to install `yt-dlp` and `ffmpeg`.

### Vercel
Deployment to Vercel is possible but limited because Vercel doesn't easily support custom binaries like `yt-dlp` and `ffmpeg` in serverless functions without complex workarounds (like using a lambda layer or a container).

## License

This project is for educational purposes. Users are responsible for complying with the terms of service of the third-party platforms they interact with.
