'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSiteData } from '@/context/SiteDataContext';
import {
  Eye,
  EyeOff,
  LayoutDashboard,
  X,
  Sparkles,
  Pencil,
  ChevronRight,
  ExternalLink,
  Smartphone,
  Cloud,
  RefreshCw,
} from 'lucide-react';

export default function VisualEditBar() {
  const {
    isEditMode,
    isPreviewMode,
    enableEditMode,
    disableEditMode,
    togglePreviewMode,
    openSyncModal,
    isCloudConfigured,
    cloudSyncStatus,
    isAnyModalOpen,
  } = useSiteData();
  const pathname = usePathname();

  // Floating trigger when edit mode is OFF
  if (!isEditMode) {
    // Don't show inside /admin or when modal is open
    if (pathname.startsWith('/admin') || isAnyModalOpen) return null;

    return (
      <div className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={enableEditMode}
          className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-forest text-softwhite hover:bg-forest-light shadow-2xl border-2 border-sage/60 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 group"
          title="Aktifkan Mode Edit Langsung di Halaman"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 group-hover:animate-ping" />
          <Pencil className="w-3.5 h-3.5 text-sage" />
          <span>
            <span className="hidden sm:inline">Mode </span>Edit Web
          </span>
        </button>

        <button
          type="button"
          onClick={openSyncModal}
          className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-cream text-charcoal hover:bg-softwhite shadow-2xl border-2 border-sage/60 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
          title="Sinkronisasi ke HP / Impor Cadangan Data"
        >
          <Smartphone className="w-3.5 h-3.5 text-forest" />
          <span className="hidden sm:inline">Sinkron HP</span>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Top Fixed Admin Bar - Strictly 42px on both Mobile & Desktop to prevent overlap */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-forest text-softwhite shadow-xl border-b border-forest-light text-xs font-sans h-[42px] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2">
          {/* Left: Indicator & Cloud Auto-Save Status */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-forest-light/60 border border-sage/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-extrabold uppercase tracking-wider text-[10px] sm:text-[11px] text-cream">
                <span className="inline sm:hidden">Edit</span>
                <span className="hidden sm:inline">Mode Edit Visual</span>
              </span>
            </div>

            {/* Cloud Auto-Save Status Pill */}
            {cloudSyncStatus === 'syncing' ? (
              <button
                type="button"
                onClick={openSyncModal}
                className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold"
                title="Menyimpan perubahan ke Database Supabase..."
              >
                <RefreshCw className="w-3 h-3 animate-spin text-emerald-300" />
                <span className="hidden md:inline">Menyimpan...</span>
              </button>
            ) : cloudSyncStatus === 'saved' ? (
              <button
                type="button"
                onClick={openSyncModal}
                className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold"
                title="Data tersimpan di Supabase Cloud"
              >
                <Cloud className="w-3 h-3 text-emerald-300" />
                <span className="hidden md:inline">Tersimpan di Cloud</span>
              </button>
            ) : isCloudConfigured ? (
              <button
                type="button"
                onClick={openSyncModal}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold hover:bg-emerald-900/60"
                title="Database Supabase Terhubung & Aktif"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="hidden sm:inline">Cloud Aktif</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={openSyncModal}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full bg-amber-950/40 text-amber-200 border border-amber-500/40 text-[10px] font-semibold hover:bg-amber-900/60 transition-all"
                title="Klik untuk menghubungkan Supabase agar data otomatis permanen"
              >
                <Cloud className="w-3 h-3 text-amber-300" />
                <span className="hidden sm:inline">Hubungkan DB</span>
              </button>
            )}

            <span className="hidden xl:inline text-cream/70 text-[11px] truncate max-w-[320px]">
              {isPreviewMode
                ? 'Mode Pratinjau (tombol edit disembunyikan)'
                : 'Klik [Edit] atau [Hapus] di kartu, atau [+ Tambah].'}
            </span>
          </div>

          {/* Center: Live Editor Guide Badge (Desktop only) */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-cream/70 bg-forest-light/20 px-3 py-1 rounded-full border border-sage/20">
            <Sparkles className="w-3.5 h-3.5 text-sage" />
            <span>Klik tombol <strong>Edit</strong> langsung pada komponen di bawah untuk mengubah konten</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={togglePreviewMode}
              className={`inline-flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all border ${
                isPreviewMode
                  ? 'bg-cream text-charcoal border-sage'
                  : 'bg-forest-light/60 hover:bg-forest-light text-cream border-sage/40'
              }`}
              title={isPreviewMode ? 'Tampilkan kembali tombol edit' : 'Lihat seperti tampilan pengunjung biasa'}
            >
              {isPreviewMode ? <Eye className="w-3.5 h-3.5 text-garden" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPreviewMode ? 'Keluar Pratinjau' : 'Pratinjau'}</span>
            </button>

            <button
              type="button"
              onClick={openSyncModal}
              className="inline-flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-softwhite border border-emerald-400/60 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95"
              title="Kirim link sinkronisasi ke WhatsApp atau unduh cadangan agar langsung tampil di HP"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-200" />
              <span className="hidden sm:inline">Sinkron HP</span>
            </button>

            <Link
              href="/admin"
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-forest-light/60 hover:bg-forest-light text-cream border border-sage/40 text-[11px] font-bold uppercase tracking-wider"
              title="Kembali ke Dashboard Tabel CMS"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-sage" />
              <span>Admin</span>
            </Link>

            <button
              type="button"
              onClick={disableEditMode}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-earth/80 hover:bg-earth text-softwhite text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all"
              title="Selesai dan keluar dari mode edit"
            >
              <X className="w-3.5 h-3.5" />
              <span>Selesai</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Status Pill at Bottom-Left (Desktop Only, avoids obstructing mobile screen, hidden when modal is open) */}
      {!isAnyModalOpen && (
        <div className="hidden sm:flex fixed bottom-6 left-6 z-40 items-center gap-2">
          <button
            type="button"
            onClick={disableEditMode}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 text-softwhite hover:bg-emerald-700 shadow-2xl border-2 border-cream text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            title="Mode Edit Sedang Aktif. Klik untuk keluar/selesai."
          >
            <span className="w-2.5 h-2.5 rounded-full bg-softwhite animate-pulse" />
            <span>Mode Edit: AKTIF (Selesai)</span>
          </button>

          <button
            type="button"
            onClick={openSyncModal}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-forest text-softwhite hover:bg-forest-light shadow-2xl border-2 border-sage/60 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            title="Sinkronkan ke HP / Cadangan Data"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Sinkron HP</span>
          </button>
        </div>
      )}
    </>
  );
}
