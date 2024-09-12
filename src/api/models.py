from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

favorite_recipes = db.Table(
    'favorite_recipes',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True)
)

recipes_ingredients = db.Table(
    'recipes_ingredients',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredients.id'), primary_key=True)
)

categories_recipes = db.Table(
    'categories_recipes',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True)
)

favorite_users = db.Table(
    'favorite_users',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    user_name = db.Column(db.String(250), unique=True, nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)

    uploaded_recipes = db.relationship('Recipe', back_populates='user')

    favorite_recipes = db.relationship('Recipe', secondary=favorite_recipes, backref=db.backref('favorited_by_users', lazy='dynamic'))

    favorite_users = db.relationship('User', secondary=favorite_users, 
                                     primaryjoin=id==favorite_users.c.follower_id, 
                                     secondaryjoin=id==favorite_users.c.followed_id, 
                                     backref='followers', lazy='dynamic')

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "user_name": self.user_name,
            "email": self.email,
            "is_active": self.is_active,
            "favorite_recipes": list(map(lambda x: x.serialize(), self.favorite_recipes)),
            "favorite_users": list(map(lambda x: x.serialize(), self.favorite_users.all())),
            "uploaded_recipes": [recipe.serialize() for recipe in self.uploaded_recipes]
        }



class Categories(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    
    def __repr__(self):
        return '<Category %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

class Recipe(db.Model):
    __tablename__ = 'recipe'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    steps = db.Column(db.String(255), nullable=False)
    is_official = db.Column(db.Boolean, nullable=False, default=False)
    image_url = db.Column(db.String(255), nullable=True)
    ingredients = db.relationship('Ingredients', secondary=recipes_ingredients, backref=db.backref('used_in_recipes', lazy='dynamic'))
    categories = db.relationship('Categories', secondary=categories_recipes, backref=db.backref('recipes', lazy='dynamic'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    user = db.relationship('User', back_populates='uploaded_recipes')


    def __repr__(self):
        return '<Recipe %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "steps": self.steps,
            "image_url": self.image_url,
            "ingredients": [ingredient.serialize() for ingredient in self.ingredients],
            "categories": [category.serialize() for category in self.categories],
            "uploaded_by_user": {
                "id": self.user.id,
                "user_name": self.user.user_name
            } if self.user else None,
            "is_official": self.is_official
        }


class Ingredients(db.Model):
    __tablename__ = 'ingredients'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False, unique=True)

    def __repr__(self):
        return '<Ingredients %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }