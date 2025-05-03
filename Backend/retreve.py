from sqlalchemy import create_engine, text
from sentence_transformers import SentenceTransformer
import numpy as np
from models import LegalDocument
from sqlalchemy.orm import sessionmaker

# Database connection
DATABASE_URL = "postgresql+psycopg2://legal_admin:daham123@localhost/LegalSage"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

model = SentenceTransformer("all-MiniLM-L6-v2")

def cosine_similarity(vec1, vec2):
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)
    if np.linalg.norm(vec1) == 0 or np.linalg.norm(vec2) == 0:
        return 0.0
    return float(np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2)))

def retrieve_relevant_documents(query, top_k=3):
    session = Session()
    query_embedding = model.encode(query).tolist()

    # Get all documents and compute similarity
    results = []
    documents = session.query(LegalDocument).all()
    for doc in documents:
        if doc.embedding:
            similarity = cosine_similarity(query_embedding, doc.embedding)
            results.append((similarity, doc.title, doc.content))

    results.sort(reverse=True, key=lambda x: x[0])
    top_results = results[:top_k]
    
    session.close()
    return top_results
