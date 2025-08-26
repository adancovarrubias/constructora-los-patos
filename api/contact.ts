import "../loadEnv.js";

export default async function handler(req: any, res: any) {
  console.log('🔍 Vercel API: /api/contact called');
  
  try {
    // Convert VercelRequest to standard Request
    const url = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}${req.url}`;
    const request = new Request(url, {
      method: req.method || 'POST',
      headers: req.headers as any,
      body: JSON.stringify(req.body),
    });

    const { handle } = await import("../endpoints/contact_POST.js");
    const response = await handle(request);
    
    console.log('✅ Vercel API: contact completed successfully');
    
    // Convert Response to Vercel format
    const data = await response.text();
    const contentType = response.headers.get('content-type') || 'application/json';
    
    res.status(response.status);
    res.setHeader('Content-Type', contentType);
    res.end(data);
  } catch (e) {
    console.error('❌ Vercel API error in contact:', e);
    res.status(500).json({ error: e.message });
  }
}
