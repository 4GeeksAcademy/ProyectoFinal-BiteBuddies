"""empty message

Revision ID: 269feb08d5b7
Revises: 2466efcd1f8e
Create Date: 2024-09-04 20:08:46.334096

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import inspect


# revision identifiers, used by Alembic.
revision = '269feb08d5b7'
down_revision = '2466efcd1f8e'
branch_labels = None
depends_on = None


def column_exists(table_name, column_name):
    """Check if a column exists in the table."""
    inspector = inspect(op.get_bind())
    columns = [col['name'] for col in inspector.get_columns(table_name)]
    return column_name in columns


def upgrade():
    # Modify the 'recipe' table (check for column existence)
    with op.batch_alter_table('recipe', schema=None) as batch_op:
        if not column_exists('recipe', 'is_official'):
            batch_op.add_column(sa.Column('is_official', sa.Boolean(), nullable=False))
        if not column_exists('recipe', 'description'):
            batch_op.add_column(sa.Column('description', sa.String(length=255), nullable=False))
        if not column_exists('recipe', 'steps'):
            batch_op.add_column(sa.Column('steps', sa.String(length=255), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # Downgrade changes made to 'recipe'
    with op.batch_alter_table('recipe', schema=None) as batch_op:
        if column_exists('recipe', 'steps'):
            batch_op.drop_column('steps')
        if column_exists('recipe', 'description'):
            batch_op.drop_column('description')
        if column_exists('recipe', 'is_official'):
            batch_op.d
