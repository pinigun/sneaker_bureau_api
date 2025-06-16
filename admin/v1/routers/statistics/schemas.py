from pydantic import BaseModel


class StatisticssData(BaseModel):
    total_items:    int
    total_pages:    int
    per_page:       int
    current_page:   int
    
    total_salary:   float
    
    items:          list[User]