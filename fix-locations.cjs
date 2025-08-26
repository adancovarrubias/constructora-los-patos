const { Client } = require('pg');

async function fixLocations() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_b27HtkhCXOed@ep-lively-block-ad4oapwk-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require'
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Update locations
    await client.query(`
      UPDATE developments 
      SET location = 'Guadalajara, Jalisco' 
      WHERE name = 'Torres Colón'
    `);

    await client.query(`
      UPDATE developments 
      SET location = 'Manzanillo, Colima' 
      WHERE name = 'Las Ceibas Manzanillo'
    `);

    await client.query(`
      UPDATE developments 
      SET location = 'Puerto Vallarta, Jalisco' 
      WHERE name = 'Ecoterra Paraíso'
    `);

    console.log('✅ Locations updated successfully');

    // Also let's add some image URLs
    await client.query(`
      UPDATE developments 
      SET image_url = 'https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/torres-colon-main.jpg' 
      WHERE name = 'Torres Colón'
    `);

    await client.query(`
      UPDATE developments 
      SET image_url = 'https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/ceibas-main.jpg' 
      WHERE name = 'Las Ceibas Manzanillo'
    `);

    await client.query(`
      UPDATE developments 
      SET image_url = 'https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/ecoterra-main.jpg' 
      WHERE name = 'Ecoterra Paraíso'
    `);

    console.log('✅ Main images updated successfully');

    // Add models for each development
    console.log('Adding models for developments...');

    // First, get the development IDs
    const developmentIds = await client.query('SELECT id, name FROM developments ORDER BY id');
    const torres = developmentIds.rows.find(d => d.name === 'Torres Colón');
    const ecoterra = developmentIds.rows.find(d => d.name === 'Ecoterra Paraíso');
    const ceibas = developmentIds.rows.find(d => d.name === 'Las Ceibas Manzanillo');

    // Clear existing models
    await client.query('DELETE FROM development_models');

    // Torres Colón Models
    await client.query(`
      INSERT INTO development_models (development_id, name, bedrooms, bathrooms, size_m2, price, description, features)
      VALUES 
      ($1, 'Apartamento Compacto', 2, 2, 85.5, 180000, 'Apartamento moderno ideal para parejas o familias pequeñas', $2),
      ($1, 'Apartamento Familiar', 3, 2, 120.3, 250000, 'Espacioso apartamento con balcón y vista a la ciudad', $3),
      ($1, 'Penthouse Premium', 4, 3, 180.7, 380000, 'Lujoso penthouse con terraza privada y acabados premium', $4)
    `, [
      torres.id,
      JSON.stringify(["Balcón privado", "Cocina integral", "Aire acondicionado", "Closets empotrados"]),
      JSON.stringify(["Balcón amplio", "Cocina integral premium", "Master bedroom", "2 baños completos", "Área de lavado"]),
      JSON.stringify(["Terraza privada", "Jacuzzi", "Cocina gourmet", "Walk-in closet", "Estudio", "Vista panorámica"])
    ]);

    // Ecoterra Paraíso Models  
    await client.query(`
      INSERT INTO development_models (development_id, name, bedrooms, bathrooms, size_m2, price, description, features)
      VALUES 
      ($1, 'Casa Eco Básica', 2, 2, 95.0, 120000, 'Casa sostenible con tecnología verde básica', $2),
      ($1, 'Casa Eco Familiar', 3, 2, 140.0, 165000, 'Casa ecológica ideal para familias con jardín privado', $3),
      ($1, 'Casa Eco Premium', 4, 3, 200.0, 220000, 'Casa premium con todas las tecnologías verdes disponibles', $4)
    `, [
      ecoterra.id,
      JSON.stringify(["Paneles solares básicos", "Sistema de agua", "Jardín frontal", "Diseño bioclimático"]),
      JSON.stringify(["Paneles solares completos", "Recolección de lluvia", "Jardín amplio", "Huerto familiar", "Compostero"]),
      JSON.stringify(["Sistema solar completo", "Batería de respaldo", "Jardín diseñado", "Invernadero", "Sistema domótico", "Materiales premium"])
    ]);

    // Las Ceibas Manzanillo Models
    await client.query(`
      INSERT INTO development_models (development_id, name, bedrooms, bathrooms, size_m2, price, description, features)
      VALUES 
      ($1, 'Villa Frente Mar', 2, 2, 110.0, 95000, 'Villa con vista directa al mar y acceso a playa', $2),
      ($1, 'Villa Familiar Playa', 3, 2, 165.0, 135000, 'Villa espaciosa perfecta para vacaciones familiares', $3),
      ($1, 'Villa Luxury Ocean', 4, 4, 250.0, 195000, 'Villa de lujo con amenidades premium frente al océano', $4)
    `, [
      ceibas.id,
      JSON.stringify(["Vista al mar", "Terraza frente al mar", "Acceso directo a playa", "Cocina equipada"]),
      JSON.stringify(["Vista panorámica", "Terraza amplia", "Jardín privado", "Parrilla exterior", "Bodega"]),
      JSON.stringify(["Vista 180° al mar", "Piscina privada", "Terraza en azotea", "Cocina gourmet", "Master suite", "Cuarto de servicio"])
    ]);

    console.log('✅ Models added successfully');

    // Verify the changes
    const result = await client.query('SELECT name, location, image_url FROM developments ORDER BY id');
    console.log('📋 Updated developments:');
    result.rows.forEach(row => {
      console.log(`- ${row.name}: ${row.location} (${row.image_url ? 'has image' : 'no image'})`);
    });

    // Check models
    const models = await client.query(`
      SELECT d.name as development_name, dm.name as model_name, dm.bedrooms, dm.bathrooms, dm.price
      FROM developments d
      JOIN development_models dm ON d.id = dm.development_id
      ORDER BY d.id, dm.price
    `);
    
    console.log('\n📋 Models added:');
    models.rows.forEach(row => {
      console.log(`- ${row.development_name}: ${row.model_name} (${row.bedrooms}/${row.bathrooms}) - $${row.price}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

fixLocations();
