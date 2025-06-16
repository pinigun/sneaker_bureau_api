from dataclasses import dataclass


@dataclass
class CustomDBExceptions(Exception):
    message: str
