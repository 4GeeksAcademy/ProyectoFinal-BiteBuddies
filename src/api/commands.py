from api.models import db, User, Ingredients, Recepies, Category

def add_user(user_name, is_admin=False):
    user = User()
    user.user_name = str(user_name)
    user.email = str(user_name) + "@test.com"
    user.password = "12345"
    user.is_admin = is_admin
    return user

def insert_test_users():
    print('\n\n--- Add test USERS | START ---')
    admin1 = add_user("niki", True)
    admin2 = add_user("diana", True)
    admin3 = add_user("ximena", True)
    db.session.add(admin1)
    db.session.add(admin2)
    db.session.add(admin3)
    db.session.commit()
    for x in range(1, 6):
        user = add_user("test_user" + str(x), False)
        db.session.add(user)
        db.session.commit()
        print("User: ", user.email, " created.")
    print('\n\n--- Add test USERS | END ---')

    # @app.cli.command("add-category")
    # @click.argument("category_name")
    # def add_category(category_name):
    #     """Add a new category"""
    #     category = Category(name=category_name)
    #     db.session.add(category)
    #     db.session.commit()
    #     click.echo(f"Category '{category_name}' created.")

    # @app.cli.command("add-ingredient")
    # @click.argument("ingredient_name")
    # def add_ingredient(ingredient_name):
    #     """Add a new ingredient"""
    #     ingredient = Ingredients(name=ingredient_name)
    #     db.session.add(ingredient)
    #     db.session.commit()
    #     click.echo(f"Ingredient '{ingredient_name}' created.")

    # @app.cli.command("add-recepy")
    # @click.argument("recepy_name")
    # @click.option("--ingredients", multiple=True, help="List of ingredient names")
    # @click.option("--categories", multiple=True, help="List of category names")
    # def add_recepy(recepy_name, ingredients, categories):
    #     """Add a new recipe with optional ingredients and categories"""
    #     recepy = Recepies(name=recepy_name)
        
    #     # Buscar y agregar ingredientes a la receta
    #     for ingredient_name in ingredients:
    #         ingredient = Ingredients.query.filter_by(name=ingredient_name).first()
    #         if ingredient:
    #             recepy.ingredients.append(ingredient)
        
    #     # Buscar y agregar categorías a la receta
    #     for category_name in categories:
    #         category = Category.query.filter_by(name=category_name).first()
    #         if category:
    #             recepy.category.append(category)
        
    #     db.session.add(recepy)
    #     db.session.commit()
    #     click.echo(f"Recipe '{recepy_name}' created with ingredients and categories.")

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
        # Crear Usuarios de prueva
        insert_test_users()

        # Crear Categorias de prueva
        # insert_test_categories()

        # Crear Ingredients de prueva
        # insert_test_ingredients()

        # Crear Recepies de prueva
        # insert_test_recepies()
        print('ADD TEST DATA | END')
        print('*******************************\n\n\n')

