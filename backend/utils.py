import json
from typing import Any, Callable
from functools import wraps
from bson.objectid import ObjectId


def read_json(file_path: str, encoding: str = "utf-8") -> dict:
    with open(file_path, "r", encoding=encoding) as file:
        return json.load(file)


def safe_dict(dictionary) -> dict:
    if dictionary is None:
        return {}
    return dictionary


def rename_dict_keys(dictionary: dict, **kwargs):
    return {kwargs.get(key, key): value for key, value in dictionary.items()}


def rename_arguments(**arguments_to_rename):
    def rename_argument_inner(mongo_db_function):
        @wraps(mongo_db_function)
        def wrapper(*args, **kwargs):
            for old_name, new_name in arguments_to_rename.items():
                if old_name in kwargs:
                    kwargs[new_name] = ObjectId(kwargs.pop(old_name))
            return mongo_db_function(*args, **kwargs)
        return wrapper
    return rename_argument_inner


def cast_dict_value(dictionary: dict, key: Any, type: Callable = str):
    return dictionary | {key: type(dictionary[key])}
