/**
 * Supabase Verification Script
 * 
 * This script helps verify your Supabase setup and provides
 * detailed information about any issues.
 * 
 * Run with: npx tsx scripts/verify-supabase.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🔍 Supabase Connection Verification\n')
console.log('=' .repeat(50))

// Check Environment Variables
console.log('\n📋 Environment Variables:')
console.log(`  URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}`)
if (supabaseUrl) {
  console.log(`     ${supabaseUrl.substring(0, 40)}...`)
}
console.log(`  Anon Key: ${supabaseAnonKey ? '✅ Set' : '❌ Missing'}`)
if (supabaseAnonKey) {
  console.log(`     Length: ${supabaseAnonKey.length} chars`)
  console.log(`     Starts with: ${supabaseAnonKey.substring(0, 20)}...`)
}
console.log(`  Service Key: ${supabaseServiceKey ? '✅ Set' : '❌ Missing'}`)
if (supabaseServiceKey) {
  console.log(`     Length: ${supabaseServiceKey.length} chars`)
  console.log(`     Starts with: ${supabaseServiceKey.substring(0, 20)}...`)
}

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  console.log('\n❌ Missing required environment variables!')
  console.log('   Please check your .env.local file')
  process.exit(1)
}

// Test Anon Key Connection
console.log('\n🔐 Testing Anon Key Connection:')
try {
  const anonClient = createClient(supabaseUrl, supabaseAnonKey)
  const { data: anonData, error: anonError } = await anonClient
    .from('rsvps')
    .select('id')
    .limit(0)

  if (anonError) {
    if (anonError.message.includes('permission') || anonError.code === '42501') {
      console.log('  ✅ Connection works (RLS is blocking - expected)')
    } else if (anonError.message.includes('does not exist') || anonError.code === '42P01') {
      console.log('  ⚠️  Table "rsvps" does not exist')
      console.log('     Run the SQL schema from SETUP_INSTRUCTIONS.md')
    } else if (anonError.message.includes('Invalid API key')) {
      console.log('  ❌ Invalid anon key')
      console.log('     Check your NEXT_PUBLIC_SUPABASE_ANON_KEY')
    } else {
      console.log(`  ❌ Error: ${anonError.message}`)
    }
  } else {
    console.log('  ✅ Anon key connection successful!')
  }
} catch (error: any) {
  console.log(`  ❌ Connection failed: ${error.message}`)
}

// Test Service Role Key Connection
console.log('\n🔑 Testing Service Role Key Connection:')
try {
  const adminClient = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  const { data: adminData, error: adminError } = await adminClient
    .from('rsvps')
    .select('count')
    .limit(1)

  if (adminError) {
    if (adminError.message.includes('Invalid API key')) {
      console.log('  ❌ Invalid service role key')
      console.log('     Make sure you copied the "service_role" key (not "anon")')
      console.log('     Check your SUPABASE_SERVICE_ROLE_KEY in .env.local')
      console.log('     Get it from: Settings > API > service_role key')
    } else if (adminError.message.includes('does not exist') || adminError.code === '42P01') {
      console.log('  ⚠️  Table "rsvps" does not exist')
      console.log('     Connection works, but you need to create the table')
      console.log('     Run the SQL schema from SETUP_INSTRUCTIONS.md')
    } else {
      console.log(`  ❌ Error: ${adminError.message}`)
      console.log(`     Code: ${adminError.code || 'N/A'}`)
    }
  } else {
    console.log('  ✅ Service role key connection successful!')
    console.log('  ✅ Table "rsvps" exists!')
    console.log('\n🎉 Everything is working correctly!')
  }
} catch (error: any) {
  console.log(`  ❌ Connection failed: ${error.message}`)
}

console.log('\n' + '='.repeat(50))
console.log('\n💡 Tips:')
console.log('  - Service role key should be much longer than anon key')
console.log('  - Make sure there are no extra spaces in your .env.local file')
console.log('  - Restart your dev server after changing .env.local')
console.log('  - Get keys from: https://supabase.com/dashboard/project/wvvkkbtmlmgiwkkqmfrm/settings/api\n')
