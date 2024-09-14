"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import jsonify, Blueprint, request
from api.models import db, User, Ingredients, Recipe, Categories, Comment
from api.utils import APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Permitir solicitudes CORS a esta API
CORS(api)

def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code
def add_test_user(first_name, last_name, user_name, profile_image_url, is_active=True):
    user = User()
    user.first_name = str(first_name)
    user.last_name = str(last_name)
    user.user_name = str(user_name)
    user.email = str(user_name) + "@test.com"
    user.password = "123"
    user.is_active = is_active
    user.profile_image = profile_image_url
    return user

# Función para insertar usuarios de prueba
def insert_test_users():
    print('\n\n--- Add test USERS | START ---')
    
    # Lista de URLs de imágenes de prueba para usuarios
    user_image_urls = [
        "https://img.freepik.com/foto-gratis/mujer-moderna-haciendose-selfie_23-2147893976.jpg?t=st=1726202291~exp=1726205891~hmac=1b940cf612f3502fd0a6e1f4f38501323bbba6d590da839838511ea48aac2145&w=900",
        "https://img.freepik.com/foto-gratis/retrato-hombre-joven-feliz_23-2149309266.jpg?t=st=1726202399~exp=1726205999~hmac=0d42bac026a1794d4dd469741680a66ee95b60fbbb071ee2f324d6b216e10c04&w=900",
        "https://img.freepik.com/foto-gratis/mujer-tiro-medio-vistiendo-halal-al-aire-libre_23-2150701553.jpg?t=st=1726202428~exp=1726206028~hmac=6c5eea915199c136be9e7c90cf2d2d6b7ff43846085ff76e5ae407f6193ccdfb&w=900",
        "https://img.freepik.com/foto-gratis/vista-frontal-sonriente-mujer-casa_23-2150062545.jpg?t=st=1726202330~exp=1726205930~hmac=fd45afc730c466575805d3599de6eaa0abef9fe71e88245f7427040ed14e32da&w=900",
    ]
    
    user1 = add_test_user("Alisa", "Doe", "Alisani", user_image_urls[0])
    user2 = add_test_user("Nikita", "Doe", "Niki", user_image_urls[1])
    user3 = add_test_user("Diana", "Doe", "Diwoop", user_image_urls[2])
    user4 = add_test_user("Ximena", "Doe", "Xime", user_image_urls[3])
    
    users = [user1, user2, user3, user4]
    
    db.session.add_all(users)
    db.session.commit()

    print("Users created. Use the following credentials to log in:")
    for user in users:
        print(f"Email: {user.email}, Password: 123, Profile Image URL: {user.profile_image}")

    print('\n\n--- Add test USERS | END ---')

# Función para insertar categorías de prueba
def insert_test_categories():
    print('\n\n--- Add test CATEGORIES | START ---')
    categories = ["Postre", "Desayuno", "Comida", "Cena", "Merienda"]
    for category_name in categories:
        category = Categories(name=category_name)
        db.session.add(category)
        db.session.commit()
        print(f"Category '{category_name}' created.")
    print('\n\n--- Add test CATEGORIES | END ---')

# Función para insertar ingredientes de prueba
def insert_test_ingredients():
    print('\n\n--- Add test INGREDIENTS | START ---')
    ingredients = ["Pimienta", "Azucar", "Mantequilla", "Huevos", "Sal", "Leche", "Harina"]
    for ingredient_name in ingredients:
        ingredient = Ingredients(name=ingredient_name)
        db.session.add(ingredient)
        db.session.commit()
        print(f"Ingredient '{ingredient_name}' created.")
    print('\n\n--- Add test INGREDIENTS | END ---')

