import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/security/auth-guard';
import { handleApiError } from '@/lib/security/error-handler';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
]);

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  // 1. Strict Administrative Authentication Verification
  const authCheck = verifyAdminAuth(req);
  if (!authCheck.authorized) {
    return unauthorizedResponse(authCheck.reason);
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const rawSku = (formData.get('sku') as string) || `custom_${Date.now()}`;
    const cleanSku = rawSku.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50);

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 2. Strict File Size Validation
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File size exceeds maximum permitted limit of 5MB.' },
        { status: 400 }
      );
    }

    // 3. Strict MIME-Type Validation
    if (!ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: 'Unsupported file type. Only JPEG, PNG, WEBP, and AVIF images are permitted.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const rawBuffer = Buffer.from(arrayBuffer);

    // Compress & convert to optimized WebP
    const webpBuffer = await sharp(rawBuffer)
      .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();

    const fileName = `${cleanSku}_${Date.now()}.webp`;

    if (!SUPABASE_URL || !SERVICE_KEY) {
      return NextResponse.json(
        { error: 'Cloud media storage credentials unconfigured on this environment.' },
        { status: 503 }
      );
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false }
    });

    const { error } = await supabase.storage.from('products').upload(fileName, webpBuffer, {
      contentType: 'image/webp',
      upsert: true
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/products/${fileName}`;
    return NextResponse.json({ success: true, url: publicUrl, fileName });
  } catch (err: any) {
    return handleApiError(err, 'Product image upload failed.');
  }
}

