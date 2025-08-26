import "../loadEnv.js";

export default async function handler(req: any, res: any) {
  console.log('🔍 Vercel API: /api/developments called');
  
  try {
    // Convert VercelRequest to standard Request
    const url = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}${req.url}`;
    const request = new Request(url, {
      method: req.method || 'GET',
      headers: req.headers as any,
    });

    const { handle } = await import("../endpoints/developments_GET.js");
    const response = await handle(request);
    
    console.log('✅ Vercel API: developments completed successfully');
    
    // Convert Response to Vercel format
    const data = await response.text();
    const contentType = response.headers.get('content-type') || 'application/json';
    
    res.status(response.status);
    res.setHeader('Content-Type', contentType);
    res.end(data);
  } catch (e) {
    console.error('❌ Vercel API error in developments:', e);
    res.status(500).json({ error: e.message });
  }
}
