'use client';

import React from 'react';
import Image from 'next/image';
import { ServicePackage } from '@/types';
import { siteConfig } from '@/data/site';
import { Check, MessageSquare, ShieldCheck, Sparkles, ArrowUpRight, Pencil, Trash2 } from 'lucide-react';
import { useSiteData } from '@/context/SiteDataContext';

interface ServiceCardProps {
  service: ServicePackage;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { isEditMode, isPreviewMode, openEditService, deleteServicePackage } = useSiteData();

  return (
    <article className="group bg-softwhite rounded-xl overflow-hidden border border-sage/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative">
      {/* Visual In-Context Edit Action Buttons (Admin Only) */}
      {isEditMode && !isPreviewMode && (
        <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 bg-forest/95 backdrop-blur-md p-1.5 rounded-lg border border-sage/50 shadow-xl">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openEditService(service);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cream hover:bg-softwhite text-forest text-xs font-bold transition-all shadow-xs"
            title="Edit Layanan Ini"
          >
            <Pencil className="w-3.5 h-3.5 text-garden" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (window.confirm(`Yakin ingin menghapus layanan "${service.title}"?`)) {
                deleteServicePackage(service.id);
              }
            }}
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-xs"
            title="Hapus Layanan Ini"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus</span>
          </button>
        </div>
      )}
      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center gap-1.5 bg-garden text-softwhite text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
            <Sparkles className="w-3 h-3 text-cream" />
            <span>Paling Diminati</span>
          </span>
        </div>
      )}

      {/* Header Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-cream">
        <Image
          src={service.coverImage}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 text-softwhite">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-sage bg-forest/80 backdrop-blur-sm px-2.5 py-0.5 rounded inline-block mb-1.5">
            {service.targetAudience}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-medium leading-snug">
            {service.title}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between bg-softwhite space-y-6">
        <div>
          <p className="text-xs font-semibold text-garden uppercase tracking-wider mb-2">
            {service.tagline}
          </p>
          <p className="text-sm text-charcoal/80 leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Features List */}
          <div className="space-y-2.5 mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
              Cakupan Layanan:
            </h4>
            <ul className="space-y-2 text-xs text-charcoal/80">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-garden flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Deliverables Tag Box */}
          <div className="p-4 rounded-lg bg-cream border border-sage/30 space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal block">
              Hasil Utama Layanan:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {service.deliverables.map((item, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-softwhite text-charcoal/80 px-2.5 py-1 rounded border border-sage/30"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Area: Pricing, Warranty, and CTA */}
        <div className="pt-6 border-t border-sage/30 space-y-4">
          <div className="space-y-1.5">
            <div className="text-xs text-charcoal-muted font-medium">Struktur Investasi / Biaya:</div>
            <div className="text-sm font-semibold text-charcoal">
              {service.pricingModel}
            </div>
          </div>

          {/* Warranty Badge */}
          <div className="flex items-start gap-2 p-3 rounded bg-forest/5 border border-forest/10 text-xs text-forest">
            <ShieldCheck className="w-4 h-4 text-garden flex-shrink-0 mt-0.5" />
            <span className="leading-snug">{service.guarantee}</span>
          </div>

          {/* WhatsApp Action Button */}
          <a
            href={`https://wa.me/${siteConfig.whatsappTarget}?text=${encodeURIComponent(
              service.whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-forest hover:bg-forest-light text-softwhite font-medium text-xs tracking-wider uppercase transition-colors shadow-sm group-hover:bg-garden"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Konsultasikan Layanan Ini</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
