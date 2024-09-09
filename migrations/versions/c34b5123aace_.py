from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import text


# revision identifiers, used by Alembic.
revision = 'c34b5123aace'
down_revision = '616ad979d6ad'
branch_labels = None
depends_on = None


def table_exists(table_name):
    conn = op.get_bind()
    result = conn.execute(text(f"""
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_name = :table_name
        );
    """), {"table_name": table_name})
    
    return result.fetchone()[0]


def constraint_exists(constraint_name, table_name):
    conn = op.get_bind()
    result = conn.execute(text(f"""
        SELECT constraint_name
        FROM information_schema.table_constraints
        WHERE table_name = :table_name
        AND constraint_name = :constraint_name
    """), {"table_name": table_name, "constraint_name": constraint_name})
    
    return result.fetchone() is not None


def upgrade():
    # Only create the 'recipe' table if it does not already exist
    if not table_exists('recipe'):
        op.create_table('recipe',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('name', sa.String(length=250), nullable=False),
            sa.Column('description', sa.String(length=255), nullable=False),
            sa.Column('steps', sa.String(length=255), nullable=False),
            sa.Column('is_official', sa.Boolean(), nullable=False),
            sa.Column('user_id', sa.Integer(), nullable=True),
            sa.ForeignKeyConstraint(['user_id'], ['user.id']),
            sa.PrimaryKeyConstraint('id')
        )

    # Modify existing tables for categories_recipes
    with op.batch_alter_table('categories_recipes', schema=None) as batch_op:
        if constraint_exists('categories_recipes_recipe_id_fkey', 'categories_recipes'):
            batch_op.drop_constraint('categories_recipes_recipe_id_fkey', type_='foreignkey')

        # Add correct foreign key to recipe
        batch_op.create_foreign_key(None, 'recipe', ['recipe_id'], ['id'])

    # Modify the 'favorite_recipes' table
    with op.batch_alter_table('favorite_recipes', schema=None) as batch_op:
        if constraint_exists('favorite_recipes_recipe_id_fkey', 'favorite_recipes'):
            batch_op.drop_constraint('favorite_recipes_recipe_id_fkey', type_='foreignkey')

        batch_op.create_foreign_key(None, 'recipe', ['recipe_id'], ['id'])

    # Modify the 'recipes_ingredients' table
    with op.batch_alter_table('recipes_ingredients', schema=None) as batch_op:
        if constraint_exists('recipes_ingredients_recipe_id_fkey', 'recipes_ingredients'):
            batch_op.drop_constraint('recipes_ingredients_recipe_id_fkey', type_='foreignkey')

        batch_op.create_foreign_key(None, 'recipe', ['recipe_id'], ['id'])


def downgrade():
    with op.batch_alter_table('recipes_ingredients', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('recipes_ingredients_recipe_id_fkey', 'recipe', ['recipe_id'], ['id'])

    with op.batch_alter_table('favorite_recipes', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('favorite_recipes_recipe_id_fkey', 'recipe', ['recipe_id'], ['id'])

    with op.batch_alter_table('categories_recipes', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('categories_recipes_recipe_id_fkey', 'recipe', ['recipe_id'], ['id'])

    # Recreate 'recipe' table (if necessary)
    op.create_table('recipe',
        sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column('name', sa.VARCHAR(length=250), autoincrement=False, nullable=False),
        sa.Column('is_official', sa.BOOLEAN(), autoincrement=False, nullable=False),
        sa.Column('description', sa.VARCHAR(length=255), autoincrement=False, nullable=False),
        sa.Column('steps', sa.VARCHAR(length=255), autoincrement=False, nullable=False),
        sa.PrimaryKeyConstraint('id', name='recipe_pkey')
    )
