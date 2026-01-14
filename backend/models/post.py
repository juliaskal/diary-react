from datetime import datetime
from models import FreezeModel
from models.folder import Folder


class Post(FreezeModel):
    id: str | None = None
    title: str | None = None
    created_at: datetime
    folder: Folder
    content: dict
    is_archived: bool = False
    is_deleted: bool = False
