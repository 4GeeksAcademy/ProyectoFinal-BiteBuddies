from api.models import db, User, Ingredients, Recipe, Categories
def add_user(first_name, last_name, user_name, profile_image_url, is_active=True):
    user = User()
    user.first_name = str(first_name)
    user.last_name = str(last_name)
    user.user_name = str(user_name)
    user.email = str(user_name) + "@test.com"
    user.password = "123"
    user.is_active = is_active
    user.profile_image = profile_image_url
    return user

def insert_test_users():
    print('\n\n--- Add test USERS | START ---')
    
    # Lista de URLs de imágenes de prueba para usuarios
    user_image_urls = [
        "https://img.freepik.com/foto-gratis/mujer-moderna-haciendose-selfie_23-2147893976.jpg?t=st=1726202291~exp=1726205891~hmac=1b940cf612f3502fd0a6e1f4f38501323bbba6d590da839838511ea48aac2145&w=900",
        "https://img.freepik.com/foto-gratis/retrato-hombre-joven-feliz_23-2149309266.jpg?t=st=1726202399~exp=1726205999~hmac=0d42bac026a1794d4dd469741680a66ee95b60fbbb071ee2f324d6b216e10c04&w=900",
        "https://img.freepik.com/foto-gratis/mujer-tiro-medio-vistiendo-halal-al-aire-libre_23-2150701553.jpg?t=st=1726202428~exp=1726206028~hmac=6c5eea915199c136be9e7c90cf2d2d6b7ff43846085ff76e5ae407f6193ccdfb&w=900",
        "https://img.freepik.com/foto-gratis/vista-frontal-sonriente-mujer-casa_23-2150062545.jpg?t=st=1726202330~exp=1726205930~hmac=fd45afc730c466575805d3599de6eaa0abef9fe71e88245f7427040ed14e32da&w=900",
    ]
    
    user1 = add_user("Alisa", "Doe", "Alisani", user_image_urls[0])
    user2 = add_user("Nikita", "Doe", "Niki", user_image_urls[1])
    user3 = add_user("Diana", "Doe", "Diwoop", user_image_urls[2])
    user4 = add_user("Ximena", "Doe", "Xime", user_image_urls[3])
    
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
