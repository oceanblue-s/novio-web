'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useChefCuration } from '@/context/ChefCurationContext';
import { siteConfig } from '@/data/site';
import {
  X,
  ChefHat,
  Check,
  MessageSquare,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Package,
} from 'lucide-react';

export default function ProductQuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addItem,
    removeItem,
    isItemCurated,
    openDrawer,
  } = useChefCuration();

  if (!quickViewProduct) return null;

  const isCurated = isItemCurated(quickViewProduct.id);

  const handleToggleCurate = () => {
    if (isCurated) {
      removeItem(quickViewProduct.id);
    } else {
      addItem(quickViewProduct);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/${siteConfig.whatsappTarget}?text=${encodeURIComponent(
    `Halo NOVIO, saya sedang melihat produk "${quickViewProduct.name}" (Kategori: ${quickViewProduct.category}) dan ingin menanyakan ketersediaan serta harga B2B/sampel untuk dapur kami.`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      {/* Backdrop */}
      <div
        role="presentation"
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity"
        onClick={closeQuickView}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-softwhite rounded-2xl shadow-2xl border border-sage/40 overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-softwhite/80 hover:bg-softwhite text-charcoal shadow-sm flex items-center justify-center border border-sage/30 transition-colors"
          aria-label="Tutup jendela ringkasan"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Product Image */}
        <div className="relative md:w-5/12 bg-cream min-h-[240px] md:min-h-full">
          <Image
            src={quickViewProduct.coverImage || '/about-greenhouse-bg.jpg'}
            alt={quickViewProduct.name || 'Produk NOVIO'}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            unoptimized={typeof quickViewProduct.coverImage === 'string' && (quickViewProduct.coverImage.startsWith('data:') || quickViewProduct.coverImage.startsWith('http'))}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent md:hidden" />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-forest/90 text-softwhite rounded shadow-sm">
              {quickViewProduct.category}
            </span>
            {quickViewProduct.environment && (
              <span className="px-2 py-0.5 text-[10px] font-medium bg-cream/90 text-charcoal rounded backdrop-blur-sm border border-sage/40">
                {quickViewProduct.environment}
              </span>
            )}
          </div>
        </div>

        {/* Right: Details & Actions */}
        <div className="md:w-7/12 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-garden block mb-1">
                Ringkasan Produk Artisan
              </span>
              <h3
                id="quickview-title"
                className="font-serif text-2xl sm:text-3xl font-medium text-charcoal leading-tight"
              >
                {quickViewProduct.name}
              </h3>
            </div>

            <p className="text-sm text-charcoal/80 leading-relaxed">
              {quickViewProduct.shortDescription}
            </p>

            {/* Features Bullet */}
            <div className="space-y-2 pt-2 border-t border-sage/30">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
                Karakteristik & Mutu:
              </h4>
              <ul className="space-y-1.5 text-xs text-charcoal/80">
                {quickViewProduct.features.slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-garden shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Specs Snippet */}
            {quickViewProduct.specifications && (
              <div className="bg-cream/60 p-3 rounded-xl border border-sage/30 text-xs space-y-1">
                {Object.entries(quickViewProduct.specifications)
                  .slice(0, 3)
                  .map(([key, val]) => (
                    <div key={key} className="flex justify-between gap-2">
                      <span className="text-charcoal-muted font-medium">{key}:</span>
                      <span className="text-charcoal font-semibold text-right">{val}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-sage/30 space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Add to Curation Tray */}
              <button
                type="button"
                onClick={handleToggleCurate}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  isCurated
                    ? 'bg-garden text-softwhite shadow-sm'
                    : 'bg-forest hover:bg-forest-light text-softwhite shadow-sm'
                }`}
              >
                <ChefHat className="w-4 h-4" />
                <span>{isCurated ? 'Di Baki Kurasi' : '+ Baki Kurasi Chef'}</span>
              </button>

              {/* WhatsApp Direct Inquiry */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Tanya WhatsApp</span>
              </a>
            </div>

            {/* View Full Detail Page Link */}
            <div className="text-center pt-1">
              <Link
                href={`/product/${quickViewProduct.slug}`}
                onClick={closeQuickView}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-garden hover:text-forest transition-colors"
              >
                <span>Buka Halaman Spesifikasi Lengkap & Galeri</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
