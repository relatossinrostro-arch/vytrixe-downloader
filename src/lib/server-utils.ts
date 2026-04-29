import fs from "fs";
import path from "path";

export function ensureDirectory(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function sanitizeFileName(name: string) {
  return name
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s-]/g, '')       // Remove non-word chars (except space and dash)
    .trim()
    .replace(/\s+/g, '-')           // Spaces to -
    .replace(/\-\-+/g, '-')         // Multiple - to single
    .slice(0, 80);                  // Max length for safety
}

export const DOWNLOADS_DIR = path.join(process.cwd(), 'public', 'downloads');
