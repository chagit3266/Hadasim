from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from uuid import UUID
from sqlalchemy.orm import Session
import models, schemas, database

router = APIRouter(
  prefix="/orders",
  tags=["orders"]
)

@router.post('/', response_model=schemas.Order, status_code=201)
def create_order(request: schemas.OrderIn,
               db: Session = Depends(database.get_db)):
   db_item = models.Order()
   db_item.user_id=request.user_id
   db_item.status=request.status
   db.add(db_item)
   db.commit()
   db.refresh(db_item) 
   if request.goods:
       for goods in request.goods:
           db_goods = models.GoodsInOrder()
           db_goods.goods_id=goods.goods_id
           db_goods.order_id=db_item.id
           db_goods.quantity=goods.quantity
           db.add(db_goods)
   db.commit() 

   return db_item

@router.put('/{id}/{status}',response_model=schemas.OrderStatus)
def change_status(id: UUID, status: str,
                  db: Session = Depends(database.get_db)):
    order = db.query(models.Order).filter(models.Order.id == id).first()
    if order:
        order.status = status
        db.commit()
        db.refresh(order)
    return order


