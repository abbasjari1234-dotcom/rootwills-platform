import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const sku = (formData.get('sku') as string) || `custom_${Date.now()}`;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const rawBuffer = Buffer.from(arrayBuffer);

    // Compress & convert to optimized WebP
    const webpBuffer = await sharp(rawBuffer)
      .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();

    const fileName = `${sku.replace(/[^a-zA-Z0-9_-]/g, '_')}_${Date.now()}.webp`;

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
    return NextResponse.json({ error: err.message || 'Image upload failed' }, { status: 500 });
  }
}

