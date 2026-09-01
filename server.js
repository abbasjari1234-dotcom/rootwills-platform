// Rootwills Platform — Production Server with Built-In Gzip & Brotli Compression
// Provides 100% automatic compression across all cloud hosts without needing paid CDNs.

const { createServer } = require('http');
const { parse } = require('url');
const zlib = require('zlib');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const COMPRESSIBLE_TYPES = /^(text\/|application\/(javascript|json|xml|xhtml\+xml|rss\+xml|atom\+xml)|image\/svg\+xml)/i;

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const acceptEncoding = (req.headers['accept-encoding'] || '').toLowerCase();

      // Compression stream wrapper
      let compressor = null;
      let headersSent = false;

      const originalWriteHead = res.writeHead;
      const originalWrite = res.write;
      const originalEnd = res.end;

      res.writeHead = function (statusCode, ...args) {
        if (!headersSent) {
          headersSent = true;
          const headers = typeof args[0] === 'object' && !Array.isArray(args[0]) ? args[0] : (args[1] || {});
          const contentType = res.getHeader('content-type') || headers['content-type'] || headers['Content-Type'] || '';

          // Only compress compressible MIME types and only if not already compressed
          if (COMPRESSIBLE_TYPES.test(String(contentType)) && !res.getHeader('content-encoding')) {
            if (acceptEncoding.includes('br')) {
              res.setHeader('Content-Encoding', 'br');
              res.setHeader('Vary', 'Accept-Encoding');
              res.removeHeader('Content-Length');
              compressor = zlib.createBrotliCompress({
                params: {
                  [zlib.constants.BROTLI_PARAM_QUALITY]: 5,
                },
              });
            } else if (acceptEncoding.includes('gzip')) {
              res.setHeader('Content-Encoding', 'gzip');
              res.setHeader('Vary', 'Accept-Encoding');
              res.removeHeader('Content-Length');
              compressor = zlib.createGzip({ level: 6 });
            }

            if (compressor) {
              compressor.on('data', (chunk) => originalWrite.call(res, chunk));
              compressor.on('end', () => originalEnd.call(res));
              compressor.on('error', (err) => {
                console.error('[Compression Error]', err);
                originalEnd.call(res);
              });
            }
          }
        }
        return originalWriteHead.apply(res, [statusCode, ...args]);
      };

      res.write = function (chunk, encoding, callback) {
        if (compressor) {
          return compressor.write(chunk, encoding, callback);
        }
        return originalWrite.apply(res, arguments);
      };

      res.end = function (chunk, encoding, callback) {
        if (compressor) {
          if (chunk) {
            compressor.write(chunk, encoding);
          }
          return compressor.end(callback);
        }
        return originalEnd.apply(res, arguments);
      };

      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', req.url, err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    }
  });

  server.listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Rootwills production server active on http://${hostname}:${port} (Native Gzip & Brotli Enabled)`);
  });
}).catch((err) => {
  console.error('Failed to start production server:', err);
  process.exit(1);
});
