#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

console.log('🔗 Connecting to Supabase...');
const supabase = createClient(url, key);

// Get health status
const { error } = await supabase.from('leads').select('count()', { count: 'exact', head: true });

if (error && error.code === 'PGRST116') {
  console.log('⚠️  Table "leads" does not exist yet.');
  console.log('\n📋 To create the table, run this SQL in your Supabase dashboard:');
  console.log('   Settings → SQL Editor → New Query');
  console.log('\n' + `
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  businessName TEXT NOT NULL,
  city TEXT NOT NULL,
  salesArea TEXT,
  intent TEXT NOT NULL,
  role TEXT NOT NULL,
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_created_at ON leads (createdAt DESC);
CREATE INDEX idx_leads_phone ON leads (phone);
  `.trim());
} else if (error) {
  console.error('❌ Connection error:', error.message);
  process.exit(1);
} else {
  console.log('✅ Connected to Supabase! Table "leads" exists.');
}
