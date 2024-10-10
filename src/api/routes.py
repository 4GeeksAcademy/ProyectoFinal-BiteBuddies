"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import jsonify, Blueprint, request
from api.models import db, User, Ingredients, Recipe, Categories, Comment
from api.utils import APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask import render_template


api = Blueprint('api', __name__)

# Permitir solicitudes CORS a esta API
CORS(api,resources={r"/*": {"origins": "*"}}, supports_credentials=True, expose_headers=["Authorization"])

def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@api.route('/insert-test-users', methods=['POST'])
def insert_test_users_route():
    try:
        insert_test_users()
        return jsonify({"message": "Usuarios de prueba insertados correctamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/insert-test-categories', methods=['POST'])
def insert_test_categories_route():
    try:
        insert_test_categories()
        return jsonify({"message": "Categorías de prueba insertadas correctamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/insert-test-ingredients', methods=['POST'])
def insert_test_ingredients_route():
    try:
        insert_test_ingredients()
        return jsonify({"message": "Ingredientes de prueba insertados correctamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/insert-test-recipes', methods=['POST'])
def insert_test_recipes_route():
    try:
        insert_test_recipes()
        return jsonify({"message": "Recetas de prueba insertadas correctamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/insert-test-data', methods=['POST'])
def insert_all_test_data_route():
    try:
        insert_test_users()
        insert_test_categories()
        insert_test_ingredients()
        insert_test_recipes()
        return jsonify({"message": "Todos los datos de prueba han sido insertados correctamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500





@api.route('/all_users', methods=['GET'])
def get_all_users():
    users_query = User.query.all()
    if not users_query:
        raise APIException("No se encontraron usuarios", status_code=404)
    all_users = list(map(lambda user: user.serialize(), users_query))
    return jsonify(all_users), 200

@api.route('/users', methods=['POST'])
def create_user():
    user_data = request.get_json()

    if 'user_name' not in user_data or 'email' not in user_data or 'password' not in user_data:
        raise APIException('Faltan datos requeridos', status_code=400)

    user_name = user_data['user_name']
    first_name = user_data.get('first_name', None)
    last_name = user_data.get('last_name', None)
    email = user_data['email']
    password = user_data['password']

    if User.query.filter_by(user_name=user_name).first() is not None:
        raise APIException('El nombre de usuario ya está en uso', status_code=409)
    if User.query.filter_by(email=email).first() is not None:
        raise APIException('El correo electrónico ya está en uso', status_code=409)

    is_admin = user_data.get('is_admin', False)

    nuevo_usuario = User(
        user_name=user_name,
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=generate_password_hash(password),
        is_admin=is_admin
    )
    try:
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify({'msg': 'Usuario creado con éxito', 'usuario': nuevo_usuario.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        raise APIException(f'Error al crear usuario: {str(e)}', status_code=500)
    

@api.route("/current-user", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_identity = get_jwt_identity()
    current_user_id = current_user_identity.get('id')
    print(f"ID del usuario actual: {current_user_id}")
    user_query = User.query.get(current_user_id)
    if not user_query:
        raise APIException('Usuario no encontrado', status_code=404)
    return jsonify(usuario_actual=user_query.serialize()), 200

@api.route("/login", methods=["POST"])
def login():
    print("Petición recibida en /login")
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None or password is None:
        return jsonify({"msg": "Correo electrónico y contraseña son requeridos"}), 400

    print(f"Intentando iniciar sesión con {email}")
    
    user_query = User.query.filter_by(email=email).first()

    if not user_query:
        print("Usuario no encontrado")
        return jsonify({"msg": "Correo o contraseña inválidos"}), 401

    if not check_password_hash(user_query.password, password):
        print("Contraseña incorrecta")
        return jsonify({"msg": "Correo o contraseña inválidos"}), 401

    print(f"Usuario encontrado: {user_query.email}, admin: {user_query.is_admin}")

    access_token = create_access_token(identity={
        'id': user_query.id,
        'email': user_query.email,
        'is_admin': user_query.is_admin
    })

    return jsonify({"token": access_token, "admin": user_query.is_admin, "user": user_query.serialize()}), 200


@api.route('/all_recipes', methods=['GET'])
def get_all_recipes():
    recipes_query = Recipe.query.all()
    if not recipes_query:
        raise APIException("No se encontraron recetas", status_code=404)
    all_recipes = list(map(lambda x: x.serialize(), recipes_query))
    return jsonify(all_recipes), 200


@api.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe_by_id(recipe_id):
    recipe_query = Recipe.query.get(recipe_id)
    if not recipe_query:
        raise APIException("Receta no encontrada", status_code=404)
    return jsonify(recipe_query.serialize()), 200

@api.route('/user/<int:user_id>/recipes', methods=['GET'])
def get_user_recipes_by_id(user_id):
    user_query = User.query.get(user_id)
    if not user_query:
        raise APIException("Usuario no encontrado", status_code=404)
    recipes_query = Recipe.query.filter_by(user_id=user_id).all()
    if not recipes_query:
        raise APIException("Recetas no encontradas", status_code=404)
    recipes = [recipe.serialize() for recipe in recipes_query]
    return jsonify(recipes), 200


@api.route('/ingredients', methods=['GET'])
def get_all_ingredients():
    ingredients_query = Ingredients.query.all()
    if not ingredients_query:
        raise APIException('No se encontraron ingredientes', status_code=404)
    all_ingredients = list(map(lambda x: x.serialize(), ingredients_query))
    return jsonify(all_ingredients), 200

@api.route('/categories', methods=['GET'])
def get_all_categories():
    categories_query = Categories.query.all()
    if not categories_query:
        raise APIException("No se encontraron categorías", status_code=404)
    all_categories = list(map(lambda x: x.serialize(), categories_query))
    return jsonify(all_categories), 200


@api.route('/categories/<int:categoria_id>', methods=['GET'])
def get_category_by_id(categoria_id):
    categoria_query = Categories.query.get(categoria_id)
    if not categoria_query:
        raise APIException("Categoría no encontrada", status_code=404)
    return jsonify(categoria_query.serialize()), 200


@api.route('/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user_query = User.query.get(user_id)
    if not user_query:
        raise APIException("User no encontrado", status_code=404)
    return jsonify(user_query.serialize()), 200

@api.route('/user/favorites', methods=['GET'])
@jwt_required()
def get_user_favorites():
    try:
        current_user_identity = get_jwt_identity()
        current_user_id = current_user_identity.get('id')
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404
        favorite_recipes = [recipe.serialize() for recipe in user.favorite_recipes]
        favorite_users = [fav_user.serialize() for fav_user in user.favorite_users]

        return jsonify({
            "favorite_recipes": favorite_recipes,
            "favorite_users": favorite_users
        }), 200
    except Exception as e:
        print(f"Error al obtener favoritos: {e}")
        return jsonify({"msg": "Error interno del servidor"}), 500

@api.route('/favorites/recipes/<int:recipe_id>', methods=['POST'])
@jwt_required()
def add_favorite_recipe(recipe_id):
    current_user_identity = get_jwt_identity()
    current_user_id = current_user_identity.get('id')
    recipe_query = Recipe.query.get(recipe_id)

    user_query = User.query.get(current_user_id)
    if not recipe_query:
        raise APIException("Receta no encontrada", status_code=404)
    if not user_query:
        raise APIException("Usuario no encontrado", status_code=404)
    if recipe_query in user_query.favorite_recipes:
        raise APIException("La receta ya está en favoritos", status_code=400)
    
    user_query.favorite_recipes.append(recipe_query)
    db.session.commit()

    return jsonify(user_query.serialize()), 200

@api.route('/favorites/recipes/<int:recipe_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite_recipe(recipe_id):
    current_user_identity = get_jwt_identity()
    current_user_id = current_user_identity.get('id')
    recipe_query = Recipe.query.get(recipe_id)
    user_query = User.query.get(current_user_id)
    if not recipe_query:
        raise APIException("Receta no encontrada", status_code=404)
    if recipe_query not in user_query.favorite_recipes:
        raise APIException("La receta no está en favoritos", status_code=400)
    
    user_query.favorite_recipes.remove(recipe_query)
    db.session.commit()
    return jsonify(user_query.serialize()), 200

@api.route('/favorites/users/<int:user_id>', methods=['POST'])
@jwt_required()
def add_user_to_favorite(user_id):
    current_user_identity = get_jwt_identity()
    current_user_id = current_user_identity.get('id') 
    user_to_follow = User.query.get(user_id) 
    current_user = User.query.get(current_user_id)
    if not user_to_follow:
        raise APIException("Usuario no encontrado", status_code=404)
    if user_to_follow in current_user.favorite_users:
        raise APIException("El usuario ya está en la lista de favoritos", status_code=400)
    current_user.favorite_users.append(user_to_follow)
    db.session.commit()
    return jsonify(current_user.serialize()), 200

@api.route('/favorites/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user_from_favorite(user_id):
    current_user_identity = get_jwt_identity()
    current_user_id = current_user_identity.get('id')
    user_to_unfollow = User.query.get(user_id)
    current_user = User.query.get(current_user_id)
    if not user_to_unfollow:
        raise APIException("Usuario no encontrado", status_code=404)
    if user_to_unfollow not in current_user.favorite_users:
        raise APIException("El usuario no está en la lista de favoritos", status_code=400)
    current_user.favorite_users.remove(user_to_unfollow)
    db.session.commit()
    return jsonify(current_user.serialize()), 200

@api.route('/user/recipes', methods=['GET'])
@jwt_required()
def get_user_recipes():
    try:
        current_user_id = get_jwt_identity()
        user_recipes = Recipe.query.filter_by(user_id=current_user_id).all()
        if not user_recipes:
            return jsonify({"msg": "No se encontraron recetas para este usuario"}), 404
        serialized_recipes = [recipe.serialize() for recipe in user_recipes]
        return jsonify(serialized_recipes), 200
    except Exception as e:
        raise APIException(f'Error al obtener las recetas del usuario: {str(e)}', status_code=500)


@api.route('/create_recipes', methods=['POST'])
@jwt_required()
def create_recipe():
    current_user_identity = get_jwt_identity()
    current_user_id = current_user_identity.get('id')
    user = User.query.get(current_user_id)
    if not user:
        raise APIException("Usuario no encontrado", status_code=404)
    receta_data = request.get_json()
    required_fields = ['name', 'description', 'steps', 'ingredients_ids', 'category_ids']
    if not all(field in receta_data for field in required_fields):
        raise APIException("Faltan datos requeridos", status_code=400)

    try:
        name = receta_data['name']
        description = receta_data['description']
        steps = receta_data['steps']
        ingredients_ids = receta_data['ingredients_ids']
        category_ids = receta_data['category_ids']
        image_url = receta_data.get('image_url', None)
        is_official = receta_data.get('is_official', False)

        ingredients = Ingredients.query.filter(Ingredients.id.in_(ingredients_ids)).all()
        if len(ingredients) != len(ingredients_ids):
            raise APIException("Uno o más ingredientes no encontrados", status_code=404)
        
        categories = Categories.query.filter(Categories.id.in_(category_ids)).all()
        if len(categories) != len(category_ids):
            raise APIException("Una o más categorías no encontradas", status_code=404)

        nueva_receta = Recipe(
            name=name,
            description=description,
            steps=steps,
            ingredients=ingredients,
            categories=categories,
            user=user,
            image_url=image_url,
            is_official=is_official
        )
        db.session.add(nueva_receta)
        db.session.commit()

        return jsonify({'msg': 'Receta creada con éxito', 'receta': nueva_receta.serialize()}), 201
    except APIException as e:
        raise e
    except Exception as e:
        db.session.rollback()
        raise APIException(f'Error al crear la receta: {str(e)}', status_code=500)
    
@api.route('/recipes/<int:recipe_id>', methods=['DELETE'])
@jwt_required()
def delete_recipe(recipe_id):
    current_user_identity = get_jwt_identity()
    current_user_id = current_user_identity.get('id')
    user = User.query.get(current_user_id)
    
    if not user:
        raise APIException("Usuario no encontrado", status_code=404)
    recipe_query = Recipe.query.get(recipe_id)
    
    if not recipe_query:
        raise APIException("Receta no encontrada", status_code=404)
    if recipe_query.user_id != current_user_id:
        raise APIException("No tienes permiso para eliminar esta receta", status_code=403)
    
    try:
        db.session.delete(recipe_query)
        db.session.commit()

        return jsonify({'msg': 'Receta eliminada con éxito'}), 200

    except Exception as e:
        db.session.rollback()
        raise APIException(f'Error al eliminar la receta: {str(e)}', status_code=500)
    
@api.route('/current-user', methods=['PUT'])
@jwt_required()
def edit_user_profile():
    current_user_identity = get_jwt_identity()
    current_user_id = current_user_identity.get('id')
    user = User.query.get(current_user_id)
    if not user:
        raise APIException("Usuario no encontrado", status_code=404)

    data = request.get_json()

    if 'first_name' in data and data['first_name']:
        user.first_name = data['first_name']
    if 'last_name' in data and data['last_name']:
        user.last_name = data['last_name']
    if 'bio' in data and data['bio']:
        user.bio = data['bio']
    if 'profile_image' in data and data['profile_image']:
        user.profile_image = data['profile_image']

    try:
        db.session.commit()
        return jsonify({"msg": "Perfil actualizado con éxito", "user": user.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        raise APIException(f"Error al actualizar el perfil: {str(e)}", status_code=500)
    
    
# Obtener comentarios de una receta
@api.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_comments_for_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        raise APIException("Receta no encontrada", status_code=404)
    
    comments = Comment.query.filter_by(recipe_id=recipe_id).all()
    return jsonify([comment.serialize() for comment in comments]), 200

# Crear un nuevo comentario
@api.route('/recipes/<int:recipe_id>', methods=['POST'])
@jwt_required()
def add_comment_to_recipe(recipe_id):
    user_id = get_jwt_identity()
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        raise APIException("Receta no encontrada", status_code=404)

    data = request.get_json()
    if 'text' not in data:
        raise APIException("El comentario no puede estar vacío", status_code=400)

    new_comment = Comment(text=data['text'], user_id=user_id, recipe_id=recipe_id)
    
    try:
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment.serialize()), 201
    except Exception as e:
        db.session.rollback()
        raise APIException(f"Error al crear el comentario: {str(e)}", status_code=500)
    
    

