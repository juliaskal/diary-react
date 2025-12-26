from datetime import datetime
from models import FreezeModel


class Post(FreezeModel):
    id: str | None = None
    title: str | None = None
    created_at: datetime
    folder: str | None = None
    content: dict
    is_archived: bool = False
    is_deleted: bool = False
