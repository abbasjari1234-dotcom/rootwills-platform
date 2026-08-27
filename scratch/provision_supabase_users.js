const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kjmienehbgsfqgcqblgp.supabase.co';
const supabaseKey = 'sb_publishable_ykZgZz325E4qxI9Yrfk-MQ_oyVuElPy';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const ACCOUNTS = [
  {
    email: 'staff@rootwills.co.uk',
    password: 'Rootwills2026!',
    data: { role: 'admin', full_name: 'Commercial Staff Desk' },
  },
  {
    email: 'admin@rootwills.co.uk',
    password: 'Rootwills2026!',
    data: { role: 'admin', full_name: 'System Administrator' },
  },
  {
    email: 'manager@rootwills.co.uk',
    password: 'Rootwills2026!',
    data: { role: 'admin', full_name: 'Operations Manager' },
  },
  {
    email: 'customer@rootwills.co.uk',
    password: 'Rootwills2026!',
    data: { role: 'customer', full_name: 'Trade Account Lead' },
  },
  {
    email: 'purchasing@rootwills.co.uk',
    password: 'Rootwills2026!',
    data: { role: 'customer', full_name: 'Purchasing Director' },
  },
  {
    email: 'driver@rootwills.co.uk',
    password: 'Rootwills2026!',
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
      password: acc.password,
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
      password: acc.password,
    });

    if (signInError) {
      console.log(`  SignIn note: ${signInError.message}`);
    } else {
      console.log(`  SUCCESS! Verified Sign In for ${acc.email} (User ID: ${signInData.user.id})`);
    }
  }
}

main().catch(console.error);
