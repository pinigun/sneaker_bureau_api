import os


DB_URL = os.getenv("DB_URL", "postgresql+asyncpg://user:1029384756@localhost:5432/sneaker_bureau")