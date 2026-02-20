from enum import Enum


class DBMS(str, Enum):
    MONGODB = "mongodb"
    POSTGRESQL = "postgresql"
