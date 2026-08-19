/**
 * Custom worker wrapper to force no-cache on HTML responses
 * This bypasses the Cloudflare edge cache for HTML files
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // For HTML routes, add no-cache headers
    const isHTML = url.pathname.endsWith('/') || 
                   url.pathname.endsWith('/index.html') ||
                   (!url.pathname.includes('.') && !url.pathname.includes('/static/') && !url.pathname.includes('/prescript') && !url.pathname.includes('/postscript'));
    
    // Let the assets handler process the request
    const response = await env.ASSETS.fetch(request);
    
    if (isHTML) {
      // Clone response and add cache headers
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      newHeaders.set('Pragma', 'no-cache');
      newHeaders.set('Expires', '0');
      
      return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
      });
    }
    
    return response;
  },
};