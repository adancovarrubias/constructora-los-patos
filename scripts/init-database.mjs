#!/usr/bin/env node

import postgres from 'postgres';
import { readFileSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

// Cargar variables de entorno
config({ path: '.env.local' });

const databaseUrl = process.env.FLOOT_DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ FLOOT_DATABASE_URL no está configurada');
  process.exit(1);
}

console.log('🔌 Conectando a la base de datos...');

const sql = postgres(databaseUrl, {
  ssl: 'require',
  prepare: false,
});

try {
  // Leer el archivo SQL de inicialización
  const sqlScript = readFileSync(join(process.cwd(), 'database/init.sql'), 'utf8');
  
  console.log('📝 Ejecutando script de inicialización...');
  
  // Ejecutar el script completo usando unsafe
  await sql.unsafe(sqlScript);
  
  console.log('🎉 Base de datos inicializada correctamente!');
  
  // Verificar que los datos se insertaron
  const developments = await sql`SELECT COUNT(*) as count FROM developments`;
  const models = await sql`SELECT COUNT(*) as count FROM development_models`;
  
  console.log(`📊 Datos insertados:`);
  console.log(`   • ${developments[0].count} desarrollos`);
  console.log(`   • ${models[0].count} modelos de vivienda`);

} catch (error) {
  console.error('❌ Error ejecutando la inicialización:', error.message);
  process.exit(1);
} finally {
  await sql.end();
}
