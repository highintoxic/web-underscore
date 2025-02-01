from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class QueryInput(BaseModel):
    question: str
    session_id: Optional[str] = None
    model: str = "mistral-7b-instruct-v0.1.Q4_K_M.gguf"  # Updated default model

class QueryResponse(BaseModel):
    answer: str
    session_id: str
    model: str

class DocumentInfo(BaseModel):
    file_id: str  # Changed from previous 'file_id' field
    filename: str
    upload_timestamp: datetime

class DeleteFileRequest(BaseModel):
    file_id: str
