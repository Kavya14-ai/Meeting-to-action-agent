import os
import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv


# ============================================================
# LOAD ENVIRONMENT VARIABLES
# ============================================================

load_dotenv()


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="Meeting-to-Action Agent",
    description="AI Agent that converts meeting transcripts into structured action items.",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177",
        "http://localhost:5178",
        "http://localhost:5179",
        "http://localhost:5180",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# GROQ CLIENT
# ============================================================

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not set")

client = Groq(api_key=GROQ_API_KEY)


# ============================================================
# REQUEST MODEL
# ============================================================

class MeetingRequest(BaseModel):
    transcript: str


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/")
def root():
    return {
        "message": "Meeting-to-Action Agent is running"
    }


# ============================================================
# ANALYZE MEETING
# ============================================================

@app.post("/analyze")
async def analyze_meeting(request: MeetingRequest):

    transcript = request.transcript.strip()

    if not transcript:
        raise HTTPException(
            status_code=400,
            detail="Meeting transcript cannot be empty."
        )

    prompt = f"""
You are an AI Meeting-to-Action Agent.

Analyze the following meeting transcript and extract useful,
structured information.

Return ONLY valid JSON in exactly this format:

{{
    "summary": "Short summary of the meeting",
    "key_decisions": [
        "Decision 1",
        "Decision 2"
    ],
    "action_items": [
        {{
            "task": "Task description",
            "owner": "Person responsible",
            "deadline": "Deadline if mentioned"
        }}
    ]
}}

Rules:

- Identify important decisions.
- Identify tasks or commitments.
- Identify the person responsible for each task.
- Identify deadlines when explicitly mentioned.
- If an owner is not clear, use "Not assigned".
- If a deadline is not mentioned, use "Not specified".
- Do not invent information.
- Return ONLY JSON.

Meeting transcript:

{transcript}
"""

    try:

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You extract structured action items "
                        "from meeting transcripts."
                    )
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
        )

        content = response.choices[0].message.content

        if not content:
            raise HTTPException(
                status_code=500,
                detail="AI returned an empty response."
            )

        content = content.strip()

        # Remove markdown code fences if AI adds them
        if content.startswith("```json"):
            content = content[7:]

        elif content.startswith("```"):
            content = content[3:]

        if content.endswith("```"):
            content = content[:-3]

        content = content.strip()

        result = json.loads(content)

        return result

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="AI returned invalid JSON."
        )

    except Exception as e:
        print("ERROR:", repr(e))

        raise HTTPException(
            status_code=500,
            detail="Failed to analyze the meeting."
        )