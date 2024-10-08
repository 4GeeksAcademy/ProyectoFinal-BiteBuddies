"""empty message

Revision ID: 06bac67b144d
Revises: 7f4fea1556be
Create Date: 2024-08-30 09:13:22.798664

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '06bac67b144d'
down_revision = '7f4fea1556be'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorite_recepies',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('recepy_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['recepy_id'], ['recepies.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'recepy_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorite_recepies')
    # ### end Alembic commands ###
