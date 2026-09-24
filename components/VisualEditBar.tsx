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
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export default function VisualEditBar() {
  const { isEditMode, isPreviewMode, disableEditMode, togglePreviewMode } = useSiteData();
  const pathname = usePathname();

  if (!isEditMode) return null;

  const NAV_LINKS = [
    { label: 'Beranda', href: '/' },
    { label: 'Produk', href: '/product' },
    { label: 'Layanan', href: '/services' },
    { label: 'Portofolio', href: '/portfolio' },
    { label: 'Artikel', href: '/blog' },
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Kontak', href: '/contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-forest text-softwhite shadow-xl border-b border-forest-light text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-light/60 border border-sage/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-extrabold uppercase tracking-wider text-[11px] text-cream">
              Mode Edit Visual
            </span>
          </div>
          <span className="hidden md:inline text-cream/70 text-[11px]">
            {isPreviewMode
              ? 'Mode Pratinjau Pengunjung (tombol edit disembunyikan sementara)'
              : 'Klik tombol Edit atau Tambah langsung pada komponen yang ingin diubah.'}
          </span>
        </div>

        {/* Center: Page Switcher Links */}
        <div className="hidden lg:flex items-center gap-1 bg-forest-light/30 p-1 rounded-lg border border-sage/30">
          <span className="text-[10px] uppercase font-bold text-sage px-2">Beralih Halaman:</span>
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                  isActive
                    ? 'bg-garden text-softwhite shadow-xs'
                    : 'text-cream/80 hover:text-softwhite hover:bg-forest-light/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePreviewMode}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all border ${
              isPreviewMode
                ? 'bg-cream text-charcoal border-sage'
                : 'bg-forest-light/60 hover:bg-forest-light text-cream border-sage/40'
            }`}
            title={isPreviewMode ? 'Tampilkan kembali tombol edit' : 'Lihat seperti tampilan pengunjung biasa'}
          >
            {isPreviewMode ? <Eye className="w-3.5 h-3.5 text-garden" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{isPreviewMode ? 'Keluar Pratinjau' : 'Pratinjau Pengunjung'}</span>
          </button>

          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-light/60 hover:bg-forest-light text-cream border border-sage/40 text-[11px] font-bold uppercase tracking-wider"
            title="Kembali ke Dashboard Tabel CMS"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-sage" />
            <span className="hidden sm:inline">Dashboard Admin</span>
          </Link>

          <button
            type="button"
            onClick={disableEditMode}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-earth/80 hover:bg-earth text-softwhite text-[11px] font-bold uppercase tracking-wider transition-all"
            title="Selesai dan keluar dari mode edit"
          >
            <X className="w-3.5 h-3.5" />
            <span>Selesai</span>
          </button>
        </div>
      </div>
    </div>
  );
}
