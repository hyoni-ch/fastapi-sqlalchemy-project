from sqlalchemy.orm import Session
import models, schemas
from sqlalchemy import func


def get_items(db: Session):
    db_items = db.query(models.Item).order_by(models.Item.date.desc(), models.Item.id.desc()).all()
    totalSum = db.query(
        func.sum(models.Item.upMoney).label('total_upMoney'),
        func.sum(models.Item.downMoney).label('total_downMoney'),
    ).one()
    return db_items

def get_item(db: Session, id: int):
    return db.query(models.Item).filter(models.Item.id == id).first()

def create_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_item(db: Session, id: int, item: schemas.ItemCreate):
    db_item = db.query(models.Item).filter(models.Item.id == id).one_or_none()
    db_item.date = item.date
    db_item.title = item.title
    db_item.upMoney = item.upMoney
    db_item.downMoney = item.downMoney
    db.add(db_item)
    db.commit()
    db.flush(db_item)
    return db_item
    

def delete_item(id: int, db: Session):
    db_item = db.query(models.Item).filter(models.Item.id == id).first()
    db.delete(db_item)
    db.commit()
    return db_item