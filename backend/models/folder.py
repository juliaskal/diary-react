from models import FreezeModel


class Folder(FreezeModel):
    id: str | None = None
    name: str
    icon: str = ""
