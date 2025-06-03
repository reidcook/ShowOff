from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()

from api.routers.authentication import auth_router
from api.routers.user import user_router
from api.dependencies.mongo import lifespan

origins = [
    "https://localhost:5173"
]

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth_router)
app.include_router(user_router)

@app.get("/")
async def health():
    return {"status": "good!"}