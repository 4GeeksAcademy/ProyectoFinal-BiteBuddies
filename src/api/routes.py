"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Ingredients, Recepies, Category,RecetaPublicada
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#============================================================================
# [GET] DE USERS
#============================================================================
@api.route('/users', methods=['GET'])
def handle_users():
    users_query = User.query.all()
    all_users = list(map(lambda x: x.serialize(), users_query))
    return jsonify(all_users), 200

#============================================================================
# [POST] ruta para agregar usuario nuevo en la base de datos
#============================================================================
@api.route('/users', methods=['POST'])
def crear_usuario():
    user_data = request.get_json()
    if 'user_name' not in user_data or 'email' not in user_data or 'password' not in user_data:
        return jsonify({'msg': 'Faltan datos requeridos'}), 400
    user_name = user_data['user_name']
    name = user_data['name']
    email = user_data['email']
    password = user_data['password']

    if User.query.filter_by(user_name=user_name).first() is not None:
        return jsonify({'msg': 'El nombre de usuario ya está en uso'}), 409
    if User.query.filter_by(email=email).first() is not None:
        return jsonify({'msg': 'El email ya está en uso'}), 409

    nuevo_usuario = User(
        user_name=user_name,
        name=name,
        email=email,
        password=password
    )

    try:
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify({'msg': 'Usuario creado con éxito', 'usuario': nuevo_usuario.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': 'Error al crear el usuario', 'error': str(e)}), 500

#============================================================================
# [GET] ruta para obtener el usuario actual
#============================================================================
@api.route("/current-user", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user_query = User.query.get(current_user_id)
    
    if not user_query:
        return jsonify({"msg": "User not found"}), 404

    return jsonify(current_user=user_query.serialize()), 200

#============================================================================
# [GET] ruta para obtener TODAS LAS RECETAS
#============================================================================
@api.route('/recepies', methods=['GET'])
def handle_recepies():
    recepies_query = Recepies.query.all()
    all_recepies = list(map(lambda x: x.serialize(), recepies_query))
    return jsonify(all_recepies), 200

#============================================================================
# [GET] ruta para obtener UNA RECETA
#============================================================================
@api.route('/recepies/<int:recepy_id>', methods=['GET'])
def handle_specific_recepies(recepy_id):
    recepy_query = Recepies.query.get(recepy_id)
    if not recepy_query:
        return jsonify({"msg": "Recepy not found"}), 404
    return jsonify(recepy_query.serialize()), 200

#============================================================================
# [GET] ruta para obtener LOS INGRIDIENTES
#============================================================================
@api.route('/ingredients', methods=['GET'])
def handle_ingredients():
    ingredients_query = Ingredients.query.all()
    all_ingredients = list(map(lambda x: x.serialize(), ingredients_query))

    return jsonify(all_ingredients), 200

#============================================================================
# [GET] ruta para obtener TODAS CATEGORIAS DE COMIDA
#============================================================================
@api.route('/category', methods=['GET'])
def handle_category():
    category_query = Category.query.all()
    all_category = list(map(lambda x: x.serialize(), category_query))
    return jsonify(all_category), 200

#============================================================================
# [GET] ruta para obtener UNA CATEGORIA DE COMIDA
#============================================================================
@api.route('/category/<int:categoria_id>', methods=['GET'])
def handle_specific_category(categoria_id):
    categoria_query = Category.query.get(categoria_id)
    if not categoria_query:
        return jsonify({"msg": "categoria not found"}), 404
    return jsonify(categoria_query.serialize()), 200

#============================================================================
# # [LOGIN] ruta para obtener el usuario actual
# #============================================================================
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

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    api.run(host='0.0.0.0', port=PORT, debug=False)

#============================================================================
# [GET] ruta para obtener FAVORITOS DE USUARIO
#============================================================================
@api.route('/user/favorites', methods=['GET'])
@jwt_required()
def handle_user_favorites():
    current_user_id = get_jwt_identity()
    user_query = User.query.get(current_user_id)
    if not user_query:
        return jsonify({"msg": "User not found"}), 404
    favorites = list(map(lambda x: x.serialize(), user_query.favorite_recepies))
    return jsonify(favorites), 200
#============================================================================
# [GET] ruta para ACCEDER a las RECETAS FAVORITAS de un usuario
#============================================================================
@api.route('/user/favorites/recepies', methods=['GET'])
@jwt_required()
def get_favorite_recepies():
    current_user_id = get_jwt_identity()
    user_query = User.query.get(current_user_id)
    if not user_query:
        return jsonify({"msg": "User not found"}), 404
    
    favorite_recepies = user_query.favorite_recepies
    serialized_recepies = [recepy.serialize() for recepy in favorite_recepies]
    
    return jsonify(serialized_recepies), 200

#============================================================================
# [POST] ruta para AGREGAR RECETA FAVORITA
#============================================================================
@api.route('/favorites/recepies/<int:recepy_id>', methods=['POST'])
@jwt_required()
def handle_favorite_recepies(recepy_id):
    current_user_id = get_jwt_identity()
    recepy_query = Recepies.query.get(recepy_id)
    user_query = User.query.get(current_user_id)
    user_query.favorite_recepies.append(recepy_query)

    if not recepy_query:
        return jsonify({"msg": "Recepie not found"}), 404
    if not user_query:
        return jsonify({"msg": "User not found"}), 404
    if recepy_query in user_query.favorite_recepies:
        return jsonify({"msg": "Recepy already in favorites"})
    
    user_query.favorite_recepies.append(recepy_query)
    db.session.commit()

    return jsonify(user_query.serialize), 200
    
#============================================================================
# [DELETE] ruta para ELIMINAR RECETA FAVORITA
#============================================================================

@api.route('/favorites/recepies/<int:recepy_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite_recepies(recepy_id):
    current_user_id = get_jwt_identity()
    recepy_query = Recepies.query.get(recepy_id)
    user_query = User.query.get(current_user_id)
    user_query.favorite_recepies.remove(recepy_query)

    return jsonify(user_query.serialize()), 200

#============================================================================
# [GET] ruta para ACCEDER a los USUARIOS FAVORITOS de un usuario
#============================================================================
@api.route('/user/favorites/chefs', methods=['GET'])
@jwt_required()
def get_favorite_users():
    current_user_id = get_jwt_identity()
    user_query = User.query.get(current_user_id)
    if not user_query:
        return jsonify({"msg": "User not found"}), 404
    
    favorite_users = user_query.favorite_users
    serialized_favUsers = [recepy.serialize() for recepy in favorite_users]
    
    return jsonify(serialized_favUsers), 200

#============================================================================
# [POST] ruta para AGREGAR USUARIO FAVORITO
#============================================================================
@api.route('/favorites/users/<int:user_id>', methods=['POST'])
@jwt_required()
def handle_favorite_users(user_id):
    current_user_id = get_jwt_identity()    
    user_to_favorite = User.query.get(user_id)    
    current_user = User.query.get(current_user_id)

    if not user_to_favorite:
        return jsonify({"msg": "Usuario a agregar como favorito no encontrado"}), 404
    if not current_user:
        return jsonify({"msg": "Usuario actual no encontrado"}), 404    
    if user_to_favorite in current_user.favorite_users:
        return jsonify({"msg": "Usuario ya está en favoritos"})
    
    current_user.favorite_users.append(user_to_favorite)
    db.session.commit()
    return jsonify(current_user.serialize()), 200
#============================================================================
# [DELETE] ruta para ELIMINAR USUARIO FAVORITO
#============================================================================

@api.route('/favorites/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite_user(user_id):
    current_user_id = get_jwt_identity()
    user_query = User.query.get(current_user_id)

    if not user_query:
        return jsonify({"msg": "User not found"}), 404
    user_to_remove = User.query.get(user_id)
    if not user_to_remove:
        return jsonify({"msg": "User to remove not found"}), 404
    if user_to_remove not in user_query.favorite_users:
        return jsonify({"msg": "User not in favorites"}), 404
    
    user_query.favorite_users.remove(user_to_remove)
    db.session.commit()
    return jsonify(user_query.serialize()), 200

# Ruta usuario para agregar post
@api.route('/user/publicar_receta', methods=['POST'])
@jwt_required()
def create_post():
    current_user_id = get_jwt_identity()
    user_query = User.query.get(current_user_id)
    if not user_query:
        return jsonify({"msg": "User not found"}), 404

    data = request.json
    title = data.get('title', None)
    content = data.get('content', None)

    if not title or not content:
        return jsonify({"msg": "Title and content are required"}), 400

    new_post = RecetaPublicada(title=title, content=content, user_id=current_user_id)
    db.session.add(new_post)
    db.session.commit()

    return jsonify(new_post.serialize()), 201








# #============================================================================
# # [POST] ruta para AGREGAR INGRIDIENTES
# #============================================================================
# @api.route('/ingredients', methods=['POST'])
# def add_ingredient():
#     data = request.json
#     ingredient_name = data.get('name', None)

#     if not ingredient_name:
#         return jsonify({"msg": "Ingredient name is required"}), 400
#     existing_ingredient = Ingredients.query.filter_by(name=ingredient_name).first()
#     if existing_ingredient:
#         return jsonify({"msg": "Ingredient already exists"}), 409
#     new_ingredient = Ingredients(name=ingredient_name)
#     db.session.add(new_ingredient)
#     db.session.commit()

#     return jsonify(new_ingredient.serialize()), 201
# 

# # @api.route('/user', methods=['POST'])
# # def crear_usuario():
# #     datos = request.get_json()

# #     if 'userName' not in datos or 'email' not in datos or 'password' not in datos:
# #         return jsonify({'mensaje': 'Faltan datos requeridos'}), 400

# #     userName = datos['userName']
# #     email = datos['email']
# #     password = datos['password']

# #     if User.query.filter_by(userName=userName).first() is not None:
# #         return jsonify({'mensaje': 'El nombre de usuario ya está en uso'}), 409
# #     if User.query.filter_by(email=email).first() is not None:
# #         return jsonify({'mensaje': 'El email ya está en uso'}), 409

# #     nuevo_usuario = User(
# #         userName=userName,
# #         email=email,
# #         password=password  
# #     )
# #     try:
# #         db.session.add(nuevo_usuario)
# #         db.session.commit()
# #         return jsonify({'mensaje': 'Usuario creado con éxito', 'usuario': nuevo_usuario.serialize()}), 201
# #     except Exception as e:
# #         db.session.rollback()
# #         return jsonify({'mensaje': 'Error al crear el usuario', 'error': str(e)}), 500



# #============================================================================
# # [DELETE] ruta para ELIMINAR RECETA FAVORITA
# #============================================================================
# @api.route('/favorite/recepies/<int:recepy_id>', methods=['DELETE'])
# @jwt_required()
# def delete_favorite_recepies(recepy_id):
#     current_user_id = get_jwt_identity()
#     recepy_query = Recepies.query.get(recepy_id)
#     user_query = User.query.get(current_user_id)
#     user_query.favorite_recepies.remove(recepy_query)

#     return jsonify(user_query.serialize()), 200


# #============================================================================
# # [DELETE] RUTA PARA ELIMINAR INGRIDIENTE
# #============================================================================
# @api.route('/ingredients/<int:ingredient_id>', methods=['DELETE'])
# @jwt_required()
# def delete_ingredient(ingredient_id):
#     ingredient = Ingredients.query.get(ingredient_id)
#     if not ingredient:
#         return jsonify({"msg": "Ingredient not found"}), 404
#     db.session.delete(ingredient)
#     db.session.commit()

#     return jsonify({"msg": "Ingredient deleted successfully"}), 200