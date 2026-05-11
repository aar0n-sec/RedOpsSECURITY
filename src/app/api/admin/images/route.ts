import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';
import { NextResponse, type NextRequest } from 'next/server';
import { requireAdminActor, AdminForbiddenError } from '@/lib/security/admin';
import { writeAuditLog } from '@/lib/security/audit';
import { assertSameOrigin } from '@/lib/security/csrf';
import { clientIp, rateLimit } from '@/lib/security/rate-limit';
import { imageUploadSchema } from '@/lib/security/validators';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) return false;

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return true;
}

function uploadBuffer(buffer: Buffer, fileName: string) {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'redops/blog',
        resource_type: 'image',
        public_id: fileName.replace(/\.[a-z0-9]+$/i, '').replace(/[^a-z0-9-_]/gi, '-'),
        overwrite: false,
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error('Cloudinary upload failed'));
          return;
        }
        resolve(result);
      },
    );

    stream.end(buffer);
  });
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);

  try {
    if (!assertSameOrigin(request)) {
      return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
    }

    const rate = await rateLimit({
      key: `admin:image:${ip}`,
      limit: 20,
      windowSeconds: 60,
    });

    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many upload attempts' },
        {
          status: 429,
          headers: {
            'Retry-After': `${Math.ceil((rate.resetAt - Date.now()) / 1000)}`,
          },
        },
      );
    }

    const actor = await requireAdminActor();
    if (!configureCloudinary()) {
      return NextResponse.json({ error: 'Cloudinary is not configured' }, { status: 503 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
    }

    const parsed = imageUploadSchema.safeParse({
      fileName: file.name,
      contentType: file.type,
      size: file.size,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid image upload', issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const result = await uploadBuffer(Buffer.from(await file.arrayBuffer()), file.name);

    await writeAuditLog({
      actor,
      action: 'cloudinary.image.upload',
      resourceType: 'cloudinaryImage',
      resourceId: result.public_id,
      ip,
      metadata: {
        bytes: result.bytes,
        format: result.format,
        width: result.width,
        height: result.height,
      },
    });

    return NextResponse.json({
      image: {
        publicId: result.public_id,
        secureUrl: result.secure_url,
        url: result.url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    });
  } catch (error) {
    if (error instanceof AdminForbiddenError) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    console.error('Cloudinary upload failed', error);
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
}
