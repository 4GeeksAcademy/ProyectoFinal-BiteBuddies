"""empty message

Revision ID: fac27b3ed85b
Revises: 2466efcd1f8e
Create Date: 2024-09-08 09:41:46.129778

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fac27b3ed85b'
down_revision = '2466efcd1f8e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('recipe',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('steps', sa.String(length=255), nullable=False),
    sa.Column('is_official', sa.Boolean(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('categories_recipes',
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.id'], ),
    sa.PrimaryKeyConstraint('recipe_id', 'category_id')
    )
    op.create_table('favorite_recipes',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'recipe_id')
    )
    op.create_table('recipes_ingredients',
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.Column('ingredient_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['ingredient_id'], ['ingredients.id'], ),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.id'], ),
    sa.PrimaryKeyConstraint('recipe_id', 'ingredient_id')
    )
    op.drop_table('categoria_recepies')
    op.drop_table('favorite_recepies')
    op.drop_table('category')
    op.drop_table('recepies_ingredients')
    op.drop_table('receta_publicada')
    op.drop_table('recepies')
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=250), nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(length=250), nullable=False))
        batch_op.drop_constraint('user_name_key', type_='unique')
        batch_op.drop_column('name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(length=250), autoincrement=False, nullable=False))
        batch_op.create_unique_constraint('user_name_key', ['name'])
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    op.create_table('recepies',
    sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('recepies_id_seq'::regclass)"), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(length=250), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='recepies_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_table('receta_publicada',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('title', sa.VARCHAR(length=250), autoincrement=False, nullable=False),
    sa.Column('content', sa.TEXT(), autoincrement=False, nullable=False),
    sa.Column('author_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['author_id'], ['user.id'], name='receta_publicada_author_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='receta_publicada_pkey')
    )
    op.create_table('recepies_ingredients',
    sa.Column('recepy_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('ingredient_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['ingredient_id'], ['ingredients.id'], name='recepies_ingredients_ingredient_id_fkey'),
    sa.ForeignKeyConstraint(['recepy_id'], ['recepies.id'], name='recepies_ingredients_recepy_id_fkey'),
    sa.PrimaryKeyConstraint('recepy_id', 'ingredient_id', name='recepies_ingredients_pkey')
    )
    op.create_table('category',
    sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('category_id_seq'::regclass)"), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(length=250), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='category_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_table('favorite_recepies',
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('recepy_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['recepy_id'], ['recepies.id'], name='favorite_recepies_recepy_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='favorite_recepies_user_id_fkey'),
    sa.PrimaryKeyConstraint('user_id', 'recepy_id', name='favorite_recepies_pkey')
    )
    op.create_table('categoria_recepies',
    sa.Column('recepy_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('categoria_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['categoria_id'], ['category.id'], name='categoria_recepies_categoria_id_fkey'),
    sa.ForeignKeyConstraint(['recepy_id'], ['recepies.id'], name='categoria_recepies_recepy_id_fkey'),
    sa.PrimaryKeyConstraint('recepy_id', 'categoria_id', name='categoria_recepies_pkey')
    )
    op.drop_table('recipes_ingredients')
    op.drop_table('favorite_recipes')
    op.drop_table('categories_recipes')
    op.drop_table('recipe')
    op.drop_table('categories')
    # ### end Alembic commands ###
