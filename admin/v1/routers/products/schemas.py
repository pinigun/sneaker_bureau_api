from pydantic import BaseModel, ConfigDict


class Product(BaseModel):
    id:         int
    model:      str
    brand:      str
    size:       str
    size_grid:  str
    color:      str
    price:      float
    stock:      int
    photos:     list[str]
    
    model_config = ConfigDict(from_attributes=True)
    
    
class ProductsData(BaseModel):
    total_items:    int
    total_pages:    int
    per_page:       int
    current_page:   int
    
    items:          list[Product]
    

class SizeData(BaseModel):
    size: str
    size_grid: str
    

class Brand(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)

class BrandsData(BaseModel):
    total_items:    int
    total_pages:    int
    per_page:       int
    current_page:   int
    
    items:          list[Brand]