# Función para insertar recetas de prueba
def insert_test_recipes():
    print('\n\n--- Add test RECIPES | START ---')
    
    # Obtener algunos ingredientes y categorías de la base de datos
    ingredients = Ingredients.query.all()[:3]  # Limitar a 3 ingredientes para simplicidad
    categories = Categories.query.all()[:2]    # Limitar a 2 categorías para simplicidad
    
    # Obtener usuarios para asociar con recetas
    users = User.query.all()[:3]
    
    # Lista de URLs de imágenes de prueba (puedes modificar las URLs)
    image_urls = [
        "https://img.freepik.com/foto-gratis/ai-generado-pasta_23-2150637305.jpg?t=st=1726202677~exp=1726206277~hmac=dfab2cdbc4fb6b9266d5452366667b21b381bb4ab432f5f7989b6936d992e1f8&w=360",
        "https://img.freepik.com/foto-gratis/deliciosa-comida-arreglo-mesa_23-2150227886.jpg?t=st=1726202700~exp=1726206300~hmac=7d582f1296cf33ebfc0420a28754f26f0751e22e6fbe5bbb40029808727304c3&w=360",
        "https://img.freepik.com/foto-gratis/ensalada-higos-queso-nueces-sobre-mesa-madera-azul_123827-19469.jpg?t=st=1726202741~exp=1726206341~hmac=6aa9ef4698b64ba2c1e028c3ced9f2cdb88d03e68f38ad619b62bfd787f0fecb&w=900",
        "https://img.freepik.com/foto-gratis/tacos-mexicanos-carne-res-salsa-tomate-salsa_2829-14194.jpg?t=st=1726202775~exp=1726206375~hmac=ea4de78df115ddeed82b272f5a2b4b580fb2b8941aad5725ad6a6197f6bf8b5f&w=900",
        "https://img.freepik.com/foto-gratis/deliciosos-panqueques-fotorrealistas_23-2151042568.jpg?t=st=1726202860~exp=1726206460~hmac=33534a09d30e8a8eae42def5aa986556c1df4ed1f22f20199a8ec64895d8b8ff&w=360",
        "https://img.freepik.com/foto-gratis/salmon-plancha-verduritas-limon_141793-761.jpg?t=st=1726202905~exp=1726206505~hmac=a7e2b8622f6a9820b2462c361015a5cda8a5b34dd5a693099a91d2165b53cc76&w=360",
        "https://img.freepik.com/foto-gratis/rollo-maki-pepino-servido-salsa-semillas-sesamo_141793-790.jpg?t=st=1726202976~exp=1726206576~hmac=d448f34aa5c28d9899dca917f16f49cafc23acb67daba7f7cfd6b318ffcd4533&w=360"
    ]
    
    # Crear recetas de prueba
    for i in range(7):  # Crear 7 recetas de prueba
        recipe = Recipe(
            name=f"Recipe {i + 1}",
            description=f"This is the description for Recipe {i + 1}",
            steps="Step 1: Do this, Step 2: Do that",
            user=users[i % len(users)],  # Asignar un usuario a la receta
            image_url=image_urls[i]  # Asignar una URL de imagen a la receta
        )
        # Agregar los primeros 3 ingredientes y 2 categorías
        recipe.ingredients = ingredients
        recipe.categories = categories
        db.session.add(recipe)
        db.session.commit()
        print(f"Recipe '{recipe.name}' created with ingredients, categories, and image URL.")
    
    print('\n\n--- Add test RECIPES | END ---')

# Ruta para insertar datos de prueba
@api.route('/insert-test-data', methods=['POST'])
def insert_test_data():
    try:
        insert_test_users()         # Insertar usuarios
        insert_test_categories()    # Insertar categorías
        insert_test_ingredients()   # Insertar ingredientes
        insert_test_recipes()       # Insertar recetas
        return jsonify({'msg': 'Datos de prueba insertados correctamente'}), 200
    except Exception as e:
        return jsonify({'msg': f'Error al insertar datos de prueba: {str(e)}'}), 500




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

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user_query = User.query.get(user_id)
    if not user_query:
        raise APIException("User no encontrado", status_code=404)
    return jsonify(user_query.serialize()), 200

@api.route('/user/favorites', methods=['GET'])
@jwt_required()  # Asegúrate de que el token JWT sea válido
def get_user_favorites():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        # Obtén las recetas y usuarios favoritos
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

@api.route('/favorites/users/<int:user_id>', methods=['POST'])
@jwt_required()
def add_user_to_favorite(user_id):
    current_user_id = get_jwt_identity() 
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
    current_user_id = get_jwt_identity()
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
    current_user_id = get_jwt_identity()
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
    current_user_id = get_jwt_identity()
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
    current_user_id = get_jwt_identity()
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

