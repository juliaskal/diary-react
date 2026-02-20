from utils import prosess_created_at
from models import Folder
from db import GenericRepository, PostRepository


class FolderService:

    def __init__(
            self,
            folder_repository: GenericRepository[Folder],
            post_repository: PostRepository
    ):
        self.folder_repository = folder_repository
        self.post_repository = post_repository

    def get_list(self, **filter):
        return self.folder_repository.get_list(**filter)

    def get_folder_by_id(self, folder_id: str) -> Folder:
        return self.folder_repository.get(id=folder_id)

    def delete_with_posts(self, folder_id: str) -> int:
        deleted_folders = self.folder_repository.delete(id=folder_id)
        deleted_posts = self.post_repository.delete_by_folder(folder_id)

        return deleted_folders + deleted_posts

    def delete_save_posts(self, folder_id: str) -> int:
        deleted_folders = self.folder_repository.delete(id=folder_id)
        self.post_repository.detach_from_folder(folder_id)

        return deleted_folders

    def create_folder(self, form_data: dict) -> str:
        folder_data = {
            "name": form_data.get("name"),
            "created_at": prosess_created_at(form_data.get("created_at")),
            "icon": form_data.get("icon"),
            "cover": form_data.get("cover"),
        }

        folder = Folder(**folder_data)
        result = self.folder_repository.add(folder)

        return str(result)

    def update_folder(self, form_data: dict) -> str:
        folder_data = {
            "name": form_data.get("name"),
            "created_at": prosess_created_at(form_data.get("created_at")),
            "icon": form_data.get("icon"),
            "cover": form_data.get("cover"),
        }

        result = self.folder_repository.update(folder_data, id=form_data["id"])

        return str(result)
