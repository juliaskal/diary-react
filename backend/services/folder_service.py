from utils import prosess_created_at
from models import Folder, Post
from mongodb import GenericMongoRepository


class FolderService:

    def __init__(
            self,
            folder_repository: GenericMongoRepository[Folder],
            post_repository: GenericMongoRepository[Post]
    ):
        self.folder_repository = folder_repository
        self.post_repository = post_repository

    def get_list(self, **filter):
        return self.folder_repository.get_list(**filter)

    def get_folder_by_id(self, folder_id: str) -> Folder:
        return self.folder_repository.get(id=folder_id)

    def delete_folder_with_notes(self, folder_id: str) -> int:
        deleted_folders = self.folder_repository.delete(id=folder_id)

        params = {"folder.id": folder_id}
        deleted_posts = self.post_repository.delete_many(**params)

        return deleted_folders.deleted_count + deleted_posts.deleted_count

    def delete_folder_save_notes(self, folder_id: str) -> int:
        deleted_folders = self.folder_repository.delete(id=folder_id)

        params = {"folder.id": folder_id}
        updated_posts = self.post_repository.update_many({"folder": None}, **params)

        return deleted_folders.deleted_count + updated_posts.modified_count

    def create_folder(self, form_data: dict) -> str:
        folder_data = {
            "name": form_data.get("name"),
            "created_at": prosess_created_at(form_data.get("created_at")),
            "icon": form_data.get("icon"),
            "cover": form_data.get("cover"),
        }

        folder = Folder(**folder_data)
        result = self.folder_repository.add(folder)

        return str(result.inserted_id)

    def update_folder(self, form_data: dict) -> str:
        folder_data = {
            "name": form_data.get("name"),
            "created_at": prosess_created_at(form_data.get("created_at")),
            "icon": form_data.get("icon"),
            "cover": form_data.get("cover"),
        }

        result = self.folder_repository.update(folder_data, id=form_data["id"])

        params = {"folder.id": form_data["id"]}
        self.post_repository.update_many({"folder": folder_data}, **params)

        return str(result.upserted_id)
