import requests

url = "http://127.0.0.1:5000/predict"

data = {
    "crop": "Wheat",
    "location": "Delhi",
    "soil_type": "Loamy",
    "temperature": 30,
    "season": "Rabi",
    "irrigation": "Canal",
    "yield": 2.5,
    "year": 2026
}

response = requests.post(url, json=data)

# 💥 Add this
print("✅ Response from API:")
print(response.status_code)
print(response.json())
