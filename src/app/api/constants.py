from dotenv import load_dotenv
import os
load_dotenv()

SERVER_URL = os.getenv("BACKEND_SERVER_URL")
PORT = 8900
ENV = "dev"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
