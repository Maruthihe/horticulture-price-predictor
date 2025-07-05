from flask import Blueprint, request, jsonify
from models.user_model import users_collection
import bcrypt

auth_bp = Blueprint("auth", __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if users_collection.find_one({'email': data['email']}):
        return jsonify({'message': 'Email already registered'}), 400

    hashed_pw = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    users_collection.insert_one({
        'name': data['name'],
        'email': data['email'],
        'password': hashed_pw
    })
    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = users_collection.find_one({'email': data['email']})
    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
        return jsonify({'message': 'Login successful', 'user': {'name': user['name'], 'email': user['email']}})
    return jsonify({'message': 'Invalid credentials'}), 401
