const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local
const env = {};
const envContent = fs.readFileSync('.env.local', 'utf-8');
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const k = parts[0].trim();
    const v = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
    env[k] = v;
  }
});

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false }
});

function getDirectUrl(imgUrl) {
  if (!imgUrl) return null;
  const match = imgUrl.match(/url=([^&]+)/);
  if (match) {
    return decodeURIComponent(match[1]);
  }
  return imgUrl;
}

async function fetchWithRetry(url, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        },
        signal: AbortSignal.timeout(12000)
      });
      if (res.ok) return res;
      if (res.status === 404) return null; // Image doesn't exist on CDN
    } catch (e) {
      if (attempt === retries) return null;
      await new Promise(r => setTimeout(r, 600));
    }
  }
  return null;
}

async function processProduct(item) {
  if (!item.image) return { status: 'skipped_no_image' };
  
  // If already migrated to Supabase (webp or png)
  if (item.image.includes(SUPABASE_URL)) {
    return { status: 'already_done' };
  }

  const directUrl = getDirectUrl(item.image);
  if (!directUrl || !directUrl.startsWith('http')) {
    return { status: 'invalid_url' };
  }

  try {
    const res = await fetchWithRetry(directUrl);
    if (!res) {
      return { status: 'fetch_failed' };
    }

    const arrayBuf = await res.arrayBuffer();
    const rawBuffer = Buffer.from(arrayBuf);

    // Optimize and compress to 400x400 WebP
    const webpBuffer = await sharp(rawBuffer)
      .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();

    const fileName = `${item.sku}.webp`;

    const { error } = await supabase.storage.from('products').upload(fileName, webpBuffer, {
      contentType: 'image/webp',
      upsert: true
    });

    if (error) {
      return { status: 'upload_error', error: error.message };
    }

    item.image = `${SUPABASE_URL}/storage/v1/object/public/products/${fileName}`;
    return { status: 'uploaded' };
  } catch (err) {
    return { status: 'error', error: err.message };
  }
}

async function migrateCategory(filePath, concurrency = 16) {
  const fileName = path.basename(filePath);
  const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const total = products.length;

  console.log(`\nStarting: ${fileName} (${total} items)`);

  let uploaded = 0;
  let alreadyDone = 0;
  let failed = 0;

  for (let i = 0; i < total; i += concurrency) {
    const chunk = products.slice(i, i + concurrency);
    
    await Promise.all(chunk.map(async (item) => {
      const res = await processProduct(item);
      if (res.status === 'uploaded') uploaded++;
      else if (res.status === 'already_done') alreadyDone++;
      else failed++;
    }));

    const processed = Math.min(i + concurrency, total);
    if (processed % 48 === 0 || processed === total) {
      process.stdout.write(`\rProgress: ${processed}/${total} | Uploaded: ${uploaded} | Existing: ${alreadyDone} | Failed: ${failed}`);
      fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
  console.log(`\nFinished ${fileName} -> +${uploaded} uploaded, ${alreadyDone} existing, ${failed} failed.`);
}

async function main() {
  const targetFile = process.argv[2];
  const productsDir = path.join(__dirname, '..', 'src', 'data', 'products');

  if (targetFile) {
    const fullPath = path.isAbsolute(targetFile) ? targetFile : path.join(process.cwd(), targetFile);
    await migrateCategory(fullPath);
  } else {
    const files = fs.readdirSync(productsDir).filter(f => f.endsWith('.json'));
    console.log(`Processing ${files.length} catalog categories...`);
    for (const f of files) {
      await migrateCategory(path.join(productsDir, f));
    }
    console.log(`\nALL CATEGORIES COMPLETED SUCCESSFULLY!`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
