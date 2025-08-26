import { Kysely, PostgresDialect, CamelCasePlugin } from 'kysely';
import { Pool } from 'pg';

interface Database {
  developments: {
    id: number;
    name: string;
    description: string;
    location: string;
    image_url: string;
    status: string;
    delivery_date: string;
    starting_price: string;
  };
  models: {
    id: number;
    development_id: number;
    name: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
    price: string;
    image_url: string;
    features: string[];
  };
}

export default async function handler(req: any, res: any) {
  console.log('🔍 Vercel API: /api/developments called');
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const databaseUrl = process.env.FLOOT_DATABASE_URL;
    console.log('🔍 Database URL exists:', !!databaseUrl);
    console.log('🔍 Database URL preview:', databaseUrl?.substring(0, 50) + '...');

    if (!databaseUrl) {
      console.error('❌ FLOOT_DATABASE_URL is not set');
      return res.status(500).json({ error: 'Database configuration missing' });
    }

    console.log('🔍 Creating database connection...');
    const db = new Kysely({
      dialect: new PostgresDialect({
        pool: new Pool({ connectionString: databaseUrl }),
      }),
      plugins: [new CamelCasePlugin()],
    });

    console.log('🔍 Testing simple query first...');
    
    // First try a simple query without CamelCase plugin
    const simpleDb = new Kysely({
      dialect: new PostgresDialect({
        pool: new Pool({ connectionString: databaseUrl }),
      }),
    });

    // Query with the correct column names from schema.tsx
    const developments = await simpleDb
      .selectFrom('developments')
      .select([
        'id', 
        'name', 
        'description', 
        'location',
        'image_url',    // This should exist according to schema
        'tagline',      // This should exist according to schema  
        'starting_price', // This should exist according to schema
        'gallery_images', // This should exist according to schema
        'features'      // This should exist according to schema
      ])
      .execute();

    console.log('✅ Found developments:', developments.length);
    console.log('✅ Sample development with all fields:', developments[0]);

    // Get models for each development
    const modelsResults = await simpleDb
      .selectFrom('development_models')
      .selectAll()
      .execute();

    console.log('🏠 Found models:', modelsResults.length);

    // Transform the data to match frontend expectations
    const transformedDevelopments = developments.map(dev => {
      let galleryImages = [];
      try {
        if (dev.gallery_images && typeof dev.gallery_images === 'string') {
          galleryImages = JSON.parse(dev.gallery_images);
        } else if (Array.isArray(dev.gallery_images)) {
          galleryImages = dev.gallery_images;
        }
      } catch (e) {
        console.log('⚠️ Failed to parse gallery_images for', dev.name, ':', e.message);
        galleryImages = [];
      }

      // Get models for this development
      const developmentModels = modelsResults.filter(model => model.development_id === dev.id);

      return {
        ...dev,
        imageUrl: dev.image_url, // Convert snake_case to camelCase
        startingPrice: dev.starting_price,
        galleryImages: galleryImages,
        models: developmentModels
      };
    });

    console.log('✅ Transformed developments sample:', JSON.stringify(transformedDevelopments[0], null, 2));

    return res.status(200).json(transformedDevelopments);

  } catch (e: any) {
    console.error('❌ Vercel API error in developments:', e);
    console.error('❌ Error stack:', e.stack);
    return res.status(500).json({ 
      error: e.message,
      type: e.constructor.name,
      stack: e.stack?.split('\n')[0]
    });
  }
};
