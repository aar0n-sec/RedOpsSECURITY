'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const uploadFormSchema = z.object({
  file: z
    .custom<FileList>((value) => value instanceof FileList && value.length === 1, {
      message: 'Select one image file.',
    })
    .refine((files) => files[0]?.size <= 5 * 1024 * 1024, 'Images must be 5 MB or smaller.')
    .refine(
      (files) => ['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(files[0]?.type),
      'Only JPG, PNG, WebP, and AVIF images are allowed.',
    ),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

export default function CloudinaryUploadField() {
  const [result, setResult] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
  });

  const onSubmit = handleSubmit(async ({ file }) => {
    const formData = new FormData();
    formData.append('file', file[0]);

    const response = await fetch('/api/admin/images', {
      method: 'POST',
      body: formData,
    });

    const payload = (await response.json()) as { image?: { secureUrl?: string }; error?: string };
    if (!response.ok) {
      setResult(payload.error || 'Upload failed');
      return;
    }

    setResult(payload.image?.secureUrl || 'Upload complete');
  });

  return (
    <form className="admin-upload-form" onSubmit={onSubmit}>
      <label htmlFor="cloudinary-file">Secure Cloudinary upload</label>
      <input id="cloudinary-file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" {...register('file')} />
      {errors.file?.message && <p role="alert">{errors.file.message}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Uploading...' : 'Upload image'}
      </button>
      {result && <output>{result}</output>}
    </form>
  );
}
