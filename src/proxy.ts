import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hasAdminAccess } from '@/lib/security/admin';

const isAdminRoute = createRouteMatcher(['/admin(.*)', '/api/admin(.*)', '/api/draft(.*)']);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  if (isAdminRoute(request)) {
    const authObject = await auth();

    if (!authObject.userId) {
      const signInUrl = new URL('/sign-in', request.url);
      return NextResponse.redirect(signInUrl);
    }

    const claims = (authObject.sessionClaims || {}) as Record<string, unknown>;
    const email =
      typeof claims.email === 'string'
        ? claims.email
        : typeof claims.primary_email_address === 'string'
          ? claims.primary_email_address
          : undefined;

    if (!hasAdminAccess({ sessionClaims: claims, orgRole: authObject.orgRole, email })) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
