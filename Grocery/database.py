import pyodbc
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from typing import Generator

connection_string = (
  "Driver={ODBC Driver 17 for SQL Server};"
  "Server=HPG1023;"
  "Database=Grocery;"
  "UID=1;"
  "Trusted_Connection=yes;"
)

engine = create_engine(f"mssql+pyodbc:///?odbc_connect={connection_string}")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()