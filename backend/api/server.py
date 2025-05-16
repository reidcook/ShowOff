import os
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()
from api.routers.authentication import router
from api.mongo import lifespan

app = FastAPI(lifespan=lifespan)
app.include_router(router)

@app.get("/")
async def health():
    import secrets
    secret = secrets.token_hex(64)  # Generates a 128-character hex string (64 bytes)
    print(secret)
    return {"status": "good!"}

# @app.get("/mongo-health")
# async def mongo():
#     collection = db["movies"]
#     movie = await collection.find_one({"title": "The Great Train Robbery"})
#     try:
#         await client.admin.command('ping')
#         print("pinged deployment!")
#         return movie["fullplot"]
#     except Exception as e:
#         print(e)