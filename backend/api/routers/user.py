from uuid import uuid4
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm

from api.models.user import UserAuth, UserOut, SystemUser
from api.models.jwt import TokenSchema
from api.utils import get_hashed_password, verify_password, create_refresh_token, create_access_token
from api.dependencies.curr_user import get_current_user

user_router = APIRouter()

# Example of protected endpoint
@user_router.get("/me", response_model=UserOut)
async def get_me(user: SystemUser = Depends(get_current_user)):
    return user