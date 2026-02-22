from sqlalchemy import create_engine, Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String)
    is_active = Column(Boolean, default=True)
    is_premium = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    tracks = relationship("Track", back_populates="user")
    preferences = relationship("UserPreference", back_populates="user", uselist=False)

class UserPreference(Base):
    __tablename__ = "user_preferences"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    
    # Music preferences
    favorite_genres = Column(String)  # JSON array as string
    favorite_artists = Column(String)  # JSON array as string
    default_mode = Column(String, default="focus")
    default_duration = Column(Integer, default=180)
    
    # App preferences
    notifications_enabled = Column(Boolean, default=True)
    offline_mode = Column(Boolean, default=False)
    default_volume = Column(Float, default=0.8)
    
    user = relationship("User", back_populates="preferences")

class Track(Base):
    __tablename__ = "tracks"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Track info
    title = Column(String, nullable=False)
    mode = Column(String, nullable=False)  # focus, relax, sleep
    duration = Column(Integer, nullable=False)  # seconds
    
    # Generation details
    music_prompt = Column(Text)
    binaural_frequency = Column(Float)
    genres = Column(String)  # JSON array
    
    # File info
    audio_url = Column(String)
    local_path = Column(String)
    
    # Metadata
    is_favorite = Column(Boolean, default=False)
    play_count = Column(Integer, default=0)
    last_played = Column(DateTime)
    
    # Status
    generation_status = Column(String, default="pending")  # pending, processing, completed, failed
    generation_job_id = Column(String)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="tracks")

class GenerationJob(Base):
    __tablename__ = "generation_jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(String, unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Job details
    status = Column(String, default="queued")  # queued, processing, completed, failed
    music_prompt = Column(Text)
    binaural_frequency = Column(Float)
    duration = Column(Integer)
    
    # Results
    audio_url = Column(String)
    error_message = Column(String)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    started_at = Column(DateTime)
    completed_at = Column(DateTime)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Database connection
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/sonicbloom")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)
