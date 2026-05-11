import { auth, currentUser } from '@clerk/nextjs/server';

type ClerkClaims = Record<string, unknown> & {
  metadata?: Record<string, unknown>;
  publicMetadata?: Record<string, unknown>;
};

export type AdminActor = {
  id: string;
  email?: string;
  role?: string;
};

export class AdminForbiddenError extends Error {
  constructor() {
    super('Admin access required');
  }
}

const ADMIN_ROLES = new Set(['admin', 'redops_admin', 'security_admin', 'org:admin']);

function readClaim(claims: ClerkClaims | null | undefined, keys: string[]) {
  for (const key of keys) {
    const direct = claims?.[key];
    if (typeof direct === 'string') return direct;

    const metadata = claims?.metadata?.[key] || claims?.publicMetadata?.[key];
    if (typeof metadata === 'string') return metadata;
  }

  return undefined;
}

export function hasAdminAccess(input: {
  sessionClaims?: ClerkClaims | null;
  orgRole?: string | null;
  email?: string | null;
}) {
  const role =
    input.orgRole ||
    readClaim(input.sessionClaims, ['role', 'adminRole', 'redopsRole', 'org_role']);
  const allowedEmails = (process.env.REDOPS_ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  const email = input.email?.toLowerCase();

  return Boolean(
    (role && ADMIN_ROLES.has(role)) || (email && allowedEmails.includes(email)),
  );
}

export async function requireAdminActor(): Promise<AdminActor> {
  const authObject = await auth.protect();
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (
    !hasAdminAccess({
      sessionClaims: authObject.sessionClaims as ClerkClaims,
      orgRole: authObject.orgRole,
      email,
    })
  ) {
    throw new AdminForbiddenError();
  }

  return {
    id: authObject.userId,
    email,
    role: authObject.orgRole || readClaim(authObject.sessionClaims as ClerkClaims, ['role']),
  };
}
