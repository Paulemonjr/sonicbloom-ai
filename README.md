# SonicBloom AI

🎵 AI-powered personalized music with binaural beats for focus, relaxation, and sleep.

## Concept

Generate original music compositions personalized to your taste combined with scientifically-backed binaural beats for enhanced mental states.

## How It Works

1. **Select Your Vibe** - Choose focus, relax, or sleep mode
2. **Pick Your Style** - Select genres and artists you love
3. **AI Curation** - Groq LLM crafts the perfect prompt
4. **Generate** - MusicGen creates original audio
5. **Binaural Mix** - Frequency entrainment layered in
6. **Enjoy** - Listen, save, repeat

## Tech Stack

### Backend
- **FastAPI** - High-performance Python API
- **Groq** - LLM curation (Kimi K2.5)
- **MusicGen** - Audio generation (Meta, Apache 2.0)
- **PostgreSQL** - User data, preferences
- **Redis** - Job queue, caching

### Mobile App
- **React Native** - Cross-platform iOS/Android
- **Expo** - Development and deployment
- **React Navigation** - App routing
- **AsyncStorage** - Local data persistence

### Infrastructure
- **RunPod/Vast.ai** - GPU inference for MusicGen
- **Docker** - Containerization
- **GitHub Actions** - CI/CD

## Architecture

```
┌─────────────────────────────────────────┐
│  MOBILE APP (React Native)              │
│  - User preferences, playback, UI       │
│  - Offline binaural generation          │
└─────────────┬───────────────────────────┘
              │ HTTPS/JSON
              ▼
┌─────────────────────────────────────────┐
│  FASTAPI BACKEND                        │
│  - Auth, preferences API                │
│  - LLM curation (Groq)                  │
│  - Job queue (Redis)                    │
└─────────────┬───────────────────────────┘
              │
    ┌─────────┴──────────┐
    ▼                    ▼
┌──────────────┐   ┌──────────────────┐
│  Groq LLM    │   │  MusicGen GPU    │
│  (Kimi K2.5) │   │  (RunPod)        │
│  Prompt      │   │  Audio           │
│  Curation    │   │  Generation      │
└──────────────┘   └──────────────────┘
```

## Binaural Beat Frequencies

| Frequency | Name | Effect | Use Case |
|-----------|------|--------|----------|
| 40 Hz | Gamma | Focus, cognition | Work, study |
| 10 Hz | Alpha | Relaxation, calm | Meditation, unwind |
| 6 Hz | Theta | Deep relaxation | Pre-sleep |
| 2 Hz | Delta | Deep sleep | Sleep aid |

## Project Structure

```
sonicbloom-ai/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Config, security
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   └── main.py         # App entry
│   ├── tests/
│   ├── Dockerfile
│   └── requirements.txt
├── mobile/                  # React Native app
│   ├── src/
│   │   ├── components/     # Reusable UI
│   │   ├── screens/        # App screens
│   │   ├── services/       # API calls
│   │   ├── store/          # State management
│   │   └── utils/          # Helpers
│   ├── App.js
│   └── package.json
├── ml/                      # ML models & training
│   ├── musicgen/           # MusicGen setup
│   ├── binaural/           # Beat generation
│   └── prompts/            # Prompt templates
├── docs/                    # Documentation
└── README.md
```

## Development Status

| Component | Status | Priority |
|-----------|--------|----------|
| Backend API | 🚧 In Progress | P0 |
| Groq Integration | 🚧 In Progress | P0 |
| MusicGen Setup | ⏳ Pending | P0 |
| Mobile App Scaffold | ⏳ Pending | P0 |
| Binaural Generation | ⏳ Pending | P1 |
| User Auth | ⏳ Pending | P1 |

## Quick Start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Mobile
```bash
cd mobile
npm install
npx expo start
```

## Environment Variables

```bash
# Backend
GROQ_API_KEY=your_groq_key
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
RUNPOD_API_KEY=your_runpod_key

# Mobile
API_URL=https://api.sonicbloom.ai
```

## Roadmap

- [x] Project initialization
- [ ] Backend API scaffold
- [ ] Groq LLM curation
- [ ] MusicGen integration
- [ ] Mobile app scaffold
- [ ] User onboarding
- [ ] Audio playback
- [ ] Beta release

## License

MIT License - See LICENSE file

---

Built with 💜 by the SonicBloom team
