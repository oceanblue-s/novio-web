'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Database,
  Settings,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Copy,
  Check,
  Wifi,
  WifiOff,
  ShieldCheck,
  Terminal,
  Rocket,
  RefreshCw,
} from 'lucide-react';
import { testSupabaseConnection, SUPABASE_SQL_SETUP } from '@/lib/supabaseService';
import { STORAGE_SUPABASE_CONFIG_KEY, getActiveSupabaseConfig, cleanSupabaseUrl } from '@/lib/supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

type StepStatus = 'idle' | 'loading' | 'success' | 'error' | 'warning';

interface ConnectionResult {
  success: boolean;
  message: string;
  tableReady: boolean;
}

interface ServiceCheck {
  name: string;
  status: StepStatus;
  message: string;
}

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: 'Sambutan', icon: Rocket },
  { id: 2, label: 'Konfigurasi DB', icon: Database },
  { id: 3, label: 'Test Koneksi', icon: Wifi },
  { id: 4, label: 'Verifikasi Layanan', icon: ShieldCheck },
  { id: 5, label: 'Selesai', icon: CheckCircle2 },
];

// ─── Helper Components ────────────────────────────────────────────────────────

function StatusBadge({ status, label }: { status: StepStatus; label: string }) {
  const cfg: Record<StepStatus, { icon: React.ReactNode; cls: string }> = {
    idle: { icon: <Settings className="w-4 h-4 animate-spin-slow" />, cls: 'bg-zinc-800 text-zinc-400 border-zinc-700' },
    loading: { icon: <Loader2 className="w-4 h-4 animate-spin" />, cls: 'bg-yellow-950 text-yellow-300 border-yellow-800' },
    success: { icon: <CheckCircle2 className="w-4 h-4" />, cls: 'bg-emerald-950 text-emerald-400 border-emerald-800' },
    error: { icon: <XCircle className="w-4 h-4" />, cls: 'bg-red-950 text-red-400 border-red-800' },
    warning: { icon: <AlertTriangle className="w-4 h-4" />, cls: 'bg-amber-950 text-amber-400 border-amber-800' },
  };
  const { icon, cls } = cfg[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${cls}`}>
      {icon} {label}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-zinc-700 hover:bg-zinc-600 text-zinc-300 transition-colors"
    >
      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Tersalin' : 'Salin'}
    </button>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────

export default function SetupWizardClient() {
  const [step, setStep] = useState(1);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [connectionResult, setConnectionResult] = useState<ConnectionResult | null>(null);
  const [testLoading, setTestLoading] = useState(false);
  const [serviceChecks, setServiceChecks] = useState<ServiceCheck[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [savedOk, setSavedOk] = useState(false);

  // Pre-fill from existing config on mount
  useEffect(() => {
    const cfg = getActiveSupabaseConfig();
    if (cfg.url) setSupabaseUrl(cfg.url);
    if (cfg.anonKey) setAnonKey(cfg.anonKey);
  }, []);

  // ── Step 3: Test connection ──────────────────────────────────────────────────
  const handleTestConnection = useCallback(async () => {
    setTestLoading(true);
    setConnectionResult(null);
    try {
      const cleanUrl = cleanSupabaseUrl(supabaseUrl.trim());
      const result = await testSupabaseConnection(cleanUrl, anonKey.trim());
      setConnectionResult(result);
    } catch {
      setConnectionResult({ success: false, message: 'Terjadi kesalahan tidak terduga.', tableReady: false });
    } finally {
      setTestLoading(false);
    }
  }, [supabaseUrl, anonKey]);

  // Save credentials to localStorage
  const saveCredentials = useCallback(() => {
    try {
      const cleanUrl = cleanSupabaseUrl(supabaseUrl.trim());
      window.localStorage.setItem(
        STORAGE_SUPABASE_CONFIG_KEY,
        JSON.stringify({ url: cleanUrl, anonKey: anonKey.trim() })
      );
      setSavedOk(true);
    } catch {
      setSavedOk(false);
    }
  }, [supabaseUrl, anonKey]);

  // ── Step 4: Verify services ──────────────────────────────────────────────────
  const runServiceChecks = useCallback(async () => {
    setServicesLoading(true);
    const checks: ServiceCheck[] = [
      { name: 'Admin Portal (/admin)', status: 'loading', message: 'Memeriksa...' },
      { name: 'API Cloud Sync (/api/cloud-sync)', status: 'loading', message: 'Memeriksa...' },
      { name: 'Koneksi Database Supabase', status: 'loading', message: 'Memeriksa...' },
      { name: 'Halaman Produk (/product)', status: 'loading', message: 'Memeriksa...' },
      { name: 'Halaman Blog (/blog)', status: 'loading', message: 'Memeriksa...' },
    ];
    setServiceChecks([...checks]);

    // Check 1: Admin Portal
    try {
      const res = await fetch('/admin', { method: 'HEAD' });
      checks[0] = { ...checks[0], status: res.ok ? 'success' : 'error', message: res.ok ? 'Rute aktif dan dapat diakses' : `HTTP ${res.status}` };
    } catch {
      checks[0] = { ...checks[0], status: 'error', message: 'Tidak dapat dijangkau' };
    }
    setServiceChecks([...checks]);

    // Check 2: API Cloud Sync
    try {
      const res = await fetch('/api/cloud-sync', { method: 'GET' });
      checks[1] = { ...checks[1], status: res.ok ? 'success' : 'warning', message: res.ok ? 'API endpoint aktif' : `HTTP ${res.status} — mungkin belum ada data` };
    } catch {
      checks[1] = { ...checks[1], status: 'error', message: 'API tidak dapat dijangkau' };
    }
    setServiceChecks([...checks]);

    // Check 3: DB Connection
    if (connectionResult?.success) {
      checks[2] = {
        ...checks[2],
        status: connectionResult.tableReady ? 'success' : 'warning',
        message: connectionResult.message,
      };
    } else if (connectionResult && !connectionResult.success) {
      checks[2] = { ...checks[2], status: 'error', message: connectionResult.message };
    } else {
      checks[2] = { ...checks[2], status: 'warning', message: 'Belum dilakukan pengujian koneksi DB' };
    }
    setServiceChecks([...checks]);

    // Check 4 & 5: Pages
    for (let i = 3; i <= 4; i++) {
      const path = i === 3 ? '/product' : '/blog';
      try {
        const res = await fetch(path, { method: 'HEAD' });
        checks[i] = { ...checks[i], status: res.ok ? 'success' : 'error', message: res.ok ? 'Halaman aktif' : `HTTP ${res.status}` };
      } catch {
        checks[i] = { ...checks[i], status: 'error', message: 'Tidak dapat dijangkau' };
      }
      setServiceChecks([...checks]);
    }

    setServicesLoading(false);
  }, [connectionResult]);

  // Auto-run service checks when entering step 4
  useEffect(() => {
    if (step === 4) {
      runServiceChecks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // ── Validation ───────────────────────────────────────────────────────────────
  const isUrlValid = supabaseUrl.trim().startsWith('https://') && supabaseUrl.trim().length > 20;
  const isKeyValid = anonKey.trim().length > 20;
  const canProceedToTest = isUrlValid && isKeyValid;

  // ── UI helpers ───────────────────────────────────────────────────────────────
  const goNext = () => setStep((s) => Math.min(s + 1, 5));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">N</div>
          <span className="font-semibold tracking-wide text-zinc-100">NOVIO</span>
          <span className="text-zinc-500 text-sm">/ Setup Wizard</span>
        </div>
        <Link href="/admin" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1">
          Lewati Setup <ArrowRight className="w-3 h-3" />
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center px-4 py-10">
        {/* Step Progress */}
        <div className="w-full max-w-2xl mb-10">
          <div className="flex items-center justify-between relative">
            {/* connector line */}
            <div className="absolute top-5 left-0 right-0 h-px bg-zinc-800 z-0" />
            {STEPS.map((s) => {
              const isDone = step > s.id;
              const isActive = step === s.id;
              const Icon = s.icon;
              return (
                <div key={s.id} className="flex flex-col items-center gap-2 z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isDone
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : isActive
                        ? 'bg-zinc-800 border-emerald-500 text-emerald-400'
                        : 'bg-zinc-900 border-zinc-700 text-zinc-600'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-xs font-medium ${isActive ? 'text-emerald-400' : isDone ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card */}
        <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          {/* ── STEP 1: Welcome ─────────────────────────────────────────────── */}
          {step === 1 && (
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium uppercase tracking-wider">
                  <Rocket className="w-4 h-4" /> Langkah 1 dari 5
                </div>
                <h1 className="text-2xl font-bold text-zinc-100">Selamat Datang di NOVIO Setup Wizard</h1>
                <p className="text-zinc-400 leading-relaxed">
                  Wizard ini akan memandu Anda mengonfigurasi koneksi database, memvalidasi layanan, dan memastikan NOVIO Web siap beroperasi di lingkungan produksi.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Database, label: 'Konfigurasi Supabase', desc: 'Input URL dan Anon Key database' },
                  { icon: Wifi, label: 'Test Koneksi', desc: 'Validasi koneksi secara real-time' },
                  { icon: ShieldCheck, label: 'Verifikasi Layanan', desc: 'Cek semua endpoint dan halaman aktif' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                    <Icon className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-zinc-200 text-sm">{label}</div>
                      <div className="text-zinc-500 text-xs">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-zinc-800/40 border border-zinc-700 rounded-xl p-4 text-sm text-zinc-400">
                <span className="text-amber-400 font-medium">Catatan:</span> Halaman ini hanya dapat diakses oleh Tim IT. Pastikan Anda membuka URL ini sebelum menghapus atau menonaktifkan rute{' '}
                <code className="text-emerald-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">/setup</code>.
              </div>

              <button
                onClick={goNext}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors"
              >
                Mulai Konfigurasi <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── STEP 2: DB Config ───────────────────────────────────────────── */}
          {step === 2 && (
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium uppercase tracking-wider">
                  <Database className="w-4 h-4" /> Langkah 2 dari 5
                </div>
                <h2 className="text-2xl font-bold text-zinc-100">Konfigurasi Database Supabase</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Masukkan kredensial Supabase Anda. Data ini disimpan hanya di browser lokal (localStorage) dan tidak dikirim ke server.
                </p>
              </div>

              {/* URL Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Supabase Project URL
                </label>
                <input
                  type="url"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://xxxxxxxxxxxx.supabase.co"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                {supabaseUrl && !isUrlValid && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> URL harus dimulai dengan https://
                  </p>
                )}
                {isUrlValid && (
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Format URL valid
                  </p>
                )}
              </div>

              {/* Anon Key Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-300">
                  Supabase Anon Key
                </label>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={anonKey}
                    onChange={(e) => setAnonKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 pr-12 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                  />
                  <button
                    onClick={() => setShowKey((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {anonKey && !isKeyValid && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> Anon Key terlalu pendek
                  </p>
                )}
                {isKeyValid && (
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Anon Key terisi
                  </p>
                )}
              </div>

              <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-4 text-xs text-zinc-500 space-y-1">
                <p className="text-zinc-400 font-medium">Di mana mendapatkan kredensial ini?</p>
                <p>Buka <span className="text-emerald-400">app.supabase.com</span> → pilih proyek Anda → Settings → API → gunakan <em>Project URL</em> dan <em>anon public</em> key.</p>
              </div>

              <div className="flex gap-3">
                <button onClick={goBack} className="flex items-center gap-2 px-4 py-3 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 rounded-xl transition-colors text-sm">
                  <ArrowLeft className="w-4 h-4" /> Kembali
                </button>
                <button
                  onClick={goNext}
                  disabled={!canProceedToTest}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
                >
                  Lanjut ke Test Koneksi <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Test Connection ─────────────────────────────────────── */}
          {step === 3 && (
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium uppercase tracking-wider">
                  <Wifi className="w-4 h-4" /> Langkah 3 dari 5
                </div>
                <h2 className="text-2xl font-bold text-zinc-100">Test Koneksi Database</h2>
                <p className="text-zinc-400 text-sm">
                  Klik tombol di bawah untuk menguji koneksi ke Supabase secara real-time.
                </p>
              </div>

              {/* Summary of inputs */}
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-zinc-500 w-16 shrink-0">URL</span>
                  <span className="text-zinc-300 font-mono text-xs break-all">{cleanSupabaseUrl(supabaseUrl)}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-500 w-16 shrink-0">Key</span>
                  <span className="text-zinc-300 font-mono text-xs">{anonKey.slice(0, 20)}...{anonKey.slice(-8)}</span>
                </div>
              </div>

              {/* Test button */}
              <button
                onClick={handleTestConnection}
                disabled={testLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-blue-700 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors"
              >
                {testLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Menguji koneksi...</>
                ) : (
                  <><RefreshCw className="w-4 h-4" /> Jalankan Test Koneksi</>
                )}
              </button>

              {/* Result */}
              {connectionResult && (
                <div
                  className={`rounded-xl p-4 border text-sm space-y-2 ${
                    connectionResult.success && connectionResult.tableReady
                      ? 'bg-emerald-950/50 border-emerald-800 text-emerald-300'
                      : connectionResult.success && !connectionResult.tableReady
                      ? 'bg-amber-950/50 border-amber-800 text-amber-300'
                      : 'bg-red-950/50 border-red-800 text-red-300'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {connectionResult.success && connectionResult.tableReady && <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />}
                    {connectionResult.success && !connectionResult.tableReady && <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />}
                    {!connectionResult.success && <XCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                    <p>{connectionResult.message}</p>
                  </div>

                  {/* If table not ready, show SQL */}
                  {connectionResult.success && !connectionResult.tableReady && (
                    <div className="mt-4 space-y-2">
                      <p className="text-amber-400 font-medium text-xs uppercase tracking-wide flex items-center gap-1">
                        <Terminal className="w-3.5 h-3.5" /> Skrip SQL untuk Membuat Tabel
                      </p>
                      <div className="relative">
                        <pre className="bg-zinc-900 text-zinc-300 text-xs rounded-lg p-4 overflow-auto max-h-48 leading-relaxed">{SUPABASE_SQL_SETUP}</pre>
                        <div className="absolute top-2 right-2">
                          <CopyButton text={SUPABASE_SQL_SETUP} />
                        </div>
                      </div>
                      <p className="text-zinc-500 text-xs">
                        Salin skrip di atas → buka <strong className="text-zinc-400">Supabase Dashboard → SQL Editor</strong> → paste &amp; klik Run.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Save credentials */}
              {connectionResult?.success && (
                <div className="border border-zinc-700 rounded-xl p-4 space-y-3">
                  <p className="text-sm text-zinc-300 font-medium">Simpan Konfigurasi ke Browser</p>
                  <p className="text-xs text-zinc-500">Kredensial akan disimpan di localStorage browser ini agar admin panel dapat menggunakan koneksi ini secara otomatis.</p>
                  <button
                    onClick={() => { saveCredentials(); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${savedOk ? 'bg-emerald-900 text-emerald-400 border border-emerald-700' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'}`}
                  >
                    {savedOk ? <><Check className="w-4 h-4" /> Tersimpan di browser</> : <><Database className="w-4 h-4" /> Simpan Konfigurasi</>}
                  </button>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={goBack} className="flex items-center gap-2 px-4 py-3 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 rounded-xl transition-colors text-sm">
                  <ArrowLeft className="w-4 h-4" /> Kembali
                </button>
                <button
                  onClick={goNext}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors"
                >
                  Lanjut ke Verifikasi Layanan <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4: Service Checks ──────────────────────────────────────── */}
          {step === 4 && (
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> Langkah 4 dari 5
                </div>
                <h2 className="text-2xl font-bold text-zinc-100">Verifikasi Kompatibilitas Layanan</h2>
                <p className="text-zinc-400 text-sm">Mengecek semua endpoint dan halaman yang diperlukan NOVIO Web.</p>
              </div>

              <div className="space-y-3">
                {serviceChecks.map((check, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl">
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-zinc-200">{check.name}</p>
                      <p className="text-xs text-zinc-500">{check.message}</p>
                    </div>
                    <StatusBadge
                      status={check.status}
                      label={
                        check.status === 'loading' ? 'Memeriksa...'
                          : check.status === 'success' ? 'OK'
                          : check.status === 'warning' ? 'Perhatian'
                          : 'Error'
                      }
                    />
                  </div>
                ))}

                {servicesLoading && (
                  <div className="flex items-center gap-2 text-zinc-500 text-sm py-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Sedang memeriksa layanan...
                  </div>
                )}
              </div>

              {!servicesLoading && serviceChecks.length > 0 && (
                <button
                  onClick={runServiceChecks}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 rounded-xl transition-colors text-sm"
                >
                  <RefreshCw className="w-4 h-4" /> Ulangi Pemeriksaan
                </button>
              )}

              <div className="flex gap-3">
                <button onClick={goBack} className="flex items-center gap-2 px-4 py-3 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 rounded-xl transition-colors text-sm">
                  <ArrowLeft className="w-4 h-4" /> Kembali
                </button>
                <button
                  onClick={goNext}
                  disabled={servicesLoading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors"
                >
                  Selesai — Lihat Ringkasan <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 5: Done ────────────────────────────────────────────────── */}
          {step === 5 && (
            <div className="p-8 space-y-6">
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-900/60 border-2 border-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-zinc-100">Setup Selesai!</h2>
                  <p className="text-zinc-400 text-sm mt-1">NOVIO Web siap digunakan di lingkungan produksi.</p>
                </div>
              </div>

              {/* Summary cards */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: 'Database',
                    value: connectionResult?.success
                      ? connectionResult.tableReady ? 'Siap' : 'Perlu Setup Tabel'
                      : 'Belum Dikonfigurasi',
                    status: connectionResult?.success
                      ? connectionResult.tableReady ? 'success' : 'warning'
                      : 'error' as StepStatus,
                  },
                  {
                    label: 'Konfigurasi',
                    value: savedOk ? 'Tersimpan di browser' : 'Belum disimpan',
                    status: (savedOk ? 'success' : 'warning') as StepStatus,
                  },
                  {
                    label: 'Layanan',
                    value: serviceChecks.length > 0
                      ? `${serviceChecks.filter((c) => c.status === 'success').length}/${serviceChecks.length} OK`
                      : 'Belum dicek',
                    status: (serviceChecks.every((c) => c.status === 'success')
                      ? 'success'
                      : serviceChecks.some((c) => c.status === 'error')
                      ? 'error'
                      : 'warning') as StepStatus,
                  },
                  {
                    label: 'Admin Portal',
                    value: 'PIN: novio2026',
                    status: 'success' as StepStatus,
                  },
                ].map(({ label, value, status }) => (
                  <div key={label} className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4 space-y-1">
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-medium text-zinc-200">{value}</p>
                    <StatusBadge status={status} label={status === 'success' ? 'OK' : status === 'warning' ? 'Perhatian' : 'Error'} />
                  </div>
                ))}
              </div>

              <div className="bg-zinc-800/40 border border-zinc-700 rounded-xl p-4 text-xs text-zinc-500 space-y-1">
                <p className="text-zinc-300 font-medium text-sm">Langkah Selanjutnya</p>
                <ul className="space-y-1 mt-2">
                  <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Buka <strong className="text-zinc-400">/admin</strong> untuk mengakses dashboard admin</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Gunakan PIN <code className="text-emerald-400 bg-zinc-800 px-1 rounded">novio2026</code> untuk login</li>
                  {connectionResult?.success && !connectionResult.tableReady && (
                    <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">•</span> Jalankan skrip SQL di Supabase SQL Editor untuk membuat tabel database</li>
                  )}
                  <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">•</span> Gunakan tab <strong className="text-zinc-400">Export</strong> di admin untuk backup/restore data</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button onClick={goBack} className="flex items-center gap-2 px-4 py-3 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 rounded-xl transition-colors text-sm">
                  <ArrowLeft className="w-4 h-4" /> Kembali
                </button>
                <Link
                  href="/admin"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors text-center"
                >
                  Masuk ke Admin Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-xs text-zinc-600 text-center">
          NOVIO Web — Setup Wizard hanya digunakan satu kali saat deployment pertama.{' '}
          <span className="text-zinc-500">Akses kembali kapan saja di <code className="text-zinc-400">/setup</code></span>
        </p>
      </div>
    </div>
  );
}
