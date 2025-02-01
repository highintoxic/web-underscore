import sys
import os
from fastapi import FastAPI, File, UploadFile, HTTPException, BackgroundTasks
from contextlib import asynccontextmanager
import asyncio
import signal
from typing import List

# Add the parent directory of final_model to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Ensure this import is correct
from pydantic import BaseModel

# Adjust the import path if necessary
from final_model.pydantic_models import QueryInput, QueryResponse, DocumentInfo, DeleteFileRequest
from final_model.chroma_utils import index_document_to_chroma, delete_doc_from_chroma, vectorstore
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO)

# Ensure vectorstore is properly initialized
if vectorstore is None:
    logging.error("vectorstore is not initialized properly")
    raise ValueError("vectorstore is not initialized properly")
else:
    logging.info("vectorstore initialized successfully")

from final_model.langchain_utils import get_rag_chain
from final_model.db_utils import insert_application_logs, get_chat_history, get_all_documents, insert_document_record, delete_document_record
import uuid
import shutil

if __name__ == "__main__":
    print(f"Using Python executable at: {sys.executable}")
    print(f"Current working directory: {os.getcwd()}")
    print(f"PYTHONPATH: {sys.path}")
    if not os.path.exists(sys.executable):
        raise RuntimeError(f"No Python at '{sys.executable}'")

# Set up logging
logging.basicConfig(filename='app.log', level=logging.INFO)

class AppState:
    """Global application state"""
    is_shutting_down = False

app_state = AppState()

# Define cleanup handlers
async def shutdown_handler():
    """Handle graceful shutdown of resources"""
    try:
        # Give ongoing requests time to complete
        await asyncio.sleep(2)
        # Add any cleanup code here
        
        # Close any database connections
        if 'vectorstore' in globals():
            logging.info("Closing vectorstore connection...")
            try:
                vectorstore._client.close()
            except Exception as e:
                logging.error(f"Error closing vectorstore: {e}")
    except Exception as e:
        logging.error(f"Error during shutdown: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle manager for the FastAPI application"""
    # Startup
    logging.info("Starting up application...")
    try:
        # Initialize resources here
        yield
    finally:
        # Shutdown
        app_state.is_shutting_down = True
        logging.info("Shutting down application...")
        try:
            await asyncio.shield(shutdown_handler())
        except asyncio.CancelledError:
            logging.info("Shutdown was cancelled, completing cleanup...")
        logging.info("Shutdown complete")

# Initialize FastAPI app with lifespan
app = FastAPI(lifespan=lifespan)

# Add signal handlers
def handle_sigterm(*args):
    """Handle SIGTERM signal"""
    logging.info("Received SIGTERM signal")
    raise KeyboardInterrupt()

signal.signal(signal.SIGTERM, handle_sigterm)

#chat endpoint
@app.post("/chat", response_model=QueryResponse)
async def chat(query_input: QueryInput, background_tasks: BackgroundTasks):
    try:
        session_id = query_input.session_id or str(uuid.uuid4())
        logging.info(f"Processing query: {query_input.question[:50]}...")

        logging.info("Fetching chat history...")
        chat_history = get_chat_history(session_id)
        
        logging.info("Initializing RAG chain...")
        try:
            rag_chain = get_rag_chain()  # No model parameter needed
        except FileNotFoundError as e:
            logging.error(f"Model not found: {str(e)}")
            raise HTTPException(status_code=500, detail="GPT4All model file not found. Please check model configuration.")
        except Exception as e:
            logging.error(f"Error loading model: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error loading language model: {str(e)}")

        logging.info("Executing chain...")
        try:
            answer = await asyncio.to_thread(
                lambda: rag_chain.invoke({
                    "input": query_input.question,
                    "chat_history": chat_history
                })['answer']
            )
            logging.info("Chain execution complete")
            
        except asyncio.CancelledError:
            logging.warning("Request was cancelled")
            raise HTTPException(status_code=499, detail="Request cancelled")
        except Exception as e:
            logging.error(f"Chain execution error: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))

        # Log the interaction in the background
        background_tasks.add_task(
            insert_application_logs,
            session_id,
            query_input.question,
            answer,
            query_input.model
        )

        return QueryResponse(
            answer=answer,
            session_id=session_id,
            model=query_input.model
        )

    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Unexpected error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

#document upload endpoint
@app.post("/upload-doc")
async def upload_and_index_document(file: UploadFile = File(...)):
    allowed_extensions = ['.pdf', '.docx', '.html']
    file_extension = os.path.splitext(file.filename)[1].lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(status_code=400, detail=f"Unsupported file type. Allowed types are: {', '.join(allowed_extensions)}")

    temp_file_path = f"temp_{file.filename}"

    try:
        # Save the uploaded file to a temporary file
        with open(temp_file_path, "wb") as buffer:
            while content := await file.read(8192):  # Read in 8KB chunks
                buffer.write(content)

        file_id = insert_document_record(file.filename)
        success = index_document_to_chroma(temp_file_path, file_id)

        if success:
            return {"message": f"File {file.filename} has been successfully uploaded and indexed.", "file_id": file_id}
        else:
            delete_document_record(file_id)
            raise HTTPException(status_code=500, detail=f"Failed to index {file.filename}.")
    except Exception as e:
        logging.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

#list documents endpoint
@app.get("/list-docs", response_model=list[DocumentInfo])
def list_documents():
    return get_all_documents()

#delete document endpoint
@app.post("/delete-doc")
def delete_document(request: DeleteFileRequest):
    chroma_delete_success = delete_doc_from_chroma(request.file_id)

    if chroma_delete_success:
        db_delete_success = delete_document_record(request.file_id)
        if db_delete_success:
            return {"message": f"Successfully deleted document with file_id {request.file_id} from the system."}
        else:
            return {"error": f"Deleted from Chroma but failed to delete document with file_id {request.file_id} from the database."}
    else:
        return {"error": f"Failed to delete document with file_id {request.file_id} from Chroma."}

if __name__ == "__main__":
    import uvicorn
    config = uvicorn.Config(
        "final_model.main:app",
        host="0.0.0.0",
        port=8000,
        reload=False,  # Disable reload for production
        loop="asyncio",
        timeout_keep_alive=60,
        access_log=True,
        log_level="info",
        workers=1  # Set to 1 for development
    )
    
    try:
        server = uvicorn.Server(config)
        server.run()
    except KeyboardInterrupt:
        logging.info("Received keyboard interrupt, initiating graceful shutdown...")
    except Exception as e:
        logging.error(f"Server error: {e}")
    finally:
        logging.info("Server shutdown complete")
