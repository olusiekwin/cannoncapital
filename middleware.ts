import { next } from "@vercel/functions";

/** Must match canonical host in src/lib/seo.ts and index.html inline script. */
const CANONICAL_HOST = "cannoncapitalpartners.org";

/**
 * Vercel Routing Middleware: www → apex 301.
 * vercel.json `redirects` + `has: host` is unreliable for static Vite output; this runs on the Edge.
 */
export default function middleware(request: Request) {
  const url = new URL(request.url);
  if (url.hostname === `www.${CANONICAL_HOST}`) {
    url.hostname = CANONICAL_HOST;
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
