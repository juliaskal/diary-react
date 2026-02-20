from dependencies.mongo_repositories import (
    get_post_mongo_repository,
    get_folder_mongo_repository
)
# from dependencies.pg_repositories import (
#     get_post_pg_repository,
#     get_folder_pg_repository
# )
from config import settings
from models import DBMS
from exceptions import DBMSError


POST_REPO_PROVIDERS = {
    DBMS.MONGODB: get_post_mongo_repository(),
    # DBMS.POSTGRESQL: get_post_pg_repository,
}

FOLDER_REPO_PROVIDERS = {
    DBMS.MONGODB: get_folder_mongo_repository(),
    # DBMS.POSTGRESQL: get_folder_pg_repository,
}


def get_post_repository():
    try:
        return POST_REPO_PROVIDERS[settings.dbms]
    except KeyError as exc:
        raise DBMSError from exc


def get_folder_repository():
    try:
        return FOLDER_REPO_PROVIDERS[settings.dbms]
    except KeyError as exc:
        raise DBMSError from exc
