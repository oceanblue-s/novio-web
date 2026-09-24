'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  defaultCustomizerSettings,
  CustomizerSettings,
  safeMergeSettings,
} from '@/context/LiveCustomizerContext';
import { compressImageFile, safeSetLocalStorage } from '@/lib/imageUtils';
import {
  Monitor,
  Tablet,
  Smartphone,
  ChevronDown,
  ChevronRight,
  Save,
  Check,
  RotateCcw,
  ExternalLink,
  X,
  Upload,
  Sparkles,
  Home,
  Info,
  Phone,
  Layers,
  ArrowRight,
  ShieldCheck,
  Copy,
  Download,
  Eye,
  EyeOff,
  KeyRound,
  Unlock,
  AlertCircle,
} from 'lucide-react';

const ADMIN_PIN = 'novio2026';
const STORAGE_CUSTOMIZER_KEY = 'novio_live_customizer_settings_v1';

const PAGES = [
  { label: 'Beranda (Home)', path: '/' },
  { label: 'Tentang Kami', path: '/about' },
  { label: 'Katalog Produk', path: '/product' },
  { label: 'Layanan Botani', path: '/services' },
  { label: 'Portofolio Ruang', path: '/portfolio' },
  { label: 'Jurnal & Artikel', path: '/blog' },
  { label: 'Kontak & Kantor', path: '/contact' },
];

