import uuid
from sqlalchemy import Column, String, Float, Integer, ForeignKey
from sqlalchemy.dialects.mssql import UNIQUEIDENTIFIER
from sqlalchemy.orm import relationship
from database import Base


class User(Base):# ספק ובעל מכולת
    __tablename__ = 'Users'

    id = Column(UNIQUEIDENTIFIER, primary_key=True, default=uuid.uuid4,unique=True)
    company_name=Column(String(100))
    user_name = Column(String(100), nullable=False,default="Supplier")
    phone = Column(String(20), nullable=False)
    password = Column(String, nullable=False)
    # רשימת הסחורות שהוא מספק
    goods = relationship("Goods", back_populates="user")#רשימת הסחורות שיש לו
    orders= relationship("Order", back_populates="user")#רשימת ההזמנות שביצעו ממנו

class Goods(Base):# סחורה
    __tablename__ = 'Goods'

    id = Column(UNIQUEIDENTIFIER, primary_key=True, default=uuid.uuid4,unique=True)
    name = Column(String(100), nullable=False)
    price = Column(Float)
    user_id = Column(UNIQUEIDENTIFIER, ForeignKey('Users.id'))
    min_amount=Column(Integer)
    user = relationship("User", back_populates="goods")# הספק שמספק את הסחורה 
    goods_in_orders = relationship("GoodsInOrder", back_populates="goods")# רשימת סחורות שמספק

class GoodsInOrder(Base): # מוצר בהזמנה 
    __tablename__ = 'GoodsInOrder'

    id = Column(UNIQUEIDENTIFIER, primary_key=True, default=uuid.uuid4,unique=True)
    order_id = Column(UNIQUEIDENTIFIER, ForeignKey('Orders.id'))
    goods_id = Column(UNIQUEIDENTIFIER, ForeignKey('Goods.id'))
    quantity = Column(Integer)

    order = relationship("Order", back_populates="goods_in_orders")#הזמנה שבו המוצר 
    goods = relationship("Goods", back_populates="goods_in_orders")#המוצר

class Order(Base):# הזמנה
    __tablename__ = 'Orders'

    user_id = Column(UNIQUEIDENTIFIER, ForeignKey('Users.id'))# הספק שמספק את ההזמנה
    id = Column(UNIQUEIDENTIFIER, primary_key=True, default=uuid.uuid4,unique=True)
    status=Column(String(20),nullable=False)

    goods_in_orders = relationship("GoodsInOrder", back_populates="order")# רשימת מוצרים בהזמנה
    user = relationship("User", back_populates="orders")# מספק ההזמנה


