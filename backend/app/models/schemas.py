from pydantic import BaseModel
class OptimizeRequest(BaseModel):
    target_llm: str
    user_preferences: dict