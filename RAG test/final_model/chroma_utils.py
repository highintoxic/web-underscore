import logging

# Initialize logging
logging.basicConfig(level=logging.INFO)

from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader, UnstructuredHTMLLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from typing import List
from langchain_core.documents import Document
import os

# Initialize the embedding function
embedding_function = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Initialize Chroma with the embedding function
vectorstore = Chroma(persist_directory="./chroma_db", embedding_function=embedding_function)

# Initialize text splitter and embedding function
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=300, length_function=len)

# Ensure vectorstore is properly initialized
if vectorstore is None:
    logging.error("Failed to initialize vectorstore")
    raise ValueError("Failed to initialize vectorstore")
else:
    logging.info("vectorstore initialized successfully")

#document loading and splitting
def load_and_split_document(file_path: str) -> List[Document]:
    logging.info(f"Loading and splitting document: {file_path}")
    if file_path.endswith('.pdf'):
        loader = PyPDFLoader(file_path)
    elif file_path.endswith('.docx'):
        loader = Docx2txtLoader(file_path)
    elif file_path.endswith('.html'):
        loader = UnstructuredHTMLLoader(file_path)
    else:
        raise ValueError(f"Unsupported file type: {file_path}")

    documents = loader.load()
    return text_splitter.split_documents(documents)

#indexing documents
def index_document_to_chroma(temp_file_path, file_id):
    logging.info(f"Indexing document: {temp_file_path} with file_id: {file_id}")
    try:
        splits = load_and_split_document(temp_file_path)

        # Add metadata to each split
        for split in splits:
            split.metadata['file_id'] = file_id

        vectorstore.add_documents(splits)
        return True
    except Exception as e:
        print(f"Error indexing document: {e}")
        return False

#deleting documents
def delete_doc_from_chroma(file_id: int):
    logging.info(f"Deleting document with file_id: {file_id}")
    try:
        docs = vectorstore.get(where={"file_id": file_id})
        print(f"Found {len(docs['ids'])} document chunks for file_id {file_id}")

        vectorstore._collection.delete(where={"file_id": file_id})
        print(f"Deleted all documents with file_id {file_id}")

        return True
    except Exception as e:
        print(f"Error deleting document with file_id {file_id} from Chroma: {str(e)}")
        return False


