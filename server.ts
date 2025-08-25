import "./loadEnv.js";
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server';

const app = new Hono();

app.post('/_api/contact',async c => {
  try {
    const { handle } = await import("./endpoints/contact_POST.js");
    let request = c.req.raw;
    const response = await handle(request);
    if (!(response instanceof Response) && response.constructor.name !== "Response") {
      return c.text("Invalid response format. handle should always return a Response object." + response.constructor.name, 500);
    }
    return response;
  } catch (e) {
    console.error(e);
    return c.text("Error loading endpoint code " + e.message,  500)
  }
})
app.get('/_api/developments',async c => {
  console.log('🔍 Server: /_api/developments endpoint called');
  try {
    const { handle } = await import("./endpoints/developments_GET.js");
    let request = c.req.raw;
    const response = await handle(request);
    if (!(response instanceof Response) && response.constructor.name !== "Response") {
      console.error('❌ Invalid response format:', response.constructor.name);
      return c.text("Invalid response format. handle should always return a Response object." + response.constructor.name, 500);
    }
    console.log('✅ Server: developments endpoint completed successfully');
    return response;
  } catch (e) {
    console.error('❌ Server error in developments endpoint:', e);
    return c.text("Error loading endpoint code " + e.message,  500)
  }
})
app.use('/*', serveStatic({ root: './dist' }))
app.get("*", async (c, next) => {
  const p = c.req.path;
  if (p.startsWith("/_api")) {
    return next();
  }
  return serveStatic({ path: "./dist/index.html" })(c, next);
});
serve({ fetch: app.fetch, port: 3344 });
console.log("Running at http://localhost:3344")
      