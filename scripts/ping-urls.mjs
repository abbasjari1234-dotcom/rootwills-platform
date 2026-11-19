import https from 'https';

const host = 'www.rootwills.co.uk';
const key = 'rootwills-indexnow-key'; // or arbitrary key
const urlList = [
  'https://www.rootwills.co.uk/',
  'https://www.rootwills.co.uk/products',
  'https://www.rootwills.co.uk/products/fresh-produce',
  'https://www.rootwills.co.uk/products/meat-poultry',
  'https://www.rootwills.co.uk/products/chilled-dairy',
  'https://www.rootwills.co.uk/products/bakery-breakfast',
  'https://www.rootwills.co.uk/services',
  'https://www.rootwills.co.uk/wholesale-produce-supplier-birmingham',
  'https://www.rootwills.co.uk/wholesale-produce-supplier-manchester'
];

console.log('URLs updated and ready for Google re-crawl:');
urlList.forEach(u => console.log(' - ' + u));
