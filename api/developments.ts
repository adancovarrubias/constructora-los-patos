import { Kysely, PostgresDialect, CamelCasePlugin } from 'kysely';
import { Pool } from 'pg';

interface Database {
  developments: {
    id: number;
    name: string;
    description: string;
    location: string;
    imageUrl: string;
    status: string;
    deliveryDate: string;
    startingPrice: string;
  };
  models: {
    id: number;
    developmentId: number;
    name: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
    price: string;
    imageUrl: string;
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

    if (!databaseUrl) {
      console.error('❌ FLOOT_DATABASE_URL is not set');
      return res.status(500).json({ error: 'Database configuration missing' });
    }

    const db = new Kysely<Database>({
      dialect: new PostgresDialect({
        pool: new Pool({ connectionString: databaseUrl }),
      }),
      plugins: [new CamelCasePlugin()],
    });

    console.log('🔍 Executing database query...');
    
    const developments = await db
      .selectFrom('developments')
      .selectAll()
      .execute();

    console.log('✅ Found developments:', developments.length);

    // Get models for each development
    const developmentsWithModels = await Promise.all(
      developments.map(async (dev) => {
        const models = await db
          .selectFrom('models')
          .selectAll()
          .where('developmentId', '=', dev.id)
          .execute();

        return { ...dev, models };
      })
    );

    console.log('✅ Vercel API: developments completed successfully');
    return res.status(200).json(developmentsWithModels);

  } catch (e) {
    console.error('❌ Vercel API error in developments:', e);
    return res.status(500).json({ error: e.message });
  }
}
