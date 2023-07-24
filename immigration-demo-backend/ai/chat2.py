# Build prompt
from langchain.vectorstores import VectorStore

from langchain.chat_models import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file


llm_name = "gpt-3.5-turbo"
llm = chatModel = ChatOpenAI(
    temperature=0,
    streaming=True,
    verbose=True,
    model_name = llm_name,
)

from langchain.prompts import PromptTemplate

template = """Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. Use three sentences maximum. Keep the answer as concise as possible. Always say "thanks for asking!" at the end of the answer. 
{context}
Question: {question}
Helpful Answer:"""
QA_CHAIN_PROMPT = PromptTemplate(
    input_variables=["context", "question"],
    template=template,
)

from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)


from langchain.chains import ConversationalRetrievalChain



def getQaChain(vectordb: VectorStore) -> ConversationalRetrievalChain:
    qa = ConversationalRetrievalChain.from_llm(
        llm, retriever=vectordb.as_retriever(), memory=memory, verbose=True
    )
    return qa
