from typing import Annotated
from fastapi import Depends
from mongodb.generic_mongo_repository import GenericMongoRepository
from models import Post, Folder
from services.post_service import PostService
from services.folder_service import FolderService


def get_post_repository():
    return GenericMongoRepository[Post](
        connection_string='mongodb://localhost:27017/',
        database_name='diary',
        collection_name='post'
    )


PostRepositoryDependency = Annotated[GenericMongoRepository[Post], Depends(get_post_repository)]


def get_folder_repository():
    return GenericMongoRepository[Folder](
        connection_string='mongodb://localhost:27017/',
        database_name='diary',
        collection_name='folder'
    )


FolderRepositoryDependency = Annotated[GenericMongoRepository[Folder], Depends(get_folder_repository)]


def get_post_service():
    return PostService(
        post_repository=get_post_repository(),
        folder_repository=get_folder_repository()
    )


PostServiceDependency = Annotated[PostService, Depends(get_post_service)]


def get_folder_service():
    return FolderService(
        folder_repository=get_folder_repository()
    )


FolderServiceDependency = Annotated[FolderService, Depends(get_folder_service)]
