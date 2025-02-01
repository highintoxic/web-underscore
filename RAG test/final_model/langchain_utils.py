import logging
import os
from pathlib import Path
logging.basicConfig(level=logging.INFO)

from ctransformers import AutoModelForCausalLM
from langchain.llms import CTransformers
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from typing import List
from langchain_core.documents import Document
from final_model.chroma_utils import vectorstore
from pydantic import BaseModel

# Initialize the language model
def get_llm(model_name=None):
    model_path = Path(r"D:\Web_\RAG test\model\mistral-7b-instruct-v0.1.Q4_K_M.gguf")
    
    if not model_path.exists():
        logging.error(f"Model not found at: {model_path}")
        raise FileNotFoundError(f"Model file not found at: {model_path}")
    
    logging.info("Initializing LLM with optimized parameters...")
    try:
        return CTransformers(
            model=str(model_path),
            model_type="mistral",
            config={
                'max_new_tokens': 1024,  # Reduced for faster response
                'temperature': 0.7,
                'context_length': 2048,   # Reduced context window
                'gpu_layers': 0,
                'threads': 8,             # Increased threads
                'batch_size': 8,          # Added batch size
                'top_k': 40,              # Added top_k parameter
                'top_p': 0.95,            # Added top_p parameter
            }
        )
    except Exception as e:
        logging.error(f"Error initializing Mistral model: {str(e)}")
        raise RuntimeError(f"Failed to initialize model: {str(e)}")

# Ensure vectorstore is properly initialized
if vectorstore is None:
    logging.error("vectorstore is not initialized properly")
    raise ValueError("vectorstore is not initialized properly")
else:
    logging.info("vectorstore initialized successfully")

# Update retriever configuration - remove unsupported parameters
retriever = vectorstore.as_retriever(
    search_type="similarity",  # Use similarity search
    search_kwargs={"k": 3}     # Get top 3 most relevant chunks
)
logging.info("retriever initialized successfully")

output_parser = StrOutputParser()

#setting up prompts
contextualize_q_system_prompt = """You are a helpful AI assistant. Your goal is to:
1. If the question relates to the available documents, use that information to provide accurate answers
2. If the question is general or outside the document scope, respond naturally as an AI assistant
3. Always maintain a helpful and conversational tone
4. Be honest about when you're using document information versus general knowledge
"""

contextualize_q_prompt = ChatPromptTemplate.from_messages([
    ("system", contextualize_q_system_prompt),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])

qa_prompt = ChatPromptTemplate.from_messages([
    ("system", """You are a helpful AI assistant. Respond naturally to all questions.
    When provided with context from documents:
    - Use this information to enhance your response
    - Integrate document information seamlessly into your answers
    - If the context is relevant, prioritize it over general knowledge
    - If the context doesn't fully address the question, supplement with your general knowledge
    
    When no relevant context is available:
    - Respond naturally as an AI assistant
    - Be transparent that you're providing a general response
    
    Always maintain a conversational and helpful tone."""),
    ("system", "Context from documents (if available): {context}"),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}")
])

#creating the rag chain
def get_rag_chain(model=None):
    try:
        logging.info("Starting RAG chain initialization...")
        llm = get_llm()
        logging.info("LLM loaded successfully")
        
        # Simplify retriever chain creation
        retriever_chain = create_history_aware_retriever(
            llm, 
            retriever, 
            contextualize_q_prompt
        )
        logging.info("Retriever chain created")
        
        # Update response chain with simplified config
        response_chain = create_stuff_documents_chain(
            llm=llm,
            prompt=qa_prompt,
            document_variable_name="context",
        )
        logging.info("Response chain created")
        
        # Create final chain with minimal configuration
        chain = create_retrieval_chain(
            retriever=retriever_chain,
            combine_docs_chain=response_chain
        )
        logging.info("RAG chain creation complete")
        
        return chain

    except Exception as e:
        logging.error(f"Error creating RAG chain: {str(e)}")
        raise

