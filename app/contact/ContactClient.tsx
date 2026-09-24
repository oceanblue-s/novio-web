'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { offices, siteConfig } from '@/data/site';
import { Office } from '@/types';
import ContactForm from '@/components/ContactForm';
import OfficeCard from '@/components/OfficeCard';
import GoogleMap from '@/components/GoogleMap';
import ProjectBriefWizard from '@/components/ProjectBriefWizard';
import { Sparkles, MessageSquare, Mail } from 'lucide-react';

export default function ContactClient() {
  const [selectedOffice, setSelectedOffice] = useState<Office>(offices[0]);
  const [activeTab, setActiveTab] = useState<'wizard' | 'form'>('wizard');

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
      {/* 1. Dual Office Cards Grid */}
      <div className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold tracking-widest uppercase text-garden bg-cream px-3 py-1 rounded-full border border-sage/40 inline-block mb-3">
            Suaka &amp; Studio Kami
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
            Kunjungi Studio &amp; Kebun Kami
          </h2>
          <p className="text-sm text-charcoal/70 mt-2">
            Pilih salah satu studio di bawah ini untuk melihat detail lokasi dan rute interaktif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offices.map((office) => (
            <OfficeCard
              key={office.id}
              office={office}
              isSelected={selectedOffice.id === office.id}
              onSelect={() => setSelectedOffice(office)}
            />
          ))}
        </div>
      </div>

      {/* 2. Interactive Google Map Embed */}
      <div className="mb-20">
        <GoogleMap
          activeOffice={selectedOffice}
          offices={offices}
          onSelectOffice={(office) => setSelectedOffice(office)}
        />
      </div>

      {/* 3. Inquiry Method Selector Tabs */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-sage/30 pb-4">
        <div>
          <span className="text-xs font-semibold tracking-widest uppercase text-garden block mb-1">
            Mulai Konsultasi
          </span>
          <h3 className="font-serif text-2xl font-medium text-charcoal">
            Bagaimana Anda Ingin Terhubung?
          </h3>
        </div>

        <div className="flex items-center gap-2 p-1 bg-cream rounded-full border border-sage/40">
          <button
            type="button"
            onClick={() => setActiveTab('wizard')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'wizard'
                ? 'bg-forest text-softwhite shadow-sm'
                : 'text-charcoal/70 hover:text-charcoal'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sage" />
            <span>Panduan Interaktif Proyek</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('form')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'form'
                ? 'bg-forest text-softwhite shadow-sm'
                : 'text-charcoal/70 hover:text-charcoal'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Formulir Pesan</span>
          </button>
        </div>
      </div>

      {/* 4. Tab Content */}
      {activeTab === 'wizard' ? (
        <div className="mb-20">
          <ProjectBriefWizard />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5 space-y-8">
            {/* Responsive Visual Asset Banner */}
            <div className="relative aspect-[1081/501] w-full rounded-xl overflow-hidden shadow-md border border-sage/40">
              <Image
                src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1081&h=501&q=80"
                alt="Lingkungan Nursery Botani NOVIO"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-forest/40 backdrop-contrast-105" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-softwhite">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-sage mb-1">
                  Akses Kebun Nursery Langsung
                </span>
                <p className="font-serif text-lg text-cream font-medium">
                  Konservatori Dataran Tinggi Parongpong, Bandung Barat
                </p>
              </div>
            </div>

            {/* Quick FAQ / Visit Protocol */}
            <div className="bg-cream rounded-xl p-6 sm:p-8 border border-sage/40 space-y-4">
              <h3 className="font-serif text-xl font-medium text-charcoal">
                Kunjungan Privat ke Kebun Nursery
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                Demi menjaga fokus sesi konsultasi kurasi dan menjaga kebersihan higienis spesimen mikroba tanah, kunjungan ke greenhouse Parongpong dan kebun Bali kami dilakukan berdasarkan reservasi terlebih dahulu.
              </p>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                Silakan hubungi layanan klien kami via WhatsApp (0813 1241 4863) atau kirimkan formulir konsultasi setidaknya 24 jam sebelum rencana kedatangan.
              </p>
              <div className="pt-2 border-t border-sage/30">
                <p className="text-xs text-charcoal-muted">
                  Jam Operasional: Senin – Sabtu: 08:30 – 17:00 WIB / WITA
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
