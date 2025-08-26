const { Client } = require('pg');

async function restoreOriginalData() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_b27HtkhCXOed@ep-lively-block-ad4oapwk-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require'
  });

  try {
    await client.connect();
    console.log('Connected to database - Restoring original data...');

    // Clear all existing data
    await client.query('DELETE FROM development_models');
    await client.query('DELETE FROM developments');
    
    // Insert original developments with correct information
    await client.query(`
      INSERT INTO developments (id, name, description, location, tagline, starting_price, features, gallery_images, image_url)
      VALUES 
      (1, 'Torres Colón', 'Desarrollo residencial premium ubicado en el corazón de Guadalajara, ofreciendo departamentos modernos con acabados de primera calidad y amenidades exclusivas para toda la familia.', 'Guadalajara, Jalisco', 'Departamento Urbano en Torres Colón', 2400000.00, 
       '["Estacionamiento", "Área de servicio", "Acabados de calidad", "Ubicación céntrica", "Departamentos modernos", "Amenidades exclusivas"]',
       '[{"url":"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600","alt":"Vista exterior Torres Colón"},{"url":"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600","alt":"Lobby moderno Torres Colón"},{"url":"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600","alt":"Amenidades Torres Colón"},{"url":"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600","alt":"Departamentos Torres Colón"}]',
       'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600'),
      
      (2, 'Ecoterra Paraíso', 'Un desarrollo sostenible que combina la vida moderna con la naturaleza. Ubicado en Puerto Vallarta, ofrece casas ecológicas con tecnología verde y espacios verdes amplios.', 'Puerto Vallarta, Jalisco', 'Vivir en armonía con la naturaleza', 1800000.00,
       '["Paneles solares", "Sistema de recolección de agua", "Jardines comunitarios", "Senderos ecológicos", "Parque infantil natural", "Centro de reciclaje", "Tecnología verde", "Espacios sustentables"]',
       '[{"url":"https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600","alt":"Vista general Ecoterra"},{"url":"https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600","alt":"Casa modelo sostenible"},{"url":"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600","alt":"Jardines comunitarios"},{"url":"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600","alt":"Senderos ecológicos"}]',
       'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600'),
       
      (3, 'Las Ceibas Manzanillo', 'Exclusivo proyecto residencial cerca de la playa en Manzanillo. Ofrece condominios de calidad con acceso a amenidades y espacios de recreación cerca del mar.', 'Manzanillo, Colima', 'Condominios Exclusivos a Minutos de la Playa', 1950000.00,
       '["Cerca de la playa", "Condominios exclusivos", "Amenidades de calidad", "Espacios de recreación", "SUN ROOF opcional", "Estacionamiento", "Seguridad", "Areas comunes"]',
       '[{"url":"https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600","alt":"Vista Las Ceibas"},{"url":"https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600","alt":"Amenidades Las Ceibas"},{"url":"https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=800&h=600","alt":"Condominios Las Ceibas"},{"url":"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600","alt":"Espacios exteriores Las Ceibas"}]',
       'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600')
    `);

    // Insert original models for Torres Colón
    await client.query(`
      INSERT INTO development_models (development_id, name, bedrooms, bathrooms, size_m2, price, description, features)
      VALUES 
      (1, 'Andalucía', 2, 1, 58.64, 2400000.00, 'Un espacio diseñado para la vida moderna. El modelo Andalucía ofrece una distribución inteligente que maximiza el confort y la funcionalidad, ideal para familias jóvenes y profesionales.', 
       '["2 recámaras", "1 baño completo", "Cocina integrada", "Sala - comedor", "Área de servicio", "Estacionamiento"]'),
      
      (1, 'Turín', 2, 1, 65.00, 2600000.00, 'Modelo Turín con espacios amplios y diseño contemporáneo para mayor comodidad.', 
       '["2 recámaras amplias", "1 baño completo", "Cocina moderna", "Sala - comedor espacioso", "Área de servicio", "Estacionamiento"]'),
       
      (1, 'Milán', 3, 2, 78.00, 2900000.00, 'El modelo Milán ofrece el máximo espacio y comodidad con 3 recámaras y distribución premium.', 
       '["3 recámaras", "2 baños completos", "Cocina integral", "Sala - comedor", "Área de servicio", "Estacionamiento", "Balcón"]')
    `);

    // Insert original models for Las Ceibas
    await client.query(`
      INSERT INTO development_models (development_id, name, bedrooms, bathrooms, size_m2, price, description, features)
      VALUES 
      (3, 'Milos', 2, 1, 55.11, 1950000.00, 'Modelo Milos, condominio compacto y funcional cerca de la playa con opción a SUN ROOF.', 
       '["2 recámaras con closet", "1 baño completo", "Cocina integral con barra", "Sala - comedor", "Cuarto de lavado", "1 Estacionamiento", "Opción SUN ROOF"]'),
      
      (3, 'Kios', 2, 2, 64.68, 2150000.00, 'Modelo Kios con upgrade a 2 baños completos y mayor espacio, perfecto para familias.', 
       '["2 recámaras con closet", "2 baños completos", "Cocina integral con barra", "Sala - comedor", "Cuarto de lavado", "1 Estacionamiento", "Opción SUN ROOF"]'),
       
      (3, 'Yaros', 3, 2, 72.00, 2350000.00, 'Modelo Yaros, la opción más espaciosa con 3 recámaras y acabados premium.', 
       '["3 recámaras con closet", "2 baños completos", "Cocina integral", "Sala - comedor amplio", "Cuarto de lavado", "1 Estacionamiento", "Opción SUN ROOF"]')
    `);

    // Insert original model for Ecoterra  
    await client.query(`
      INSERT INTO development_models (development_id, name, bedrooms, bathrooms, size_m2, price, description, features)
      VALUES 
      (2, 'Bonanza', 3, 2, 95.00, 1800000.00, 'Casa Bonanza, modelo ecológico con tecnología sustentable y espacios verdes integrados.', 
       '["3 recámaras", "2 baños completos", "Cocina ecológica", "Sala - comedor", "Jardín privado", "Paneles solares", "Sistema de agua", "Diseño sustentable"]')
    `);

    console.log('✅ Original data restored successfully');

    // Verify the restoration
    const developments = await client.query('SELECT name, location, starting_price FROM developments ORDER BY id');
    console.log('📋 Restored developments:');
    developments.rows.forEach(row => {
      const price = new Intl.NumberFormat("es-MX", {
        style: "currency", 
        currency: "MXN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(parseFloat(row.starting_price));
      console.log(`- ${row.name}: ${row.location} - Desde ${price}`);
    });

    const models = await client.query(`
      SELECT d.name as development_name, dm.name as model_name, dm.bedrooms, dm.bathrooms, dm.size_m2, dm.price
      FROM developments d
      JOIN development_models dm ON d.id = dm.development_id
      ORDER BY d.id, dm.price
    `);
    
    console.log('🏠 Restored models:');
    models.rows.forEach(row => {
      const price = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN", 
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(parseFloat(row.price));
      console.log(`- ${row.development_name}: ${row.model_name} (${row.bedrooms}R/${row.bathrooms}B, ${row.size_m2}m²) - ${price}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

restoreOriginalData();
