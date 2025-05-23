from pydantic import BaseModel
from typing import Optional,List
from uuid import UUID


class Goods(BaseModel):
    id:Optional[UUID]
    name: str
    price: float
    min_amount: int
    user_id:Optional[UUID]

    class Config:
       from_attributes = True

class User(BaseModel):
    user_name:Optional[str]
    phone:str
    class Config:
       from_attributes = True

class UserSignup(User):
    company_name:Optional[str]
    password: str
    goods: Optional[List[Goods]]
    class Config:
       from_attributes = True

class UserSignin(BaseModel):
    password: str
    phone:str

    class Config:
       from_attributes = True

class UserOut(User):# ע"מ להוציא פלט רשימת ספקים
   id: UUID
   company_name:Optional[str]
   class Config:
       from_attributes = True

class GoodsInOrder(BaseModel):
    goods_id: UUID
    quantity: int

    class Config:
        from_attributes = True

class Order(BaseModel):
    status:str
    class Config:
       from_attributes = True


class OrderIn(Order):
    user_id:UUID
    goods: Optional[List[GoodsInOrder]]
    class Config:
       from_attributes = True

class OrderStatus(BaseModel):
    id:UUID
    class Config:
       from_attributes = True

class GoodsInStore(BaseModel):
    name:str
    quantity:int

    class Config:
       from_attributes = True