import {type GeneratedAlways, Kysely, CamelCasePlugin} from 'kysely'
import {PostgresJSDialect} from 'kysely-postgres-js'
import {DB} from './schema'
import postgres from 'postgres'

// Verificar que la URL de la base de datos esté configurada
const databaseUrl = process.env.FLOOT_DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ FLOOT_DATABASE_URL no está configurada');
  console.log('📝 Asegúrate de configurar la variable de entorno FLOOT_DATABASE_URL');
  console.log('Ejemplo: FLOOT_DATABASE_URL=postgresql://user:password@localhost:5432/constructora_los_patos');
}

const sql = postgres(databaseUrl || '', {
  prepare: false,
  idle_timeout: 10,
  max: 3,
  onnotice: () => {}, // Silenciar notices de PostgreSQL
  onparameter: () => {}, // Silenciar parámetros
});

// Test connection on startup
sql`SELECT 1 as test`.then(() => {
  console.log('✅ Conexión a PostgreSQL establecida correctamente');
}).catch((error) => {
  console.error('❌ Error conectando a PostgreSQL:', error.message);
  console.log('🔧 Verifica que:');
  console.log('   • PostgreSQL esté ejecutándose');
  console.log('   • La URL de conexión sea correcta');
  console.log('   • Las credenciales sean válidas');
  console.log('   • La base de datos exista');
});

export const db = new Kysely<DB>({
  plugins: [new CamelCasePlugin()],
  dialect: new PostgresJSDialect({
    postgres: sql,
  }),
})