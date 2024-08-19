"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/users', methods=['GET'])
def handle_users():
    users_query = User.query.all()
    all_users = list(map(lambda x: x.serialize(), users_query))
    return jsonify(all_users), 200

@api.route("/current-user", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user_query = User.query.get(current_user_id)

    if not user_query:
        return jsonify({"msg": "User not found"}), 404

    return jsonify(current_user=user_query.serialize()), 200

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    api.run(host='0.0.0.0', port=PORT, debug=False)

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None or password is None:
        return jsonify({"msg": "Bad username or password"}), 401

    user_query = User.query.filter_by(email=email).first()

    if not user_query or user_query.password != password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user_query.id)
    return jsonify(access_token=access_token), 200

@api.route('/user', methods=['POST'])
def crear_usuario():
    datos = request.get_json()

    if 'userName' not in datos or 'email' not in datos or 'password' not in datos:
        return jsonify({'mensaje': 'Faltan datos requeridos'}), 400

    userName = datos['userName']
    email = datos['email']
    password = datos['password']

    if User.query.filter_by(userName=userName).first() is not None:
        return jsonify({'mensaje': 'El nombre de usuario ya está en uso'}), 409
    if User.query.filter_by(email=email).first() is not None:
        return jsonify({'mensaje': 'El email ya está en uso'}), 409

    nuevo_usuario = User(
        userName=userName,
        email=email,
        password=password  
    )
    try:
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify({'mensaje': 'Usuario creado con éxito', 'usuario': nuevo_usuario.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'mensaje': 'Error al crear el usuario', 'error': str(e)}), 500
