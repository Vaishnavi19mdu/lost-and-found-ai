import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

def verify_answers(item, answers):
    score = 0
    reasons = []

    # Category (40)
    if answers["category"].lower() == item.get("category", "").lower():
        score += 40
    else:
        reasons.append("Category mismatch")

    # Description keywords (max 20)
    item_desc = item.get("description", "").lower()
    for word in answers["description"].lower().split():
        if word in item_desc:
            score += 10
    score = min(score, 60)

    # Location (20)
    if answers["location"].lower() in item.get("location", "").lower():
        score += 20
    else:
        reasons.append("Location mismatch")

    # Time (20)
    if answers["time"].lower() in item.get("time", "").lower():
        score += 20
    else:
        reasons.append("Time mismatch")

    return {
        "passed": score >= 60,
        "confidence": score,
        "reason": " | ".join(reasons) if reasons else "Strong match"
    }
