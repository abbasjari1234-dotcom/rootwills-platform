const urls = [
  'https://www.rootwills.co.uk/',
  'https://www.rootwills.co.uk/wholesale-produce-supplier-manchester',
  'https://www.rootwills.co.uk/products/fresh-produce',
  'https://www.rootwills.co.uk/products/chilled-dairy',
  'https://www.rootwills.co.uk/products/meat-poultry',
  'https://www.rootwills.co.uk/products/bakery-breakfast',
  'https://www.rootwills.co.uk/services/restaurant-food-supply',
  'https://www.rootwills.co.uk/services/hotel-banqueting-supply'
];

async function check() {
  console.log('--- STARTING TECHNICAL AUDIT ---');
  for (const url of urls) {
    const t0 = Date.now();
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' } });
      const elapsed = Date.now() - t0;
      const html = await res.text();
      const hasSchema = html.includes('application/ld+json');
      const hasCanonical = html.includes('rel="canonical"');
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : 'N/A';
      const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
      const metaDesc = metaDescMatch ? metaDescMatch[1] : 'N/A';

      // Parse JSON-LD schemas
      const schemaMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
      let schemaTypes = [];
      for (const sm of schemaMatches) {
        try {
          const parsed = JSON.parse(sm[1]);
          if (Array.isArray(parsed)) {
            schemaTypes.push(...parsed.map(p => p['@type']));
          } else if (parsed['@graph']) {
            schemaTypes.push(...parsed['@graph'].map(p => p['@type']));
          } else if (parsed['@type']) {
            schemaTypes.push(parsed['@type']);
          }
        } catch (e) {
          schemaTypes.push('PARSE_ERROR');
        }
      }

      console.log(JSON.stringify({
        path: url.replace('https://www.rootwills.co.uk', '') || '/',
        status: res.status,
        latencyMs: elapsed,
        title: title.slice(0, 65),
        metaDescLen: metaDesc.length,
        hasCanonical,
        schemas: schemaTypes,
        htmlBytes: html.length
      }, null, 2));
    } catch (err) {
      console.error(url, err.message);
    }
  }
}

check();
