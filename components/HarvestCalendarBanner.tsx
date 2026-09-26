'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Sparkles,
  Leaf,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sun,
  CloudRain,
  Flame,
} from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import { useChefCuration } from '@/context/ChefCurationContext';

interface HarvestItem {
  id: string;
  name: string;
  category: 'bunga' | 'tisane' | 'fermentasi' | 'sayur';
  categoryLabel: string;
  seasonStatus: 'Puncak Panen' | 'Tersedia Harian' | 'Pematangan Artisan';
  statusColor: 'emerald' | 'amber' | 'blue';
  months: string;
  altitude: string;
  aromaNote: string;
  culinaryUse: string;
}

const HARVEST_ITEMS: HarvestItem[] = [
  {
    id: 'h-1',
    name: 'Bunga Marigold & Nasturtium',
    category: 'bunga',
    categoryLabel: 'Bunga Konsumsi',
    seasonStatus: 'Puncak Panen',
    statusColor: 'emerald',
    months: 'Mei — November',
    altitude: '1.250 mdpl (Parongpong)',
    aromaNote: 'Floral pedas segar, kelopak renyah berwarna oranye-emas menyala.',
    culinaryUse: 'Garnish pastry, salad artisan, botanical cocktails.',
  },
  {
    id: 'h-2',
    name: 'Tisane Lavender & Peppermint',
    category: 'tisane',
    categoryLabel: 'Tisane & Seduhan',
    seasonStatus: 'Puncak Panen',
    statusColor: 'emerald',
    months: 'Sepanjang Tahun (Greenhouse)',
    altitude: '1.300 mdpl (Parongpong)',
    aromaNote: 'Minyak esensial tinggi, sensasi dingin sejuk dan menenangkan.',
    culinaryUse: 'Hot/Cold infusions, kombucha flavoring, panna cotta.',
  },
  {
    id: 'h-3',
    name: 'Cuka Fermentasi Nanas Madu Subang',
    category: 'fermentasi',
    categoryLabel: 'Cuka & Fermentasi',
    seasonStatus: 'Pematangan Artisan',
    statusColor: 'amber',
    months: 'Batch Curing 90 Hari',
    altitude: 'Artisan Fermentary',
    aromaNote: 'Asam buah tropis bulat, mikroflora aktif tanpa zat pengawet.',
    culinaryUse: 'Vinaigrette saus, marinasi hidangan laut, mocktail shrub.',
  },
  {
    id: 'h-4',
    name: 'Microgreens Red Amaranth & Pea Tendril',
    category: 'sayur',
    categoryLabel: 'Microgreens & Sayur',
    seasonStatus: 'Tersedia Harian',
    statusColor: 'emerald',
    months: 'Panen Subuh Setiap Hari',
    altitude: '1.200 mdpl (Lembang & Bali)',
    aromaNote: 'Tunas muda sarat nutrisi, tekstur renyah manis dan peppery.',
    culinaryUse: 'Topping steak, plating fine dining, appetizer canape.',
  },
  {
    id: 'h-5',
    name: 'Bunga Borage (Starflower) & Dianthus',
    category: 'bunga',
    categoryLabel: 'Bunga Konsumsi',
    seasonStatus: 'Tersedia Harian',
    statusColor: 'emerald',
    months: 'Juni — Desember',
    altitude: '1.250 mdpl (Parongpong)',
    aromaNote: 'Aroma mentimun segar dengan warna biru sapphire alami.',
    culinaryUse: 'Ice cubes botanical, seafood plating, dessert premium.',
  },
  {
    id: 'h-6',
    name: 'Awetan Buah Gula Kelapa Organik',
    category: 'fermentasi',
    categoryLabel: 'Cuka & Fermentasi',
    seasonStatus: 'Puncak Panen',
    statusColor: 'amber',
    months: 'Juli — Desember',
    altitude: 'Dapur Artisan Bali',
    aromaNote: 'Karamelisasi nektar kelapa alami dengan serat buah legit.',
    culinaryUse: 'Cheese platter pairing, sourdough spread, glaze daging panggang.',
  },
  {
    id: 'h-7',
    name: 'Kombucha Sparkling Probiotic Tea',
    category: 'fermentasi',
    categoryLabel: 'Minuman & Fermentasi',
    seasonStatus: 'Tersedia Harian',
    statusColor: 'emerald',
    months: 'Fermentasi Kontinu (Kaleng 250ml)',
    altitude: 'Fasilitas Artisan Parongpong',
    aromaNote: 'Naturally effervescent, asam segar halus, 4 varian: Shishito, Rosella, Jamu, Blue Pea.',
    culinaryUse: 'Pairing hidangan gurih/grilled, penyeimbang masakan pedas, mocktail.',
  },
  {
    id: 'h-8',
    name: 'Custard Apple Kombucha Syrup',
    category: 'fermentasi',
    categoryLabel: 'Sirup & Fermentasi',
    seasonStatus: 'Pematangan Artisan',
    statusColor: 'amber',
    months: 'Panen Srikaya Tropis (Botol 250ml)',
    altitude: 'Handcrafted in Bali',
    aromaNote: 'Manis buah srikaya tropis lembut berpadu acidity kompleks kultur kombucha.',
    culinaryUse: 'Mixer mocktail craft, tea/coffee, topping dessert, pastry glaze & plating.',
  },
];

