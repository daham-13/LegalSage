from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import LegalDocument, Base
from extractor import extract_and_clean
import os
import numpy as np
from sentence_transformers import SentenceTransformer

# Load the embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Set up connection
DATABASE_URL = ""
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

def insert_document(file_path):
    try:
        title = os.path.basename(file_path)
        content = extract_and_clean(file_path)

        if not content:
            print(f"⚠️ No content extracted from: {file_path}")
            return

        # Generate embedding
        embedding = model.encode(content).astype(np.float32).tolist()

        # Create and add document
        doc = LegalDocument(title=title, content=content, embedding=embedding)
        session.add(doc)
        session.commit()
        print(f"✅ Inserted '{title}' into database with embedding.")

    except Exception as e:
        session.rollback()
        print(f"❌ Failed to insert '{file_path}': {e}")

    finally:
        session.close()

def delete_document_by_title(title: str):
    session = Session()
    try:
        doc = session.query(LegalDocument).filter_by(title=title).first()
        if doc:
            session.delete(doc)
            session.commit()
            print(f"✅ Deleted document: {title}")
            return True
        else:
            print(f"⚠️ Document not found: {title}")
            return False
    except Exception as e:
        session.rollback()
        print(f"❌ Error deleting document: {e}")
        return False
    finally:
        session.close()