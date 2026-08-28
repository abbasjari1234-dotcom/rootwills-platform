const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Master Rootwills Luxury Royal Warrant Favicon SVG
// 1. Full-bleed deep emerald obsidian background (#010E0A -> #031F17 -> #0A4232)
// 2. 24K Polished Gold Bezel (cx=256, cy=256, r=234, stroke-width=18)
// 3. Precision Emerald Accent Inlay Ring (r=216, stroke-width=4)
// 4. Ultra-high contrast, bold, optically centered 'RW' Royal Monogram
// 5. Rich specular highlights (#FFFDF5 -> #FDE089 -> #D9A026 -> #B0790E) with subtle drop shadow
const masterFaviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradient: Deep British Racing Green & Obsidian Emerald -->
    <radialGradient id="rwBg" cx="50%" cy="42%" r="68%">
      <stop offset="0%" stop-color="#0A4635" />
      <stop offset="45%" stop-color="#04261C" />
      <stop offset="78%" stop-color="#021812" />
      <stop offset="100%" stop-color="#010C08" />
    </radialGradient>

    <!-- Radiant 24K Luxury Gold Bullion Gradient -->
    <linearGradient id="rwGold" x1="10%" y1="8%" x2="90%" y2="92%">
      <stop offset="0%" stop-color="#FFFDF5" />
      <stop offset="18%" stop-color="#FEE79A" />
      <stop offset="48%" stop-color="#DEAA2E" />
      <stop offset="78%" stop-color="#B27B0E" />
      <stop offset="100%" stop-color="#FEEDAC" />
    </linearGradient>

    <!-- Outer Bezel Gold Gradient -->
    <linearGradient id="rwRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFBEB" />
      <stop offset="35%" stop-color="#E5B535" />
      <stop offset="70%" stop-color="#C28B15" />
      <stop offset="100%" stop-color="#FDE38C" />
    </linearGradient>

    <!-- Inner Emerald Accent Ring Gradient -->
    <linearGradient id="rwAccent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>

    <!-- Premium Sculpted Shadow Filter for depth -->
    <filter id="rwDepth" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.9" />
    </filter>
  </defs>

  <!-- Full Bleed Square (Perfect circular crop in Google SERP with NO transparent gaps) -->
  <rect width="512" height="512" fill="url(#rwBg)" />

  <!-- Outer Luxury Gold Bezel (Aligned to sit flush with circular Google badge) -->
  <circle cx="256" cy="256" r="236" stroke="url(#rwRing)" stroke-width="16" fill="none" opacity="0.9" />

  <!-- Inner Emerald Precision Accent Ring -->
  <circle cx="256" cy="256" r="218" stroke="url(#rwAccent)" stroke-width="4" fill="none" opacity="0.75" />

  <!-- Bold Hero RW Monogram Crest -->
  <g filter="url(#rwDepth)">
    <!-- 'R' Stem and Loop (High-contrast, bold, perfectly weighted) -->
    <path
      d="M 132 144 L 132 368 M 132 144 L 232 144 C 286 144 286 244 232 244 L 132 244"
      stroke="url(#rwGold)"
      stroke-width="42"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- 'R' Leg seamlessly integrated into 'W' Lettermark -->
    <path
      d="M 210 244 L 264 368 L 328 252 L 390 368 L 434 244"
      stroke="url(#rwGold)"
      stroke-width="40"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </g>
