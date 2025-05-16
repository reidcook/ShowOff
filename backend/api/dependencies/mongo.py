from fastapi import HTTPException
import os
from fastapi import FastAPI, HTTPException
from contextlib import asynccontextmanager
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi

_db = None
_client = None

MONGO_URL = os.getenv("MONGODB_URI")
@asynccontextmanager
async def lifespan(app: FastAPI):
    # On start
    global client, db
    client = AsyncIOMotorClient(MONGO_URL, server_api=ServerApi('1'))
    db = client["showoff"]
    print("CONNECTED TO MONGODB WOO")
    yield

    # On shutdown
    client.close()
    print("DISCONNECTED FROM MONGODB BOO")

async def get_database():
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")
    else:
        return db
