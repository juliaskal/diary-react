from typing import TypeVar, Generic, Sequence, get_args
from pydantic import BaseModel
from mongodb import PydanticMongoRepository


T = TypeVar('T', bound=BaseModel)


class GenericMongoRepository(Generic[T]):

    def __init__(
        self,
        connection_string: str,
        database_name: str,
        collection_name: str,
        client_kwargs: dict | None = None
    ):
        self._mongo_repository = PydanticMongoRepository(connection_string, database_name, collection_name, client_kwargs)

    @property
    def model_type(self) -> type[T]:
        return get_args(self.__orig_class__)[0]  # type: ignore[attr-defined]  # pylint: disable=E1101

    def add(self, model: T):
        return self._mongo_repository.add(model)

    def add_many(self, models: Sequence[T]):
        return self._mongo_repository.add_many(models)

    def add_from_json(self, document: dict):
        return self._mongo_repository.add_from_json(document)

    def add_many_from_json(self, documents: list[dict]):
        return self._mongo_repository.add_many_from_json(documents)

    def get(self, **filter) -> T:
        return self._mongo_repository.get(model_type=self.model_type, **filter)

    def get_list(self, **filter) -> list[T]:
        return self._mongo_repository.get_list(model_type=self.model_type, **filter)

    def get_range(self, start: int, end: int, **filter) -> list[T]:
        return self._mongo_repository.get_range(start, end, model_type=self.model_type, **filter)

    def count(self, **filter) -> int:
        return self._mongo_repository.count(**filter)

    def distinct(self, key: str, **filter) -> list[str]:
        return self._mongo_repository.distinct(key, **filter)

    def update(self, update: dict, **filter):
        return self._mongo_repository.update(update, **filter)

    def update_many(self, update: dict, **filter):
        return self._mongo_repository.update_many(update, **filter)

    def delete(self, **filter):
        return self._mongo_repository.delete(**filter)

    def delete_many(self, **filter):
        return self._mongo_repository.delete_many(**filter)

    def find(self, **filter) -> T | None:
        return self._mongo_repository.find(model_type=self.model_type, **filter)
