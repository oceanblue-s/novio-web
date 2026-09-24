import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ProjectBriefWizard from '@/components/ProjectBriefWizard';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Panduan Singkat Proyek Botani | NOVIO',
  description:
    'Rancang spesifikasi proyek kurasi botani Anda dalam 4 langkah mudah. Pilih tipe ruang, skala area, dan estetika untuk konsultasi langsung via WhatsApp bersama tim hortikultura NOVIO di Bandung & Bali.',
  alternates: {
    canonical: 'https://novio.vercel.app/brief',
  },
  openGraph: {
    title: 'Panduan Singkat Proyek Botani | NOVIO',
    description:
      'Rancang spesifikasi proyek kurasi botani Anda dalam 4 langkah mudah. Pilih tipe ruang, skala area, dan estetika untuk konsultasi langsung via WhatsApp.',
    url: 'https://novio.vercel.app/brief',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    ],
  },
};

export default function BriefPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <Hero
        title="Rancang Panduan Proyek Botani"
        subtitle="Susun konsep awal kurasi botani dalam 4 langkah interaktif. Disesuaikan secara cermat dengan karakteristik arsitektur dan mikroklimat ruang Anda."
        badge="Panduan Interaktif Proyek"
        imageSrc="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85"
        imageAlt="Perencanaan dan Kurasi Proyek Botani NOVIO"
      />

      {/* Main Wizard Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24 w-full space-y-12">
        <div className="flex items-center justify-between border-b border-sage/30 pb-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal-muted hover:text-garden transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Kontak &amp; Studio</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-garden font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Konsultasi Langsung via WhatsApp</span>
          </div>
        </div>

        {/* Wizard Component */}
        <ProjectBriefWizard />
      </div>
    </div>
  );
}
