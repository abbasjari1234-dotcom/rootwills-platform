const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kjmienehbgsfqgcqblgp.supabase.co';
const supabaseKey = 'sb_publishable_ykZgZz325E4qxI9Yrfk-MQ_oyVuElPy';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const TEST_ACCOUNTS = [
  'staff@rootwills.co.uk',
  'manager@rootwills.co.uk',
  'customer@rootwills.co.uk',
  'purchasing@rootwills.co.uk',
  'driver@rootwills.co.uk',
];

async function verifyAll() {
  console.log('Testing Supabase Authentication Sign-In...');
  for (const email of TEST_ACCOUNTS) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: 'Rootwills2026!',
    });

    if (error) {
      console.error(`FAILED: ${email} -> ${error.message}`);
    } else {
      console.log(`VERIFIED IN SUPABASE: ${email} (UID: ${data.user.id}, Role: ${data.user.user_metadata?.role || 'active'})`);
    }
  }
}

verifyAll();