export default function HarvestCalendarBanner() {
  const [filter, setFilter] = useState<'all' | 'bunga' | 'tisane' | 'fermentasi' | 'sayur'>('all');
  const { openDrawer } = useChefCuration();

  const filteredItems = filter === 'all'
    ? HARVEST_ITEMS
    : HARVEST_ITEMS.filter((item) => item.category === filter);

  return (
    <section className="py-24 px-6 sm:px-8 bg-softwhite border-t border-sage/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <SectionTitle
            label="Siklus Alam & Kalender Panen"
            title="Ketersediaan Panen Musiman NOVIO"
            subtitle="Hasil tani dan produk artisan kami dipetik pada puncak kesegaran mikroklimat dataran tinggi untuk memastikan profil rasa dan estetika hidangan Anda berada di tingkat tertinggi."
            align="left"
          />

          {/* Quick Filter Pill Buttons */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {[
              { id: 'all', label: 'Semua Kategori' },
              { id: 'bunga', label: 'Bunga Konsumsi' },
              { id: 'tisane', label: 'Tisane & Seduhan' },
              { id: 'fermentasi', label: 'Cuka & Fermentasi' },
              { id: 'sayur', label: 'Microgreens' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold uppercase tracking-wider transition-all duration-300 ${
                  filter === tab.id
                    ? 'bg-forest text-softwhite shadow-sm ring-2 ring-forest/20'
                    : 'bg-cream text-charcoal/80 hover:bg-cream-dark border border-sage/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Harvest Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="card-hover-lift bg-cream/40 hover:bg-cream/80 rounded-2xl p-6 border border-sage/35 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-garden">
                    {item.categoryLabel}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.statusColor === 'emerald'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.statusColor === 'emerald' ? 'bg-emerald-600' : 'bg-amber-600'
                      } animate-pulse`}
                    />
                    {item.seasonStatus}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-serif text-xl font-medium text-charcoal leading-snug">
                  {item.name}
                </h4>

                {/* Season & Altitude Tags */}
                <div className="space-y-1.5 text-xs text-charcoal-muted">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-sage shrink-0" />
                    <span className="text-charcoal/90 font-medium">Periode: {item.months}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="w-3.5 h-3.5 text-garden shrink-0" />
                    <span>Lahan: {item.altitude}</span>
                  </div>
                </div>

                {/* Aroma & Flavor Notes */}
                <p className="text-xs text-charcoal/80 leading-relaxed bg-softwhite/80 p-3 rounded-xl border border-sage/20">
                  <strong className="text-forest font-semibold block mb-0.5">Karakter Rasa:</strong>
                  {item.aromaNote}
                </p>
              </div>

              {/* Culinary Recommendation Footer */}
              <div className="pt-4 mt-4 border-t border-sage/20 flex items-center justify-between text-xs">
                <span className="text-charcoal-muted text-[11px] truncate max-w-[200px]">
                  💡 {item.culinaryUse}
                </span>
                <Link
                  href="/product"
                  className="inline-flex items-center gap-1 font-bold text-garden hover:text-forest transition-colors shrink-0"
                >
                  <span>Katalog</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Cold-Chain Dispatch Schedule Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-forest rounded-3xl text-softwhite shadow-xl relative overflow-hidden border border-sage/30">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-garden/20 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-light text-sage text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-garden" />
                Jalur Rantai Dingin (Cold-Chain B2B)
              </span>
              <h3 className="font-serif text-2xl font-medium leading-snug">
                Pasokan Segar Subuh Tiba di Dapur Anda Pada Hari yang Sama
              </h3>
              <p className="text-xs sm:text-sm text-cream/80 leading-relaxed">
                Kami melayani pengiriman sameday dan nextday cold-chain ke Jakarta, Bandung, dan Bali menggunakan thermal insulation packaging untuk menjaga integritas enzim, kelembapan, dan aroma bunga/sayur.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={openDrawer}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-garden hover:bg-garden-light text-softwhite font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
              >
                <span>Buka Baki Kurasi Chef</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cream/15 hover:bg-cream/25 text-cream border border-sage/40 font-semibold text-xs uppercase tracking-wider transition-all"
              >
                <span>Hubungi Tim Logistik</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
