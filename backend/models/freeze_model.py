from pydantic import BaseModel


class FreezeModel(BaseModel):
    class Config:
        frozen = True
