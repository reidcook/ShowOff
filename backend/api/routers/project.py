from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel

from api.models.user import SystemUser
from api.models.project import Project
from api.dependencies.curr_user import get_current_user
from api.dependencies.mongo import get_database

class ProjectInput(BaseModel):
    name: str
    description: str

project_router = APIRouter()

COLLECTION = "projects"

@project_router.get("/projects", response_model=list[Project])
async def get_projects(user: SystemUser = Depends(get_current_user), db: AsyncIOMotorDatabase = Depends(get_database)):
    projects: list[Project] = await db[COLLECTION].find({"owner": user.id}).to_list()
    return projects

@project_router.post("/projects", response_model=Project)
async def post_project(project: ProjectInput, user: SystemUser = Depends(get_current_user), db: AsyncIOMotorDatabase = Depends(get_database)):
    project_populated = Project(name=project.name, description=project.description, owner=user.id)
    await db[COLLECTION].insert_one({"name": project.name, "description": project.description, "owner": user.id})
    return project_populated