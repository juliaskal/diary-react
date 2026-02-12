from pydantic import BaseSettings
from models import DBMS


class Settings(BaseSettings):
    connection_string: str
    database_name: str
    dbms: DBMS

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
