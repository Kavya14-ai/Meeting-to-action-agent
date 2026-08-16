# Meeting-to-Action Agent 🤖

An AI-powered web application that converts meeting transcripts into clear, structured, and actionable information.

The system analyzes meeting conversations and automatically extracts:

- 📋 Meeting Summary
- 🎯 Key Decisions
- ✅ Action Items
- 👤 Task Owners
- 📅 Deadlines

---

## 🚀 Project Overview

Important tasks, decisions, and deadlines are often buried inside meeting conversations.

The **Meeting-to-Action Agent** uses AI to transform an unstructured meeting transcript into structured action items, making it easier for teams to understand what needs to be done after a meeting.

---

## ✨ Features

### 📝 Meeting Transcript Input
Users can paste a meeting conversation into the application.

### 🧠 AI-Powered Analysis
The transcript is analyzed using a Large Language Model through the Groq API.

### 📋 Meeting Summary
Generates a concise summary of the meeting.

### 🎯 Key Decisions
Identifies important decisions made during the meeting.

### ✅ Action Item Extraction
Automatically identifies tasks and commitments.

### 👤 Owner Identification
Identifies the person responsible for each task.

### 📅 Deadline Detection
Extracts deadlines mentioned in the meeting.

---

## 🏗️ System Architecture

```text
                User
                  │
                  ▼
        ┌───────────────────┐
        │  React Frontend   │
        │      + Vite       │
        └─────────┬─────────┘
                  │
                  │ POST /analyze
                  ▼
        ┌───────────────────┐
        │  FastAPI Backend  │
        │      Python       │
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │     Groq API      │
        │   AI Processing   │
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │ Structured JSON   │
        │                   │
        │ • Summary         │
        │ • Decisions       │
        │ • Tasks           │
        │ • Owners          │
        │ • Deadlines       │
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │  React Frontend   │
        │ Display Results   │
        └───────────────────┘
---

## ✨ Features

- 📝 Meeting transcript analysis
- 🤖 AI-powered information extraction
- 📋 Automatic meeting summary generation
- 🎯 Key decision identification
- ✅ Action item extraction
- 👤 Task owner identification
- 📅 Deadline detection
- 📦 Structured JSON output
- 🌐 React-based web interface
- ⚡ FastAPI backend

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Python
- FastAPI
- Uvicorn
- Pydantic

### AI
- Groq API
- LLaMA 3.3 70B Versatile

### Deployment
- GitHub
- Render

---

## 📁 Project Structure

```text
Meeting-to-action-agent/
│
├── backend/
│   ├── main.py
│   ├── agent.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── public/
│
├── .gitignore
└── README.md

🚀 How It Works
The user enters a meeting transcript.
The frontend sends the transcript to the FastAPI backend.
The backend sends the transcript to the Groq AI model.
The AI analyzes the conversation.
Important information is extracted.
The backend converts the AI response into structured JSON.
The frontend displays the meeting summary, decisions, action items, owners, and deadlines.

📌 Example
Input
Priya: We need to complete the login module by Friday.


Rahul: I'll handle the backend API.


Ananya: I'll finish the frontend by Friday.


Priya: Let's test everything on Monday.


Rahul: I'll send the API documentation by Thursday.
Output
{
  "summary": "The team discussed completing the login module, backend API, frontend, documentation, and testing.",
  "key_decisions": [
    "The login module should be completed by Friday.",
    "Testing will be performed on Monday."
  ],
  "action_items": [
    {
      "task": "Handle the backend API",
      "owner": "Rahul",
      "deadline": "Not specified"
    },
    {
      "task": "Finish the frontend",
      "owner": "Ananya",
      "deadline": "Friday"
    },
    {
      "task": "Test everything",
      "owner": "Not assigned",
      "deadline": "Monday"
    },
    {
      "task": "Send the API documentation",
      "owner": "Rahul",
      "deadline": "Thursday"
    }
  ]
}
⚙️ Local Setup
1. Clone the repository
git clone https://github.com/Kavya14-ai/Meeting-to-action-agent.git
cd Meeting-to-action-agent
2. Backend Setup
cd backend
python -m venv venv

Activate the virtual environment on Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Create a .env file:

GROQ_API_KEY=your_groq_api_key

Start the backend:

uvicorn main:app --reload

The backend will run at:

http://127.0.0.1:8000
3. Frontend Setup

Open another terminal:

cd frontend
npm install
npm run dev

Open the URL shown by Vite, usually:

http://localhost:5173
🔐 Environment Variables

The application requires:

GROQ_API_KEY=your_groq_api_key

Never commit your API key to GitHub.

The .env file should remain in .gitignore.

🌐 Deployment

The backend is deployed using Render.

The frontend can be run locally using Vite or deployed separately using a frontend hosting platform.

🎯 Future Enhancements
🎙️ Audio/video meeting transcription
📧 Email notifications for action items
📅 Calendar integration
🔔 Deadline reminders
👥 Team collaboration
📊 Meeting analytics
💾 Persistent database storage
🔐 User authentication
👩‍💻 Project

Meeting-to-Action Agent

An AI-powered application designed to transform unstructured meeting conversations into clear, structured, and actionable information.
