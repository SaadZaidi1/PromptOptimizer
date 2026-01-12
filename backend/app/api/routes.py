from fastapi import APIRouter
from pydantic import BaseModel
from ..core import optimizer
from ..models.schemas import OptimizeRequest
router = APIRouter()


@router.post("/optimize")
async def optimize(user_prompt: str, request: OptimizeRequest):
    optimized_prompt = optimizer.optimize_prompt(
        user_prompt, request.target_llm, request.user_preferences
    )
    return {"optimized_prompt": optimized_prompt}
