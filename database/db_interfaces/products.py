from typing import Literal
from sqlalchemy import func, select, text
from sqlalchemy.orm import aliased
from database.db_interface import BaseInterface
from database.models import Brand, ProductImage, ProductModel, ProductVariant


class ProductsDBInterface(BaseInterface):
    def __init__(self, session_):
        super().__init__(session_=session_) 
        
    async def add_brand(self, brand_name: str):
        return await self.add_row(
            Brand,
            name=brand_name
        )
        
    async def delete_brand(self, id: str):
        return await self.delete_rows(
            Brand,
            id=id
        )
        
    async def get_brands_count(self,):
        return await self.get_rows_count(Brand)    
    
    async def get_brands(
        self,       
        page: int = 1,
        per_page: int = 10
    ):
        return await self.get_rows(
            Brand,
            offset=(page - 1) * per_page,
            limit=per_page
        )
        
    async def get_products(
        self,
        page:           int = 1,
        per_page:       int = 10,
        min_price:    float | None = None,
        max_price:    float | None = None,
        product_type:   Literal['ACS', 'SHOES', 'WEAR'] | None = None
    ): 
        async with self.async_ses() as session:
            stmt = (
                select(
                    ProductVariant.id,
                    Brand.name.label("brand"),
                    ProductModel.model,
                    ProductVariant.size,
                    ProductVariant.size_grid,
                    ProductModel.color,
                    ProductVariant.price,
                    ProductVariant.stock,
                    func.coalesce(
                        func.array_agg(ProductImage.photo_path).filter(ProductImage.photo_path.isnot(None)),
                        text("'{}'::text[]")
                    ).label("photos")
                )
                .join(ProductModel, ProductVariant.product_model_id == ProductModel.id)
                .join(Brand, ProductModel.brand_id == Brand.id)
                .outerjoin(ProductImage, ProductImage.product_model_id == ProductModel.id)
                .group_by(
                    ProductVariant.id,
                    Brand.name,
                    ProductModel.model,
                    ProductVariant.size,
                    ProductVariant.size_grid,
                    ProductModel.color,
                    ProductVariant.price,
                    ProductVariant.stock
                )
                .offset((page - 1) * per_page)
                .limit(per_page)
            )
            
            if max_price is not None:
                stmt = stmt.where(ProductVariant.price <= max_price)
                
            if min_price is not None:
                stmt = stmt.where(min_price <= ProductVariant.price)
                
            if product_type is not None:
                stmt = stmt.where(ProductModel.type == product_type)

            result = await session.execute(stmt)
        return result.all()
        
    async def get_products_count(
        self,
        min_price:    float | None = None,
        max_price:    float | None = None,
        product_type:   Literal['ACS', 'SHOES', 'WEAR'] | None = None
    ) -> int:
        async with self.async_ses() as session:
            stmt = (
                select(func.count(ProductVariant.id))
            )
            
            if max_price is not None:
                stmt = stmt.where(ProductVariant.price <= max_price)
                
            if min_price is not None:
                stmt = stmt.where(min_price <= ProductVariant.price)
                              
            if product_type is not None:
                stmt=(
                    stmt
                    .join(ProductModel, ProductVariant.product_model_id == ProductModel.id)
                    .where(ProductModel.type == product_type)
                )
            return await session.scalar(stmt)