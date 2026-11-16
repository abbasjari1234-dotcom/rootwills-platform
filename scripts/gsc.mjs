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

  if (cmd === 'submit-sitemap') {
    const siteUrl = encodeURIComponent(arg1 || 'https://www.rootwills.co.uk/');
    const sitemapUrl = encodeURIComponent(arg2 || 'https://www.rootwills.co.uk/sitemap.xml');
    console.log(`\n--- Submitting sitemap ${sitemapUrl} for ${siteUrl} ---`);
    const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${siteUrl}/sitemaps/${sitemapUrl}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 204 || res.ok) {
      console.log('Sitemap submitted successfully to Google Search Console! (Status: ' + res.status + ')');
    } else {
      const err = await res.text();
      console.log('Sitemap submission response (' + res.status + '):', err);
    }
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

  if (cmd === 'track') {
    const siteUrl = 'https://www.rootwills.co.uk/';
    console.log(`\n=============================================================`);
    console.log(`📊 LIVE GOOGLE SEARCH CONSOLE TRACKING REPORT FOR ROOTWILLS`);
    console.log(`=============================================================\n`);

    // 1. Sitemaps
    console.log(`1️⃣ SITEMAP HEALTH & STATUS:`);
    const smRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const smData = await smRes.json();
    if (smData.sitemap) {
      smData.sitemap.forEach((sm) => {
        console.log(`   - Sitemap: ${sm.path}`);
        console.log(`     Last Downloaded: ${sm.lastDownloaded}`);
        console.log(`     Errors: ${sm.errors || 0} | Warnings: ${sm.warnings || 0}`);
        if (sm.contents) {
          sm.contents.forEach(c => console.log(`     Submitted URLs: ${c.submitted} | Indexed: ${c.indexed}`));
        }
      });
    }

    // 2. Search Analytics
    console.log(`\n2️⃣ SEARCH PERFORMANCE & RANKINGS (Last 30 Days):`);
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const formatDate = (d) => d.toISOString().split('T')[0];

    const anaRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: formatDate(thirtyDaysAgo),
        endDate: formatDate(today),
        dimensions: ['query'],
        rowLimit: 50,
      }),
    });
    const anaData = await anaRes.json();
    if (anaData.rows && anaData.rows.length > 0) {
      console.log(`   | Query | Position | Impressions | Clicks |`);
      console.log(`   | :--- | :---: | :---: | :---: |`);
      anaData.rows.sort((a, b) => a.position - b.position).forEach((row) => {
        console.log(`   | ${row.keys[0]} | #${row.position.toFixed(1)} | ${row.impressions} | ${row.clicks} |`);
      });
    } else {
      console.log(`   (No queries recorded yet)`);
    }

    // 3. Inspect URLs
    console.log(`\n3️⃣ LIVE INDEX INSPECTION ACROSS CORE ROUTES:`);
    const coreUrls = [
      'https://www.rootwills.co.uk/',
      'https://www.rootwills.co.uk/about',
      'https://www.rootwills.co.uk/services',
      'https://www.rootwills.co.uk/products',
      'https://www.rootwills.co.uk/approach',
      'https://www.rootwills.co.uk/contact',
      'https://www.rootwills.co.uk/wholesale-produce-supplier-birmingham'
    ];

    for (const u of coreUrls) {
      try {
        const inspRes = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inspectionUrl: u,
            siteUrl,
            languageCode: 'en',
          }),
        });
        const inspData = await inspRes.json();
        const stat = inspData.inspectionResult?.indexStatusResult;
        const pageName = u.replace('https://www.rootwills.co.uk', '') || '/';
        if (stat) {
          console.log(`   * [${pageName.padEnd(42, ' ')}] Verdict: ${stat.verdict.padEnd(7, ' ')} | State: ${stat.coverageState} | Last Crawl: ${stat.lastCrawlTime || 'Queued / In Process'}`);
        } else {
          console.log(`   * [${pageName.padEnd(42, ' ')}] Status: Unknown / Pending first crawl`);
        }
      } catch (err) {
        console.log(`   * [${u}] Error querying: ${err.message}`);
      }
    }

    console.log(`\n=============================================================\n`);
    return;
  }

  console.log(`Unknown command: ${cmd}. Available: track, sites, inspect [url] [siteUrl], sitemaps [siteUrl], analytics [siteUrl]`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
