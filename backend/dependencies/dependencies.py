from typing import Annotated
from fastapi import Depends
from mongodb.generic_mongo_repository import GenericMongoRepository
from mongodb.folder_mongo_repository import FolderMongoRepository
from models import Post
from services.post_service import PostService


def get_post_repository():
    return GenericMongoRepository[Post](
        connection_string='mongodb://localhost:27017/',
        database_name='diary',
        collection_name='post'
    )


def get_folder_repository():
    return FolderMongoRepository(
        connection_string='mongodb://localhost:27017/',
        database_name='diary',
        collection_name='folder'
    )


PostRepository = Annotated[GenericMongoRepository[Post], Depends(get_post_repository)]
FolderRepository = Annotated[FolderMongoRepository, Depends(get_folder_repository)]


def get_post_service():
    return PostService(
        post_repository=get_post_repository(),
        folder_repository=get_folder_repository()
    )


PostServiceDependency = Annotated[PostService, Depends(get_post_service)]
