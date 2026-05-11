import { z } from 'zod';

export const blogSearchSchema = z.object({
  q: z.string().trim().max(120).optional().default(''),
  page: z.coerce.number().int().positive().max(500).optional().default(1),
  category: z.string().trim().max(80).optional().default(''),
  tag: z.string().trim().max(80).optional().default(''),
});

export const revalidateSchema = z.object({
  secret: z.string().min(32).optional(),
  slug: z.string().trim().max(120).optional(),
  type: z.string().trim().max(80).optional(),
  _type: z.string().trim().max(80).optional(),
});

export const imageUploadSchema = z.object({
  fileName: z.string().min(1).max(180),
  contentType: z.enum(['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  size: z.number().int().positive().max(5 * 1024 * 1024),
});
