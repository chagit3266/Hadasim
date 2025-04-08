import uvicorn
from fastapi import FastAPI
from database import engine
from fastapi.middleware.cors import CORSMiddleware
from routers import goods,users,orders

import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)
app.include_router(users.router)
app.include_router(goods.router)
app.include_router(orders.router)

if __name__ == '__main__':
  uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True, access_log=False)