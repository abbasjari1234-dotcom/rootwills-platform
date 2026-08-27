const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
const testPassword = process.env.DEMO_AUTH_PASSWORD || '';

if (!supabaseUrl || !supabaseKey || !testPassword) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and DEMO_AUTH_PASSWORD environment variables are required.');
  process.exit(1);
}

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
      password: testPassword,
    });

    if (error) {
      console.error(`FAILED: ${email} -> ${error.message}`);
    } else {
      console.log(`VERIFIED IN SUPABASE: ${email} (UID: ${data.user.id}, Role: ${data.user.user_metadata?.role || 'active'})`);
    }
  }
}

verifyAll();

