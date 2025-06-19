import math
from database import db
from ..schemas import BrandsData, Product, ProductsData, Brand


class ProductsTools:
    @classmethod
    async def delete_brand(cls, id: int):
        return await db.products.delete_brand(id)
    
    @classmethod
    async def add_brand(cls, brand_name: str):
        return await db.products.add_brand(brand_name)    
    
    @classmethod
    async def get_products(
        cls,
        page: int = 1,
        per_page: int = 10,
        **filters
    ) -> ProductsData:
        filters = {k:v for k, v in filters.items() if v is not None}
        products_count = await db.products.get_products_count(**filters)
        
        return ProductsData(
            total_items=products_count,
            total_pages=math.ceil(products_count / per_page),
            per_page=per_page,
            current_page=page,
            items=[
                Product.model_validate(product)
                for product in await db.products.get_products(
                    page=page,
                    per_page=per_page,
                    **filters
                )
            ]
        )
        
    @classmethod
    async def get_brands(
        cls,
        page: int = 1,
        per_page: int = 10,
    ) -> ProductsData:
        brands_count = await db.products.get_brands_count()
        
        return BrandsData(
            total_items=brands_count,
            total_pages=math.ceil(brands_count / per_page),
            per_page=per_page,
            current_page=page,
            items=[
                Brand.model_validate(product)
                for product in await db.products.get_brands(
                    page=page,
                    per_page=per_page
                )
            ]
        )
        