from datetime import date
from typing import Literal
from fastapi import APIRouter, Form, Query, UploadFile

from admin.v1.routers.products.schemas import Brand, BrandsData, Product, ProductsData, SizeData
from tools.extra_funcs import ExtraTools
from .tools.products import ProductsTools


router = APIRouter(
    prefix='/products',
)


@router.get("/", tags=["Products"])
async def get_products(
    page:               int = Query(1, gt=0),
    per_page:           int = Query(10, gt=0),
    min_price:          float = Query(None, description="Optional filter by 'price'", gt=0),
    max_price:          float = Query(None, description="Optional filter by 'price'", gt=0),
    product_type:       Literal['ACS', 'SHOES', 'WEAR'] = Query(None, description="Optional filter by type of product"),
) -> ProductsData:
    return await ProductsTools.get_products(
        page=page,
        per_page=per_page,
        min_price=min_price,
        max_price=max_price,
        product_type=product_type
    )

@router.post("/", tags=["Products"], deprecated=True)
async def add_product(
    photos:         list[UploadFile],
    model:          str = Form(..., description='Model name of product'),
    brand_id:       str = Form(..., description='Brand of product'),
    type_:          Literal['ACS', "SHOES", "WEAR"] = Form(..., description="Type of product"),
    sizes_data:     list[SizeData] | str = Form(..., description="Size, Ex.: size:L; size_grid: 35-36cm"),
    price:          float = Form(..., description="Price of product")
) -> Product:
    '''ПОКА НИХУЯ НЕ РЕДИ'''
    return await ProductsTools.add_product(
        
    )
        
@router.get("/brands/", tags=["Brands"])
async def get_brands(
    page: int = Query(1, gt=0),
    per_page: int = Query(10, gt=0)
) -> BrandsData:
    return await ProductsTools.get_brands(
        page=page,
        per_page=per_page
    )
    
    
    
@router.post("/brands/", tags=["Brands"])
async def add_brand(
    brand_name: str
) -> Brand:
    return await ProductsTools.add_brand(
        brand_name=brand_name
    )
    
    