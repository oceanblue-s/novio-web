'use client';

import React, { useState, useMemo } from 'react';
import { siteConfig } from '@/data/site';
import {
  Home,
  Building2,
  Coffee,
  Trees,
  Maximize2,
  Sparkles,
  MapPin,
  Calendar,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface WizardState {
  spaceType: string;
  footprint: string;
  aesthetic: string;
  location: string;
  timeline: string;
  clientName: string;
  notes: string;
}

const SPACE_TYPES = [
  {
    id: 'Villa & Residensial Privat',
    title: 'Villa & Residensial Privat',
    description: 'Ruang keluarga, penthouse, solarium baca, dan teras atau balkon privat.',
    icon: Home,
  },
  {
    id: 'Ruang Kerja & Kantor Korporat',
    title: 'Ruang Kerja & Kantor Korporat',
    description: 'Ruang rapat eksekutif, area kolaboratif terbuka, dan atrium lobi utama.',
    icon: Building2,
  },
  {
    id: 'Perhotelan, Kafe & Restoran',
    title: 'Perhotelan, Kafe & Restoran',
    description: 'Hotel butik, kafe artisan, roastery kopi, dan restoran berkonsep alam.',
    icon: Coffee,
  },
  {
    id: 'Lanskap Terbuka & Taman Luar',
    title: 'Lanskap Terbuka & Taman Luar',
    description: 'Taman tropis terbuka, area tepian kolam renang, dan arsitektur lanskap hijau.',
    icon: Trees,
  },
];

const FOOTPRINTS = [
  {
    id: 'Sudut Intim / Balkon (< 30 m²)',
    title: 'Sudut Intim / Balkon',
    scale: '< 30 m²',
    desc: '1–4 spesimen tanaman aksen dengan pot tembikar artisan pilihan.',
  },
  {
    id: 'Ruang Sedang (30 – 100 m²)',
    title: 'Ruang Tinggal Sedang',
    scale: '30 – 100 m²',
    desc: 'Zonasi botani bertingkat: pohon lantai, guci pedestal, dan aksen meja.',
  },
  {
    id: 'Ruang Luas (100 – 300 m²)',
    title: 'Ruang Luas & Terbuka',
    scale: '100 – 300 m²',
    desc: 'Penghijauan multi-zona komprehensif dengan media tanam kustom dan sub-irigasi.',
  },
  {
    id: 'Lanskap Utama (> 300 m²)',
    title: 'Lanskap Utama / Lantai Korporat',
    scale: '> 300 m²',
    desc: 'Masterplan biofilik skala penuh, pohon peneduh matang, dan dinding hidup vertikal.',
  },
];

const AESTHETICS = [
  {
    id: 'Aroid Eksotis Langka & Daun Bertekstur',
    title: 'Aroid Eksotis Langka & Daun Bertekstur',
    desc: 'Anthurium beludru, Monstera variegata, dan pot tembikar buatan tangan artisan.',
  },
  {
    id: 'Pohon Berkarakter Arsitektural',
    title: 'Pohon Berkarakter Arsitektural',
    desc: 'Ficus Lyrata plafon tinggi, batang berpola artistik, dan guci basal minimalis.',
  },
  {
    id: 'Penghijauan Biofilik Tahan AC',
    title: 'Penghijauan Biofilik Tahan AC',
    desc: 'Kultivar tangguh pembersih udara yang dirawat khusus untuk lingkungan ruang kantor ber-AC 24/7.',
  },
  {
    id: 'Kanopi Rimbun Hutan Tropis',
    title: 'Kanopi Rimbun Hutan Tropis',
    desc: 'Philodendron menjuntai, paku tanduk rusa epifit, dan lapisan tanaman gantung hijau.',
  },
];

const LOCATIONS = [
  'Bandung Barat / Parongpong',
  'Bandung Kota (Dago, Setiabudi, Ciumbuleuit)',
  'Bali (Uluwatu, Canggu, Seminyak, Nusa Dua)',
  'Jakarta / Jabodetabek',
  'Lokasi Regional Lainnya',
];

const TIMELINES = [
  'Segera (Dalam 2 Minggu)',
  '1 – 2 Bulan Mendatang',
  '3 – 6 Bulan Mendatang',
  'Tahap Konsep / Perencanaan Arsitektur',
];

export default function ProjectBriefWizard() {
  const [step, setStep] = useState<number>(1);
  const [brief, setBrief] = useState<WizardState>({
    spaceType: SPACE_TYPES[0].id,
    footprint: FOOTPRINTS[1].id,
    aesthetic: AESTHETICS[0].id,
    location: LOCATIONS[0],
    timeline: TIMELINES[1],
    clientName: '',
    notes: '',
  });

  // Recommended Nursery based on location and aesthetic
  const matchedNursery = useMemo(() => {
    if (brief.location.includes('Bali')) {
      return {
        name: 'Suaka Pesisir Bali (Nusa Dua)',
        advantage: 'Diadaptasikan untuk kelembapan maritim, hembusan angin laut, dan paparan sinar tropis pesisir.',
      };
    }
    return {
      name: 'Nursery Dataran Tinggi Parongpong (Bandung)',
      advantage: 'Aklimatisasi tanah vulkanik elevasi 1.250 mdpl untuk ketahanan suhu dan kepadatan sel tanaman.',
    };
  }, [brief.location]);

  // Recommended Service Tier
  const matchedServiceTier = useMemo(() => {
    if (brief.spaceType.includes('Kantor') || brief.spaceType.includes('Korporat')) {
      return 'Sewa Tanaman Korporat & Perawatan Berkala';
    }
    if (brief.spaceType.includes('Lanskap')) {
      return 'Arsitektur Lanskap & Suaka Hidup Luar Ruang';
    }
    return 'Penataan Botani Residensial Kustom';
  }, [brief.spaceType]);

  // Generate WhatsApp formatted text
  const whatsappUrl = useMemo(() => {
    const lines = [
      '🌿 *KONSEP RINGKAS PROYEK BOTANI NOVIO*',
      '━━━━━━━━━━━━━━━━━━━━━',
      brief.clientName ? `👤 *Nama Klien:* ${brief.clientName}` : '',
      `🏛️ *Tipe Ruang:* ${brief.spaceType}`,
      `📐 *Skala Luas:* ${brief.footprint}`,
      `🍃 *Estetika Botani:* ${brief.aesthetic}`,
      `📍 *Lokasi Proyek:* ${brief.location}`,
      `⏱️ *Target Waktu:* ${brief.timeline}`,
      `🌱 *Nursery Rekomendasi:* ${matchedNursery.name}`,
      `📋 *Layanan Sesuai:* ${matchedServiceTier}`,
      brief.notes ? `📝 *Catatan Arsitektur:* ${brief.notes}` : '',
      '━━━━━━━━━━━━━━━━━━━━━',
      'Halo Spesialis Botani NOVIO, saya telah merancang ringkasan konsep proyek di website NOVIO dan ingin mendiskusikan langkah kurasi selanjutnya.',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${siteConfig.whatsappTarget}?text=${encodeURIComponent(lines)}`;
  }, [brief, matchedNursery, matchedServiceTier]);

  return (
    <div className="bg-cream rounded-2xl p-6 sm:p-10 border border-sage/40 shadow-sm">
      {/* Wizard Header & Progress Bar */}
      <div className="mb-8 border-b border-sage/30 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-garden block mb-1">
              Alat Perencanaan Interaktif
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
              Rancang Panduan Proyek Botani
            </h3>
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
            Langkah {step} dari 4
          </div>
        </div>

        {/* Progress Dots / Bar */}
        <div className="w-full bg-softwhite h-2 rounded-full overflow-hidden border border-sage/30">
          <div
            className="bg-forest h-full transition-all duration-500 rounded-full"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Interactive Wizard Body */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: Space Type */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-xl font-medium text-charcoal mb-1">
                  01 / Tipe ruang arsitektural apa yang akan ditata?
                </h4>
                <p className="text-xs text-charcoal/70">
                  Pilih tipologi ruang yang paling mewakili kebutuhan properti Anda.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SPACE_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = brief.spaceType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setBrief({ ...brief, spaceType: type.id })}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-forest text-softwhite border-forest shadow-md'
                          : 'bg-softwhite text-charcoal border-sage/40 hover:border-garden/60'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 mb-3 ${
                          isSelected ? 'text-sage' : 'text-garden'
                        }`}
                      />
                      <h5 className="font-serif font-medium text-sm mb-1">{type.title}</h5>
                      <p
                        className={`text-[11px] leading-relaxed ${
                          isSelected ? 'text-cream/80' : 'text-charcoal/70'
                        }`}
                      >
                        {type.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Footprint & Scale */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-xl font-medium text-charcoal mb-1">
                  02 / Berapa perkiraan skala luas ruang Anda?
                </h4>
                <p className="text-xs text-charcoal/70">
                  Membantu kurator menentukan dimensi wadah pot dan volume dedaunan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FOOTPRINTS.map((item) => {
                  const isSelected = brief.footprint === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBrief({ ...brief, footprint: item.id })}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-forest text-softwhite border-forest shadow-md'
                          : 'bg-softwhite text-charcoal border-sage/40 hover:border-garden/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            isSelected ? 'bg-forest-light text-cream' : 'bg-cream text-charcoal'
                          }`}
                        >
                          {item.scale}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-sage" />}
                      </div>
                      <h5 className="font-serif font-medium text-sm mb-1">{item.title}</h5>
                      <p
                        className={`text-[11px] leading-relaxed ${
                          isSelected ? 'text-cream/80' : 'text-charcoal/70'
                        }`}
                      >
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Botanical Aesthetic */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-xl font-medium text-charcoal mb-1">
                  03 / Estetika Botani &amp; Mikroklimat Pilihan
                </h4>
                <p className="text-xs text-charcoal/70">
                  Pilih atmosfer alami yang ingin dihadirkan dalam ruangan.
                </p>
              </div>

              <div className="space-y-2.5">
                {AESTHETICS.map((item) => {
                  const isSelected = brief.aesthetic === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setBrief({ ...brief, aesthetic: item.id })}
                      className={`w-full p-4 rounded-xl text-left border transition-all flex items-start justify-between gap-4 ${
                        isSelected
                          ? 'bg-forest text-softwhite border-forest shadow-md'
                          : 'bg-softwhite text-charcoal border-sage/40 hover:border-garden/60'
                      }`}
                    >
                      <div>
                        <h5 className="font-serif font-medium text-sm mb-1">{item.title}</h5>
                        <p
                          className={`text-xs leading-relaxed ${
                            isSelected ? 'text-cream/80' : 'text-charcoal/70'
                          }`}
                        >
                          {item.desc}
                        </p>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Location & Schedule */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-xl font-medium text-charcoal mb-1">
                  04 / Lokasi Proyek, Target Waktu &amp; Rincian Tambahan
                </h4>
                <p className="text-xs text-charcoal/70">
                  Membantu kami menghubungkan Anda dengan studio kurator terdekat di Bandung atau Bali.
                </p>
              </div>

              <div className="space-y-4 bg-softwhite rounded-xl p-5 border border-sage/30">
                {/* Location Select */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                    Lokasi Proyek:
                  </label>
                  <select
                    value={brief.location}
                    onChange={(e) => setBrief({ ...brief, location: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream/40 border border-sage/40 text-xs text-charcoal focus:ring-2 focus:ring-garden focus:outline-none"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timeline Select */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                    Target Waktu Pelaksanaan:
                  </label>
                  <select
                    value={brief.timeline}
                    onChange={(e) => setBrief({ ...brief, timeline: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream/40 border border-sage/40 text-xs text-charcoal focus:ring-2 focus:ring-garden focus:outline-none"
                  >
                    {TIMELINES.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Client Name Input */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                    Nama Anda (Opsional):
                  </label>
                  <input
                    type="text"
                    value={brief.clientName}
                    onChange={(e) => setBrief({ ...brief, clientName: e.target.value })}
                    placeholder="Contoh: Julian / Studio Dago"
                    className="w-full p-2.5 rounded-lg bg-cream/40 border border-sage/40 text-xs text-charcoal placeholder-charcoal/40 focus:ring-2 focus:ring-garden focus:outline-none"
                  />
                </div>

                {/* Notes Textarea */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                    Visi Khusus / Catatan Arsitektur (Opsional):
                  </label>
                  <textarea
                    rows={2}
                    value={brief.notes}
                    onChange={(e) => setBrief({ ...brief, notes: e.target.value })}
                    placeholder="Contoh: Ketinggian plafon 5 meter, dinding kaca menghadap utara dengan naungan sore..."
                    className="w-full p-2.5 rounded-lg bg-cream/40 border border-sage/40 text-xs text-charcoal placeholder-charcoal/40 focus:ring-2 focus:ring-garden focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Wizard Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-sage/30">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-garden transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Langkah Sebelumnya</span>
              </button>
            ) : (
              <span />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-forest hover:bg-forest-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>Lanjutkan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-garden hover:bg-garden-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-colors shadow-md animate-pulse"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Kirim Panduan via WhatsApp</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Live Brief Dossier Summary Panel */}
        <div className="lg:col-span-5 bg-softwhite rounded-xl p-6 border border-sage/40 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-sage/30 pb-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-garden">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ringkasan Konsep Proyek Terkini</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setBrief({
                  spaceType: SPACE_TYPES[0].id,
                  footprint: FOOTPRINTS[1].id,
                  aesthetic: AESTHETICS[0].id,
                  location: LOCATIONS[0],
                  timeline: TIMELINES[1],
                  clientName: '',
                  notes: '',
                });
              }}
              title="Reset Brief"
              className="text-charcoal-muted hover:text-charcoal p-1 rounded"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-charcoal-muted block">
                Tipologi Proyek
              </span>
              <p className="font-serif text-sm font-medium text-charcoal">{brief.spaceType}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-semibold text-charcoal-muted block">
                Skala Luas Ruang
              </span>
              <p className="text-xs font-medium text-charcoal">{brief.footprint}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-semibold text-charcoal-muted block">
                Estetika Botani
              </span>
              <p className="text-xs font-medium text-charcoal">{brief.aesthetic}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-semibold text-charcoal-muted block">
                Target Lokasi &amp; Waktu
              </span>
              <p className="text-xs font-medium text-charcoal">
                {brief.location} • {brief.timeline}
              </p>
            </div>
          </div>

          {/* Computed Intelligence Box */}
          <div className="p-4 rounded-lg bg-cream border border-sage/30 space-y-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-garden block mb-0.5">
                Sumber Aklimatisasi Disarankan:
              </span>
              <p className="text-xs font-medium text-charcoal">{matchedNursery.name}</p>
              <p className="text-[11px] text-charcoal/70 mt-0.5">{matchedNursery.advantage}</p>
            </div>

            <div className="pt-2 border-t border-sage/20">
              <span className="text-[10px] uppercase font-bold text-garden block mb-0.5">
                Layanan yang Sesuai:
              </span>
              <p className="text-xs font-medium text-charcoal">{matchedServiceTier}</p>
            </div>
          </div>

          {/* WhatsApp Direct Action */}
          <div className="space-y-2 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-forest hover:bg-forest-light text-softwhite font-medium text-xs tracking-wider uppercase transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-sage" />
              <span>Kirim Panduan via WhatsApp</span>
            </a>
            <p className="text-[11px] text-charcoal/60 text-center leading-relaxed">
              Membuka WhatsApp dengan data spesifikasi terformat untuk konsultasi instan bersama kurator <span translate="no" className="notranslate font-semibold">NOVIO</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
