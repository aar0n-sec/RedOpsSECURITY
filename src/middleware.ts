import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hasAdminAccess } from '@/lib/security/admin';

const isAdminRoute = createRouteMatcher(['/admin(.*)', '/api/admin(.*)', '/api/draft(.*)']);

export default clerkMiddleware(
  async (auth, request: NextRequest) => {
    if (isAdminRoute(request)) {
      const signInUrl = new URL('/sign-in', request.url).toString();
      const authObject = await auth.protect({
        unauthenticatedUrl: signInUrl,
        unauthorizedUrl: signInUrl,
      });
      const claims = authObject.sessionClaims as Record<string, unknown>;
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
  },
  {
    signInUrl: '/sign-in',
    signUpUrl: '/sign-up',
    afterSignInUrl: '/admin/studio',
    afterSignUpUrl: '/admin/studio',
  },
);

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/draft/:path*'],
};
