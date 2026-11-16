import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// 1. Load credentials
const KEY_PATH = path.resolve(process.cwd(), 'gsc-key.json');
if (!fs.existsSync(KEY_PATH)) {
  console.error('Error: gsc-key.json not found at ' + KEY_PATH);
  process.exit(1);
}

const keyData = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));

// 2. Generate Google OAuth 2.0 JWT Bearer Token using native Node.js crypto
function base64url(input) {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf8') : input;
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const payload = {
    iss: keyData.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));
  const signInput = `${encodedHeader}.${encodedPayload}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signInput);
  const signature = signer.sign(keyData.private_key);
  const encodedSignature = base64url(signature);

  const jwt = `${signInput}.${encodedSignature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OAuth token exchange failed (${res.status}): ${errText}`);
  }

  const tokenJson = await res.json();
  return tokenJson.access_token;
}

// 3. Command Handlers
async function main() {
  const [cmd, arg1, arg2] = process.argv.slice(2);
  const token = await getAccessToken();

  if (!cmd || cmd === 'sites') {
    console.log('\n--- Fetching verified Search Console sites ---');
    const res = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (cmd === 'inspect') {
    const inspectionUrl = arg1 || 'https://www.rootwills.co.uk/about';
    const siteUrl = arg2 || 'sc-domain:rootwills.co.uk';
    console.log(`\n--- Inspecting URL: ${inspectionUrl} (siteUrl: ${siteUrl}) ---`);

    const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inspectionUrl,
        siteUrl,
        languageCode: 'en',
      }),
    });

    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (cmd === 'sitemaps') {
    const siteUrl = encodeURIComponent(arg1 || 'sc-domain:rootwills.co.uk');
    console.log(`\n--- Fetching sitemaps for ${siteUrl} ---`);
    const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${siteUrl}/sitemaps`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (cmd === 'analytics') {
    const siteUrl = encodeURIComponent(arg1 || 'sc-domain:rootwills.co.uk');
    console.log(`\n--- Fetching search analytics for ${siteUrl} ---`);
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const formatDate = (d) => d.toISOString().split('T')[0];

    const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${siteUrl}/searchAnalytics/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: formatDate(thirtyDaysAgo),
        endDate: formatDate(today),
        dimensions: ['query', 'page'],
        rowLimit: 25,
      }),
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  console.log(`Unknown command: ${cmd}. Available: sites, inspect [url] [siteUrl], sitemaps [siteUrl], analytics [siteUrl]`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
