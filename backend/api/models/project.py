from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

from api.types import PyObjectId

class Update(BaseModel):
    date_posted: datetime = Field(default_factory=datetime.now)
    description: str
    image: Optional[str]
    project: PyObjectId

    class Config:
        arbitrary_types_allowed = True
        populate_by_name = True


class Project(BaseModel):
    name: str
    description: str
    updates: list[Update] = Field(default_factory=list)
    owner: str

    class Config:
        arbitrary_types_allowed = True
        populate_by_name = True
