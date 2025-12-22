from typing import Sequence
from pydantic import BaseModel
from mongodb import DictMongoRepository


class PydanticMongoRepository:

    def __init__(
        self,
        connection_string: str,
        database_name: str,
        collection_name: str,
        client_kwargs: dict | None = None
    ):
        self._mongo_repository = DictMongoRepository(connection_string, database_name, collection_name, client_kwargs)

    def model_to_document(self, model: BaseModel):
        document = model.model_dump()
        document['model'] = type(model).__name__
        return document

    def add(self, model: BaseModel):
        document = self.model_to_document(model)
        return self._mongo_repository.add(document)

    def add_many(self, models: Sequence[BaseModel]):
        documents = [self.model_to_document(model) for model in models]
        return self._mongo_repository.add_many(documents)

    def add_from_json(self, document: dict):
        return self._mongo_repository.add(document)

    def add_many_from_json(self, documents: Sequence[dict]):
        return self._mongo_repository.add_many(documents)

    def get(self, model_type: type[BaseModel], **filter):
        document = self._mongo_repository.get(**filter)
        if document is None:
            raise ValueError('Document not found')
        return model_type(**document)

    def get_list(self, model_type: type[BaseModel], **filter):
        documents = self._mongo_repository.get_list(**filter)
        return list(map(lambda document: model_type(**document), documents))

    def get_range(self, start: int, end: int, model_type: type[BaseModel], **filter):
        documents = self._mongo_repository.get_range(start, end, **filter)
        return list(map(lambda document: model_type(**document), documents))

    def count(self, **filter):
        return self._mongo_repository.count(**filter)

    def distinct(self, key: str, **filter):
        return self._mongo_repository.distinct(key, **filter)

    def update(self, update: dict, **filter):
        return self._mongo_repository.update(update, **filter)

    def update_many(self, update: dict, **filter):
        return self._mongo_repository.update_many(update, **filter)

    def delete(self, **filter):
        return self._mongo_repository.delete(**filter)

    def delete_many(self, **filter):
        return self._mongo_repository.delete_many(**filter)

    def find(self, model_type: type[BaseModel], **filter):
        if not (document := self._mongo_repository.find(**filter)):
            return document
        return model_type(**document)

    def add_to_list(self, update: dict, **filter):
        return self._mongo_repository.add_to_list(update, **filter)

    def remove_from_list(self, update: dict, **filter):
        return self._mongo_repository.remove_from_list(update, **filter)
