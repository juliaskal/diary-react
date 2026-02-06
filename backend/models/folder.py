from datetime import datetime
from models import FreezeModel


class Folder(FreezeModel):
    id: str | None = None
    name: str
    icon: str | None = None
    cover: str | None = None
    created_at: datetime = datetime.now()
