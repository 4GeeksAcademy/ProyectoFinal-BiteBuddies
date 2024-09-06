from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

favorite_recepies = db.Table(
    'favorite_recepies',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('recepy_id', db.Integer, db.ForeignKey('recepies.id'), primary_key=True)
)

recepies_ingredients = db.Table(
    'recepies_ingredients',
    db.Column('recepy_id', db.Integer, db.ForeignKey('recepies.id'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredients.id'), primary_key=True)
)
recetas_publicadas_ingredients = db.Table(
    'recetas_publicadas_ingredients',
    db.Column('receta_publicada_id', db.Integer, db.ForeignKey('receta_publicada.id'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredients.id'), primary_key=True)
)
recetas_publicadas_categorias = db.Table(
    'recetas_publicadas_categorias',
    db.Column('receta_publicada_id', db.Integer, db.ForeignKey('receta_publicada.id'), primary_key=True),
    db.Column('categoria_id', db.Integer, db.ForeignKey('category.id'), primary_key=True)
)
categoria_recepies= db.Table(
    'categoria_recepies',
    db.Column('recepy_id', db.Integer, db.ForeignKey('recepies.id'), primary_key=True),
    db.Column('receta_publicada_id', db.Integer, db.ForeignKey('receta_publicada.id'), primary_key=True),
    db.Column('categoria_id', db.Integer, db.ForeignKey('category.id'), primary_key=True)
)
favorite_users = db.Table(
    'favorite_users',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=True, nullable=False)
    user_name = db.Column(db.String(250), unique=True, nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    favorite_recepies = db.relationship('Recepies', secondary=favorite_recepies, backref=db.backref('favorited_by_users', lazy='dynamic'))
    favorite_users = db.relationship( 'User', secondary=favorite_users, primaryjoin=id==favorite_users.c.follower_id, secondaryjoin=id==favorite_users.c.followed_id, backref='followers', lazy='dynamic' )

    def __repr__(self):
        return '<User %r>' % self.email
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_name": self.user_name,
            "email": self.email,
            "is_active": self.is_active,
            "favorite_recepies": list(map(lambda x: x.serialize(), self.favorite_recepies)),
            "favorite_users": list(map(lambda x: x.serialize(), self.favorite_users.all()))
        }
class Category (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)

    def __repr__(self):
        return '<Category %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

class Recepies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    is_official = db.Column(db.Boolean, nullable=False, default=True)
    description = db.Column(db.String(255), nullable=False)
    steps = db.Column(db.String(255), nullable=False)
    ingredients = db.relationship('Ingredients', secondary=recepies_ingredients, backref=db.backref('used_ingredients', lazy='dynamic'))
    category = db.relationship('Category', secondary=categoria_recepies, backref=db.backref('category', lazy='dynamic'))

    def __repr__(self):
        return '<Recepies %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "is_official": self.is_official,
            "description": self.description,
            "steps": self.steps,
            "ingredients": list(map(lambda x: x.serialize(), self.ingredients)),
            "category": list(map(lambda x: x.serialize(), self.category)),
        }

class Ingredients(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False, unique=True)

    def __repr__(self):
        return '<Ingredients %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }
    
class RecetaPublicada(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    steps = db.Column(db.String(255), nullable=False)
    ingredients = db.relationship('Ingredients', secondary=recetas_publicadas_ingredients, backref=db.backref('used_in_recetas_publicadas', lazy='dynamic'))
    category = db.relationship('Category', secondary=recetas_publicadas_categorias, backref=db.backref('recetas_publicadas', lazy='dynamic'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    user = db.relationship('User', backref=db.backref('recetas_publicadas', lazy=True))
    is_official = db.Column(db.Boolean, nullable=False, default=False)

    def __repr__(self):
        return '<RecetaPublicada %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "steps": self.steps,
            "ingredients": list(map(lambda x: x.serialize(), self.ingredients)),
            "category": list(map(lambda x: x.serialize(), self.category)),
            "is_official": self.is_official,
            "user": self.user.serialize() if self.user else None
        }


