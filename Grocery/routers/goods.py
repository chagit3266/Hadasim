from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from uuid import UUID
from sqlalchemy.orm import Session
import models, schemas, database

router = APIRouter(
  prefix="/goods",
  tags=["goods"]
)

@router.get('/{user_id}', response_model=List[schemas.Goods])
def get_goods_by_user(user_id: UUID,
                      db: Session = Depends(database.get_db)):
    goods = db.query(models.Goods).filter(models.Goods.user_id == user_id).all()
    return goods

@router.get('/',response_model=List[schemas.Goods])
def get_all_goods(db: Session = Depends(database.get_db)
                  ):
   goods = db.query(models.Goods).all()
   return goods

# @router.post('/',response_model=schemas.Goods,status_code=201)
# def create_goods(request: schemas.Goods,
#                  db: Session = Depends(database.get_db)):
#    db_item=models.Goods()
#    db_item.name=request.name
#    db_item.price=request.price
#    db_item.user_id=request.user_id
#    db_item.min_amount=request.min_amount

#    db.add(db_item)
#    db.commit()
#    db.refresh(db_item)
 
#    return db_item
