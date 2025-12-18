#!/bin/sh

# Wait for the database service to be ready (critical step!)
DB_HOST="db"
DB_PORT="5432"

echo "⏳ Waiting for PostgreSQL at $HOST:$PORT to be ready..."

while ! nc -z $DB_HOST $DB_PORT; do
  sleep 0.1 # wait for 1/10 of a second before retrying
done

echo "✅ PostgreSQL is up - applying migrations and starting server."

python manage.py makemigrations

# Run migrations to set up the database schema
python manage.py migrate --noinput

# Create superuser non-interactively using environment variables
# You MUST set DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL, 
# and DJANGO_SUPERUSER_PASSWORD as environment variables (e.g., in docker-compose.yml)
python manage.py createsuperuser --noinput || true 

# Start the Django server
exec python manage.py runserver 0.0.0.0:8000
