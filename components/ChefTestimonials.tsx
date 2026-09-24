'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote, Sparkles, ChefHat } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  venue: string;
  location: string;
  avatar: string;
  quote: string;
  highlightedIngredient: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'chef-1',
    name: 'Chef Adrian Wijaya',
    role: 'Executive Pastry Chef',
    venue: 'Atelier Botanical Dining',
    location: 'SCBD, Jakarta Selatan',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=300',
    quote:
      'Racikan tisane marigold & lavender dari NOVIO memiliki profil minyak esensial yang sangat konsisten. Saat kami infusi ke dalam panna cotta dan sorbet botanical, tamu langsung merasakan kemurnian aroma tanah Parongpong yang belum pernah kami temukan di pemasok lain.',
    highlightedIngredient: 'Tisane Blend & Bunga Marigold Kering',
    rating: 5,
  },
  {
    id: 'chef-2',
    name: 'Chef Ketut Suastika',
    role: 'Culinary Director',
    venue: 'Cliffside Estate & Resort',
    location: 'Uluwatu, Bali',
    avatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=300',
    quote:
      'Cuka fermentasi alami nanas madu dari NOVIO menjadi rahasia keanggunan acidity pada ceviche ikan karang dan salad tropis kami. Keasaman yang dihasilkan bulat dan kaya probiotik, tanpa rasa tajam sintetis.',
    highlightedIngredient: 'Cuka Fermentasi Alami Artisan',
    rating: 5,
  },
  {
    id: 'chef-3',
    name: 'Stella Gunawan',
    role: 'Head of Mixology & Bar Program',
    venue: 'The Glasshouse Speakeasy',
    location: 'Dago Atas, Bandung',
    avatar: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=300',
    quote:
      'Ketahanan edible flowers NOVIO dengan packaging cold-chain luar biasa. Kelopak borage dan nasturtium tiba dalam kondisi segar, renyah, dan mekar sempurna untuk cocktail garnish kami setiap minggu.',
    highlightedIngredient: 'Edible Flowers & Daun Botani Segar',
    rating: 5,
  },
];

export default function ChefTestimonials() {
  return (
    <section className="py-24 px-6 sm:px-8 bg-cream/70 border-t border-sage/30 relative overflow-hidden">
      {/* Background Ambience Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-garden/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-sage/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-14 text-center">
          <SectionTitle
            label="Suara Mitra Dapur B2B"
            title="Kepercayaan Para Chef & Artisan Kuliner"
            subtitle="Dari restoran fine dining berbintang hingga bar koktail biofilik di Jakarta, Bandung, dan Bali — inilah mengapa para profesional memilih hasil tani alami NOVIO."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="card-hover-lift bg-softwhite rounded-2xl p-7 sm:p-8 border border-sage/35 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Top Row: Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-sage/40 group-hover:text-garden transition-colors" />
                </div>

                {/* Quote Content */}
                <p className="text-sm text-charcoal/80 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Paired Ingredient Pill */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream border border-sage/40 text-[11px] font-semibold text-forest">
                    <Sparkles className="w-3 h-3 text-garden" />
                    <span>Spesimen: {t.highlightedIngredient}</span>
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-sage/20 flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-cream shrink-0 border border-sage/40">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    unoptimized
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-charcoal group-hover:text-garden transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-[11px] font-medium text-garden">{t.role}</p>
                  <p className="text-[10px] text-charcoal-muted">
                    {t.venue} • {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-softwhite border border-sage/40 shadow-xs text-xs text-charcoal/80">
            <ChefHat className="w-4 h-4 text-garden" />
            <span className="font-semibold text-forest">Tertarik menguji sampel untuk menu dapur Anda?</span>
            <span className="text-charcoal-muted hidden sm:inline">•</span>
            <span className="text-garden font-bold">Katalog B2B & Paket Sampel Tersedia Setiap Hari</span>
          </div>
        </div>
      </div>
    </section>
  );
}
