from uuid import uuid4
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm

from api.models.user import UserAuth
from api.models.jwt import TokenSchema
from api.utils import get_hashed_password, verify_password, create_refresh_token, create_access_token
from api.dependencies.mongo import get_database

auth_router = APIRouter()

COLLECTION = "users"

@auth_router.post("/signup")
async def create_user(data: UserAuth, db=Depends(get_database)):
    collection = db[COLLECTION]
    user = await collection.find_one({"$or": [{"email": data.email}, {"username": data.username}]})
    print(user)
    if user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exist"
        )
    user = {
        "username": data.username,
        "email": data.email,
        "password": get_hashed_password(data.password),
        "id": str(uuid4())
    }
    collection.insert_one(user)
    return user

@auth_router.post("/login", response_model=TokenSchema)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db=Depends(get_database)):
    collection = db[COLLECTION]
    user = await collection.find_one({"username": form_data.username})
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password"
        )
    hashed_password = user["password"]
    if not verify_password(form_data.password, hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password"
        )
    return {
        "access_token": create_access_token(user["email"]),
        "refresh_token": create_refresh_token(user["email"])
    }
