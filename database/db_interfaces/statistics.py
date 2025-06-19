from typing import Literal

from sqlalchemy import bindparam, or_, select, text
from sqlalchemy.orm import joinedload, selectinload

from loguru import logger
from database.db_interface import BaseInterface


class StatisticsDBInterface(BaseInterface):
    def __init__(self, session_):
        super().__init__(session_=session_) 
        
    async def get_total_salary():
        ...

        
    async def get_products_stats(self,):
        ...
    