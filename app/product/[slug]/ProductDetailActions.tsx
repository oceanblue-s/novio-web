'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { MessageSquare, Sparkles, Pencil, ArrowRight } from 'lucide-react';
import { useSiteData } from '@/context/SiteDataContext';

interface ProductDetailActionsProps {
  product: Product;
  whatsappInquiryUrl: string;
}

export default function ProductDetailActions({
  product,
  whatsappInquiryUrl,
}: ProductDetailActionsProps) {
  const { isEditMode, isPreviewMode, openEditProduct } = useSiteData();

  return (
    <div className="p-6 rounded-xl bg-cream border border-sage/40 mb-8 space-y-4">
      {/* Admin Quick Edit Button */}
      {isEditMode && !isPreviewMode && (
        <div className="p-2.5 rounded-lg bg-forest text-softwhite flex items-center justify-between gap-2 shadow-sm">
          <span className="text-xs font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Admin: Mode Edit Aktif
          </span>
          <button
            type="button"
            onClick={() => openEditProduct(product)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-garden hover:bg-garden-light text-softwhite text-xs font-bold transition-all shadow-xs"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit Produk Ini</span>
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-garden font-semibold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Pemesanan &amp; Konsultasi Pasokan Dapur</span>
        </div>
      </div>

      <p className="text-xs text-charcoal/70 leading-relaxed">
        Setiap produk dipanen dan diolah dengan standar kualitas tertinggi. Hubungi tim kami langsung via WhatsApp untuk ketersediaan jadwal panen dan sampel, atau kunjungi kantor studio kami di Bandung Barat &amp; Bali.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* WhatsApp Inquiry */}
        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-xs"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Hubungi via WhatsApp</span>
        </a>

        {/* Kontak & Lokasi */}
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-forest hover:bg-forest-light text-softwhite font-semibold text-xs tracking-wider uppercase transition-all shadow-xs"
        >
          <ArrowRight className="w-4 h-4 text-sage" />
          <span>Kontak &amp; Alamat Kebun</span>
        </Link>
      </div>
    </div>
  );
}
