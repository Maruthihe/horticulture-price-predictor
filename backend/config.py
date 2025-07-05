import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
DATABASE_NAME = "crop_price_db"
SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")
