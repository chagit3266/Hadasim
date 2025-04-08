from typing import List
from fastapi import APIRouter, Depends, Query
from fastapi import HTTPException
from sqlalchemy.orm import Session
import models, schemas, database
from hash import Hash
from sqlalchemy import and_
import pdb

from passlib.context import CryptContext

#  אובייקט ההצפנה
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

router = APIRouter(
  prefix="/users",
  tags=["users"]
)

@router.post('/', response_model=schemas.User, status_code=201)
def create_user(request: schemas.UserSignup,
               db: Session = Depends(database.get_db)):
   db_item = models.User()
   db_item.user_name = request.user_name
   db_item.password = Hash.get_password_hash(request.password)
   db_item.phone=request.phone
   db_item.company_name=request.company_name
   print(request.goods)
   
   db.add(db_item)
   db.commit()
   db.refresh(db_item)
   
   if request.goods:
       for goods in request.goods:
           db_goods = models.Goods()
           db_goods.name=goods.name
           db_goods.price=goods.price
           db_goods.min_amount=goods.min_amount
           db_goods.user_id=db_item.id
           db.add(db_goods)
   db.commit() 

   return db_item

@router.get('/',response_model=List[schemas.UserOut])#יציג את רשימת הספקים
def get_all_user(db: Session = Depends(database.get_db)
                 ):    
   pdb.set_trace() 
   users = db.query(models.User).filter(
    models.User.company_name != 'grocer',
    models.User.company_name != 'מכולת'
    ).all()
   if not users:
        raise HTTPException(status_code=404, detail="Users not found")    
   return users

@router.get('/{phone}/{password}',response_model=schemas.UserOut)
def login(request: schemas.UserSignin,
    db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(and_(
        models.User.phone == request.phone,
        verify_password(request.password, models.User.password)
    )).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")  
    return user
