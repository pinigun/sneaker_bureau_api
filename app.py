import os

import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from admin import v1_router
from database import db
 
from loguru import logger
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Действия при запуске приложения
    logger.info("Запуск приложения")
    
    # await db.init()

    yield  # здесь запускается само приложение

    # Действия при завершении приложения
    logger.info("Завершение приложения")


app = FastAPI(lifespan=lifespan)
api = FastAPI()

api.include_router(v1_router)
app.mount('/admin_panel', api, "API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Authorization"]
)
os.makedirs('static', exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

if __name__ == '__main__':
    uvicorn.run(app)
