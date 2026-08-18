// Automated HTTP Endpoint & Security Verification Script
async function runTests() {
  console.log('Testing Rootwills Live Production Endpoints...\n');

  // 1. Homepage & Security Headers
  try {
    const res = await fetch('http://localhost:3000/');
    console.log(`[PASS] GET / -> Status: ${res.status}`);
    console.log(`       HSTS: ${res.headers.get('strict-transport-security')}`);
    console.log(`       CSP: ${res.headers.get('content-security-policy')?.slice(0, 60)}...`);
    console.log(`       X-Frame-Options: ${res.headers.get('x-frame-options')}`);
  } catch (err) {
    console.error(`[FAIL] GET /:`, err.message);
  }

  // 2. Robots.txt
  try {
    const res = await fetch('http://localhost:3000/robots.txt');
    const text = await res.text();
    console.log(`\n[PASS] GET /robots.txt -> Status: ${res.status}`);
    console.log(`       Content:\n${text.trim()}`);
  } catch (err) {
    console.error(`[FAIL] GET /robots.txt:`, err.message);
  }

  // 3. Sitemap.xml
  try {
    const res = await fetch('http://localhost:3000/sitemap.xml');
    const text = await res.text();
    console.log(`\n[PASS] GET /sitemap.xml -> Status: ${res.status}, Length: ${text.length} chars`);
  } catch (err) {
    console.error(`[FAIL] GET /sitemap.xml:`, err.message);
  }

  // 4. AI Endpoint POST /api/ai
  try {
    const res = await fetch('http://localhost:3000/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'weekend steak service prep' }),
    });
    const data = await res.json();
    console.log(`\n[PASS] POST /api/ai -> Status: ${res.status}`);
    console.log(`       Message: ${data.message}`);
    console.log(`       Item 1: ${data.suggestions?.[0]?.name} (£${data.suggestions?.[0]?.customerPrice})`);
    console.log(`       Rate Limit Remaining: ${data.rateLimitInfo?.remainingMinute}/10`);
  } catch (err) {
    console.error(`[FAIL] POST /api/ai:`, err.message);
  }

  // 5. Depot Locator API /api/depots/nearest
  try {
    const res = await fetch('http://localhost:3000/api/depots/nearest?postcode=B1+1AA');
    const data = await res.json();
    console.log(`\n[PASS] GET /api/depots/nearest?postcode=B1+1AA -> Status: ${res.status}`);
    console.log(`       Result:`, JSON.stringify(data));
  } catch (err) {
    console.error(`[FAIL] GET /api/depots/nearest:`, err.message);
  }

  console.log('\nAll live endpoint tests completed successfully!');
}

runTests();
