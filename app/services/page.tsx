import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/ServiceCard';
import WorkflowTimeline from '@/components/WorkflowTimeline';
import { servicePackages, workflowSteps, serviceFAQs } from '@/data/services';
import { siteConfig } from '@/data/site';
import { MessageSquare, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Praktik & Layanan Botani | NOVIO',
  description:
    'Jelajahi layanan botani profesional Novio: penataan tanaman residensial khusus, sewa tanaman kantor dengan perawatan mingguan, arsitektur lanskap tropis, dan pengadaan spesimen langka bersertifikat.',
  alternates: {
    canonical: 'https://novio.vercel.app/services',
  },
  openGraph: {
    title: 'Praktik & Layanan Botani | NOVIO',
    description:
      'Jelajahi layanan botani profesional Novio: penataan tanaman residensial khusus, sewa tanaman kantor dengan perawatan mingguan, arsitektur lanskap tropis, dan pengadaan spesimen langka bersertifikat.',
    url: 'https://novio.vercel.app/services',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    ],
  },
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <Hero
        title="Praktik & Layanan Botani"
        subtitle="Kurasi tanaman hidup menyeluruh, program sewa tanaman kantor tanpa belanja modal (zero-capex) dengan perawatan mingguan, serta arsitektur lanskap yang tangguh."
        badge="Layanan & Perawatan Profesional"
        imageSrc="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85"
        imageAlt="Praktik Botani dan Layanan Profesional Novio"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href={`https://wa.me/${siteConfig.whatsappTarget}?text=${encodeURIComponent(
              'Halo NOVIO, saya ingin menjadwalkan konsultasi awal mengenai penataan botani atau perawatan tanaman.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-forest hover:bg-forest-light text-softwhite font-medium text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg border border-sage/40"
          >
            <MessageSquare className="w-4 h-4 text-sage" />
            <span>Konsultasi via WhatsApp</span>
          </a>
          <Link
            href="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-cream/90 hover:bg-softwhite text-charcoal font-medium text-sm tracking-wider uppercase transition-all shadow-md border border-sage/50"
          >
            <span>Lihat Studi Kasus</span>
            <ArrowRight className="w-4 h-4 text-garden" />
          </Link>
        </div>
      </Hero>

      {/* 2. Core Service Packages Grid */}
      <section className="py-20 sm:py-28 px-6 sm:px-8 bg-softwhite">
        <div className="max-w-7xl mx-auto space-y-12">
          <SectionTitle
            label="Kategori Layanan"
            title="Solusi Botani Terkurasi"
            subtitle="Disesuaikan dengan karakter arsitektural hunian privat, ruang kerja kantor, hingga lanskap kawasan resor terbuka."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicePackages.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Horticultural Methodology (Workflow Timeline) */}
      <section className="py-20 sm:py-28 px-6 sm:px-8 bg-cream border-y border-sage/30">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-garden bg-softwhite px-3 py-1 rounded-full border border-sage/40 inline-block">
              Metodologi Kami
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal tracking-tight">
              Alur Kerja Terpadu 5 Fase
            </h2>
            <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed">
              Setiap proyek melalui audit lingkungan yang cermat, pengondisian awal di kebun pembibitan, dan perawatan berkesinambungan demi vitalitas tanaman yang abadi.
            </p>
          </div>

          <WorkflowTimeline steps={workflowSteps} />
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="py-20 sm:py-28 px-6 sm:px-8 bg-softwhite">
        <div className="max-w-4xl mx-auto space-y-12">
          <SectionTitle
            label="Kejelasan & Garansi"
            title="Pertanyaan yang Sering Diajukan"
            subtitle="Segala hal yang perlu Anda ketahui mengenai model layanan, jaminan garansi, dan cakupan wilayah kerja kami."
            align="center"
          />

          <div className="space-y-4">
            {serviceFAQs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-cream rounded-xl p-6 border border-sage/40 transition-all open:shadow-sm"
              >
                <summary className="font-serif text-lg font-medium text-charcoal cursor-pointer flex items-center justify-between list-none">
                  <span className="pr-4">{faq.question}</span>
                  <span className="w-6 h-6 rounded-full bg-softwhite border border-sage/40 flex items-center justify-center text-garden text-sm font-semibold group-open:rotate-45 transition-transform flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="text-sm text-charcoal/80 leading-relaxed pt-4 border-t border-sage/30 mt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Direct Consultation Call to Action */}
      <section className="py-16 px-6 sm:px-8 bg-forest text-softwhite">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-sage bg-forest-light/60 px-3 py-1 rounded-full border border-sage/30 inline-block">
            Mulai Transformasi Botani Anda
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium leading-tight">
            Siap menghadirkan ketenangan biofilik hidup ke ruang Anda?
          </h2>
          <p className="text-cream/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Jadwalkan audit lingkungan atau ajukan penawaran program sewa tanaman kantor. Ahli hortikultura senior kami di Bandung dan Bali siap membantu Anda.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.whatsappTarget}?text=${encodeURIComponent(
                'Halo NOVIO, saya ingin berkonsultasi mengenai penataan botani atau pengajuan program sewa tanaman kantor.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-garden hover:bg-garden-light text-softwhite font-medium text-xs tracking-widest uppercase transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hubungi Spesialis Hortikultura</span>
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-softwhite/10 hover:bg-softwhite/20 text-cream font-medium text-xs tracking-widest uppercase transition-colors border border-sage/40"
            >
              <span>Kunjungi Kontak & Studio</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
