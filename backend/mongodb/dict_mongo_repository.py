from typing import Sequence
from pymongo import MongoClient
from exceptions import DuplicateDatabaseError
from utils import rename_dict_keys
from utils import cast_dict_value
from utils import rename_arguments
from utils import safe_dict


class DictMongoRepository:

    def __init__(
        self,
        connection_string: str,
        database_name: str,
        collection_name: str,
        client_kwargs: dict | None = None
    ):
        self._connection_string = connection_string
        self._database_name = database_name
        self._collection_name = collection_name

        self._client: MongoClient = MongoClient(self._connection_string, **safe_dict(client_kwargs))
        self._database = self._client.get_database(self._database_name)
        self._collection = self._database.get_collection(self._collection_name)

    def add(self, document: dict):
        if document.pop("id", None):
            raise DuplicateDatabaseError
        return self._collection.insert_one(document)

    def add_many(self, documents: Sequence[dict]):
        for document in documents:
            if document.pop("id", None):
                raise DuplicateDatabaseError
        return self._collection.insert_many(documents)

    @rename_arguments(id="_id")
    def get(self, **filter):
        document = self._collection.find_one(filter)
        if document is None:
            raise ValueError('Document not found')
        return cast_dict_value(rename_dict_keys(document, _id="id"), 'id', str)

    @rename_arguments(id="_id")
    def get_list(self, **filter):
        documents = self._collection.find(filter)
        return [cast_dict_value(rename_dict_keys(document, _id="id"), 'id', str) for document in documents]

    @rename_arguments(id="_id")
    def get_range(self, start: int, end: int, **filter):
        documents = self._collection.find(filter).skip(start).limit(end - start)
        return documents

    @rename_arguments(id="_id")
    def count(self, **filter):
        return self._collection.count_documents(filter)

    @rename_arguments(id="_id")
    def distinct(self, key: str, **filter):
        return self._collection.distinct(key, filter)

    @rename_arguments(id="_id")
    def update(self, update: dict, **filter):
        return self._collection.update_one(filter, {'$set': update})

    @rename_arguments(id="_id")
    def update_many(self, update: dict, **filter):
        return self._collection.update_many(filter, {'$set': update})

    @rename_arguments(id="_id")
    def delete(self, **filter):
        return self._collection.delete_one(filter)

    @rename_arguments(id="_id")
    def delete_many(self, **filter):
        return self._collection.delete_many(filter)

    @rename_arguments(id="_id")
    def find(self, **filter):
        document = self._collection.find_one(filter)
        if document is None:
            return None
        return cast_dict_value(rename_dict_keys(document, _id="id"), 'id', str)

    def add_to_list(self, update: dict, **filter):
        return self._collection.update_one(filter, {'$addToSet': update})

    def remove_from_list(self, update: dict, **filter):
        return self._collection.update_one(filter, {'$pull': update})
