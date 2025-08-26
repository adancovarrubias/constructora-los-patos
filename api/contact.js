import "../loadEnv.js";

export default async function handler(request) {
  console.log('🔍 Vercel API: /api/contact called');
  
  try {
    const { handle } = await import("../endpoints/contact_POST.js");
    const response = await handle(request);
    
    if (!(response instanceof Response) && response.constructor.name !== "Response") {
      console.error('❌ Invalid response format:', response.constructor.name);
      return new Response("Invalid response format", { status: 500 });
    }
    
    console.log('✅ Vercel API: contact completed successfully');
    return response;
  } catch (e) {
    console.error('❌ Vercel API error in contact:', e);
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
