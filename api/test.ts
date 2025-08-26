module.exports = async function handler(req: any, res: any) {
  console.log('🔍 Test API called');
  
  try {
    const databaseUrl = process.env.FLOOT_DATABASE_URL;
    console.log('🔍 Database URL exists:', !!databaseUrl);
    console.log('🔍 Database URL length:', databaseUrl?.length || 0);
    console.log('🔍 Environment keys:', Object.keys(process.env).filter(k => k.includes('DATABASE')));
    
    return res.status(200).json({
      success: true,
      hasDbUrl: !!databaseUrl,
      urlLength: databaseUrl?.length || 0,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
  } catch (e: any) {
    console.error('❌ Test API error:', e);
    return res.status(500).json({ 
      error: e.message,
      type: e.constructor.name 
    });
  }
}
