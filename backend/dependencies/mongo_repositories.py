from typing import Annotated
from fastapi import Depends
from mongodb.generic_mongo_repository import GenericMongoRepository
from mongodb.post_mongo_repository import PostMongoRepository
from models import Folder
from config import settings


CONNECTION_STRING = settings.connection_string
DB_NAME = settings.database_name


def get_post_mongo_repository():
    return PostMongoRepository(
        connection_string=CONNECTION_STRING,
        database_name=DB_NAME,
        collection_name='post'
    )


PostRepositoryDependency = Annotated[PostMongoRepository, Depends(get_post_mongo_repository)]


def get_folder_mongo_repository():
    return GenericMongoRepository[Folder](
        connection_string=CONNECTION_STRING,
        database_name=DB_NAME,
        collection_name='folder'
    )


FolderRepositoryDependency = Annotated[GenericMongoRepository[Folder], Depends(get_folder_mongo_repository)]
