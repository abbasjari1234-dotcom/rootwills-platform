const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const defaultPassword = process.env.DEFAULT_PROVISIONING_PASSWORD || process.env.DEMO_AUTH_PASSWORD || '';

if (!supabaseUrl || !supabaseKey || !defaultPassword) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or ANON_KEY), and DEFAULT_PROVISIONING_PASSWORD are required in environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const ACCOUNTS = [
  {
    email: 'staff@rootwills.co.uk',
    data: { role: 'admin', full_name: 'Commercial Staff Desk' },
  },
  {
    email: 'admin@rootwills.co.uk',
    data: { role: 'admin', full_name: 'System Administrator' },
  },
  {
    email: 'manager@rootwills.co.uk',
    data: { role: 'admin', full_name: 'Operations Manager' },
  },
  {
    email: 'customer@rootwills.co.uk',
    data: { role: 'customer', full_name: 'Trade Account Lead' },
  },
  {
    email: 'purchasing@rootwills.co.uk',
    data: { role: 'customer', full_name: 'Purchasing Director' },
  },
  {
    email: 'driver@rootwills.co.uk',
    data: { role: 'driver', full_name: 'Dave King (Fleet Driver)' },
  },
];

async function main() {
  console.log('Provisioning Supabase Auth Accounts...');

  for (const acc of ACCOUNTS) {
    console.log(`\nProcessing: ${acc.email}`);
    
    // Try signing up
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: acc.email,
      password: defaultPassword,
      options: {
        data: acc.data,
      },
    });

    if (signUpError) {
      console.log(`  SignUp note: ${signUpError.message}`);
    } else {
      console.log(`  User created / registered: id=${signUpData?.user?.id || 'pending'}`);
    }

    // Try signing in to verify credentials
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: acc.email,
      password: defaultPassword,
    });

    if (signInError) {
      console.log(`  SignIn note: ${signInError.message}`);
    } else {
      console.log(`  SUCCESS! Verified Sign In for ${acc.email} (User ID: ${signInData.user.id})`);
    }
  }
}

main().catch(console.error);

