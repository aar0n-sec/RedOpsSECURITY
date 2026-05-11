type RateLimitOptions = {
  key: string;
  limit: number;
  windowSeconds: number;
};

type LocalBucket = {
  count: number;
  resetAt: number;
};

const localBuckets = new Map<string, LocalBucket>();

async function upstashRateLimit({ key, limit, windowSeconds }: RateLimitOptions) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const rateKey = `rate:${key}:${Math.floor(Date.now() / (windowSeconds * 1000))}`;
  const response = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      ['INCR', rateKey],
      ['EXPIRE', rateKey, windowSeconds],
    ]),
    cache: 'no-store',
  });

  if (!response.ok) return null;

  const result = (await response.json()) as Array<{ result?: number }>;
  const count = Number(result[0]?.result || 0);

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    resetAt: Date.now() + windowSeconds * 1000,
  };
}

export async function rateLimit(options: RateLimitOptions) {
  const upstash = await upstashRateLimit(options);
  if (upstash) return upstash;

  const now = Date.now();
  const resetAt = now + options.windowSeconds * 1000;
  const current = localBuckets.get(options.key);

  if (!current || current.resetAt < now) {
    localBuckets.set(options.key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: options.limit - 1,
      resetAt,
    };
  }

  current.count += 1;
  localBuckets.set(options.key, current);

  return {
    allowed: current.count <= options.limit,
    remaining: Math.max(0, options.limit - current.count),
    resetAt: current.resetAt,
  };
}

export function clientIp(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}
