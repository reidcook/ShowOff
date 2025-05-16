from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from fastapi.security import OAuth2PasswordRequestForm

from api.models.user import User, SystemUser
from api.models.jwt import TokenSchema
from api.models.project import Project
from api.utils import get_hashed_password, verify_password, create_refresh_token, create_access_token
from api.dependencies.curr_user import get_current_user
from api.dependencies.mongo import get_database

user_router = APIRouter()

COLLECTION = "projects"

@user_router.get("/projects", response_model=Project)
async def get_projects(user: SystemUser = Depends(get_current_user), db: AsyncIOMotorDatabase = Depends(get_database)):
    projects: list[Project] = await db[COLLECTION].find({"owner": user.id})
    return projects