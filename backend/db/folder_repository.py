from models import Folder
from abc import ABC, abstractmethod


class FolderRepository(ABC):

    @abstractmethod
    def add(self, model: Folder) -> Folder:
        raise NotImplementedError

    @abstractmethod
    def add_many(self, models: list[Folder]) -> Folder:
        raise NotImplementedError

    @abstractmethod
    def get(self, **filter) -> Folder:
        raise NotImplementedError

    @abstractmethod
    def get_list(self, start: int, end: int, **filter) -> list[Folder]:
        raise NotImplementedError

    @abstractmethod
    def get_range(self, start: int, end: int, **filter) -> list[Folder]:
        raise NotImplementedError

    @abstractmethod
    def count(self, **filter) -> int:
        raise NotImplementedError

    @abstractmethod
    def update(self, update: dict, **filter):
        raise NotImplementedError

    @abstractmethod
    def update_many(self, update: dict, **filter):
        raise NotImplementedError

    @abstractmethod
    def delete(self, **filter):
        raise NotImplementedError

    @abstractmethod
    def delete_many(self, **filter):
        raise NotImplementedError

    @abstractmethod
    def find(self, **filter) -> Folder | None:
        raise NotImplementedError
