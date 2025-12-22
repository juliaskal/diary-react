from mongodb import DictMongoRepository


class FolderMongoRepository:

    def __init__(
        self,
        connection_string: str,
        database_name: str,
        collection_name: str,
        client_kwargs: dict | None = None
    ):
        self._mongo_repository = DictMongoRepository(connection_string, database_name, collection_name, client_kwargs)

    def str_to_dict(self, string: str) -> dict:
        return {"string": string}

    def dict_to_str(self, dict: dict) -> str:
        return dict["string"]

    def add(self, model: str):
        document = self.str_to_dict(model)
        return self._mongo_repository.add(document)

    def add_many(self, models: list[str]):
        documents = [self.str_to_dict(model) for model in models]
        return self._mongo_repository.add_many(documents)

    def get(self, **filter) -> str:
        document = self._mongo_repository.get(**filter)
        return self.dict_to_str(document)

    def get_list(self, **filter) -> list[str]:
        documents = self._mongo_repository.get_list(**filter)
        return [self.dict_to_str(document) for document in documents]

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

    def find(self, **filter) -> str | None:
        if not (document := self._mongo_repository.find(**filter)):
            return document
        return self.dict_to_str(document)
