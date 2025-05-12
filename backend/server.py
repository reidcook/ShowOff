import asyncio
import os
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

app = FastAPI()
load_dotenv()

@app.get("/")
async def health():
    return {"status": "good!"}

@app.get("/mongo-health")
async def mongo():
    uri = os.getenv("MONGODB_URI")
    client = AsyncIOMotorClient(uri, server_api=ServerApi('1'))
    db = client["sample_mflix"]
    collection = db["movies"]
    movie = await collection.find_one({"title": "The Great Train Robbery"})
    try:
        await client.admin.command('ping')
        print("pinged deployment!")
        return movie["fullplot"]
    except Exception as e:
        print(e)