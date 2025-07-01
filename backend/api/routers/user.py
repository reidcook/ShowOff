from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from api.models.user import SystemUser
from api.dependencies.curr_user import get_current_user
from api.dependencies.mongo import get_database

user_router = APIRouter()

@user_router.get("/user", response_model=SystemUser)
async def get_user(user: SystemUser = Depends(get_current_user), db: AsyncIOMotorDatabase = Depends(get_database)):
    user.password = ""
    return user