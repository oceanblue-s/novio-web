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

  const [activeTab, setActiveTab] = React.useState<'specs' | 'culinary' | 'harvest'>('specs');
  const [justAdded, setJustAdded] = React.useState(false);

  if (!quickViewProduct) return null;

  const isCurated = isItemCurated(quickViewProduct.id);

  const handleToggleCurate = () => {
    if (isCurated) {
      removeItem(quickViewProduct.id);
      setJustAdded(false);
    } else {
      addItem(quickViewProduct);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-300"
    >
      {/* Backdrop */}
      <div
        role="presentation"
        className="fixed inset-0 bg-charcoal/75 backdrop-blur-md transition-opacity"
        onClick={closeQuickView}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-softwhite rounded-3xl shadow-2xl border border-sage/40 overflow-hidden flex flex-col md:flex-row z-10 max-h-[92vh]">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-softwhite/90 hover:bg-softwhite text-charcoal shadow-md flex items-center justify-center border border-sage/40 transition-all hover:scale-105"
          aria-label="Tutup jendela ringkasan"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Product Image & Badges */}
        <div className="relative md:w-5/12 bg-cream min-h-[260px] md:min-h-full flex flex-col justify-between p-4">
          <Image
            src={quickViewProduct.coverImage || '/about-greenhouse-bg.jpg'}
            alt={quickViewProduct.name || 'Produk NOVIO'}
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            unoptimized={typeof quickViewProduct.coverImage === 'string' && (quickViewProduct.coverImage.startsWith('data:') || quickViewProduct.coverImage.startsWith('http'))}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent md:hidden" />

          {/* Top Floating Badges */}
          <div className="relative z-10 flex flex-wrap gap-1.5">
            <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-forest/90 text-softwhite rounded-full shadow-md backdrop-blur-sm border border-sage/30">
              {quickViewProduct.category}
            </span>
            {quickViewProduct.environment && (
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-cream/90 text-charcoal rounded-full backdrop-blur-sm border border-sage/40 shadow-xs">
                {quickViewProduct.environment}
              </span>
            )}
          </div>

          {/* Bottom Floating Origin Pill */}
          <div className="relative z-10 mt-auto pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/80 backdrop-blur-md border border-sage/30 text-softwhite text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 text-sage" />
              <span>{quickViewProduct.origin || 'Parongpong, Jawa Barat'}</span>
            </div>
          </div>
        </div>

        {/* Right: Details, Interactive Tabs, & Actions */}
        <div className="md:w-7/12 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-5 bg-softwhite">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-garden flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Spesimen Kuliner Artisan
                </span>
                {quickViewProduct.inStock && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    Panen Tersedia
                  </span>
                )}
              </div>
              <h3
                id="quickview-title"
                className="font-serif text-2xl sm:text-3xl font-medium text-charcoal leading-tight"
              >
                {quickViewProduct.name}
              </h3>
              {quickViewProduct.latinName && (
                <p className="text-xs italic text-charcoal-muted mt-0.5 font-serif">
                  {quickViewProduct.latinName}
                </p>
              )}
            </div>

            <p className="text-sm text-charcoal/80 leading-relaxed">
              {quickViewProduct.shortDescription}
            </p>

            {/* Interactive Tabs Header */}
            <div className="flex items-center border-b border-sage/30 pt-2 space-x-4 sm:space-x-6 text-xs font-semibold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`pb-2.5 transition-all relative ${
                  activeTab === 'specs'
                    ? 'text-forest border-b-2 border-forest font-bold'
                    : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                Spesifikasi & Mutu
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('culinary')}
                className={`pb-2.5 transition-all relative ${
                  activeTab === 'culinary'
                    ? 'text-forest border-b-2 border-forest font-bold'
                    : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                Aplikasi Kuliner
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('harvest')}
                className={`pb-2.5 transition-all relative ${
                  activeTab === 'harvest'
                    ? 'text-forest border-b-2 border-forest font-bold'
                    : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                Pengiriman B2B
              </button>
            </div>

            {/* Tab 1: Specs & Mutu */}
            {activeTab === 'specs' && (
              <div className="space-y-3 pt-1 animate-in fade-in duration-200">
                <ul className="space-y-1.5 text-xs text-charcoal/85">
                  {quickViewProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-garden shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {quickViewProduct.specifications && (
                  <div className="bg-cream/60 p-3.5 rounded-xl border border-sage/30 text-xs space-y-1.5">
                    {Object.entries(quickViewProduct.specifications).map(([key, val]) => (
                      <div key={key} className="flex justify-between gap-2 border-b border-sage/15 pb-1 last:border-0 last:pb-0">
                        <span className="text-charcoal-muted font-medium">{key}:</span>
                        <span className="text-charcoal font-semibold text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Culinary Applications & Chef Notes */}
            {activeTab === 'culinary' && (
              <div className="space-y-3 pt-1 animate-in fade-in duration-200">
                {quickViewProduct.applications && quickViewProduct.applications.length > 0 ? (
                  <div className="space-y-2">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
                      Rekomendasi Kreasi Menu:
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {quickViewProduct.applications.map((app, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-cream border border-sage/40 text-xs text-forest font-medium"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-charcoal/70">Cocok untuk kreasi pastry, cold infusions, garnish botanical, dan fine dining seasoning.</p>
                )}

                {quickViewProduct.chefNotes && (
                  <div className="p-3 bg-garden/10 border-l-4 border-garden rounded-r-lg text-xs space-y-1">
                    <span className="font-bold text-forest uppercase tracking-wider text-[10px] block">
                      Catatan Kurasi Chef:
                    </span>
                    <p className="text-charcoal italic leading-relaxed">
                      &quot;{quickViewProduct.chefNotes}&quot;
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Harvest & Logistics */}
            {activeTab === 'harvest' && (
              <div className="space-y-3 pt-1 animate-in fade-in duration-200 text-xs text-charcoal/80">
                <div className="p-3.5 bg-cream/70 rounded-xl border border-sage/30 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-forest">
                    <Package className="w-4 h-4 text-garden" />
                    <span>Protokol Cold Chain & Pengemasan</span>
                  </div>
                  <p className="leading-relaxed">
                    Dipetik pada subuh hari untuk menjaga kadar minyak esensial dan kelembapan prima. Dikemas dalam box thermal berinsulasi dengan pengiriman sameday/nextday cold-chain ke Jakarta, Bandung, dan Bali.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-softwhite border border-sage/30">
                    <span className="text-charcoal-muted block font-medium">Minimal Order B2B:</span>
                    <span className="font-bold text-charcoal">Sampel Uji Dapur / Karton</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-softwhite border border-sage/30">
                    <span className="text-charcoal-muted block font-medium">Garansi Mutu:</span>
                    <span className="font-bold text-charcoal">100% Segar Sampai Lokasi</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-sage/30 space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Add to Curation Tray Button */}
              <button
                type="button"
                onClick={handleToggleCurate}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                  isCurated
                    ? 'bg-garden hover:bg-forest text-softwhite ring-2 ring-garden/40'
                    : 'bg-forest hover:bg-forest-light text-softwhite hover:scale-[1.02]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300 animate-bounce" />
                    <span>Ditambahkan ke Baki!</span>
                  </>
                ) : (
                  <>
                    <ChefHat className="w-4 h-4 text-sage" />
                    <span>{isCurated ? 'Di Baki Kurasi (Klik Hapus)' : '+ Baki Kurasi Chef'}</span>
                  </>
                )}
              </button>

              {/* WhatsApp Direct Inquiry */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.02] transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Tanya WhatsApp</span>
              </a>
            </div>

            {/* View Full Detail Page Link */}
            <div className="text-center pt-1 flex items-center justify-between text-xs">
              {isCurated && (
                <button
                  type="button"
                  onClick={() => {
                    closeQuickView();
                    openDrawer();
                  }}
                  className="text-garden hover:text-forest underline font-semibold"
                >
                  Buka Baki Kurasi Sekarang →
                </button>
              )}
              <Link
                href={`/product/${quickViewProduct.slug}`}
                onClick={closeQuickView}
                className="ml-auto inline-flex items-center gap-1.5 font-semibold text-garden hover:text-forest transition-colors"
              >
                <span>Halaman Spesifikasi Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
