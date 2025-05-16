from uuid import uuid4
from fastapi import APIRouter, HTTPException, status, Depends

from api.models.user import User
from api.utils import get_hashed_password
from api.mongo import get_database

router = APIRouter()

@router.post("/signup")
async def create_user(data: User, db=Depends(get_database)):
    collection = db["users"]
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