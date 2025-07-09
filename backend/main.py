from fastapi import FastAPI, Request
from pydantic import BaseModel
from prompt_templates import generate_prompt
import httpx
import os
import re

from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow any frontend for now (can restrict later)
    allow_credentials=True,
    allow_methods=["*"],  # Needed to allow POST
    allow_headers=["*"],
)


class QuestionInput(BaseModel):
    question: str
    tone: str  

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
if not OPENROUTER_API_KEY:
    raise ValueError("Missing OPENROUTER_API_KEY environment variable")


def trim_to_100_words_safely(text):
    # Split into sentences
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    final_text = ""
    word_count = 0

    for sentence in sentences:
        words = sentence.strip().split()
        if word_count + len(words) <= 100:
            final_text += sentence.strip() + " "
            word_count += len(words)
        else:
            break

    return final_text.strip()

@app.post("/generate-wisdom/")
async def generate_wisdom(data: QuestionInput):
    prompt = generate_prompt(data.question, data.tone)

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": "mistralai/mistral-7b-instruct",
        "max_tokens": 100,  
        "temperature": 0.7, 
        "messages": [
            {"role": "system", "content": "You are a wise and kind mentor."},
            {"role": "user", "content": prompt}
        ]
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post("https://openrouter.ai/api/v1/chat/completions", json=payload, headers=headers)

    result = response.json()
    print("OpenRouter key loaded:", OPENROUTER_API_KEY[:6] + "...")

    print("🔍 OpenRouter full response:", result)

    if "choices" not in result:
     return {
        "error": "OpenRouter failed",
        "details": result
     }

    answer = result['choices'][0]['message']['content'].strip()
    clean_response = trim_to_100_words_safely(answer)
    return {"response": clean_response}

@app.get("/tone-options/")
async def tone_options():
    return [
        {"label": "Spiritual", "value": "spiritual", "emoji": "🌿"},
        {"label": "Stoic", "value": "stoic", "emoji": "🧘"},
        {"label": "Motivational", "value": "motivational", "emoji": "💪"},
        {"label": "Big Sister", "value": "big_sister", "emoji": "👩‍❤️‍👩"},
        {"label": "Therapist", "value": "therapist", "emoji": "🧠"},
        {"label": "Islamic Scholar", "value": "islamic_scholar", "emoji": "🕌"},
        {"label": "Funny Friend", "value": "funny_friend", "emoji": "😂"},
        {"label": "Elderly Grandma", "value": "elderly_grandma", "emoji": "👵"},
        {"label": "Educational", "value": "educational", "emoji": "📚"},
        {"label": "Technological", "value": "technological", "emoji": "🧑‍💻"},
    ]

@app.post("/analyze-emotion/")
async def analyze_emotion(request: Request):
    data = await request.json()
    message = data["message"]

    prompt = f"What is the emotional tone of the following message? Give only one word like: sad, confused, happy, frustrated, hopeful.\n\nMessage: \"{message}\""

    payload = {
        "model": "mistralai/mistral-7b-instruct",
        "messages": [{"role": "user", "content": prompt}],
    }

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": "https://yourdomain.com",  # optional
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://openrouter.ai/api/v1/chat/completions", json=payload, headers=headers
        )
        result = response.json()

    emotion = result["choices"][0]["message"]["content"].strip().lower()
    return {"emotion": emotion}