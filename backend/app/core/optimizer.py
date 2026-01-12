from openai import OpenAI
from dotenv import load_dotenv
import os
from . import LLM_prompts
import json

# Load environment variables from .env file
load_dotenv()

MODEL = "gpt-4o-mini"
OPEN_AI_API_KEY = os.getenv("OPENAI_API_KEY")

def optimize_prompt(user_prompt: str, target_llm: str, user_preferences: dict) -> str:
    updated_user_prompt = LLM_prompts.construct_user_prompt(user_prompt, target_llm, user_preferences=user_preferences)
    client = OpenAI(api_key=OPEN_AI_API_KEY)
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": LLM_prompts.system_prompt},
            {"role": "user", "content": updated_user_prompt}
        ]
    )

    return response.choices[0].message.content