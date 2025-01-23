from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
import ollama
from fastapi.middleware.cors import CORSMiddleware
import json
import asyncio

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class ChatRequest(BaseModel):
    user_input: str

# In-memory chat history
chat_history = [{"role": "assistant", "content": "How can I help you?"}]

async def generate_streamed_response():
    global chat_history
    response = ollama.chat(model='WDOC', stream=True, messages=chat_history)
    full_message = ""
    for partial_resp in response:
        content = partial_resp["message"]["content"]
        full_message += content
        yield json.dumps({"text": content}) + "\n"
        await asyncio.sleep(0.1)

    # Store assistant response in history
    chat_history.append({"role": "assistant", "content": full_message})

@app.post("/chat")
async def chat(request: ChatRequest):
    global chat_history
    chat_history.append({"role": "user", "content": request.user_input})

    return StreamingResponse(generate_streamed_response(), media_type="application/json")
