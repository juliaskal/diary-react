from utils import prosess_created_at
from models import Post, Folder
from db import GenericRepository, PostRepository


class PostService:

    def __init__(
            self,
            post_repository: PostRepository,
            folder_repository: GenericRepository[Folder]
    ):
        self.post_repository = post_repository
        self.folder_repository = folder_repository

    def create_post(self, form_data: dict) -> str:
        folder = self.folder_repository.find(id=form_data.get("folder"))

        post_data = {
            "title": form_data.get("title"),
            "created_at": prosess_created_at(form_data.get("created_at")),
            "content_html": form_data.get("content_html"),
            "folder": folder
        }

        post = Post(**post_data)
        result = self.post_repository.add(post)

        return str(result)

    def update_post(self, form_data: dict) -> str:
        folder = self.folder_repository.find(id=form_data.get("folder"))

        post_data = {
            "title": form_data["title"],
            "created_at": prosess_created_at(form_data["created_at"]),
            "content_html": form_data["content_html"],
            "folder": folder.model_dump() if folder else folder
        }
        result = self.post_repository.update(post_data, id=form_data["id"])

        return str(result)

    def get_post_by_id(self, post_id: str) -> Post:
        return self.post_repository.get(id=post_id)

    def get_posts(self):
        posts = self.post_repository.get_list()
        return sorted(posts, key=lambda post: post.created_at, reverse=True)

    def delete_post(self, post_id: str) -> int:
        return self.post_repository.delete(id=post_id)
