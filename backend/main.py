from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from dotenv import load_dotenv
import os

load_dotenv('.env')
api_key: str = os.getenv('API_KEY')
app = FastAPI()

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/address/{address}')
def get_details(address: str):
    api_url = f"https://api.etherscan.io/api?module=account&action=balance&address={address}&tag=latest&apikey={api_key}"
    response = requests.get(api_url).json()
    return response

@app.get('/value/')
def get_value():
    api_url = f"https://api.etherscan.io/api?module=stats&action=ethprice&apikey={api_key}"
    response = requests.get(api_url).json()
    return response

