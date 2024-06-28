from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import crud, models, schemas
from database import SessionLocal, engine


models.Base.metadata.create_all(bind=engine)

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

models.Base.metadata.create_all(bind=engine)


@app.get('/')
def test():
    return {"hello world"}

# Read All
@app.get("/items", response_model=list[schemas.Item])
def read_items(db: Session = Depends(get_db)):
    items = crud.get_items(db)
    return items

# Read One
@app.get('/items/{id}', response_model=schemas.Item)
def read_item(id: int, db: Session = Depends(get_db)):
    db_item = crud.get_item(db, id=id)
    return db_item

# Create
@app.post("/items", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return crud.create_item(db=db, item=item)

# Update
@app.put("/update/{id}", response_model=schemas.Item)
def update_item(id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return crud.update_item(db=db, id=id, item=item)

# Delete
@app.delete("/items/{id}", response_model=schemas.Item)
def delete_item(id: int, db: Session = Depends(get_db)):
    db_item = crud.delete_item(db=db, id=id)
    return db_item