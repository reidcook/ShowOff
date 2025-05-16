from fastapi import FastAPI
from dotenv import load_dotenv
load_dotenv()

from api.routers.authentication import auth_router
from api.routers.user import user_router
from api.dependencies.mongo import lifespan

app = FastAPI(lifespan=lifespan)

app.include_router(auth_router)
app.include_router(user_router)

@app.get("/")
async def health():
    return {"status": "good!"}