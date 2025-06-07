from pydantic import BaseModel, Field
from bson import ObjectId

from api.types import PyObjectId
class User(BaseModel):
    email: str = Field(..., description="user email")
    username: str = Field(..., description="username")
    password: str = Field(..., description="user password")
    description: str = ""

class SystemUser(User):
    id: PyObjectId = Field(alias="_id", default=None)

    class Config:
        arbitrary_types_allowed = True
        populate_by_name = True

        json_encoders = {
            ObjectId: str
        }