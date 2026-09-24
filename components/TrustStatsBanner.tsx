'use client';

import React from 'react';
import { ChefHat, Sprout, ShieldCheck, Truck, Sparkles } from 'lucide-react';

const STATS = [
  {
    id: 'specimens',
    value: '35+',
    label: 'Spesimen & Hasil Tani',
    description: 'Tisane herbal, fermentasi artisan, microgreens, & edible flowers segar.',
    icon: Sprout,
    badge: 'Panen Harian',
  },
  {
    id: 'chefs',
    value: '120+',
    label: 'Mitra Dapur & Hotel B2B',
    description: 'Pilihan para Chef profesional di restoran bintang 5 & fine dining Indonesia.',
    icon: ChefHat,
    badge: 'Grade Chef',
  },
  {
    id: 'farmers',
    value: '100%',
    label: 'Petani Artisan Lokal',
    description: 'Kemitraan berkeadilan di Parongpong Bandung & Nusa Dua Bali.',
    icon: ShieldCheck,
    badge: 'Fair Trade',
  },
  {
    id: 'coldchain',
    value: '24 Jam',
    label: 'Pengiriman Rantai Dingin',
    description: 'Menjaga aroma, kesegaran daun, dan khasiat aktif tetap prima hingga dapur.',
    icon: Truck,
    badge: 'Cold Chain',
  },
];

export default function TrustStatsBanner() {
  return (
    <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="glass-luxury rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-sage/25">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`flex flex-col justify-between pt-5 first:pt-0 sm:pt-0 ${
                  idx > 0 ? 'sm:pl-6 lg:pl-8' : ''
                } group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-garden bg-cream px-2.5 py-0.5 rounded-full border border-sage/30 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-sage" />
                    <span>{stat.badge}</span>
                  </span>
                  <div className="w-9 h-9 rounded-full bg-forest/10 group-hover:bg-forest text-garden group-hover:text-cream flex items-center justify-center transition-all duration-300">
                    <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                  <h4 className="font-medium text-xs sm:text-sm text-charcoal font-serif mb-1 group-hover:text-garden transition-colors">
                    {stat.label}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-charcoal/70 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
