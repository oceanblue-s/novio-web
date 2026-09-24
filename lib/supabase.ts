import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Polyfill WebSocket in Node.js environment if needed
if (typeof window === 'undefined' && typeof global !== 'undefined' && !(global as any).WebSocket) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    (global as any).WebSocket = require('ws');
  } catch {}
}

const DEFAULT_SUPABASE_URL = 'https://jrvmfcikqptxjxiaytej.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impydm1mY2lrcXB0eGp4aWF5dGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjQxNjEsImV4cCI6MjEwNTg0MDE2MX0.Ue4wIDy1V_0sGKFYiWakTdC2vT4_nibdYKzaRaIgMfw';

const ENV_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const ENV_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const STORAGE_SUPABASE_CONFIG_KEY = 'novio_supabase_credentials';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function cleanSupabaseUrl(rawUrl: string): string {
  return (rawUrl || '')
    .trim()
    .replace(/\/rest\/v1\/?$/, '')
    .replace(/\/+$/, '');
}

export function getActiveSupabaseConfig(): SupabaseConfig {
  let url = cleanSupabaseUrl(ENV_SUPABASE_URL);
  let anonKey = ENV_SUPABASE_ANON_KEY;

  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(STORAGE_SUPABASE_CONFIG_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.url && parsed.anonKey) {
          url = cleanSupabaseUrl(parsed.url);
          anonKey = parsed.anonKey;
        }
      }
    } catch {}
  }

  return { url: cleanSupabaseUrl(url), anonKey: anonKey.trim() };
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

  const cleanUrl = cleanSupabaseUrl(url);

  if (cachedClient && lastUsedUrl === cleanUrl && lastUsedKey === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(cleanUrl, anonKey, {
      auth: { persistSession: false },
    });
    lastUsedUrl = cleanUrl;
    lastUsedKey = anonKey;
    return cachedClient;
  } catch (err) {
    console.error('Failed to create Supabase client:', err);
    return null;
  }
}
