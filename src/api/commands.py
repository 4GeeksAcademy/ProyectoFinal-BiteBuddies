import click
from api.models import db, User, Ingredients, Recepies, Category

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the app but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""

def setup_commands(app):

    @app.cli.command("add-user")
    @click.argument("user_name")
    @click.argument("email")
    @click.argument("password")
    @click.option("--favorite-recipes", multiple=True, help="List of favorite recipes")
    def add_user(user_name, email, password, favorite_recipes):
        """Add a new user with optional favorite recipes"""
        user = User(user_name=user_name, email=email, password=password)
        
        # Buscar y agregar recetas favoritas
        for recipe_name in favorite_recipes:
            recepy = Recepies.query.filter_by(name=recipe_name).first()
            if recepy:
                user.favorite_recepies.append(recepy)
        
        db.session.add(user)
        db.session.commit()
        click.echo(f"User {user_name} created with email {email}.")

    @app.cli.command("add-category")
    @click.argument("category_name")
    def add_category(category_name):
        """Add a new category"""
        category = Category(name=category_name)
        db.session.add(category)
        db.session.commit()
        click.echo(f"Category '{category_name}' created.")

    @app.cli.command("add-ingredient")
    @click.argument("ingredient_name")
    def add_ingredient(ingredient_name):
        """Add a new ingredient"""
        ingredient = Ingredients(name=ingredient_name)
        db.session.add(ingredient)
        db.session.commit()
        click.echo(f"Ingredient '{ingredient_name}' created.")

    @app.cli.command("add-recepy")
    @click.argument("recepy_name")
    @click.option("--ingredients", multiple=True, help="List of ingredient names")
    @click.option("--categories", multiple=True, help="List of category names")
    def add_recepy(recepy_name, ingredients, categories):
        """Add a new recipe with optional ingredients and categories"""
        recepy = Recepies(name=recepy_name)
        
        # Buscar y agregar ingredientes a la receta
        for ingredient_name in ingredients:
            ingredient = Ingredients.query.filter_by(name=ingredient_name).first()
            if ingredient:
                recepy.ingredients.append(ingredient)
        
        # Buscar y agregar categorías a la receta
        for category_name in categories:
            category = Category.query.filter_by(name=category_name).first()
            if category:
                recepy.category.append(category)
        
        db.session.add(recepy)
        db.session.commit()
        click.echo(f"Recipe '{recepy_name}' created with ingredients and categories.")



# def setup_commands(app):
    
#     """ 
#     This is an example command "insert-test-users" that you can run from the command line
#     by typing: $ flask insert-test-users 5
#     Note: 5 is the number of users to add
#     """
    # @app.cli.command("insert-test-users") # name of our command
    # @click.argument("count") # argument of out command
    # def insert_test_users(count):
    #     print("Creating test users")
    #     for x in range(1, int(count) + 1):
    #         user = User(user_name = "UsuarioTest" + str(x))
    #         user.email = "test_user" + str(x) + "@test.com"
    #         user.password = "123456"
    #         user.is_active = True
    #         db.session.add(user)
    #         db.session.commit()
    #         print("User: ", user.email, " created.")

    #     print("All test users created")

    # @app.cli.command("insert-test-data")
    # def insert_test_data():
    #     # Crear categorías
    #     category1 = Category(name="Desayuno")
    #     category2 = Category(name="Comida")
    #     category3 = Category(name="Cena")
        
    #     db.session.add(category1)
    #     db.session.add(category2)
    #     db.session.add(category3)
    #     db.session.commit()
        
    #     print("Categorías de prueba creadas")

    #     # Crear ingredientes
    #     ingredient1 = Ingredients(name="azucar")
    #     ingredient2 = Ingredients(name="pan")
    #     ingredient3 = Ingredients(name="patatas")
        
    #     db.session.add(ingredient1)
    #     db.session.add(ingredient2)
    #     db.session.add(ingredient3)
    #     db.session.commit()
        
    #     print("Ingredientes de prueba creados")

    #     # Crear una receta
    #     recepy = Recepies(name="Tostadas con azúcar")
    #     recepy.ingredients.extend([ingredient1, ingredient2])
    #     recepy.category.extend([category1])

    #     db.session.add(recepy)
    #     db.session.commit()

    #     print("Receta de prueba creada")

    #     print("Todos los datos de prueba han sido creados")