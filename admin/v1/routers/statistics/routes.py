from datetime import date
from fastapi import APIRouter, Query

from tools.extra_funcs import ExtraTools
from .tools.statistics import StatisticsTools


router = APIRouter(
    prefix='/statistics',
    tags=['Statistics']
)


@router.get('/', deprecated=True)
async def get_general_statistics(
    start_date: date = Query(default_factory=ExtraTools.get_monday, description='Format: YYYY-MM-DD; Example: 2025-05-01'),
    end_date:   date = Query(default_factory=ExtraTools.get_saturday, description='Format: YYYY-MM-DD; Example: 2025-05-07')
):
    '''ПОКА НИХУЯ НЕ РЕДИ'''
    return await StatisticsTools.get_general_stats()

@router.get('/products', deprecated=True)
async def get_products_statistics(
    page:       int = Query(1, gt=0),
    per_page:   int = Query(10, gt=0),
    start_date: date = Query(default_factory=ExtraTools.get_monday, description='Format: YYYY-MM-DD; Example: 2025-05-01'),
    end_date:   date = Query(default_factory=ExtraTools.get_saturday, description='Format: YYYY-MM-DD; Example: 2025-05-07')
):
    '''ПОКА НИХУЯ НЕ РЕДИ'''
    return await StatisticsTools.get_products_statistics(page, per_page)

