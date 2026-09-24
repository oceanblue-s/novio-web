'use client';

import React, { useState, useRef, useEffect } from 'react';
import { siteConfig, offices } from '@/data/site';
import {
  MessageSquare,
  X,
  MapPin,
  ChevronRight,
  Sparkles,
  Phone,
  Clock,
  Send,
} from 'lucide-react';

export default function WhatsAppBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Pricelist B2B & Katalog');
  const popoverRef = useRef<HTMLDivElement>(null);

  const TOPICS = [
    {
      label: 'Katalog & Pricelist B2B',
      msg: 'Halo Novio, saya ingin meminta katalog produk lengkap dan daftar harga B2B/Horeca terbaru.',
    },
    {
      label: 'Sayuran & Bunga Segar',
      msg: 'Halo Novio, saya ingin mengecek ketersediaan sayuran spesial, edible flowers, dan microgreens hari ini.',
    },
    {
      label: 'Konsultasi Penataan Botani',
      msg: 'Halo Novio, saya ingin berkonsultasi mengenai layanan penataan tanaman interior atau lanskap.',
    },
  ];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleOpenWhatsApp = (hub: 'bandung' | 'bali') => {
    const targetNumber = hub === 'bali' ? '628112906792' : siteConfig.whatsappTarget;
    const currentTopicObj = TOPICS.find((t) => t.label === selectedTopic);
    const message = currentTopicObj
      ? currentTopicObj.msg
      : 'Halo Novio, saya ingin berkonsultasi mengenai produk dan layanan.';

    const url = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <aside
      ref={popoverRef}
      aria-label="Kontak WhatsApp Langsung"
      className="fixed bottom-5 left-5 z-40 select-none sm:bottom-6 sm:left-6"
    >
      {/* Popover Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Pilih Kantor Layanan WhatsApp"
          className="absolute bottom-16 left-0 mb-2 w-80 sm:w-96 bg-softwhite rounded-2xl shadow-2xl border border-sage/40 overflow-hidden animate-fade-in z-50 text-charcoal"
        >
          {/* Header */}
          <div className="bg-forest px-4 py-3.5 text-softwhite flex items-center justify-between border-b border-forest-light">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm">
                <MessageSquare className="w-4 h-4" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-forest" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-medium leading-tight">
                  Layanan WhatsApp NOVIO
                </h3>
                <p className="text-[10px] text-cream/80 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-sage" />
                  <span>Tim kami siap merespons kebutuhan Anda</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-forest-light/60 hover:bg-forest-light text-softwhite flex items-center justify-center transition-colors"
              aria-label="Tutup jendela kontak"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 space-y-3.5">
            {/* Quick Topic Selector */}
            <div>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted mb-1.5">
                Topik Kebutuhan Anda:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {TOPICS.map((topic) => (
                  <button
                    key={topic.label}
                    type="button"
                    onClick={() => setSelectedTopic(topic.label)}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                      selectedTopic === topic.label
                        ? 'bg-forest text-softwhite border-forest font-semibold'
                        : 'bg-cream/60 hover:bg-cream text-charcoal border-sage/40'
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Destination Hubs */}
            <div className="space-y-2 pt-1 border-t border-sage/30">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted mb-1">
                Pilih Kantor Tujuan:
              </span>

              {/* Bandung Hub */}
              <button
                type="button"
                onClick={() => handleOpenWhatsApp('bandung')}
                className="w-full text-left p-3 rounded-xl bg-cream/50 hover:bg-cream border border-sage/40 flex items-center justify-between gap-3 group transition-all"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center text-forest shrink-0 mt-0.5 group-hover:bg-forest group-hover:text-softwhite transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-serif text-xs font-semibold text-charcoal">
                        Kantor Pusat Bandung
                      </h4>
                      <span className="text-[9px] bg-garden/15 text-garden px-1.5 py-0.2 rounded font-semibold uppercase">
                        Utama
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal/70 truncate">
                      Parongpong • Pasokan Sayur & Wilayah Jawa
                    </p>
                    <span className="text-[10px] font-mono text-charcoal-muted">
                      0813 1241 4863
                    </span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Bali Hub */}
              <button
                type="button"
                onClick={() => handleOpenWhatsApp('bali')}
                className="w-full text-left p-3 rounded-xl bg-cream/50 hover:bg-cream border border-sage/40 flex items-center justify-between gap-3 group transition-all"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-earth/10 flex items-center justify-center text-earth shrink-0 mt-0.5 group-hover:bg-earth group-hover:text-softwhite transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-serif text-xs font-semibold text-charcoal">
                        Kantor Cabang Bali
                      </h4>
                      <span className="text-[9px] bg-earth/15 text-earth px-1.5 py-0.2 rounded font-semibold uppercase">
                        Nunik
                      </span>
                    </div>
                    <p className="text-[11px] text-charcoal/70 truncate">
                      Nusa Dua • Hotel, Resort, & Restoran Bali
                    </p>
                    <span className="text-[10px] font-mono text-charcoal-muted">
                      0811 2906 792
                    </span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Buka pilihan chat WhatsApp Novio"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl shadow-green-950/25 transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
      >
        {/* Pulsing online status indicator */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
        </span>

        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 fill-current transition-transform duration-300 group-hover:rotate-6"
            aria-hidden="true"
          >
            <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.97.57 3.805 1.558 5.352L2.094 22l4.743-1.438a10.007 10.007 0 0 0 5.194 1.469h.005c5.535 0 10.031-4.495 10.031-10.031 0-2.679-1.043-5.197-2.936-7.09A9.967 9.967 0 0 0 12.031 2zm0 18.062h-.004a8.03 8.03 0 0 1-4.09-1.115l-.293-.174-3.037.92.937-2.964-.191-.304a8.026 8.026 0 0 1-1.353-4.4c0-4.43 3.606-8.031 8.038-8.031 2.146 0 4.164.836 5.682 2.354a8.005 8.005 0 0 1 2.353 5.677c0 4.43-3.606 8.031-8.035 8.031zm4.407-6.027c-.242-.121-1.428-.704-1.65-.785-.221-.081-.383-.121-.544.121-.161.242-.625.785-.765.946-.141.161-.282.181-.523.06a6.577 6.577 0 0 1-1.938-1.196 7.26 7.26 0 0 1-1.34-1.666c-.141-.242-.015-.373.106-.494.109-.109.242-.282.363-.423.121-.141.161-.242.242-.403.081-.161.04-.302-.02-.423-.06-.121-.544-1.31-.745-1.794-.196-.473-.395-.408-.544-.416l-.463-.008c-.161 0-.423.06-.644.302-.221.242-.846.827-.846 2.016s.867 2.338.988 2.5c.121.161 1.706 2.605 4.133 3.653.577.25 1.028.399 1.38.511.58.184 1.108.158 1.525.096.465-.069 1.428-.584 1.63-1.149.201-.564.201-1.048.141-1.149-.06-.1-.221-.161-.462-.282z" />
          </svg>
        )}
      </button>

      {/* Floating Tooltip Bubble on Desktop (when closed) */}
      {!isOpen && (
        <div className="absolute left-full bottom-1/2 translate-y-1/2 ml-3.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 hidden sm:block">
          <div className="bg-forest/95 backdrop-blur-md text-softwhite px-4 py-2.5 rounded-2xl shadow-2xl border border-sage/30 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-xs tracking-wide">
                Hubungi WhatsApp <span className="notranslate" translate="no">Novio</span>
              </span>
            </div>
            <p className="text-[11px] text-cream/80 mt-0.5">
              Bandung & Bali • Klik untuk memilih kantor tujuan
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
