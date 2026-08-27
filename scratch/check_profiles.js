const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kjmienehbgsfqgcqblgp.supabase.co';
const supabaseKey = 'sb_publishable_ykZgZz325E4qxI9Yrfk-MQ_oyVuElPy';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function check() {
  const { data, error } = await supabase.from('profiles').select('*').limit(5);
  console.log('Profiles data:', data);
  console.log('Profiles error:', error);
}

check();
