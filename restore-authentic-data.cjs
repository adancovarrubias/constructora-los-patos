const postgres = require('postgres');

// Use the same database URL that your API uses in production
const databaseUrl = process.env.FLOOT_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ No database URL found. Please set FLOOT_DATABASE_URL or DATABASE_URL environment variable.');
  process.exit(1);
}

const sql = postgres(databaseUrl, {
  prepare: false,
  idle_timeout: 10,
  max: 3,
});

async function restoreAuthenticData() {
  try {
    // Test connection
    await sql`SELECT 1 as test`;
    console.log('✅ Connected to database');
    
    // Clear existing data
    await sql`DELETE FROM development_models`;
    await sql`DELETE FROM developments`;
    console.log('✅ Cleared existing data');
    
    // Insert authentic developments with REAL data from your pages
    const developmentsResult = await sql`
      INSERT INTO developments (name, slug, description, location, price, status, gallery_images, tagline, features) 
      VALUES 
        (
          'Torres Colón',
          'torres-colon',
          'Desarrollo residencial premium con amenidades de lujo',
          'Guadalajara, Jalisco',
          'Desde $2,400,000',
          'En construcción',
          ${sql.json([
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/f65604d1-4f44-4185-84bc-c6ef76659a9a.gif", "alt": "Juegos infantiles - Torres Colón"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/4402c4d8-5c5a-4c57-a6a6-80df86b38e3a.gif", "alt": "Área de asadores en azotea - Torres Colón"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/83481ce6-c050-4930-ac0b-952b2218cf8e.gif", "alt": "Gimnasio moderno - Torres Colón"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/40576222-9d49-4445-aab1-3c1d4de47808.gif", "alt": "Modelo del desarrollo - Torres Colón"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/7976e53e-6b99-4aad-8b4e-7c0a1eef8a8f.png", "alt": "Mapa de ubicación - Torres Colón"}
          ])},
          'Departamentos Modernos en el Corazón de Guadalajara',
          ${sql.json(["Alberca", "Área de asadores", "Gimnasio", "Juegos infantiles", "Parque para mascotas", "Espacios comerciales"])}
        ),
        (
          'Las Ceibas Manzanillo',
          'las-ceibas-manzanillo', 
          'Exclusivo proyecto frente al mar',
          'Manzanillo, Colón',
          'Precios competitivos',
          'Pre-venta',
          ${sql.json([
            {"url": "/images/ceibas-1.jpg", "alt": "Vista al mar Las Ceibas"},
            {"url": "/images/ceibas-2.jpg", "alt": "Playa Las Ceibas"}
          ])},
          'Condominios exclusivos a minutos de la playa',
          ${sql.json([])}
        ),
        (
          'Ecoterra Paraíso',
          'ecoterra-paraiso',
          'Vive en armonía con la naturaleza a solo 35 minutos de la playa',
          'Manzanillo, Colima', 
          'Desde $950,000',
          'Disponible',
          ${sql.json([
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/b2da5df8-aa72-492d-8099-65e067bbf705.gif", "alt": "Vista aérea de edificios departamentales con detalles arquitectónicos modernos en Ecoterra Paraíso"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/32b1dbbd-c8ee-4120-a67d-30eeda1c710f.gif", "alt": "Vista panorámica del desarrollo Ecoterra Paraíso con logotipo oficial"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/8a859b7b-544a-40db-80e1-d7e5228ab4e2.gif", "alt": "Vista aérea de las casas modelo Bonanza con característicos techos rojos"}
          ])},
          'Casas económicas a 35 minutos de la playa en una comunidad planeada',
          ${sql.json(["Escuelas", "Áreas deportivas", "Zona comercial", "Pozos de agua", "Transporte público"])}
        )
      RETURNING id, name
    `;
    
    console.log('✅ Inserted developments:', developmentsResult);
    
    // Get development IDs
    const torresColonId = developmentsResult.find(d => d.name === 'Torres Colón').id;
    const lasCeibasId = developmentsResult.find(d => d.name === 'Las Ceibas Manzanillo').id; 
    const ecoterraId = developmentsResult.find(d => d.name === 'Ecoterra Paraíso').id;
    
    // Insert authentic models with ALL original data from components
    await sql`
      INSERT INTO development_models (development_id, name, price, area, bedrooms, bathrooms, features, images, description)
      VALUES 
        -- Torres Colón models (3 models: Andalucía, Turín, Milán)
        (
          ${torresColonId},
          'Andalucía',
          2400000,
          58.64,
          2,
          1,
          ${sql.json(["2 recámaras", "1 baño completo", "Cocina integrada", "Sala - comedor", "Área de servicio", "Estacionamiento"])},
          ${sql.json([
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/55e8795e-849a-4f6a-b753-10f01d54cdd5.gif", "alt": "Plano del modelo Andalucía - Torres Colón"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/21db2f8d-3e2a-4ba6-9c5e-7b7d719be17e.gif", "alt": "Interior del modelo Andalucía - Torres Colón"}
          ])},
          'Un espacio diseñado para la vida moderna. El modelo Andalucía ofrece una distribución inteligente que maximiza el confort y la funcionalidad, ideal para familias jóvenes y profesionales.'
        ),
        (
          ${torresColonId},
          'Turín',
          2824430,
          69.16,
          2,
          2,
          ${sql.json(["2 recámaras", "2 baños completos", "Cocina integrada", "Sala - comedor", "Área de servicio", "Estacionamiento"])},
          ${sql.json([
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/297f8fbf-1508-4bf2-906f-e4a6387f556c.gif", "alt": "Plano del modelo Turín - Torres Colón"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/ea74ba11-1c41-4f0e-9ec1-07d7adf21f83.gif", "alt": "Interior del modelo Turín - Torres Colón"}
          ])},
          'Amplitud y elegancia se unen en el modelo Turín. Con dos baños completos y espacios generosos, es la opción perfecta para quienes buscan un extra de comodidad y estilo en la ciudad.'
        ),
        (
          ${torresColonId},
          'Milán', 
          2982492,
          73.06,
          2,
          2,
          ${sql.json(["2 recámaras", "2 baños completos", "Cocina integrada", "Sala - comedor amplia", "Área de servicio", "Estacionamiento"])},
          ${sql.json([
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/958918b3-d01c-4fa8-a16c-4da83f476bf3.gif", "alt": "Plano del modelo Milán - Torres Colón"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/55b8b001-57ac-460b-af16-bc8db26165c0.gif", "alt": "Interior del modelo Milán - Torres Colón"}
          ])},
          'El modelo Milán representa la máxima expresión de lujo y espacio. Con una distribución generosa y acabados de primera, es ideal para quienes buscan un estilo de vida superior sin sacrificar la comodidad urbana.'
        ),
        -- Las Ceibas models (3 models: Milos, Kios, Yaros)
        (
          ${lasCeibasId},
          'Milos',
          null,
          55.11, 
          2,
          1,
          ${sql.json(["2 recámaras con closet", "1 baño completo", "Cocina integral con barra", "Sala - comedor", "Cuarto de lavado", "1 Estacionamiento", "Con opción a SUN ROOF"])},
          ${sql.json([
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/77b78fb7-e1a5-43a8-89e8-2c928d2ec981.gif", "alt": "Plano del modelo Milos - Las Ceibas Manzanillo"}
          ])},
          'Modelo con opción a SUN ROOF'
        ),
        (
          ${lasCeibasId},
          'Kios',
          null,
          64.68,
          2, 
          2,
          ${sql.json(["2 recámaras con closet", "2 baños completos", "Cocina integral con barra", "Sala - comedor", "Cuarto de lavado", "1 Estacionamiento", "Con opción a SUN ROOF"])},
          ${sql.json([
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/4cb0fe2c-f436-483f-8a05-9500b0670c82.gif", "alt": "Plano del modelo Kios - Las Ceibas Manzanillo"}
          ])},
          'Upgrade con 2 baños completos y opción a SUN ROOF'
        ),
        (
          ${lasCeibasId},
          'Yaros',
          null,
          78.21,
          3,
          2,
          ${sql.json(["3 recámaras con closet", "2 baños completos", "Cocina integral con barra", "Sala - comedor", "Cuarto de lavado", "2 Estacionamientos", "Con opción a SUN ROOF"])},
          ${sql.json([
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/7abcdb2c-87a0-488e-9559-15d238997111.gif", "alt": "Plano del modelo Yaros - Las Ceibas Manzanillo"}
          ])},
          'MODELO PREMIUM - ¡3 recámaras! Más espacio y 2 estacionamientos'
        ),
        -- Ecoterra model (1 model: Bonanza)
        (
          ${ecoterraId},
          'Bonanza',
          950000,
          65,
          2,
          1, 
          ${sql.json(["2 recámaras", "1 baño completo", "Sala - comedor", "Cocina", "Patio de servicio", "Estacionamiento"])},
          ${sql.json([
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/469ca930-075c-45ec-bb42-940929b85612.gif", "alt": "Plano del modelo Bonanza - Ecoterra Paraíso"},
            {"url": "https://assets.floot.app/db2f7462-5369-478c-a930-83c9e7fb716f/a9ba31c7-353f-4484-85f5-40a4aadaddc3.gif", "alt": "Interior del modelo Bonanza - Ecoterra Paraíso"}
          ])},
          'Vive en armonía con la naturaleza a solo 35 minutos de la playa. El modelo Bonanza ofrece un diseño funcional y acogedor, perfecto para disfrutar de la tranquilidad y el paraíso.'
        )
    `;
    
    console.log('✅ Authentic data restored successfully!');
    console.log('📋 Desarrollos restaurados con TODOS los datos originales:');
    console.log('   🏢 Torres Colón (Guadalajara):');
    console.log('      • Andalucía: $2,400,000, 58.64m², 2 rec, 1 baño');
    console.log('      • Turín: $2,824,430, 69.16m², 2 rec, 2 baños');
    console.log('      • Milán: $2,982,492, 73.06m², 2 rec, 2 baños'); 
    console.log('      • Amenidades: Alberca, Gimnasio, Asadores, Juegos infantiles, Parque mascotas');
    console.log('   🏖️  Las Ceibas Manzanillo (Colón):');
    console.log('      • Milos: 55.11m², 2 rec, 1 baño (SUN ROOF)');
    console.log('      • Kios: 64.68m², 2 rec, 2 baños (SUN ROOF)');
    console.log('      • Yaros: 78.21m², 3 rec, 2 baños, 2 estacionamientos (PREMIUM + SUN ROOF)');
    console.log('   🌿 Ecoterra Paraíso (Manzanillo, Colima):'); 
    console.log('      • Bonanza: $950,000, 65m², 2 rec, 1 baño');
    console.log('      • Servicios: Escuelas, Deportivas, Comercial, Pozos agua, Transporte');
    console.log('🎯 TODOS los textos, precios, amenidades, imágenes y descripciones auténticas restauradas');
    
  } catch (error) {
    console.error('❌ Error restoring authentic data:', error);
  } finally {
    await sql.end();
  }
}

restoreAuthenticData();
