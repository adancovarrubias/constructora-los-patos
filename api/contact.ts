module.exports = async function handler(req: any, res: any) {
  console.log('🔍 Vercel API: /api/contact called');
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, developmentId } = req.body;
    
    console.log('📧 Contact form submission:', { name, email, developmentId });
    
    // Here you would typically save to database or send email
    // For now, just return success
    
    console.log('✅ Vercel API: contact completed successfully');
    return res.status(200).json({ 
      success: true, 
      message: 'Mensaje enviado correctamente' 
    });

  } catch (e) {
    console.error('❌ Vercel API error in contact:', e);
    return res.status(500).json({ error: e.message });
  }
}
