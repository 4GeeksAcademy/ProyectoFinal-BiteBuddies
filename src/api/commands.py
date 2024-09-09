import click
from api.models import db, User, Ingredients, Recipe, Categories


"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the app but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""

def setup_commands(app):

    @app.cli.command("add-user")
    @click.argument("user_name")
    @click.argument("name")
    @click.argument("email")
    @click.argument("password")
    @click.option("--favorite-recipes", multiple=True, help="List of favorite recipes")
    def add_user(user_name, name, email, password, favorite_recipes):
        """Add a new user with optional favorite recipes"""
        user = User(user_name=user_name, name=name, email=email, password=password)
        
        for recipe_name in favorite_recipes:
            recipe = Recipe.query.filter_by(name=recipe_name).first()
            if recipe:
                user.favorite_recipes.append(recipe)
        
        db.session.add(user)
        db.session.commit()
        click.echo(f"User {user_name} created with email {email}.")

    @app.cli.command("add-category")
    @click.argument("category_name")
    def add_category(category_name):
        """Add a new category"""
        category = Categories(name=category_name)
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

    @app.cli.command("add-recipe")
    @click.argument("recipe_name")
    @click.option("--ingredients", multiple=True, help="List of ingredient names")
    @click.option("--categories", multiple=True, help="List of category names")
    def add_recipe(recipe_name, ingredients, categories):
        """Add a new recipe with optional ingredients and categories"""
        recipe = Recipe(name=recipe_name)
        
        for ingredient_name in ingredients:
            ingredient = Ingredients.query.filter_by(name=ingredient_name).first()
            if ingredient:
                recipe.ingredients.append(ingredient)
        
        for category_name in categories:
            category = Categories.query.filter_by(name=category_name).first()
            if category:
                recipe.category.append(category)
        
        db.session.add(recipe)
        db.session.commit()
        click.echo(f"Recipe '{recipe_name}' created with ingredients and categories.")
