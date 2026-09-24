'use client';

import React from 'react';
import { Product } from '@/types';
import { useChefCuration } from '@/context/ChefCurationContext';
import { ChefHat, Check, MessageSquare, Sparkles } from 'lucide-react';

interface ProductDetailActionsProps {
  product: Product;
  whatsappInquiryUrl: string;
}

export default function ProductDetailActions({
  product,
  whatsappInquiryUrl,
}: ProductDetailActionsProps) {
  const { isItemCurated, addItem, removeItem, openDrawer } = useChefCuration();
  const isCurated = isItemCurated(product.id);

  const handleToggle = () => {
    if (isCurated) {
      removeItem(product.id);
    } else {
      addItem(product);
      // Open drawer to give instant feedback
      openDrawer();
    }
  };

  return (
    <div className="p-6 rounded-xl bg-cream border border-sage/40 mb-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-garden font-semibold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Pemesanan & Konsultasi Pasokan Dapur</span>
        </div>
        {isCurated && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-garden bg-softwhite px-2 py-0.5 rounded-full border border-sage/40">
            Tersimpan di Baki
          </span>
        )}
      </div>

      <p className="text-xs text-charcoal/70 leading-relaxed">
        Setiap produk diolah dengan standar kualitas tertinggi. Tambahkan produk ini ke Baki Kurasi untuk meminta sampel uji dapur, atau hubungi tim kami langsung via WhatsApp.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Add to Chef's Curation Tray */}
        <button
          type="button"
          onClick={handleToggle}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow-xs ${
            isCurated
              ? 'bg-garden hover:bg-garden-light text-softwhite shadow-sm'
              : 'bg-forest hover:bg-forest-light text-softwhite'
          }`}
        >
          {isCurated ? (
            <>
              <Check className="w-4 h-4" />
              <span>Sudah di Baki Kurasi</span>
            </>
          ) : (
            <>
              <ChefHat className="w-4 h-4 text-sage" />
              <span>+ Baki Kurasi Chef</span>
            </>
          )}
        </button>

        {/* WhatsApp Inquiry */}
        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-xs"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Tanya WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