</svg>`;

async function buildAllIcons() {
  const rootDir = path.join(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  const appDir = path.join(rootDir, 'src/app');

  const svgBuffer = Buffer.from(masterFaviconSvg);

  // 1. Update src/app/icon.svg
  fs.writeFileSync(path.join(appDir, 'icon.svg'), masterFaviconSvg);
  console.log('✓ Updated src/app/icon.svg');

  // 2. Generate all PNG assets
  const pngTargets = [
    { file: path.join(publicDir, 'favicon-48x48.png'), size: 48 },
    { file: path.join(publicDir, 'favicon-96x96.png'), size: 96 },
    { file: path.join(publicDir, 'icon-192x192.png'), size: 192 },
    { file: path.join(publicDir, 'icon-512x512.png'), size: 512 },
    { file: path.join(publicDir, 'apple-touch-icon.png'), size: 180 },
    { file: path.join(appDir, 'icon.png'), size: 192 },
    { file: path.join(appDir, 'apple-icon.png'), size: 180 },
  ];

  for (const t of pngTargets) {
    await sharp(svgBuffer).resize(t.size, t.size).png().toFile(t.file);
    console.log(`✓ Generated ${path.relative(rootDir, t.file)} (${t.size}x${t.size})`);
  }

  // 3. Generate favicon.ico (48x48 PNG format as supported by modern web standards and Sharp)
  const icoBuffer = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Updated public/favicon.ico and src/app/favicon.ico');

  // 4. Generate Before vs After Side-by-Side Comparison Image for user
  const compW = 860;
  const compH = 340;
  
  async function makeSerpRow(iconFile) {
    const favBuf = await sharp(iconFile).resize(28, 28).png().toBuffer();
    const circleMask = Buffer.from('<svg width="28" height="28"><circle cx="14" cy="14" r="14" fill="white"/></svg>');
    const maskedFav = await sharp(favBuf).composite([{ input: circleMask, blend: 'dest-in' }]).png().toBuffer();
    const holderBg = Buffer.from('<svg width="28" height="28"><circle cx="14" cy="14" r="14" fill="#f1f3f4"/></svg>');
    
    const rowSvg = `<svg width="800" height="96" xmlns="http://www.w3.org/2000/svg">
      <text x="56" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif" font-size="14" fill="#202124" font-weight="500">rootwills.co.uk</text>
      <text x="56" y="40" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif" font-size="12" fill="#4d5156">https://www.rootwills.co.uk</text>
      <text x="16" y="66" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif" font-size="19" fill="#1a0dab" font-weight="400">Rootwills Ltd | Premium B2B Fresh Produce &amp; Foodservice ...</text>
      <text x="16" y="88" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif" font-size="13" fill="#4d5156">We supply the finest fresh produce, orchard fruits, heritage vegetables, living herbs, and artisan dairy...</text>
    </svg>`;
    
    return await sharp(Buffer.from(rowSvg))
      .composite([
        { input: holderBg, top: 14, left: 16 },
        { input: maskedFav, top: 14, left: 16 }
      ])
      .png()
      .toBuffer();
  }

  const origRow = await makeSerpRow(path.join(rootDir, 'artifacts_preview/orig_512.png'));
  const newRow = await makeSerpRow(path.join(publicDir, 'icon-512x512.png'));

  const compSvg = `<svg width="${compW}" height="${compH}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f8f9fa" rx="12" />
    <rect x="0" y="0" width="100%" height="46" fill="#1e293b" rx="12" />
    <rect x="0" y="36" width="100%" height="10" fill="#1e293b" />
    <text x="24" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#f8fafc" font-weight="600">Google Search Favicon Appearance — Before vs After</text>
    
    <!-- BEFORE BOX -->
    <rect x="24" y="60" width="812" height="120" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" rx="8" />
    <rect x="24" y="60" width="812" height="24" fill="#fee2e2" rx="8" />
    <rect x="24" y="76" width="812" height="8" fill="#fee2e2" />
    <text x="36" y="77" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#991b1b" font-weight="700">BEFORE (Tiny faint squircle inside circle with transparent gaps)</text>
    
    <!-- AFTER BOX -->
    <rect x="24" y="196" width="812" height="120" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" rx="8" />
    <rect x="24" y="196" width="812" height="24" fill="#dcfce7" rx="8" />
    <rect x="24" y="212" width="812" height="8" fill="#dcfce7" />
    <text x="36" y="213" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#166534" font-weight="700">AFTER (Razor-sharp 24K Royal Warrant Gold Crest — Full-bleed flush fit)</text>
  </svg>`;

  const compBase = await sharp(Buffer.from(compSvg)).png().toBuffer();
  const finalComp = await sharp(compBase)
    .composite([
      { input: origRow, top: 88, left: 30 },
      { input: newRow, top: 224, left: 30 }
    ])
    .png()
    .toFile(path.join(rootDir, 'artifacts_preview/before_after_comparison.png'));

  console.log('✓ Generated artifacts_preview/before_after_comparison.png');
}

buildAllIcons().catch(console.error);
