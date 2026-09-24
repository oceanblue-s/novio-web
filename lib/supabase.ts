import { createClient, SupabaseClient } from '@supabase/supabase-js';

const ENV_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const ENV_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const STORAGE_SUPABASE_CONFIG_KEY = 'novio_supabase_credentials';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function getActiveSupabaseConfig(): SupabaseConfig {
  let url = ENV_SUPABASE_URL;
  let anonKey = ENV_SUPABASE_ANON_KEY;

  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(STORAGE_SUPABASE_CONFIG_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.url && parsed.anonKey) {
          url = parsed.url;
          anonKey = parsed.anonKey;
        }
      }
    } catch {}
  }

  return { url: url.trim(), anonKey: anonKey.trim() };
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getActiveSupabaseConfig();
  return Boolean(url && anonKey && url.startsWith('http'));
}

let cachedClient: SupabaseClient | null = null;
let lastUsedUrl = '';
let lastUsedKey = '';

export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getActiveSupabaseConfig();
  if (!url || !anonKey || !url.startsWith('http')) return null;

  if (cachedClient && lastUsedUrl === url && lastUsedKey === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
    lastUsedUrl = url;
    lastUsedKey = anonKey;
    return cachedClient;
  } catch (err) {
    console.error('Failed to create Supabase client:', err);
    return null;
  }
}
