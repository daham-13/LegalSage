from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException
import shutil
import os
import uvicorn
from insert import insert_document, delete_document_by_title 
from fastapi.middleware.cors import CORSMiddleware
from retrieve import retrieve_all_documents, retrieve_relevant_documents
from pydantic import BaseModel
from connectAPI import genarate_response



# Create the FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    question: str

# Create upload directory
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Create the router
router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Save file temporarily
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Call your insert logic
        insert_document(file_path)

        return {"message": f"'{file.filename}' uploaded and processed successfully."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/documents")
def get_all_documents():
    return retrieve_all_documents()

@app.delete("/delete/{title}")
def delete_document(title: str):
    success = delete_document_by_title(title)
    if success:
        return {"message": f"Document '{title}' deleted successfully."}
    else:
        raise HTTPException(status_code=404, detail="Document not found")

@app.post("/ask")
def ask_question(payload: QuestionRequest):
    try:
        docs = retrieve_relevant_documents(payload.question)
        answer = genarate_response(docs, payload.question)
        return {"answer": answer}
    except Exception as e:
        return {"error": str(e)}

# Include the router in the app
app.include_router(router)

# Run the application with the correct filename
if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)