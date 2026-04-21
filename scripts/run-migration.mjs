#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(url, key);

// Read migration file
const migrationPath = path.join(process.cwd(), 'supabase/migrations/20260415000000_create_leads_table.sql');
const sql = fs.readFileSync(migrationPath, 'utf-8');

// Execute migration
console.log('Executing migration...');
supabase.rpc('exec_sql', { sql }).then(({ error }) => {
  if (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
  console.log('✅ Migration executed successfully');
}).catch(async () => {
  // Fallback: try direct query through admin API
  console.log('Trying direct execution via SQL editor...');
  try {
    // Since we're on the server side with the service role key, we can try executing individual statements
    const statements = sql.split(';').filter(s => s.trim());
    for (const statement of statements) {
      if (statement.trim()) {
        const { error } = await supabase.rpc('exec', { sql: statement });
        if (error && !error.message.includes('already exists')) {
          throw error;
        }
      }
    }
    console.log('✅ Tables created successfully');
  } catch (finalErr) {
    console.error('Final error:', finalErr);
    console.log('\n❌ Unable to execute migration automatically.');
    console.log('Please run this SQL manually in Supabase dashboard:');
    console.log('\n' + sql);
    process.exit(1);
  }
});
