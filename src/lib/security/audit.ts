import { createHash } from 'crypto';
import type { AdminActor } from './admin';
import { sanityEnv } from '@/sanity/lib/env';
import { sanityWriteClient } from '@/sanity/lib/client';

type AuditInput = {
  actor?: AdminActor;
  action: string;
  resourceType?: string;
  resourceId?: string;
  ip?: string;
  metadata?: Record<string, unknown>;
};

function hashIp(ip?: string) {
  if (!ip || ip === 'unknown') return undefined;
  return createHash('sha256').update(ip).digest('hex');
}

export async function writeAuditLog(input: AuditInput) {
  if (!sanityEnv.isConfigured || !sanityEnv.writeToken) return;

  try {
    await sanityWriteClient.create({
      _type: 'adminAuditLog',
      actorId: input.actor?.id,
      actorEmail: input.actor?.email,
      action: input.action,
      resourceType: input.resourceType,
      resourceId: input.resourceId,
      ipHash: hashIp(input.ip),
      metadata: input.metadata ? JSON.stringify(input.metadata).slice(0, 4000) : undefined,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Audit logging failed', error);
  }
}
