"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import json
from flask import Flask, jsonify, Blueprint, request, send_from_directory
from werkzeug.utils import secure_filename
from api.models import db, User, Ingredients, Recipe, Categories
from api.utils import APIException

from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = '/workspaces/Proyecto-final-nikita-ximena-sofia-diana-paginaWebDeRecetas/uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

api = Blueprint('api', __name__)
CORS(api)

@api.route('/users', methods=['POST'])
def create_user():
    user_data = request.get_json()
    if 'user_name' not in user_data or 'email' not in user_data or 'password' not in user_data:
        raise APIException('Faltan datos requeridos', status_code=400)
    user_name = user_data['user_name']
    first_name = user_data.get('first_name', None)
    last_name = user_data.get('last_name',None)  
    email = user_data['email']
    password = user_data['password']
    if User.query.filter_by(user_name=user_name).first() is not None:
        raise APIException('El nombre de usuario ya está en uso', status_code=409)
    if User.query.filter_by(email=email).first() is not None:
        raise APIException('El correo electrónico ya está en uso', status_code=409)
    nuevo_usuario = User(
        user_name=user_name,
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password
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
    current_user_id = get_jwt_identity()
    user_query = User.query.get(current_user_id)
    if not user_query:
        raise APIException('Usuario no encontrado', status_code=404)
    return jsonify(usuario_actual=user_query.serialize()), 200


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

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None or password is None:
        raise APIException("Correo electrónico y contraseña son requeridos", status_code=400)
    user_query = User.query.filter_by(email=email).first()
    if not user_query or user_query.password != password:
        raise APIException("Correo o contraseña inválidos", status_code=401)
    access_token = create_access_token(identity=user_query.id)
    return jsonify(access_token=access_token), 200


@api.route('/user/favorites', methods=['GET'])
@jwt_required()
def get_user_favorites():
    current_user_id = get_jwt_identity()
    user_query = User.query.get(current_user_id)
    if not user_query:
        raise APIException("Usuario no encontrado", status_code=404)
    favoritos = list(map(lambda x: x.serialize(), user_query.favorite_recipes))
    return jsonify(favoritos), 200

@api.route('/favorites/recipes/<int:recipe_id>', methods=['POST'])
@jwt_required()
def add_favorite_recipe(recipe_id):
    current_user_id = get_jwt_identity()
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
    current_user_id = get_jwt_identity()
    recipe_query = Recipe.query.get(recipe_id)
    user_query = User.query.get(current_user_id)
    if not recipe_query:
        raise APIException("Receta no encontrada", status_code=404)
    if recipe_query not in user_query.favorite_recipes:
        raise APIException("La receta no está en favoritos", status_code=400)
    
    user_query.favorite_recipes.remove(recipe_query)
    db.session.commit()
    return jsonify(user_query.serialize()), 200

@api.route('/create_recipes', methods=['POST'])
@jwt_required()
def create_recipe():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        raise APIException("Usuario no encontrado", status_code=404)

    if 'image' not in request.files:
        raise APIException("Imagen requerida", status_code=400)
    
    image = request.files['image']
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(filepath)
        image_url = f'/uploads/{filename}'  # La URL pública de la imagen
    else:
        raise APIException("Archivo no válido", status_code=400)
    
    receta_data = request.form
    print("Datos recibidos en el backend:", receta_data)
    required_fields = ['name', 'description', 'steps', 'ingredients', 'category']
    if not all(field in receta_data for field in required_fields):
        raise APIException("Faltan datos requeridos", status_code=400)
    
    try:
        name = receta_data['name']
        description = receta_data['description']
        steps = receta_data['steps']
        ingredients_ids = json.loads(receta_data['ingredients'])
        category_ids = json.loads(receta_data['category'])
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
            is_official=is_official,
            image_filename=filename 
        )
        db.session.add(nueva_receta)
        db.session.commit()

        return jsonify({'msg': 'Receta creada con éxito', 'receta': nueva_receta.serialize()}), 201
    except APIException as e:
        raise e
    except Exception as e:
        db.session.rollback()
        raise APIException(f'Error al crear la receta: {str(e)}', status_code=500)