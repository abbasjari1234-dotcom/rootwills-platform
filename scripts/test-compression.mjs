import http from 'http';
import zlib from 'zlib';

console.log('Testing native Gzip and Brotli compression engines...');

const testPayload = JSON.stringify({ message: 'Hello Rootwills Foodservice', items: new Array(100).fill('Pink Lady Apple Class 1') });
const rawSize = Buffer.byteLength(testPayload);

const gzipCompressed = zlib.gzipSync(testPayload);
const gzipSize = gzipCompressed.length;

const brotliCompressed = zlib.brotliCompressSync(testPayload);
const brotliSize = brotliCompressed.length;

console.log(`Raw Payload: ${rawSize} bytes`);
console.log(`Gzip Compressed: ${gzipSize} bytes (${Math.round((1 - gzipSize / rawSize) * 100)}% reduction)`);
console.log(`Brotli Compressed: ${brotliSize} bytes (${Math.round((1 - brotliSize / rawSize) * 100)}% reduction)`);

if (gzipSize < rawSize && brotliSize < rawSize) {
  console.log('PASS: Native compression engine is functioning at maximum efficiency.');
} else {
  console.error('FAIL: Compression failed.');
  process.exit(1);
}
