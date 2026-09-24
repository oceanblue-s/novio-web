'use client';

import React from 'react';
import { ServicePackage } from '@/types';
import ServiceCard from '@/components/ServiceCard';
import SectionTitle from '@/components/SectionTitle';
import { useSiteData } from '@/context/SiteDataContext';
import { Plus } from 'lucide-react';

interface ServicesListClientProps {
  initialServices: ServicePackage[];
}

export default function ServicesListClient({ initialServices }: ServicesListClientProps) {
  const { servicePackages: siteServices, isEditMode, isPreviewMode, openCreateService } = useSiteData();
  const services = siteServices ?? initialServices;

  return (
    <section className="py-20 sm:py-28 px-6 sm:px-8 bg-softwhite">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionTitle
            label="Kategori Layanan"
            title="Solusi Botani Terkurasi"
            subtitle="Disesuaikan dengan karakter arsitektural hunian privat, ruang kerja kantor, hingga lanskap kawasan resor terbuka."
            align="left"
          />

          {isEditMode && !isPreviewMode && (
            <button
              type="button"
              onClick={openCreateService}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Layanan Baru</span>
            </button>
          )}
        </div>

        {isEditMode && !isPreviewMode && (
          <div className="p-4 rounded-xl bg-forest/10 border-2 border-dashed border-garden/50 flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-forest">
              Mode Edit Aktif: Klik tombol Edit atau Hapus langsung pada setiap kartu layanan di bawah.
            </span>
          </div>
        )}

        {/* Empty State */}
        {services.length === 0 && (
          <div className="text-center py-20 bg-cream rounded-2xl border border-sage/40 p-8 space-y-4">
            <p className="font-serif text-2xl text-charcoal">Belum Ada Paket Layanan</p>
            <p className="text-sm text-charcoal/70 max-w-md mx-auto">
              Saat ini belum ada paket layanan yang didaftarkan. Anda dapat menambahkan paket layanan baru langsung dari sini.
            </p>
            <button
              type="button"
              onClick={openCreateService}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold text-xs uppercase tracking-wider shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Layanan Baru</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
