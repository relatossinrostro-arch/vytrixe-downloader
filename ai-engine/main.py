import os
import sys
import io
import uvicorn
import asyncio
import uuid
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Force UTF-8 for Windows
if sys.platform.startswith("win"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

# Configure Gemini
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash-lite") # Validated stable model

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory job storage
jobs = {}

class VideoRequest(BaseModel):
    niche: str
    format: str
    theme: str
    voice: str
    music: str

async def process_video_job(job_id: str, req: VideoRequest):
    try:
        jobs[job_id]["status"] = "processing"
        
        # Step 1: Script
        jobs[job_id]["step"] = "Generando guión..."
        jobs[job_id]["progress"] = 50
        
        prompt = f"Genera un guión corto (30-60 seg) para un video de {req.niche} sobre: {req.theme}. Formato: {req.format}."
        response = model.generate_content(prompt)
        jobs[job_id]["script"] = response.text
        await asyncio.sleep(2)
        
        # Step 2: Finalizado
        jobs[job_id]["status"] = "completed"
        jobs[job_id]["progress"] = 100
        jobs[job_id]["step"] = "Video completado (Simulado)"
        
    except Exception as e:
        jobs[job_id]["status"] = "failed"
        jobs[job_id]["error"] = str(e)

@app.post("/api/ai-video/start")
async def start_video(req: VideoRequest, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    jobs[job_id] = {
        "id": job_id,
        "status": "pending",
        "progress": 0,
        "step": "Iniciando...",
        "video_url": None,
        "error": None
    }
    background_tasks.add_task(process_video_job, job_id, req)
    return jobs[job_id]

@app.get("/api/ai-video/status/{job_id}")
async def get_status(job_id: str):
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    return jobs[job_id]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
