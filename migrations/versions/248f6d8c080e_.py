"""empty message

Revision ID: 248f6d8c080e
Revises: f9c52dce4318
Create Date: 2024-08-19 16:03:33.308623

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '248f6d8c080e'
down_revision = 'f9c52dce4318'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('userName', sa.String(length=250), nullable=False))
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=250),
               existing_nullable=False)
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=250),
               existing_nullable=False)
        batch_op.create_unique_constraint(None, ['userName'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.alter_column('password',
               existing_type=sa.String(length=250),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)
        batch_op.alter_column('email',
               existing_type=sa.String(length=250),
               type_=sa.VARCHAR(length=120),
               existing_nullable=False)
        batch_op.drop_column('userName')

    # ### end Alembic commands ###
