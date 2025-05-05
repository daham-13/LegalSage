from sqlalchemy import create_engine, ARRAY, Float, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

engine = create_engine("postgresql+psycopg2://legal_admin:daham123@db:5432/LegalSage")

# Base class for declaring models
Base = declarative_base()

# Define the table
class LegalDocument(Base):
    __tablename__ = 'legal_documents'

    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    embedding = Column(ARRAY(Float))

# Create the table in the database
Base.metadata.create_all(engine)
