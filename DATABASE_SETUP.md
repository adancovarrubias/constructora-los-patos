# Constructora Los Patos - Configuración de Base de Datos

Este proyecto utiliza PostgreSQL como base de datos. Aquí te explico cómo configurarla correctamente.

## 📋 Requisitos Previos

- PostgreSQL instalado localmente o acceso a una instancia remota
- Node.js y npm instalados

## 🚀 Configuración Rápida

### 1. **Instalar PostgreSQL (si no lo tienes)**

**macOS (con Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Descargar desde [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. **Configurar la Base de Datos**

Ejecuta el script automático:
```bash
./scripts/setup-db.sh
```

O hazlo manualmente:
```bash
# Crear base de datos
createdb constructora_los_patos

# Ejecutar migraciones
psql -d constructora_los_patos -f database/init.sql
```

### 3. **Configurar Variables de Entorno**

Crea/actualiza `.env.local`:
```bash
FLOOT_DATABASE_URL=postgresql://username:password@localhost:5432/constructora_los_patos
```

**Reemplaza:**
- `username`: tu usuario de PostgreSQL (por defecto: `postgres`)
- `password`: tu contraseña de PostgreSQL
- `localhost:5432`: host y puerto (usa los tuyos si son diferentes)

### 4. **Verificar la Conexión**

```bash
npm run dev
```

Si todo está bien configurado, verás:
```
✅ Conexión a PostgreSQL establecida correctamente
```

## 🗄️ Estructura de la Base de Datos

### Tablas Principales:

1. **`developments`** - Proyectos inmobiliarios
2. **`development_models`** - Modelos/plantas de cada proyecto  
3. **`contact_submissions`** - Formularios de contacto

### Datos de Ejemplo Incluidos:

- **Torres Colón** (Colón, Panamá) - Desde $180,000
- **Ecoterra Paraíso** (Paraíso, Panamá) - Desde $120,000  
- **Las Ceibas Manzanillo** (Manzanillo, Colón) - Desde $95,000

Cada desarrollo incluye modelos con características específicas.

## 🔧 Para Producción (Vercel)

1. **Configura una base de datos PostgreSQL en la nube:**
   - [Supabase](https://supabase.com) (Recomendado)
   - [PlanetScale](https://planetscale.com)
   - [Railway](https://railway.app)
   - [Neon](https://neon.tech)

2. **Configura la variable de entorno en Vercel:**
   ```
   FLOOT_DATABASE_URL=postgresql://user:pass@host:port/dbname
   ```

3. **Ejecuta las migraciones en tu base de datos de producción:**
   ```sql
   -- Copia y ejecuta el contenido de database/init.sql
   ```

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"
- Verifica que PostgreSQL esté ejecutándose
- Comprueba las credenciales en `FLOOT_DATABASE_URL`
- Asegúrate de que la base de datos existe

### Error: "relation does not exist"
- Ejecuta las migraciones: `psql -d constructora_los_patos -f database/init.sql`

### Error: "FLOOT_DATABASE_URL no está configurada"
- Crea el archivo `.env.local` con la URL correcta

## 📞 Soporte

Si tienes problemas con la configuración, verifica:

1. PostgreSQL está ejecutándose: `pg_isready`
2. Puedes conectarte: `psql -d constructora_los_patos`
3. Las tablas existen: `\dt` en psql

---

¡Listo! Tu aplicación ahora tendrá datos reales desde PostgreSQL. 🎉
