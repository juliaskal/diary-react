class DuplicateDatabaseError(Exception):

    def __init__(self):
        self.message = "An object with this id already exists"

    def __str__(self):
        return self.message
