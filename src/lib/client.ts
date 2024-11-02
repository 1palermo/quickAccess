// src/lib/client.ts
import { createClient as supabaseCreateClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and API key are required to create a Supabase client");
}

export const createClient = () => {
  return supabaseCreateClient(supabaseUrl, supabaseAnonKey);
};
