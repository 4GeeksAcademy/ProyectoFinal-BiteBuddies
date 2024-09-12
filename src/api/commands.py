from api.models import db, User, Ingredients, Recipe, Categories
def add_user(first_name, last_name, user_name, is_active=True):
    user = User()
    user.first_name= str(first_name)
    user.last_name = str(last_name)
    user.user_name = str(user_name)
    user.email = str(user_name) + "@test.com"
    user.password = "123"
    user.is_active = is_active
    return user
# Función para insertar usuarios de prueba
def insert_test_users():
    print('\n\n--- Add test USERS | START ---')
    user1 = add_user("Alisa", "Doe", "admin")
    user2 = add_user("Nikita", "Doe", "admin1")
    user3 = add_user("Diana", "Doe", "admin2")
    user4 = add_user("Ximena", "Doe", "admin3")
    
    users = [user1, user2, user3, user4]
    
    db.session.add_all(users)
    db.session.commit()

    # Imprimir los emails y las contraseñas
    print("Users created. Use the following credentials to log in:")
    for user in users:
        print(f"Email: {user.email}, Password: 123")

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
        "https://via.placeholder.com/150/0000FF/808080?text=Recipe+1",
        "https://via.placeholder.com/150/FF0000/FFFFFF?text=Recipe+2",
        "https://via.placeholder.com/150/00FF00/000000?text=Recipe+3",
        "https://via.placeholder.com/150/FFFF00/000000?text=Recipe+4",
        "https://via.placeholder.com/150/FF00FF/000000?text=Recipe+5",
        "https://via.placeholder.com/150/00FFFF/000000?text=Recipe+6",
        "https://via.placeholder.com/150/FF6600/000000?text=Recipe+7"
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
    
"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the app but sill in integration
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    @app.cli.command("insert-test-data")
    def insert_test_data():
        print('\n\n\n*******************************')
        print('ADD TEST DATA | START')
        # Insertar datos de prueba
        insert_test_users()         # Insertar usuarios
        insert_test_categories()    # Insertar categorías
        insert_test_ingredients()   # Insertar ingredientes
        insert_test_recipes()       # Insertar recetas
        print('ADD TEST DATA | END')
        print('*******************************\n\n\n')














