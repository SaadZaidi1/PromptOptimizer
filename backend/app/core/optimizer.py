from openai import OpenAI
from dotenv import load_dotenv
import os
from . import LLM_prompts
import json

MODEL = "GPT-4o-mini"
OPEN_AI_API_KEY = os.getenv("OPENAI_API_KEY")

def optimize_prompt(user_prompt: str, target_llm: str, user_preferences: dict) -> str:
    updated_user_prompt = LLM_prompts.construct_user_prompt(user_prompt, target_llm, user_preferences=user_preferences)
    client = OpenAI.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": LLM_prompts.system_prompt},
            {"role": "user", "content": updated_user_prompt}
        ]
    )

    return client.choices[0].message.content