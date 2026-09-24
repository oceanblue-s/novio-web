'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useChefCuration } from '@/context/ChefCurationContext';
import { siteConfig } from '@/data/site';
import {
  Sparkles,
  X,
  Trash2,
  Send,
  ChefHat,
  MapPin,
  Building2,
  User,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';

export default function ChefCurationDrawer() {
  const {
    curatedItems,
    removeItem,
    updateItemNote,
    clearAll,
    isDrawerOpen,
    closeDrawer,
    openDrawer,
  } = useChefCuration();

  const [chefName, setChefName] = useState('');
  const [establishmentName, setEstablishmentName] = useState('');
  const [cityLocation, setCityLocation] = useState('');
  const [kitchenNotes, setKitchenNotes] = useState('');
  const [targetHub, setTargetHub] = useState<'bandung' | 'bali'>('bandung');
  const [copied, setCopied] = useState(false);

  const itemCount = curatedItems.length;

  const generateSummaryText = () => {
    const itemsSummary = curatedItems
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}* (Kategori: ${item.product.category})\n   ↳ Rencana Uji/Porsi: _${item.quantityNote || '1 batch sampel'}_`
      )
      .join('\n');

    const hubName =
      targetHub === 'bali' ? 'Cabang Bali (Nusa Dua)' : 'Pusat Bandung (Parongpong)';

    return `*PERMINTAAN SAMPEL & DAFTAR KURASI CHEF — NOVIO*
---------------------------------------
Kepada: Tim Novio ${hubName}

*Profil Pemohon:*
• Nama Chef / PIC: ${chefName.trim() || 'Chef / Tim Kuliner'}
• Restoran / Hotel / Usaha: ${establishmentName.trim() || 'Dapur Restoran / Kafe'}
• Kota / Lokasi: ${cityLocation.trim() || 'Indonesia'}
${kitchenNotes.trim() ? `• Catatan / Jadwal Menu: ${kitchenNotes.trim()}\n` : ''}
*Daftar Produk yang Dikurasi (${itemCount} Item):*
${itemsSummary}

---------------------------------------
Mohon informasi ketersediaan musim panen, katalog harga B2B/Horeca, dan estimasi waktu pengiriman sampel ke dapur kami. Terima kasih!`;
  };

  const handleCopySummary = async () => {
    try {
      const text = generateSummaryText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (itemCount === 0) return;

    const targetNumber =
      targetHub === 'bali' ? '628112906792' : siteConfig.whatsappTarget;
    const text = generateSummaryText();
    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${targetNumber}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Floating Pill Trigger (Only visible when items are added and drawer is closed) */}
      {itemCount > 0 && !isDrawerOpen && (
        <aside
          aria-label="Pemberitahuan Baki Kurasi Chef"
          className="fixed bottom-20 left-5 sm:bottom-24 sm:left-6 z-40 animate-fade-in"
        >
          <button
            type="button"
            onClick={openDrawer}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-forest text-softwhite shadow-2xl border border-sage/40 hover:bg-forest-light hover:scale-105 active:scale-95 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            aria-label={`Buka Baki Kurasi Chef dengan ${itemCount} produk terpilih`}
          >
            <div className="relative">
              <ChefHat className="w-5 h-5 text-sage group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-garden animate-ping" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-semibold uppercase tracking-wider text-sage">
                Baki Kurasi Chef
              </span>
              <span className="block text-[11px] text-cream/90 font-medium">
                {itemCount} Bahan Siap Uji
              </span>
            </div>
            <span className="ml-1 w-6 h-6 rounded-full bg-garden text-softwhite text-xs font-bold flex items-center justify-center">
              {itemCount}
            </span>
          </button>
        </aside>
      )}

      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Slide-over Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="chef-drawer-title"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-softwhite shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-sage/40 ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-forest text-softwhite flex items-center justify-between border-b border-forest-light">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-forest-light/60 flex items-center justify-center text-sage border border-sage/30">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 id="chef-drawer-title" className="font-serif text-lg font-medium leading-tight">
                Baki Kurasi Chef
              </h2>
              <p className="text-xs text-cream/80">
                Pilih sampel & mintakan ketersediaan langsung ke petani mitra
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="w-8 h-8 rounded-full bg-forest-light/40 hover:bg-forest-light text-softwhite flex items-center justify-center transition-colors"
            aria-label="Tutup Baki Kurasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {itemCount === 0 ? (
            <div className="text-center py-16 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cream mx-auto flex items-center justify-center text-charcoal/40 border border-sage/30">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-medium text-charcoal">
                Baki Kurasi Masih Kosong
              </h3>
              <p className="text-xs text-charcoal/70 max-w-xs mx-auto leading-relaxed">
                Jelajahi katalog produk kami lalu klik <strong>&quot;Tambah ke Baki Kurasi&quot;</strong> untuk mengumpulkan bahan kuliner yang ingin Anda uji coba di dapur.
              </p>
              <div className="pt-2">
                <Link
                  href="/product"
                  onClick={closeDrawer}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-forest hover:bg-forest-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Buka Katalog Produk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-charcoal-muted uppercase tracking-wider font-semibold">
                  <span>Produk Terpilih ({itemCount})</span>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-earth hover:text-earth/80 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Kosongkan</span>
                  </button>
                </div>

                <ul className="space-y-3">
                  {curatedItems.map((item) => (
                    <li
                      key={item.product.id}
                      className="bg-cream/60 rounded-xl p-3 border border-sage/30 flex gap-3 items-start group hover:bg-cream transition-colors"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-softwhite shrink-0 border border-sage/30">
                        <Image
                          src={item.product.coverImage || '/about-greenhouse-bg.jpg'}
                          alt={item.product.name || 'Produk NOVIO'}
                          fill
                          sizes="64px"
                          unoptimized={typeof item.product.coverImage === 'string' && (item.product.coverImage.startsWith('data:') || item.product.coverImage.startsWith('http'))}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-garden">
                              {item.product.category}
                            </span>
                            <h4 className="font-serif text-sm font-medium text-charcoal truncate">
                              {item.product.name}
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="text-charcoal-muted hover:text-earth p-1 transition-colors"
                            aria-label={`Hapus ${item.product.name} dari baki`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <label
                            htmlFor={`note-${item.product.id}`}
                            className="text-[11px] text-charcoal/70 shrink-0 font-medium"
                          >
                            Kebutuhan:
                          </label>
                          <input
                            id={`note-${item.product.id}`}
                            type="text"
                            value={item.quantityNote}
                            onChange={(e) =>
                              updateItemNote(item.product.id, e.target.value)
                            }
                            placeholder="cth: 1 jar / 2 tray"
                            className="w-full text-xs px-2.5 py-1 rounded bg-softwhite border border-sage/40 text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-1 focus:ring-garden"
                          />
                        </div>
                        {/* Quick preset buttons */}
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {['1 Jar Sampel', '2 Tray Uji Dapur', 'Karton Pasokan B2B'].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => updateItemNote(item.product.id, preset)}
                              className="text-[10px] px-2 py-0.5 rounded bg-softwhite hover:bg-cream border border-sage/30 text-charcoal/75 hover:text-forest transition-colors"
                            >
                              + {preset}
                            </button>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Destination Hub Selection */}
              <div className="pt-2 border-t border-sage/30 space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Tujuan Pengiriman / Hub NOVIO Terdekat
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetHub('bandung')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      targetHub === 'bandung'
                        ? 'bg-forest text-softwhite border-forest shadow-sm'
                        : 'bg-cream/40 text-charcoal border-sage/40 hover:bg-cream'
                    }`}
                  >
                    <span className="block text-xs font-semibold">Bandung (Parongpong)</span>
                    <span className="block text-[10px] opacity-80">Jawa & Pasokan Sayur</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetHub('bali')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      targetHub === 'bali'
                        ? 'bg-forest text-softwhite border-forest shadow-sm'
                        : 'bg-cream/40 text-charcoal border-sage/40 hover:bg-cream'
                    }`}
                  >
                    <span className="block text-xs font-semibold">Bali (Nusa Dua)</span>
                    <span className="block text-[10px] opacity-80">Hotel & Resort Horeca</span>
                  </button>
                </div>
              </div>

              {/* Chef / Establishment Form */}
              <form onSubmit={handleSendWhatsApp} className="space-y-3 pt-2 border-t border-sage/30">
                <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Identitas Dapur / Pemohon
                </span>

                <div className="space-y-2.5">
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-charcoal-muted absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={chefName}
                      onChange={(e) => setChefName(e.target.value)}
                      placeholder="Nama Chef / PIC Kuliner *"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-cream/30 border border-sage/40 text-charcoal placeholder-charcoal/50 focus:outline-none focus:ring-1 focus:ring-garden focus:bg-softwhite"
                    />
                  </div>

                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 text-charcoal-muted absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={establishmentName}
                      onChange={(e) => setEstablishmentName(e.target.value)}
                      placeholder="Nama Restoran / Hotel / Kafe *"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-cream/30 border border-sage/40 text-charcoal placeholder-charcoal/50 focus:outline-none focus:ring-1 focus:ring-garden focus:bg-softwhite"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-charcoal-muted absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={cityLocation}
                      onChange={(e) => setCityLocation(e.target.value)}
                      placeholder="Kota / Wilayah Pengiriman *"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-cream/30 border border-sage/40 text-charcoal placeholder-charcoal/50 focus:outline-none focus:ring-1 focus:ring-garden focus:bg-softwhite"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={kitchenNotes}
                    onChange={(e) => setKitchenNotes(e.target.value)}
                    placeholder="Catatan tambahan (cth: jadwal pergantian menu tasting / tanggal kebutuhan sampel)"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-cream/30 border border-sage/40 text-charcoal placeholder-charcoal/50 focus:outline-none focus:ring-1 focus:ring-garden focus:bg-softwhite resize-none"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim ke WhatsApp Novio ({itemCount} Item)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cream hover:bg-cream-dark text-forest text-xs font-bold uppercase tracking-wider border border-sage/40 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-garden" />
                        <span className="text-garden">Format Teks Berhasil Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-forest" />
                        <span>Salin Format Pesan (Email / PO)</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-charcoal/60 text-center mt-2">
                    Format pesan WhatsApp &amp; teks otomatis terisi rapi dengan spesimen yang Anda pilih.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
