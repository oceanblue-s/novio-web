import { getSupabaseClient, isSupabaseConfigured } from './supabase';
import { Product, BlogPost, PortfolioProject, ServicePackage, TeamMember } from '@/types';
import { CustomizerSettings } from '@/context/LiveCustomizerContext';
import { createClient } from '@supabase/supabase-js';

export interface CloudSiteDataPayload {
  products?: Product[];
  blog?: BlogPost[];
  portfolio?: PortfolioProject[];
  services?: ServicePackage[];
  team?: TeamMember[];
  customizer?: CustomizerSettings;
}

export const SUPABASE_SQL_SETUP = `-- ==============================================================
-- NOVIO WEB DATABASE SCHEMA (Supabase PostgreSQL)
-- Jalankan skrip ini di menu SQL Editor dashboard Supabase Anda.
-- ==============================================================

CREATE TABLE IF NOT EXISTS public.novio_site_data (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.novio_site_data ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Access novio_site_data" ON public.novio_site_data;
CREATE POLICY "Public Read Access novio_site_data"
  ON public.novio_site_data
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public Write Access novio_site_data" ON public.novio_site_data;
CREATE POLICY "Public Write Access novio_site_data"
  ON public.novio_site_data
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

GRANT ALL ON TABLE public.novio_site_data TO anon, authenticated, service_role;
`;

/**
 * Fetch all site data sections from Supabase cloud
 */
export async function fetchCloudSiteData(): Promise<CloudSiteDataPayload | null> {
  if (!isSupabaseConfigured()) return null;
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('novio_site_data')
      .select('key, data');

    if (error) {
      console.warn('[Supabase] Error fetching site data:', error.message);
      return null;
    }

    if (!data || !Array.isArray(data)) return null;

    const payload: CloudSiteDataPayload = {};
    for (const item of data) {
      if (item.key === 'products' && Array.isArray(item.data)) {
        payload.products = item.data;
      } else if (item.key === 'blog' && Array.isArray(item.data)) {
        payload.blog = item.data;
      } else if (item.key === 'portfolio' && Array.isArray(item.data)) {
        payload.portfolio = item.data;
      } else if (item.key === 'services' && Array.isArray(item.data)) {
        payload.services = item.data;
      } else if (item.key === 'team' && Array.isArray(item.data)) {
        payload.team = item.data;
      } else if (item.key === 'customizer') {
        payload.customizer = item.data;
      }
    }

    return payload;
  } catch (err) {
    console.error('[Supabase] fetchCloudSiteData exception:', err);
    return null;
  }
}

/**
 * Save a specific section to Supabase cloud
 */
export async function saveCloudSection(key: string, data: any): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from('novio_site_data')
      .upsert(
        {
          key,
          data,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' }
      );

    if (error) {
      console.error(`[Supabase] Error saving section ${key}:`, error);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`[Supabase] saveCloudSection exception (${key}):`, err);
    return false;
  }
}

/**
 * Save all datasets to Supabase cloud in batch
 */
export async function saveAllCloudSiteData(payload: CloudSiteDataPayload): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const rows = [];
    if (payload.products) rows.push({ key: 'products', data: payload.products, updated_at: new Date().toISOString() });
    if (payload.blog) rows.push({ key: 'blog', data: payload.blog, updated_at: new Date().toISOString() });
    if (payload.portfolio) rows.push({ key: 'portfolio', data: payload.portfolio, updated_at: new Date().toISOString() });
    if (payload.services) rows.push({ key: 'services', data: payload.services, updated_at: new Date().toISOString() });
    if (payload.team) rows.push({ key: 'team', data: payload.team, updated_at: new Date().toISOString() });
    if (payload.customizer) rows.push({ key: 'customizer', data: payload.customizer, updated_at: new Date().toISOString() });

    if (rows.length === 0) return true;

    const { error } = await client
      .from('novio_site_data')
      .upsert(rows, { onConflict: 'key' });

    if (error) {
      console.error('[Supabase] Error saving all site data:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[Supabase] saveAllCloudSiteData exception:', err);
    return false;
  }
}

/**
 * Test a Supabase connection with provided credentials
 */
export async function testSupabaseConnection(
  url: string,
  anonKey: string
): Promise<{ success: boolean; message: string; tableReady: boolean }> {
  try {
    if (!url || !anonKey || !url.startsWith('http')) {
      return { success: false, message: 'URL atau Anon Key tidak valid.', tableReady: false };
    }

    const testClient = createClient(url, anonKey, { auth: { persistSession: false } });
    const { error } = await testClient.from('novio_site_data').select('key').limit(1);

    if (error) {
      // Check if error is because table does not exist
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return {
          success: true,
          message: 'Koneksi ke Supabase berhasil! Namun tabel "novio_site_data" belum dibuat. Silakan salin & jalankan skrip SQL di Supabase SQL Editor.',
          tableReady: false,
        };
      }
      return {
        success: false,
        message: `Gagal terhubung ke Supabase: ${error.message}`,
        tableReady: false,
      };
    }

    return {
      success: true,
      message: 'Koneksi berhasil dan tabel database Supabase siap digunakan!',
      tableReady: true,
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Terjadi kesalahan koneksi: ${err?.message || err}`,
      tableReady: false,
    };
  }
}
