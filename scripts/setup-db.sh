#!/bin/bash

# Script para configurar la base de datos PostgreSQL para Constructora Los Patos
# Requiere PostgreSQL instalado localmente

DB_NAME="constructora_los_patos"
DB_USER="postgres"
DB_HOST="localhost"
DB_PORT="5432"

echo "🗄️  Configurando base de datos PostgreSQL..."

# Crear base de datos si no existe
echo "📦 Creando base de datos '$DB_NAME'..."
createdb -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME 2>/dev/null || echo "Base de datos ya existe o error al crear"

# Ejecutar script de inicialización
echo "🔧 Ejecutando script de inicialización..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f database/init.sql

echo "✅ Base de datos configurada correctamente!"
echo ""
echo "🔑 Configurar las siguientes variables de entorno:"
echo "FLOOT_DATABASE_URL=postgresql://$DB_USER:password@$DB_HOST:$DB_PORT/$DB_NAME"
echo ""
echo "📝 Actualiza tu archivo .env.local con la URL correcta de la base de datos"
