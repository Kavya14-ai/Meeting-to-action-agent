from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import analyze_meeting


app = FastAPI(
    title="Meeting-to-Action Agent",
    description="AI agent that converts meeting transcripts into structured action items.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MeetingRequest(BaseModel):
    transcript: str


@app.get("/")
def home():
    return {
        "message": "Meeting-to-Action Agent is running"
    }


@app.post("/analyze")
def analyze(request: MeetingRequest):
    result = analyze_meeting(request.transcript)
    return result