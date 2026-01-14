from models import Folder
from mongodb import GenericMongoRepository


class FolderService:

    def __init__(
            self,
            folder_repository: GenericMongoRepository[Folder]
    ):
        self.folder_repository = folder_repository

    def get_list(self, **filter):
        return self.folder_repository.get_list(**filter)

    def add(self, model: Folder):
        return self.folder_repository.add(model)

    def add_many(self, models: list[Folder]):
        return self.folder_repository.add_many(models)

    def delete(self, **filter):
        return self.folder_repository.delete(**filter)
