from fastapi import APIRouter
from .routers.statistics.routes import router as statistic_router
from .routers.products.routes import router as products_router


v1_router = APIRouter(prefix="/v1")

v1_router.include_router(products_router)
v1_router.include_router(statistic_router)