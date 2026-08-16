import os
import json

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY is not set")

client = Groq(api_key=api_key)


def analyze_meeting(transcript: str):
    prompt = f"""
You are a Meeting-to-Action AI Agent.

Analyze the following meeting transcript.

Extract:

1. A concise meeting summary.
2. Key decisions made during the meeting.
3. Action items.
4. For every action item, identify:
   - task
   - owner
   - deadline

If an owner or deadline is not explicitly mentioned, use null.

Return ONLY valid JSON.
Do not use markdown.
Do not use ```json.
Do not add any explanation before or after the JSON.

Use exactly this structure:

{{
    "summary": "string",
    "key_decisions": [
        "decision 1",
        "decision 2"
    ],
    "action_items": [
        {{
            "task": "string",
            "owner": "string or null",
            "deadline": "string or null"
        }}
    ]
}}

Meeting transcript:

{transcript}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You extract structured information from meeting transcripts."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    result = response.choices[0].message.content.strip()

    if result.startswith("```"):
        result = result.replace("```json", "").replace("```", "").strip()

    return json.loads(result)