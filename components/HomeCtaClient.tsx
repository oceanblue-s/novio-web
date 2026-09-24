'use client';

import React from 'react';
import Link from 'next/link';
import { useLiveCustomizer } from '@/context/LiveCustomizerContext';
import { siteConfig } from '@/data/site';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export default function HomeCtaClient() {
  const { settings } = useLiveCustomizer();
  const waTarget = settings.site.whatsappTarget || siteConfig.whatsappTarget;

  return (
    <section className="py-20 px-6 sm:px-8 bg-forest text-softwhite relative overflow-hidden">
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-forest-light/40 blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-light/60 border border-sage/30 text-sage text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Konsultasi Botani Privat</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-6 text-balance text-softwhite">
          {settings.home.ctaHeadline ||
            'Memiliki rencana proyek, ruang hijau impian, atau membutuhkan kurasi khusus?'}
        </h2>

        <p className="text-cream/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10 text-balance">
          {settings.home.ctaSubtitle ||
            'Diskusikan langsung bersama direktur botani dan kurator kami di Bandung Barat atau Bali. Kami siap mendampingi pemilihan spesimen, instalasi ruang hijau, hingga panduan perawatan jangka panjang.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${waTarget}?text=${encodeURIComponent(
              'Halo NOVIO, saya ingin berkonsultasi mengenai kurasi botani untuk ruang saya.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded bg-garden hover:bg-garden-light text-softwhite font-medium text-sm tracking-wider uppercase transition-all shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Hubungi via WhatsApp ({waTarget})</span>
          </a>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded bg-cream/10 hover:bg-cream/20 text-softwhite font-medium text-sm tracking-wider uppercase border border-sage/40 transition-colors"
          >
            <span>Kunjungi Kontak & Kantor</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
