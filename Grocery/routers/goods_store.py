from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from uuid import UUID
from sqlalchemy.orm import Session
import models, schemas, database

router = APIRouter(
  prefix="/goods_store",
  tags=["goods_store"]
)

@router.put('/{name}/{quantity}',response_model=schemas.GoodsInStore, status_code=204)
def update_goods_in_store(request: List[schemas.GoodsInStore],
       db: Session = Depends(database.get_db)):
    products_to_order = []

    for goods in request:
        goods_in_store = db.query(models.GoodsInStore).filter(models.GoodsInStore.name == goods.name).first()
        if goods_in_store:
           goods_in_store.quantity-=goods.quantity
           if goods_in_store.quantity<goods_in_store.min_amount:
             products_to_order.append(goods_in_store.name)
    db.commit()
    return products_to_order #מחזירים רשימת מוצרים שצריך להזמין
