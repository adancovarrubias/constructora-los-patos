import "../loadEnv.js";

export default async function handler(request) {
  console.log('🔍 Vercel API: /api/developments called');
  
  try {
    const { handle } = await import("../endpoints/developments_GET.js");
    const response = await handle(request);
    
    if (!(response instanceof Response) && response.constructor.name !== "Response") {
      console.error('❌ Invalid response format:', response.constructor.name);
      return new Response("Invalid response format", { status: 500 });
    }
    
    console.log('✅ Vercel API: developments completed successfully');
    return response;
  } catch (e) {
    console.error('❌ Vercel API error in developments:', e);
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
