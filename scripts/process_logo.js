const sharp = require('sharp');
const path = require('path');

async function processLogo() {
  const inputPath = 'C:/Users/abc/.gemini/antigravity-ide/brain/1f38ddcc-f4cf-4017-9894-b66dd01652d6/.user_uploaded/media_1791690268810.jpg';
  const img = sharp(inputPath);
  const metadata = await img.metadata();
  const width = metadata.width;
  const height = metadata.height;

  // Inspect raw pixel data
  const { data } = await img.raw().toBuffer({ resolveWithObject: true });

  function isWhite(x, y) {
    const idx = (y * width + x) * 3;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Burgundy color has r ~ 110-140, g ~ 15-30, b ~ 25-45
    // White background is r > 220, g > 220, b > 220
    return (r > 200 && g > 200 && b > 200);
  }

  const midX = Math.floor(width / 2);
  const midY = Math.floor(height / 2);

  let top = 0;
  while (top < height && isWhite(midX, top)) top++;

  let bottom = height - 1;
  while (bottom >= 0 && isWhite(midX, bottom)) bottom--;

  let left = 0;
  while (left < width && isWhite(left, midY)) left++;

  let right = width - 1;
  while (right >= 0 && isWhite(right, midY)) right--;

  console.log('Detected circle outer bounds:', { top, bottom, left, right });
  const cx = (left + right) / 2;
  const cy = (top + bottom) / 2;
  const rx = (right - left) / 2;
  const ry = (bottom - top) / 2;
  const r = Math.min(rx, ry);

  console.log('Center:', { cx, cy }, 'Radius:', r);

  // SVG mask circle with precise anti-aliasing
  // Shrink by 1px so zero white boundary fringe from JPEG artifacts survives
  const effectiveRadius = r - 1.5;
  const maskSvg = `<svg width="${width}" height="${height}">
    <circle cx="${cx}" cy="${cy}" r="${effectiveRadius}" fill="#ffffff" />
  </svg>`;

  const outputPath = path.join(__dirname, '../public/images/branded/rootwills_logo_seal.png');
  
  const result = await sharp(inputPath)
    .composite([{
      input: Buffer.from(maskSvg),
      blend: 'dest-in'
    }])
    .png({
      quality: 100,
      compressionLevel: 9,
      adaptiveFiltering: true,
      force: true
    })
    .toFile(outputPath);

  console.log('Successfully created ultra-high quality transparent logo:', result);
}

processLogo().catch(err => {
  console.error('Error processing logo:', err);
  process.exit(1);
});
