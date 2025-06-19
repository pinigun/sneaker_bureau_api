import asyncio

from config import DB_URL

from .db_interface import BaseInterface
from .db_interfaces.products import ProductsDBInterface
from .db_interfaces.statistics import StatisticsDBInterface


class DBInterface(BaseInterface):
    def __init__(self, db_url: str):
        super().__init__(db_url)
        # self.admins = AdminsDBInterface(session_=self.async_ses)
        self.statistics = StatisticsDBInterface(session_=self.async_ses)
        self.products = ProductsDBInterface(session_=self.async_ses)
    
    
db = DBInterface(DB_URL)


async def main():
    await db.init()


if __name__ == '__main__':
    asyncio.run(main())
