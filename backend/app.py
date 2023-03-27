from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
from bs4 import BeautifulSoup

from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class SummaryRequest(BaseModel):
    text: str

'''openai.ChatCompletion.create(
  model="gpt-3.5-turbo-0301",
  messages=[
        {"role": "user", "content": "Who won the world series in 2020?"}]
)'''


@app.post("/summary")
async def summarize(request: SummaryRequest):
    soup = BeautifulSoup(request.text, 'html.parser')
    text = soup.get_text()
    content = f'A partir do pedido principal do texto a seguir, descreva em 128 caracteres um cenario ou um personagem em ingles. Ignore nomes proprios!\n\n{text}'
    #print(content)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0301",
        messages=[
                {"role": "user", "content": content}])
    summary = response.choices[0].message.content.strip()
    print(f'summary: {summary}')

    try:
        image_response = openai.Image.create(
            prompt=summary,
            size="512x512"
        )
        print(image_response)
        image_url = image_response['data'][0]['url']
    except Exception as e:
        print("Exception message:", str(e))
        image_url = "https://via.placeholder.com/512x512.png?text=Image+Not+Available"
        return {"image_url": image_url}    
    return {"image_url": image_url}    