export default function CustomizerClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [pinError, setPinError] = useState('');

  const [settings, setSettings] = useState<CustomizerSettings>(defaultCustomizerSettings);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [currentPath, setCurrentPath] = useState('/');
  const [activeSection, setActiveSection] = useState<string>('home-hero');
  const [isDirty, setIsDirty] = useState(false);
  const [publishedToast, setPublishedToast] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copyCodeSuccess, setCopyCodeSuccess] = useState('');

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load saved settings & check auth on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        if (window.sessionStorage.getItem('novio_admin_authenticated') === 'true') {
          setIsAuthenticated(true);
        }
      }
    } catch {}

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(STORAGE_CUSTOMIZER_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setSettings((prev) => safeMergeSettings(prev, parsed));
        }
      }
    } catch {}
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      setIsAuthenticated(true);
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem('novio_admin_authenticated', 'true');
        }
      } catch {}
      setPinError('');
    } else {
      setPinError('PIN salah. Silakan coba lagi.');
    }
  };

  // Broadcast settings to iframe whenever settings change
  const broadcastUpdate = (newSettings: CustomizerSettings) => {
    const safe = safeMergeSettings(defaultCustomizerSettings, newSettings);
    setSettings(safe);
    setIsDirty(true);
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: 'NOVIO_CUSTOMIZER_UPDATE',
            payload: safe,
          },
          '*'
        );
      }
    } catch {}
  };

  // When iframe finishes loading, send current settings to it
  const handleIframeLoad = () => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: 'NOVIO_CUSTOMIZER_UPDATE',
            payload: settings,
          },
          '*'
        );
      }
    } catch {}
  };

  // Image Upload Helper with auto-compression
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onDone: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImageFile(file)
        .then((dataUrl) => onDone(dataUrl))
        .catch(() => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const result = event.target?.result as string;
            if (result) onDone(result);
          };
          reader.readAsDataURL(file);
        });
    }
  };

  // Publish / Save
  const handlePublish = () => {
    safeSetLocalStorage(STORAGE_CUSTOMIZER_KEY, JSON.stringify(settings));
    setIsDirty(false);
    setPublishedToast(true);
    setTimeout(() => setPublishedToast(false), 3500);
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm('Kembalikan semua teks dan konten ke pengaturan awal NOVIO?')) {
      broadcastUpdate(defaultCustomizerSettings);
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(STORAGE_CUSTOMIZER_KEY);
        }
      } catch {}
      setIsDirty(false);
    }
  };

  const toggleSection = (sectionName: string) => {
    setActiveSection(activeSection === sectionName ? '' : sectionName);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#121815] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-cream rounded-2xl p-8 sm:p-10 border border-sage/40 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-14 h-14 rounded-full overflow-hidden mx-auto shadow-sm border border-sage/40">
              <Image src="/novio-logo.png" alt="Logo NOVIO" fill sizes="56px" className="object-contain" />
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-wider text-charcoal">
              Studio Sesuaikan NOVIO
            </h1>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Editor visual real-time gaya WordPress untuk menyesuaikan seluruh teks, gambar, dan tata letak NOVIO.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                PIN Akses Pengelola
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPin ? 'text' : 'password'}
                  required
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  placeholder="Masukkan PIN (default: novio2026)"
                  className="w-full pl-10 pr-10 py-3 rounded-lg bg-softwhite border border-sage/40 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-garden"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {pinError && (
                <p className="text-xs text-earth font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{pinError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-garden hover:bg-garden/90 text-softwhite font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Buka Studio Sesuaikan</span>
            </button>
          </form>

          <div className="pt-4 border-t border-sage/30 text-center">
            <Link
              href="/"
              className="text-xs text-charcoal/70 hover:text-garden transition-colors inline-flex items-center gap-1"
            >
              <span>← Kembali ke Website Publik NOVIO</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#121815] text-cream select-none overflow-hidden font-sans">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP APP BAR */}
      {/* ------------------------------------------------------------- */}
      <header className="h-14 bg-forest px-4 flex items-center justify-between border-b border-forest-light shrink-0 z-20">
        {/* Left: Close & Title */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="w-8 h-8 rounded-lg bg-forest-light/60 hover:bg-forest-light text-softwhite flex items-center justify-center transition-colors"
            title="Keluar dari mode Sesuaikan"
          >
            <X className="w-4 h-4" />
          </Link>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-sage">
                Mode Sesuaikan
              </span>
              <span className="text-[10px] text-cream/40">•</span>
              <span className="text-[10px] text-cream/70 font-mono">Live Visual</span>
            </div>
            <h1 className="font-serif text-sm font-semibold text-softwhite leading-none">
              NOVIO Theme Customizer
            </h1>
          </div>
        </div>

        {/* Center: Device Mode Switcher */}
        <div className="flex items-center gap-1 bg-forest-light/60 p-1 rounded-lg border border-sage/30">
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded text-xs transition-all ${
              deviceMode === 'desktop'
                ? 'bg-softwhite text-forest shadow-xs'
                : 'text-cream/70 hover:text-softwhite'
            }`}
            title="Tampilan Desktop (Komputer/Laptop)"
            aria-label="Desktop view"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('tablet')}
            className={`p-1.5 rounded text-xs transition-all ${
              deviceMode === 'tablet'
                ? 'bg-softwhite text-forest shadow-xs'
                : 'text-cream/70 hover:text-softwhite'
            }`}
            title="Tampilan Tablet (iPad / 768px)"
            aria-label="Tablet view"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded text-xs transition-all ${
              deviceMode === 'mobile'
                ? 'bg-softwhite text-forest shadow-xs'
                : 'text-cream/70 hover:text-softwhite'
            }`}
            title="Tampilan Smartphone (Mobile / 390px)"
            aria-label="Mobile view"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Page Selector */}
          <div className="relative hidden md:block">
            <select
              value={currentPath}
              onChange={(e) => setCurrentPath(e.target.value)}
              className="text-xs py-1.5 pl-3 pr-8 rounded-lg bg-forest-light/60 text-cream border border-sage/40 focus:outline-none focus:ring-1 focus:ring-sage cursor-pointer"
            >
              {PAGES.map((p) => (
                <option key={p.path} value={p.path} className="bg-forest text-cream">
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg text-cream/70 hover:text-softwhite hover:bg-forest-light/60 transition-colors"
            title="Kembalikan ke Teks Asli"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setShowExportModal(true)}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-light/80 hover:bg-forest-light text-cream text-xs font-semibold border border-sage/30 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-sage" />
            <span>Ekspor Kode</span>
          </button>

          {/* Publish Button */}
          <button
            type="button"
            onClick={handlePublish}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow-sm ${
              isDirty
                ? 'bg-garden hover:bg-garden-light text-softwhite animate-pulse'
                : 'bg-forest-light/80 hover:bg-forest-light text-cream border border-sage/40'
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isDirty ? 'Terbitkan *' : 'Tersimpan'}</span>
          </button>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN SPLIT SCREEN: LEFT CONTROLS + RIGHT PREVIEW CANVAS */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT SIDEBAR CONTROLS (WordPress Customizer Style) */}
        <aside className="w-full sm:w-96 md:w-[420px] bg-[#16201b] border-r border-forest-light flex flex-col shrink-0 overflow-y-auto scrollbar-thin z-10">
          <div className="p-4 border-b border-forest-light/60 bg-forest/40">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-sage block mb-1">
              Navigasi Halaman Aktif
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {PAGES.map((page) => (
                <button
                  key={page.path}
                  type="button"
                  onClick={() => setCurrentPath(page.path)}
                  className={`px-2.5 py-1.5 rounded text-left text-xs transition-all truncate ${
                    currentPath === page.path
                      ? 'bg-forest text-softwhite font-semibold border border-sage/40 shadow-xs'
                      : 'text-cream/70 hover:bg-forest/40 hover:text-cream'
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </div>
          </div>

          {/* ACCORDION SECTIONS */}
          <div className="divide-y divide-forest-light/40 text-xs">
            {/* 1. Identitas Situs & Kontak */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection('site-identity')}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-forest/30 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-sage" />
                  <span className="font-semibold text-softwhite uppercase tracking-wider text-[11px]">
                    1. Identitas Situs & Kontak
                  </span>
                </div>
                {activeSection === 'site-identity' ? (
                  <ChevronDown className="w-4 h-4 text-sage" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-cream/50" />
                )}
              </button>

              {activeSection === 'site-identity' && (
                <div className="p-4 space-y-3.5 bg-forest/20 border-t border-forest-light/30">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-cream/80">Nama Brand</label>
                    <input
                      type="text"
                      value={settings.site.name}
                      onChange={(e) =>
                        broadcastUpdate({
                          ...settings,
                          site: { ...settings.site, name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded bg-forest/60 border border-sage/30 text-softwhite text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-cream/80">Tagline Perusahaan</label>
                    <input
                      type="text"
                      value={settings.site.tagline}
                      onChange={(e) =>
                        broadcastUpdate({
                          ...settings,
                          site: { ...settings.site, tagline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded bg-forest/60 border border-sage/30 text-softwhite text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-cream/80">WhatsApp Bandung</label>
                      <input
                        type="text"
                        value={settings.site.whatsappTarget}
                        onChange={(e) =>
                          broadcastUpdate({
                            ...settings,
                            site: { ...settings.site, whatsappTarget: e.target.value },
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded bg-forest/60 border border-sage/30 text-softwhite text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-cream/80">WhatsApp Bali</label>
                      <input
                        type="text"
                        value={settings.site.whatsappBali}
                        onChange={(e) =>
                          broadcastUpdate({
                            ...settings,
                            site: { ...settings.site, whatsappBali: e.target.value },
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded bg-forest/60 border border-sage/30 text-softwhite text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-cream/80">Alamat Bandung</label>
                    <textarea
                      rows={2}
                      value={settings.site.mainAddress}
                      onChange={(e) =>
                        broadcastUpdate({
                          ...settings,
                          site: { ...settings.site, mainAddress: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 rounded bg-forest/60 border border-sage/30 text-softwhite text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 2. Beranda: Hero Section */}
            <div>
              <button
                type="button"
                onClick={() => {
                  toggleSection('home-hero');
                  setCurrentPath('/');
                }}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-forest/30 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-sage" />
                  <span className="font-semibold text-softwhite uppercase tracking-wider text-[11px]">
                    2. Beranda: Hero & Headline
                  </span>
                </div>
                {activeSection === 'home-hero' ? (
                  <ChevronDown className="w-4 h-4 text-sage" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-cream/50" />
                )}
              </button>

              {activeSection === 'home-hero' && (
                <div className="p-4 space-y-3.5 bg-forest/20 border-t border-forest-light/30">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-cream/80">Badge Atas</label>
                    <input
                      type="text"
                      value={settings.home.heroBadge}
                      onChange={(e) =>
                        broadcastUpdate({
                          ...settings,
                          home: { ...settings.home, heroBadge: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded bg-forest/60 border border-sage/30 text-softwhite text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-cream/80">Headline Utama</label>
                    <textarea
                      rows={2}
                      value={settings.home.heroHeadline}
                      onChange={(e) =>
                        broadcastUpdate({
                          ...settings,
                          home: { ...settings.home, heroHeadline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded bg-forest/60 border border-sage/30 text-softwhite text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-cream/80">Subjudul Narasi</label>
                    <textarea
                      rows={3}
                      value={settings.home.heroSubtitle}
                      onChange={(e) =>
                        broadcastUpdate({
                          ...settings,
                          home: { ...settings.home, heroSubtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded bg-forest/60 border border-sage/30 text-softwhite text-xs"
                    />
                  </div>

                  <div className="space-y-2 p-2.5 bg-forest/40 rounded-lg border border-sage/30">
                    <label className="text-[11px] font-medium text-cream/80 flex items-center justify-between">
                      <span>Foto Background Hero</span>
                      <span className="text-[10px] text-sage">Upload langsung</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={settings.home.heroImage}
                        onChange={(e) =>
                          broadcastUpdate({
                            ...settings,
                            home: { ...settings.home, heroImage: e.target.value },
                          })
                        }
                        className="flex-1 px-2.5 py-1.5 rounded bg-forest/70 border border-sage/30 text-softwhite text-xs"
                      />
                      <label className="p-1.5 rounded bg-garden hover:bg-garden-light text-softwhite cursor-pointer shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (dataUrl) =>
                              broadcastUpdate({
                                ...settings,
                                home: { ...settings.home, heroImage: dataUrl },
                              })
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Beranda: Komitmen & 6 Pilar */}
            <div>
              <button
                type="button"
                onClick={() => {
                  toggleSection('home-commitment');
                  setCurrentPath('/');
                }}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-forest/30 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-sage" />
                  <span className="font-semibold text-softwhite uppercase tracking-wider text-[11px]">
                    3. Beranda: Komitmen (6 Pilar)
                  </span>
                </div>
                {activeSection === 'home-commitment' ? (
                  <ChevronDown className="w-4 h-4 text-sage" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-cream/50" />
                )}
              </button>

              {activeSection === 'home-commitment' && (
                <div className="p-4 space-y-3.5 bg-forest/20 border-t border-forest-light/30">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-cream/80">Judul Komitmen</label>
                    <input
                      type="text"
                      value={settings.home.commitmentTitle}
                      onChange={(e) =>
                        broadcastUpdate({
                          ...settings,
                          home: { ...settings.home, commitmentTitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded bg-forest/60 border border-sage/30 text-softwhite text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-cream/80">Paragraf Filosofi</label>
                    <textarea
                      rows={3}
                      value={settings.home.commitmentParagraph1}
                      onChange={(e) =>
                        broadcastUpdate({
                          ...settings,
                          home: { ...settings.home, commitmentParagraph1: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded bg-forest/60 border border-sage/30 text-softwhite text-xs"
                    />
                  </div>

                  {/* 6 Pilar Editor Snippet */}
                  <div className="space-y-2 pt-2 border-t border-forest-light/30">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-sage block">
                      Edit 6 Pilar Nilai Kami
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1 bg-forest/40 p-2 rounded border border-sage/30">
                        <label className="text-[10px] font-semibold text-cream">Pilar 1</label>
                        <input
                          type="text"
                          value={settings.home.pillar1Title}
                          onChange={(e) =>
                            broadcastUpdate({
                              ...settings,
                              home: { ...settings.home, pillar1Title: e.target.value },
                            })
                          }
                          className="w-full px-2 py-1 rounded bg-forest/70 border border-sage/30 text-softwhite text-[11px]"
                        />
                      </div>
                      <div className="space-y-1 bg-forest/40 p-2 rounded border border-sage/30">
                        <label className="text-[10px] font-semibold text-cream">Pilar 2</label>
                        <input
                          type="text"
                          value={settings.home.pillar2Title}
                          onChange={(e) =>
                            broadcastUpdate({
                              ...settings,
                              home: { ...settings.home, pillar2Title: e.target.value },
                            })
                          }
                          className="w-full px-2 py-1 rounded bg-forest/70 border border-sage/30 text-softwhite text-[11px]"
                        />
                      </div>
                      <div className="space-y-1 bg-forest/40 p-2 rounded border border-sage/30">
                        <label className="text-[10px] font-semibold text-cream">Pilar 3</label>
                        <input
                          type="text"
                          value={settings.home.pillar3Title}
                          onChange={(e) =>
                            broadcastUpdate({
                              ...settings,
                              home: { ...settings.home, pillar3Title: e.target.value },
                            })
                          }
                          className="w-full px-2 py-1 rounded bg-forest/70 border border-sage/30 text-softwhite text-[11px]"
                        />
                      </div>
                      <div className="space-y-1 bg-forest/40 p-2 rounded border border-sage/30">
                        <label className="text-[10px] font-semibold text-cream">Pilar 4</label>
                        <input
                          type="text"
                          value={settings.home.pillar4Title}
                          onChange={(e) =>
                            broadcastUpdate({
                              ...settings,
                              home: { ...settings.home, pillar4Title: e.target.value },
                            })
                          }
                          className="w-full px-2 py-1 rounded bg-forest/70 border border-sage/30 text-softwhite text-[11px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Tentang Kami (About Page) */}
            <div>
              <button
                type="button"
                onClick={() => {
                  toggleSection('about-page');
                  setCurrentPath('/about');
                }}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-forest/30 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Info className="w-4 h-4 text-sage" />
                  <span className="font-semibold text-softwhite uppercase tracking-wider text-[11px]">
                    4. Tentang Kami (Kisah Kami)
                  </span>
                </div>
                {activeSection === 'about-page' ? (
                  <ChevronDown className="w-4 h-4 text-sage" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-cream/50" />
                )}
              </button>

              {activeSection === 'about-page' && (
                <div className="p-4 space-y-3.5 bg-forest/20 border-t border-forest-light/30">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-cream/80">Judul Hero About</label>
                    <input
                      type="text"
                      value={settings.about.heroTitle}
                      onChange={(e) =>
                        broadcastUpdate({
                          ...settings,
                          about: { ...settings.about, heroTitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded bg-forest/60 border border-sage/30 text-softwhite text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-cream/80">Kisah Asal Usul Demak</label>
                    <textarea
                      rows={3}
                      value={settings.about.originParagraph1}
                      onChange={(e) =>
                        broadcastUpdate({
                          ...settings,
                          about: { ...settings.about, originParagraph1: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded bg-forest/60 border border-sage/30 text-softwhite text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-cream/80">Kisah Nunik & Peluang Chef</label>
                    <textarea
                      rows={3}
                      value={settings.about.opportunityParagraph1}
                      onChange={(e) =>
                        broadcastUpdate({
                          ...settings,
                          about: { ...settings.about, opportunityParagraph1: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded bg-forest/60 border border-sage/30 text-softwhite text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* RIGHT LIVE CANVAS PREVIEW */}
        <main className="flex-1 bg-[#101412] flex items-center justify-center p-2 sm:p-4 overflow-hidden relative">
          <div
            className={`transition-all duration-300 h-full flex flex-col items-center justify-center relative ${
              deviceMode === 'desktop'
                ? 'w-full max-w-full'
                : deviceMode === 'tablet'
                ? 'w-[768px] max-w-full shadow-2xl rounded-2xl border-4 border-forest-light overflow-hidden'
                : 'w-[390px] max-w-full shadow-2xl rounded-3xl border-8 border-forest-light overflow-hidden'
            }`}
          >
            {/* Screen Notch in Mobile View */}
            {deviceMode === 'mobile' && (
              <div className="w-32 h-4 bg-forest-light rounded-b-xl absolute top-0 z-30 flex items-center justify-center">
                <span className="w-12 h-1 bg-forest/60 rounded-full" />
              </div>
            )}

            {/* The Live Interactive Iframe */}
            <iframe
              ref={iframeRef}
              key={currentPath}
              src={`${currentPath}?customizer=true`}
              onLoad={handleIframeLoad}
              className="w-full h-full bg-softwhite border-0"
              title="Live Website Preview"
            />
          </div>

          {/* Toast Notification on Publish */}
          {publishedToast && (
            <div className="absolute bottom-6 right-6 z-40 bg-garden text-softwhite px-5 py-3 rounded-xl shadow-2xl border border-white/20 flex items-center gap-2.5 animate-fade-in">
              <Check className="w-5 h-5 text-white" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">Perubahan Berhasil Diterbitkan!</p>
                <p className="text-[11px] text-cream/90">Website publik kini menggunakan konten terbaru.</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* EXPORT TO CODE MODAL */}
      {/* ------------------------------------------------------------- */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-forest rounded-2xl p-6 sm:p-8 border border-sage/40 space-y-4 text-cream">
            <div className="flex items-center justify-between border-b border-forest-light pb-3">
              <h3 className="font-serif text-lg font-semibold text-softwhite">
                Ekspor Kode Konfigurasi untuk GitHub / Vercel
              </h3>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="p-1 text-cream/70 hover:text-softwhite"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-cream/80 leading-relaxed">
              Perubahan yang Anda terbitkan sudah aktif di browser. Jika Anda ingin perubahan ini menjadi **permanen di kode sumber GitHub**, salin kode konfigurasi di bawah ini atau download filenya:
            </p>

            <div className="bg-[#121815] p-3 rounded-lg border border-sage/30 max-h-48 overflow-y-auto text-[11px] font-mono text-sage">
              <pre>{JSON.stringify(settings, null, 2)}</pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(settings, null, 2));
                  setCopyCodeSuccess('Kode JSON berhasil disalin!');
                  setTimeout(() => setCopyCodeSuccess(''), 3000);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-forest-light hover:bg-forest-light/80 text-softwhite text-xs font-semibold uppercase tracking-wider"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Salin JSON</span>
              </button>

              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-5 py-2 rounded-lg bg-garden text-softwhite text-xs font-semibold uppercase tracking-wider"
              >
                Selesai
              </button>
            </div>

            {copyCodeSuccess && (
              <p className="text-xs text-emerald-400 font-semibold text-center">{copyCodeSuccess}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
