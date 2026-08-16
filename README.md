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
