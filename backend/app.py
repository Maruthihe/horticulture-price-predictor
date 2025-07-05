from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
from pymongo import MongoClient
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import joblib
import pandas as pd
import bcrypt
import random
from datetime import datetime

# Load ML model
model = joblib.load("model.pkl")

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# JWT config
app.config["JWT_SECRET_KEY"] = "your-secret-key"
jwt = JWTManager(app)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["crop_price_predictor"]
users_collection = db["users"]

# Email config
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'shivadhanhegde@gmail.com'
app.config['MAIL_PASSWORD'] = 'vfsobvrupkksnopz'

mail = Mail(app)
otp_storage = {}

@app.route("/")
def home():
    return "🌾 Crop Price Prediction API is running!"

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already exists"}), 400

    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": hashed_pw
    })
    return jsonify({"message": "User registered successfully"})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        access_token = create_access_token(identity=user["username"])
        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "username": user["username"]
        })
    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user)

@app.route("/predict", methods=["POST"])
@jwt_required()
def predict():
    try:
        data = request.get_json()
        crop = data["crop"]
        location = data["location"]
        soil_type = data["soil_type"]
        temperature = float(data["temperature"])
        year = int(data["year"])

        if year <= datetime.now().year:
            return jsonify({"error": f"Year must be greater than {datetime.now().year}."}), 400

        input_df = pd.DataFrame([{
            'crops': crop,
            'location': location,
            'season': 'Kharif',
            'soil_type': soil_type,
            'irrigation': 'Canal',
            'year': year,
            'temperature': temperature,
            'yeilds': 2.5
        }])

        predicted_price = model.predict(input_df)[0]
        return jsonify({
            "predicted_price": round(predicted_price, 2),
            "unit": "₹ per 1 ton"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ Updated Price Lookup Route
@app.route("/lookup", methods=["POST"])
def lookup():
    data = request.get_json()
    crop = data.get("crop")
    location = data.get("location")

    df = pd.read_csv("E:/Fhlask/crop-price-predictor/backend/data_season.csv")
    df.columns = [col.lower() for col in df.columns]

    if "crops" not in df.columns or "location" not in df.columns:
        return jsonify({"error": "Required columns missing in dataset"}), 500

    # ✅ Make a copy to avoid SettingWithCopyWarning
    filtered_df = df[(df["crops"] == crop) & (df["location"] == location)].copy()

    if filtered_df.empty:
        return jsonify({"data": []})

    # ✅ Use .loc to safely assign
    if "price" in filtered_df.columns:
        filtered_df.loc[:, "price"] = pd.to_numeric(filtered_df["price"], errors="coerce")
    else:
        return jsonify({"error": "Price column missing"}), 500

    if "yield" in filtered_df.columns:
        filtered_df.loc[:, "yield"] = pd.to_numeric(filtered_df["yield"], errors="coerce")
    else:
        filtered_df.loc[:, "yield"] = 2.0

    # ✅ Drop rows with missing price or yield
    filtered_df.dropna(subset=["price", "yield"], inplace=True)

    def iqr_filter(column):
        Q1 = filtered_df[column].quantile(0.25)
        Q3 = filtered_df[column].quantile(0.75)
        IQR = Q3 - Q1
        return (filtered_df[column] >= Q1 - 1.5 * IQR) & (filtered_df[column] <= Q3 + 1.5 * IQR)

    filtered_df = filtered_df[iqr_filter("price") & iqr_filter("yield")]

    # Sort and take only one row per (year, season)
    if "year" in filtered_df.columns:
        filtered_df = filtered_df.sort_values(["year", "season"])
    filtered_df = filtered_df.drop_duplicates(subset=["year", "season"])

    result = []
    for _, row in filtered_df.iterrows():
        est_price = row["price"] * row["yield"] * 5
        result.append({
            "year": int(row.get("year", 0)),
            "season": row.get("season", "-"),
            "price": f"₹ {int(row['price']):,}",
            "yield": f"{int(row['yield']):,}",
            "estimated_price": f"₹ {int(est_price):,}"
        })

    return jsonify({"data": result})



@app.route("/send-otp", methods=["POST"])
def send_otp():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email required"}), 400

    if not users_collection.find_one({"email": email}):
        return jsonify({"error": "User does not exist"}), 404

    otp = str(random.randint(1000, 9999))
    otp_storage[email] = otp

    try:
        msg = Message("Your OTP Code", sender=app.config['MAIL_USERNAME'], recipients=[email])
        msg.body = f"Your OTP is: {otp}"
        mail.send(msg)
        return jsonify({"message": "OTP sent successfully"})
    except Exception as e:
        return jsonify({"error": f"Failed to send OTP: {str(e)}"}), 500

@app.route("/verify-otp", methods=["POST"])
def verify_otp():
    data = request.get_json()
    email = data.get("email")
    entered_otp = data.get("otp")

    if not email or not entered_otp:
        return jsonify({"error": "Email and OTP required"}), 400

    correct_otp = otp_storage.get(email)
    if correct_otp and entered_otp == correct_otp:
        return jsonify({"message": "OTP verified"})
    return jsonify({"error": "Invalid OTP"}), 400

@app.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json()
    email = data.get("email")
    new_password = data.get("password")

    if not email or not new_password:
        return jsonify({"error": "Email and password required"}), 400

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"error": "User not found"}), 404

    hashed_pw = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt())
    users_collection.update_one({"email": email}, {"$set": {"password": hashed_pw}})
    otp_storage.pop(email, None)

    return jsonify({"message": "Password updated successfully"})

# ---------------- RUN APP ----------------
if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
