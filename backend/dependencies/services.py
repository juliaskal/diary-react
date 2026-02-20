from typing import Annotated
from fastapi import Depends
from services.post_service import PostService
from services.folder_service import FolderService
from dependencies.providers import (
    get_post_repository,
    get_folder_repository
)


def get_post_service():
    return PostService(
        post_repository=get_post_repository(),
        folder_repository=get_folder_repository()
    )


PostServiceDependency = Annotated[PostService, Depends(get_post_service)]


def get_folder_service():
    return FolderService(
        folder_repository=get_folder_repository(),
        post_repository=get_post_repository()
    )


FolderServiceDependency = Annotated[FolderService, Depends(get_folder_service)]
