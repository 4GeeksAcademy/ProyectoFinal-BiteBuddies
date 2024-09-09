"""empty message

Revision ID: 616ad979d6ad
Revises: 269feb08d5b7
Create Date: 2024-09-04 20:45:29.553169

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '616ad979d6ad'
down_revision = '269feb08d5b7'
branch_labels = None
depends_on = None


def upgrade():
    # You don't need to create any new tables or references to receta_publicada
    pass


def downgrade():
    # In case of downgrade, no actions related to receta_publicada should be taken
    pass
