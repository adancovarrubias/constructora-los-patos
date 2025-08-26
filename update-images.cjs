const { Client } = require('pg');

async function updateImages() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_b27HtkhCXOed@ep-lively-block-ad4oapwk-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require'
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Update main images with real working URLs
    await client.query(`
      UPDATE developments 
      SET image_url = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center' 
      WHERE name = 'Torres Colón'
    `);

    await client.query(`
      UPDATE developments 
      SET image_url = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&crop=center' 
      WHERE name = 'Las Ceibas Manzanillo'
    `);

    await client.query(`
      UPDATE developments 
      SET image_url = 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop&crop=center' 
      WHERE name = 'Ecoterra Paraíso'
    `);

    console.log('✅ Main images updated successfully');

    // Update gallery images with working URLs
    const torresGallery = JSON.stringify([
      {
        "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center",
        "alt": "Vista exterior Torres Colón"
      },
      {
        "url": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center",
        "alt": "Lobby elegante con diseño moderno"
      },
      {
        "url": "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=800&h=600&fit=crop&crop=center",
        "alt": "Piscina con área de recreación"
      },
      {
        "url": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
        "alt": "Gimnasio completamente equipado"
      }
    ]);

    const ecoterraGallery = JSON.stringify([
      {
        "url": "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop&crop=center",
        "alt": "Vista general del desarrollo Ecoterra"
      },
      {
        "url": "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop&crop=center",
        "alt": "Casa modelo con diseño sostenible"
      },
      {
        "url": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&crop=center",
        "alt": "Jardines comunitarios y áreas verdes"
      },
      {
        "url": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
        "alt": "Senderos ecológicos para caminatas"
      }
    ]);

    const ceibasGallery = JSON.stringify([
      {
        "url": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&crop=center",
        "alt": "Vista panorámica al mar desde Las Ceibas"
      },
      {
        "url": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&crop=center",
        "alt": "Playa privada exclusiva para residentes"
      },
      {
        "url": "https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=800&h=600&fit=crop&crop=center",
        "alt": "Villa modelo frente al mar"
      },
      {
        "url": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
        "alt": "Atardecer desde la terraza de las villas"
      }
    ]);

    await client.query(`
      UPDATE developments 
      SET gallery_images = $1
      WHERE name = 'Torres Colón'
    `, [torresGallery]);

    await client.query(`
      UPDATE developments 
      SET gallery_images = $1
      WHERE name = 'Ecoterra Paraíso'
    `, [ecoterraGallery]);

    await client.query(`
      UPDATE developments 
      SET gallery_images = $1
      WHERE name = 'Las Ceibas Manzanillo'
    `, [ceibasGallery]);

    console.log('✅ Gallery images updated successfully');

    // Verify the changes
    const result = await client.query('SELECT name, image_url FROM developments ORDER BY id');
    console.log('📋 Updated image URLs:');
    result.rows.forEach(row => {
      console.log(`- ${row.name}: ${row.image_url}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

updateImages();
