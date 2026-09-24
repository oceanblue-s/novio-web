import { NextRequest, NextResponse } from 'next/server';
import { fetchCloudSiteData, saveCloudSection, saveAllCloudSiteData } from '@/lib/supabaseService';
import { isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const configured = isSupabaseConfigured();
    if (!configured) {
      return NextResponse.json({
        configured: false,
        message: 'Supabase is not configured yet.',
        data: null,
      });
    }

    const data = await fetchCloudSiteData();
    return NextResponse.json({
      configured: true,
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch cloud site data' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { section, data, all } = body;

    if (all) {
      const ok = await saveAllCloudSiteData(all);
      return NextResponse.json({ success: ok });
    }

    if (section && data) {
      const ok = await saveCloudSection(section, data);
      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to save cloud data' },
      { status: 500 }
    );
  }
}
