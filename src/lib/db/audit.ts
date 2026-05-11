import { createHash } from 'crypto';
import type { AdminActor } from '../security/admin';
import { getServiceClient } from '../supabase';

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
  try {
    const db = getServiceClient();
    await db.from('audit_logs').insert({
      actor_id: input.actor?.id,
      actor_email: input.actor?.email,
      action: input.action,
      resource_type: input.resourceType,
      resource_id: input.resourceId,
      ip_hash: hashIp(input.ip),
      metadata: input.metadata || null,
    });
  } catch (error) {
    console.error('Audit logging failed', error);
  }
}
