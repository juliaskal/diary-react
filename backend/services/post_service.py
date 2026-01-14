from datetime import datetime
from models import Post, Folder
from mongodb import GenericMongoRepository


class PostService:

    def __init__(
            self,
            post_repository: GenericMongoRepository[Post],
            folder_repository: GenericMongoRepository[Folder]
    ):
        self.post_repository = post_repository
        self.folder_repository = folder_repository

    def create_post(self, form_data: dict) -> str:
        created_at = form_data.get("created_at")
        if created_at:
            created_at_datetime = datetime.fromisoformat(created_at)
        else:
            created_at_datetime = datetime.now()

        content = form_data.get("content")

        folder_id = form_data.get("folder")
        folder = self.folder_repository.get(id=folder_id)

        post_data = {
            "title": form_data.get("title"),
            "created_at": created_at_datetime,
            "content": content if content else {"ops": []},
            "folder": folder
        }

        post = Post(**post_data)
        result = self.post_repository.add(post)

        return str(result.inserted_id)

    def update_post_by_id(self, form_data: dict, post_id: str):
        post_data = {
            "title": form_data.get("title"),
            "created_at": form_data.get("created_at"),
            "content": form_data.get("content"),
            "folder": form_data.get("folder")
        }
        return self.post_repository.update(post_data, id=post_id)

    def get_post_by_id(self, post_id: str) -> Post:
        return self.post_repository.get(id=post_id)

    def get_posts(self):
        return self.post_repository.get_list()

    def delete_post(self, post_id: str) -> int:
        return self.post_repository.delete(id=post_id).deleted_count
