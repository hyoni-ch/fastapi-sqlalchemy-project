from sqlalchemy import Column, Integer, String

from database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True)
    date = Column(String)
    title = Column(String, index=True)
    upMoney = Column(Integer, default=0, nullable=True)
    downMoney = Column(Integer, default=0, nullable=True)