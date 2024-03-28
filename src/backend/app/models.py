from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class Layout(db.Model):
    __tablename__ = 'Layout'
    id = Column(Integer, primary_key=True)
    nome_layout = Column(Text, nullable=False)
    
class Compartment(db.Model):
    __tablename__ = 'Compartment'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nome_item = Column(Text, nullable=False)
    quantidade_item = Column(Integer, nullable=False)
    numero_compartimento = Column(Integer, nullable=False)
    id_layout = Column(Integer, ForeignKey('Layout.id'), nullable=False)
    id_item = Column(Integer, nullable=False)
    layout = relationship("Layout")