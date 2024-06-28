from pydantic import BaseModel


class ItemBase(BaseModel):
    date: str
    title: str
    upMoney: int = 0
    downMoney: int = 0


class ItemCreate(ItemBase):
    pass



class Item(ItemBase):
    id: int

    class Config:
        from_attribute = True
