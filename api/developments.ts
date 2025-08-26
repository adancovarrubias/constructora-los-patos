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

    const developments = await simpleDb
      .selectFrom('developments')
      .select([
        'id', 
        'name', 
        'description', 
        'location',
        'image_url',
        'status',
        'delivery_date',
        'starting_price',
        'gallery_images'
      ])
      .execute();

    console.log('✅ Found developments:', developments.length);
    console.log('✅ First development with images:', developments[0]);

    // Transform the data to match frontend expectations
    const transformedDevelopments = developments.map(dev => ({
      ...dev,
      galleryImages: dev.gallery_images ? JSON.parse(dev.gallery_images) : [],
      models: [] // We'll add models in a separate query if needed
    }));

    console.log('✅ Transformed developments:', transformedDevelopments);

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
