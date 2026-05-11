import type { NextRequest } from 'next/server';

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function allowedOrigins(request: NextRequest) {
  const host = request.headers.get('host');
  const configuredSite = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;

  return [
    host ? `https://${host}` : undefined,
    host?.startsWith('localhost') ? `http://${host}` : undefined,
    configuredSite,
    vercelUrl,
  ].filter(Boolean) as string[];
}

export function assertSameOrigin(request: NextRequest) {
  if (!MUTATING_METHODS.has(request.method)) return true;

  const origin = request.headers.get('origin');
  if (!origin) return false;

  return allowedOrigins(request).some((allowed) => origin === allowed);
}
