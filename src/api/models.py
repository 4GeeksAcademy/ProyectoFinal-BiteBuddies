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
categoria_recepies= db.Table(
    'categoria_recepies',
    db.Column('recepy_id', db.Integer, db.ForeignKey('recepies.id'), primary_key=True),
    db.Column('categoria_id', db.Integer, db.ForeignKey('category.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(250), unique=True, nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    favorite_recepies = db.relationship('Recepies', secondary=favorite_recepies, backref=db.backref('favorited_by_users', lazy='dynamic'))

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "userName": self.userName,
            "email": self.email,
            "is_active": self.is_active,
            "favorite_recepies": list(map(lambda x: x.serialize(), self.favorite_recepies))
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
    ingredients = db.relationship('Ingredients', secondary=recepies_ingredients, backref=db.backref('used_ingredients', lazy='dynamic'))
    category = db.relationship('Category', secondary=categoria_recepies, backref=db.backref('category', lazy='dynamic'))

    def __repr__(self):
        return '<Recepies %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
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