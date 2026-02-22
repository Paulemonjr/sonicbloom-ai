# SonicBloom Setup Guide

## Quick Start (Local Development)

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker & Docker Compose
- Git

### 1. Clone Repository
```bash
git clone https://github.com/Paulemonjr/sonicbloom-ai.git
cd sonicbloom-ai
```

### 2. Backend Setup

```bash
# Create virtual environment
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your API keys

# Run with Docker Compose (includes DB & Redis)
cd ..
docker-compose up -d db redis

# Run backend locally
uvicorn app.main:app --reload
```

Backend will be available at: http://localhost:8000
API Docs: http://localhost:8000/docs

### 3. Mobile App Setup

```bash
cd mobile

# Install dependencies
npm install

# Start Expo development server
npx expo start
```

Scan QR code with Expo Go app (iOS/Android) to test on device.

### 4. Environment Variables

Required variables in `.env`:

```bash
# Backend
GROQ_API_KEY=your_groq_key_here
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sonicbloom
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key

# Mobile
API_URL=http://localhost:8000
```

Get Groq API key: https://console.groq.com/keys

### 5. Database Setup

```bash
# Create database
docker-compose exec db psql -U postgres -c "CREATE DATABASE sonicbloom;"

# Initialize tables
python -c "from app.models import init_db; init_db()"
```

### 6. Test the API

```bash
# Health check
curl http://localhost:8000/health

# Test curation endpoint
curl -X POST http://localhost:8000/curate \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "focus",
    "genres": ["ambient", "electronic"],
    "artists": [],
    "duration": 180
  }'
```

## Deployment

### Backend (Docker)

```bash
# Build image
docker build -t sonicbloom-api ./backend

# Run container
docker run -p 8000:8000 \
  -e GROQ_API_KEY=$GROQ_API_KEY \
  -e DATABASE_URL=$DATABASE_URL \
  sonicbloom-api
```

### Mobile (Expo)

```bash
# Build for production
npx expo build:android
npx expo build:ios

# Or use EAS (Expo Application Services)
npx eas build --platform all
```

## MusicGen GPU Setup (RunPod)

1. Create RunPod account: https://runpod.io/
2. Deploy GPU pod (RTX 4090 or A100)
3. Install MusicGen:
```bash
pip install audiocraft
```
4. Expose API endpoint for generation
5. Add RUNPOD_API_KEY to .env

## Project Structure

```
sonicbloom-ai/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── main.py       # API endpoints
│   │   ├── models.py     # Database models
│   │   └── services/     # Business logic
│   ├── tests/
│   ├── Dockerfile
│   └── requirements.txt
├── mobile/               # React Native app
│   ├── src/
│   │   ├── screens/      # UI screens
│   │   ├── services/     # API client
│   │   └── components/   # Reusable UI
│   ├── App.js
│   └── package.json
├── ml/                   # ML models
│   ├── musicgen/         # MusicGen setup
│   └── binaural/         # Beat generation
├── docker-compose.yml
└── README.md
```

## Development Workflow

1. **Start backend**: `docker-compose up api`
2. **Start mobile**: `cd mobile && npx expo start`
3. **Make changes**: Edit code, hot reload works
4. **Test**: Use Expo Go app on phone
5. **Commit**: `git commit -m "description"`
6. **Push**: `git push origin main`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/curate` | POST | LLM prompt curation |
| `/generate` | POST | Queue music generation |
| `/job/{id}` | GET | Check job status |
| `/binaural/{freq}` | GET | Generate binaural beat |

## Troubleshooting

**Backend won't start:**
- Check DATABASE_URL is correct
- Ensure Docker is running
- Check port 8000 is free

**Mobile can't connect:**
- Use ngrok for external access: `npx ngrok http 8000`
- Update API_URL in mobile/.env

**MusicGen too slow:**
- Use smaller model: `MUSICGEN_MODEL_SIZE=small`
- Enable GPU: `MUSICGEN_DEVICE=cuda`

## Support

- GitHub Issues: https://github.com/Paulemonjr/sonicbloom-ai/issues
- Documentation: See /docs folder

---

Built with 💜 by the SonicBloom team
