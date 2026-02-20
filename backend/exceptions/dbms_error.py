class DBMSError(Exception):

    def __init__(self):
        self.message = "Invalid database management system specified"

    def __str__(self):
        return self.message
