# Build prompt
from langchain.vectorstores import VectorStore

from langchain.chat_models import ChatOpenAI
from dotenv import load_dotenv
from langchain.memory.chat_message_histories import DynamoDBChatMessageHistory


load_dotenv()  # Load environment variables from .env file


llm_name = "gpt-3.5-turbo"
llm = chatModel = ChatOpenAI(
    temperature=0,
    streaming=True,
    verbose=True,
    model_name=llm_name,
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

# memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)


from langchain.chains import ConversationalRetrievalChain

#TODO fix qustion generation issue. 
# https://github.com/langchain-ai/langchain/discussions/5981
def getQaChain(vectordb: VectorStore, sid: str) -> ConversationalRetrievalChain:
    chat_history = DynamoDBChatMessageHistory(
        table_name="SessionTable",
        session_id=sid,
    )
    # TODO: limit the number of items in memory.
    memoryDB = ConversationBufferMemory(
        return_messages=True,
        memory_key="chat_history",
        # return_messages = True,
        chat_memory=chat_history,
    )
    qa = ConversationalRetrievalChain.from_llm(
        llm, retriever=vectordb.as_retriever(), memory=memoryDB, verbose=True
    )
    return qa
