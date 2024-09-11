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
    user1 = add_user("Pepe", "Doe", "Pepe_Doe")
    user2 = add_user("John", "Doe", "John_Doe")
    user3 = add_user("Jane", "Doe", "Jane_Doe")
    db.session.add_all([user1, user2, user3])
    db.session.commit()
    print(f"Users created")
    print('\n\n--- Add test USERS | END ---')
# Función para insertar categorías de prueba
def insert_test_categories():
    print('\n\n--- Add test CATEGORIES | START ---')
    categories = ["Dessert", "Breakfast", "Lunch", "Dinner", "Snack"]
    for category_name in categories:
        category = Categories(name=category_name)
        db.session.add(category)
        db.session.commit()
        print(f"Category '{category_name}' created.")
    print('\n\n--- Add test CATEGORIES | END ---')
# Función para insertar ingredientes de prueba
def insert_test_ingredients():
    print('\n\n--- Add test INGREDIENTS | START ---')
    ingredients = ["Flour", "Sugar", "Butter", "Eggs", "Salt", "Milk", "Baking Powder"]
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
    for i in range(1, 4):  # Crear 3 recetas de prueba
        recipe = Recipe(
            name=f"Recipe {i}",
            description=f"This is the description for Recipe {i}",
            steps="Step 1: Do this, Step 2: Do that",
            user=users[i % len(users)]  # Asignar un usuario a la receta
        )
        # Agregar los primeros 3 ingredientes y 2 categorías
        recipe.ingredients = ingredients
        recipe.categories = categories
        db.session.add(recipe)
        db.session.commit()
        print(f"Recipe '{recipe.name}' created with ingredients and categories.")
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














