from pydantic import BaseModel, Field
from uuid import UUID

class UserAuth(BaseModel):
    email: str = Field(..., description="user email")
    username: str = Field(..., description="username")
    password: str = Field(..., min_length=5, max_length=24, description="user password")
    

class UserOut(BaseModel):
    id: UUID
    email: str

class SystemUser(UserOut):
    password: str