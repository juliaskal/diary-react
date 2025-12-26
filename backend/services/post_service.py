from datetime import datetime
from models import Post
from mongodb import GenericMongoRepository, FolderMongoRepository


class PostService:

    def __init__(
            self,
            post_repository: GenericMongoRepository[Post],
            folder_repository: FolderMongoRepository
    ):
        self.post_repository = post_repository
        self.folder_repository = folder_repository

    def get_folders(self):
        return self.folder_repository.get_list()

    def get_actual_posts(self, folder: str | None = None):

        if not folder:
            posts = self.post_repository.get_list(is_archived=False, is_deleted=False)
        else:
            posts = self.post_repository.get_list(is_archived=False, is_deleted=False, folder=folder)

        return sorted(posts, key=lambda post: post.created_at, reverse=True)

    def get_archived_posts(self, folder: list[str]):

        posts = self.post_repository.get_list(is_archived=True, is_deleted=False)

        if not folder:
            filtered_posts = posts
        else:
            filtered_posts = list(filter(lambda post: post.folder in folder, posts))

        return sorted(filtered_posts, key=lambda post: post.created_at, reverse=True)

    def create_post(self, form_data: dict) -> str:
        created_at = form_data.get("created_at")
        if created_at:
            created_at_datetime = datetime.fromisoformat(created_at)
        else:
            created_at_datetime = datetime.now()

        content = form_data.get("content")

        post_data = {
            "title": form_data.get("title"),
            "created_at": created_at_datetime,
            "content": content if content else {"ops": []},
            "folder": form_data.get("folder")
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

    def get_filtered_posts(self, folder_filters: list[str]) -> list[Post]:
        posts = self.post_repository.get_list(is_deleted=True)
        return list(filter(lambda n: n.folder in folder_filters, posts))

    def get_post_by_id(self, post_id: str) -> Post:
        return self.post_repository.get(id=post_id)

    def mark_as_deleted(self, post_id: str):
        return self.post_repository.update(update={"is_deleted": True}, id=post_id)

    def mark_as_not_deleted(self, post_id: str):
        return self.post_repository.update(update={"is_deleted": False}, id=post_id)

    def get_posts(self):
        return self.post_repository.get_list()

    def delete_post(self, post_id: str):
        return self.post_repository.delete(id=post_id)

    def find_folder(self, name: str) -> str | None:
        return self.folder_repository.find(string=name)

    def add_folder(self, name: str):
        return self.folder_repository.add(name)

    def delete_folder(self, name: str):
        return self.folder_repository.delete(string=name)
