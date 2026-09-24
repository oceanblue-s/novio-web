'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { useLiveCustomizer } from '@/context/LiveCustomizerContext';
import { ArrowRight, MessageSquare, MapPin, Mountain, Waves, Sparkles, Pencil } from 'lucide-react';
import { useSiteData } from '@/context/SiteDataContext';

interface SanctuaryData {
  id: 'parongpong' | 'bali';
  name: string;
  region: string;
  badge: string;
  tagline: string;
  elevation: string;
  climate: string;
  imageSrc: string;
  imageAlt: string;
}

const SANCTUARIES: Record<'parongpong' | 'bali', SanctuaryData> = {
  parongpong: {
    id: 'parongpong',
    name: 'Kebun Dataran Tinggi Parongpong',
    region: 'Bandung Barat, Jawa Barat',
    badge: 'Budidaya & Kebun Dataran Tinggi 1.250 mdpl',
    tagline:
      'Membudidayakan daun muda segar, sayuran spesial unik, bunga konsumsi, dan herba kuliner hidup di bawah iklim mikro sejuk Parongpong.',
    elevation: '1.250 mdpl',
    climate: 'Tanah Subur Vulkanik • Bersih Terstandar • 18–24°C',
    imageSrc: '/greenhouse-hero.jpg',
    imageAlt: 'Kebun Dataran Tinggi Novio Parongpong di Bandung Barat',
  },
  bali: {
    id: 'bali',
    name: 'Sanctuary Kemitraan Chef Bali',
    region: 'Nusa Dua, Bali',
    badge: 'Pusat Kemitraan Kuliner & Distribusi',
    tagline:
      'Menghubungkan hasil bumi artisan dan petani lokal dengan dapur para chef profesional di hotel dan restoran berstandar internasional.',
    elevation: 'Pesisir Permukaan Laut',
    climate: 'Distribusi Cepat • Akses Restoran & Resor • 26–31°C',
    imageSrc:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'Pusat Distribusi dan Kemitraan Novio Bali di Nusa Dua',
  },
};

export default function HomeHeroClient() {
  const { settings } = useLiveCustomizer();
  const { isEditMode, isPreviewMode, openEditHero } = useSiteData();
  const [activeSanctuaryKey, setActiveSanctuaryKey] = useState<'parongpong' | 'bali'>('parongpong');
  const sanctuary = SANCTUARIES[activeSanctuaryKey];
  const activeWaNumber =
    activeSanctuaryKey === 'bali' && settings?.site?.whatsappBali
      ? settings.site.whatsappBali
      : settings?.site?.whatsappTarget || siteConfig.whatsappTarget;

  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center text-center min-h-[90vh] sm:min-h-[94vh] pt-28 pb-20">
      {/* Visual In-Context Edit Action Trigger (Admin Only) */}
      {isEditMode && !isPreviewMode && (
        <div className="absolute top-24 right-6 sm:right-10 z-30">
          <button
            type="button"
            onClick={openEditHero}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest/95 hover:bg-forest text-cream hover:text-softwhite text-xs font-bold uppercase tracking-wider border-2 border-sage/60 shadow-2xl transition-all hover:scale-105"
            title="Edit Teks & Foto Hero Beranda"
          >
            <Pencil className="w-4 h-4 text-emerald-400" />
            <span>Edit Hero Beranda</span>
          </button>
        </div>
      )}

      {/* Background Images with smooth fade */}
      <div className="absolute inset-0 z-0">
        <Image
          key={sanctuary.id}
          src={sanctuary.imageSrc}
          alt={sanctuary.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-all duration-1000 ease-out"
        />
        {/* Editorial Overlays */}
        <div className="absolute inset-0 bg-forest/45 backdrop-contrast-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-softwhite flex flex-col items-center">
        {/* Dual Sanctuary Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-forest/80 backdrop-blur-md border border-sage/40 shadow-lg mb-8">
          <button
            type="button"
            onClick={() => setActiveSanctuaryKey('parongpong')}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeSanctuaryKey === 'parongpong'
                ? 'bg-cream text-charcoal shadow-sm'
                : 'text-softwhite/80 hover:text-softwhite'
            }`}
          >
            <Mountain className="w-3.5 h-3.5 text-garden" />
            <span>Parongpong (Dataran Tinggi)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSanctuaryKey('bali')}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeSanctuaryKey === 'bali'
                ? 'bg-cream text-charcoal shadow-sm'
                : 'text-softwhite/80 hover:text-softwhite'
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-garden" />
            <span>Bali (Pesisir Pantai)</span>
          </button>
        </div>

        {/* Location & Elevation Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/60 border border-sage/40 text-sage text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
          <MapPin className="w-3.5 h-3.5 text-garden" />
          <span>{settings?.home?.heroBadge || sanctuary.badge}</span>
        </div>

        {/* Hero Title */}
        <h1
          translate="no"
          className="notranslate font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider text-softwhite mb-6 text-balance leading-tight"
        >
          {settings?.site?.name || 'NOVIO'}
        </h1>

        {/* Subtitle & Sanctuary Narrative */}
        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-cream/95 max-w-2xl mb-3 font-normal">
          {settings?.home?.heroHeadline || 'Temukan Cita Rasa Alami Indonesia'}
        </p>
        <p className="text-sm sm:text-base md:text-lg text-cream/85 max-w-2xl mb-8 leading-relaxed font-light">
          {settings?.home?.heroSubtitle ||
            'Bahan kuliner alami yang diolah dengan penuh ketulusan — mulai dari hasil bumi segar hingga kreasi fermentasi artisanal.'}
        </p>

        {/* Microclimate Meta Bar */}
        <div className="mb-10 px-5 py-2.5 rounded-xl bg-forest/60 backdrop-blur-md border border-sage/30 text-xs text-softwhite/90 flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sage" />
            <strong className="font-semibold text-softwhite">Ketinggian:</strong> {sanctuary.elevation}
          </span>
          <span className="hidden sm:inline text-sage/60">•</span>
          <span>{sanctuary.climate}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/product"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-forest hover:bg-forest-light text-softwhite font-medium text-xs tracking-widest uppercase transition-all shadow-md hover:shadow-lg border border-sage/40"
          >
            <span>Jelajahi Koleksi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={`https://wa.me/${activeWaNumber}?text=${encodeURIComponent(
              `Halo NOVIO, saya tertarik untuk berkonsultasi mengenai pasokan bahan kuliner alami dan produk dari ${sanctuary.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-cream/90 hover:bg-softwhite text-charcoal font-medium text-xs tracking-widest uppercase transition-all shadow-md border border-sage/50"
          >
            <MessageSquare className="w-4 h-4 text-garden" />
            <span>{settings?.home?.ctaWhatsAppText || 'Konsultasi via WhatsApp'}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
