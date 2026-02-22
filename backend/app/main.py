from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from groq import Groq
import json

app = FastAPI(
    title="SonicBloom API",
    description="AI-powered personalized music generation",
    version="0.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq Client
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Models
class MusicPreferences(BaseModel):
    mode: str  # "focus", "relax", "sleep"
    genres: List[str]
    artists: Optional[List[str]] = []
    duration: int = 180  # seconds
    intensity: str = "medium"  # "low", "medium", "high"

class CuratedPrompt(BaseModel):
    mode: str
    binaural_frequency: float
    music_prompt: str
    duration: int

class GenerationJob(BaseModel):
    job_id: str
    status: str  # "queued", "processing", "completed", "failed"
    curated_prompt: CuratedPrompt
    audio_url: Optional[str] = None

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "0.1.0"}

# LLM Curation Endpoint
@app.post("/curate", response_model=CuratedPrompt)
async def curate_music_prompt(preferences: MusicPreferences):
    """
    Use Groq LLM to craft an optimized prompt for MusicGen
    based on user preferences.
    """
    try:
        # Determine binaural frequency based on mode
        frequency_map = {
            "focus": 40.0,    # Gamma
            "relax": 10.0,    # Alpha
            "sleep": 2.0      # Delta
        }
        binaural_freq = frequency_map.get(preferences.mode, 10.0)
        
        # Build LLM prompt
        system_prompt = """You are an expert music curator and audio prompt engineer for an AI music generation system.

Your task: Create a detailed, evocative text prompt for MusicGen (Meta's AI music generator) based on user preferences.

Rules:
1. Be specific about instruments, mood, tempo, and style
2. Include technical terms that help MusicGen understand the desired output
3. Keep it under 200 words
4. Focus on the FEELING and SOUND, not specific copyrighted songs
5. Include references to production quality (e.g., "high quality", "studio recording")

Output format: Just the music description prompt, nothing else."""

        user_prompt = f"""Create a music generation prompt for:
- Mode: {preferences.mode} (needs binaural beats at {binaural_freq}Hz)
- Genres: {', '.join(preferences.genres)}
- Artists for inspiration: {', '.join(preferences.artists) if preferences.artists else 'various'}
- Intensity: {preferences.intensity}
- Duration: {preferences.duration} seconds

Make it evocative and specific for AI music generation."""

        # Call Groq
        response = groq_client.chat.completions.create(
            model="moonshot/kimi-k2.5",  # or "llama-3.3-70b"
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=300
        )
        
        music_prompt = response.choices[0].message.content.strip()
        
        return CuratedPrompt(
            mode=preferences.mode,
            binaural_frequency=binaural_freq,
            music_prompt=music_prompt,
            duration=preferences.duration
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Curation failed: {str(e)}")

# Queue Generation Job
@app.post("/generate", response_model=GenerationJob)
async def queue_generation(preferences: MusicPreferences):
    """
    Queue a music generation job.
    1. Curate prompt with LLM
    2. Add to job queue
    3. Return job ID for polling
    """
    try:
        # Step 1: Curate the prompt
        curated = await curate_music_prompt(preferences)
        
        # Step 2: Create job (simplified - would use Redis in production)
        import uuid
        job_id = str(uuid.uuid4())
        
        # TODO: Add to Redis queue for worker processing
        # For now, return queued status
        
        return GenerationJob(
            job_id=job_id,
            status="queued",
            curated_prompt=curated,
            audio_url=None
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Queue failed: {str(e)}")

# Check Job Status
@app.get("/job/{job_id}", response_model=GenerationJob)
async def get_job_status(job_id: str):
    """Check status of a generation job"""
    # TODO: Query Redis/DB for actual job status
    # For now, return mock
    raise HTTPException(status_code=404, detail="Job tracking not yet implemented")

# Get Binaural Beat
@app.get("/binaural/{frequency}")
async def get_binaural_beat(frequency: float, duration: int = 300):
    """
    Generate binaural beat audio for given frequency.
    Returns audio file or generation parameters.
    """
    # TODO: Implement binaural generation
    return {
        "frequency": frequency,
        "duration": duration,
        "carrier_frequency": 440,  # A4
        "status": "generation_not_implemented"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
