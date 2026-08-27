const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kjmienehbgsfqgcqblgp.supabase.co';
const supabaseKey = 'sb_publishable_ykZgZz325E4qxI9Yrfk-MQ_oyVuElPy';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const PROFILES = [
  {
    id: 'f8ec48b6-4bec-4ad6-ace4-f3c1825ec5b3',
    email: 'staff@rootwills.co.uk',
    role: 'admin',
    full_name: 'Rootwills Commercial Staff Desk',
    organization_id: 'org-rootwills-hq',
  },
  {
    id: 'e2865733-73b7-43ae-a021-d6c598e9dd54',
    email: 'manager@rootwills.co.uk',
    role: 'admin',
    full_name: 'Operations Manager',
    organization_id: 'org-rootwills-hq',
  },
  {
    id: 'a6121fff-3831-4fa8-a808-a6d646924ddd',
    email: 'customer@rootwills.co.uk',
    role: 'customer',
    full_name: 'Trade Account Lead',
    organization_id: 'org-rootwills-partner',
  },
  {
    id: 'de78ddb1-7151-4920-8b64-d2d8d6d5dfbd',
    email: 'purchasing@rootwills.co.uk',
    role: 'customer',
    full_name: 'Purchasing Director',
    organization_id: 'org-rootwills-partner',
  },
  {
    id: '22722d8c-e403-4395-ab19-32caba252702',
    email: 'driver@rootwills.co.uk',
    role: 'driver',
    full_name: 'Dave King (Fleet Driver)',
    organization_id: 'org-rootwills-fleet',
  },
];

async function main() {
  console.log('Upserting Supabase Profiles...');

  for (const prof of PROFILES) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(prof, { onConflict: 'id' });

    if (error) {
      console.log(`  Profile upsert note (${prof.email}): ${error.message}`);
    } else {
      console.log(`  Profile updated in DB: ${prof.email} (${prof.role})`);
    }
  }
}

main().catch(console.error);
