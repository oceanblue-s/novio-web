'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useChefCuration } from '@/context/ChefCurationContext';
import { useSiteData } from '@/context/SiteDataContext';
import { siteConfig } from '@/data/site';
import {
  Search,
  X,
  Sparkles,
  ArrowRight,
  Sprout,
  Compass,
  Layers,
  BookOpen,
  MessageSquare,
  FileText,
  CornerDownLeft,
} from 'lucide-react';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  type: 'product' | 'service' | 'portfolio' | 'blog' | 'action';
  url: string;
  image?: string;
  external?: boolean;
}

export default function CommandPalette() {
  const router = useRouter();
  const { isCommandPaletteOpen, closeCommandPalette } = useChefCuration();
  const { products, servicePackages, portfolioProjects, blogPosts } = useSiteData();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isCommandPaletteOpen]);

  // Unified Search Index
  const allItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Products
    products.forEach((p) => {
      items.push({
        id: `prod-${p.id}`,
        title: p.name,
        subtitle: p.shortDescription,
        category: p.category,
        type: 'product',
        url: `/product/${p.slug}`,
        image: p.coverImage,
      });
    });

    // 2. Services
    servicePackages.forEach((s) => {
      items.push({
        id: `srv-${s.id}`,
        title: s.title,
        subtitle: s.tagline,
        category: 'Layanan Botani',
        type: 'service',
        url: `/services`,
        image: s.coverImage,
      });
    });

    // 3. Portfolio
    portfolioProjects.forEach((proj) => {
      items.push({
        id: `port-${proj.id}`,
        title: proj.title,
        subtitle: `${proj.location} • ${proj.clientCategory}`,
        category: 'Portofolio Ruang',
        type: 'portfolio',
        url: `/portfolio/${proj.slug}`,
        image: proj.coverImage,
      });
    });

    // 4. Blog
    blogPosts.forEach((b) => {
      items.push({
        id: `blog-${b.id}`,
        title: b.title,
        subtitle: b.excerpt,
        category: b.category,
        type: 'blog',
        url: `/blog/${b.slug}`,
        image: b.coverImage,
      });
    });

    // 5. Actions
    items.push(
      {
        id: 'act-brief',
        title: 'Mulai Project Brief Wizard',
        subtitle: 'Isi formulir panduan kurasi tanaman atau lanskap untuk ruang Anda',
        category: 'Aksi Cepat',
        type: 'action',
        url: '/brief',
      },
      {
        id: 'act-about',
        title: 'Kisah Kami: Nunik, Retno, & Danang',
        subtitle: 'Perjalanan dari Demak hingga Parongpong & Bali untuk petani',
        category: 'Tentang Novio',
        type: 'action',
        url: '/about',
      },
      {
        id: 'act-wa-bandung',
        title: 'Hubungi WhatsApp Bandung (0813 1241 4863)',
        subtitle: 'Konsultasi pesanan sayur, tisane, & pengiriman area Jawa',
        category: 'Kontak Langsung',
        type: 'action',
        url: `https://wa.me/${siteConfig.whatsappTarget}`,
        external: true,
      },
      {
        id: 'act-wa-bali',
        title: 'Hubungi WhatsApp Bali (0811 2906 792)',
        subtitle: 'Pasokan hotel, vila, & restoran area Bali bersama Nunik',
        category: 'Kontak Langsung',
        type: 'action',
        url: 'https://wa.me/628112906792',
        external: true,
      }
    );

    return items;
  }, []);

  // Filtered results
  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      // Default recommended / curated quick links
      return allItems.slice(0, 8);
    }
    const q = query.toLowerCase();
    return allItems
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      })
      .slice(0, 10);
  }, [allItems, query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredResults[selectedIndex];
      if (selected) {
        navigateToItem(selected);
      }
    }
  };

  const navigateToItem = (item: SearchResultItem) => {
    closeCommandPalette();
    if (item.external) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      router.push(item.url);
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian Global NOVIO"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6"
    >
      {/* Backdrop */}
      <div
        role="presentation"
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity"
        onClick={closeCommandPalette}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl bg-softwhite rounded-2xl shadow-2xl border border-sage/40 overflow-hidden flex flex-col z-10 max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-sage/30 bg-cream/50">
          <Search className="w-5 h-5 text-garden shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Cari produk kuliner, layanan, portofolio, atau kontak..."
            className="w-full bg-transparent text-sm sm:text-base text-charcoal placeholder-charcoal/50 focus:outline-none"
            aria-autocomplete="list"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-charcoal-muted hover:text-charcoal mr-2"
              aria-label="Hapus kata kunci"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold text-charcoal-muted bg-softwhite rounded border border-sage/40 shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 flex-1 scrollbar-thin">
          <div className="px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase text-charcoal-muted flex items-center justify-between">
            <span>{query ? `Hasil Pencarian (${filteredResults.length})` : 'Pilihan Cepat & Rekomendasi'}</span>
            <span className="hidden sm:inline">Gunakan panah ↑↓ dan Enter</span>
          </div>

          {filteredResults.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-2">
              <Search className="w-8 h-8 text-sage mx-auto mb-2 opacity-60" />
              <p className="font-serif text-base text-charcoal">Tidak menemukan hasil untuk &quot;{query}&quot;</p>
              <p className="text-xs text-charcoal/60">
                Coba cari dengan kata kunci lain seperti &quot;tisane&quot;, &quot;cuka&quot;, &quot;bunga&quot;, atau &quot;vila&quot;.
              </p>
            </div>
          ) : (
            <ul ref={listRef} className="space-y-1.5" role="listbox">
              {filteredResults.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => navigateToItem(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`px-3 py-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-forest text-softwhite shadow-sm'
                        : 'hover:bg-cream text-charcoal'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {item.image ? (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-cream border border-sage/30">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                            isSelected
                              ? 'bg-forest-light text-sage border-sage/40'
                              : 'bg-cream text-garden border-sage/30'
                          }`}
                        >
                          {item.type === 'product' && <Sprout className="w-5 h-5" />}
                          {item.type === 'service' && <Layers className="w-5 h-5" />}
                          {item.type === 'portfolio' && <Compass className="w-5 h-5" />}
                          {item.type === 'blog' && <BookOpen className="w-5 h-5" />}
                          {item.type === 'action' && <MessageSquare className="w-5 h-5" />}
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                              isSelected
                                ? 'bg-forest-light/60 text-sage border border-sage/30'
                                : 'bg-cream text-garden border border-sage/40'
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>
                        <h4
                          className={`font-serif text-sm font-medium truncate mt-0.5 ${
                            isSelected ? 'text-softwhite' : 'text-charcoal'
                          }`}
                        >
                          {item.title}
                        </h4>
                        <p
                          className={`text-xs truncate ${
                            isSelected ? 'text-cream/80' : 'text-charcoal/60'
                          }`}
                        >
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      {isSelected && (
                        <CornerDownLeft className="w-4 h-4 text-sage animate-pulse" />
                      )}
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected
                            ? 'translate-x-1 text-softwhite'
                            : 'text-charcoal-muted opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-cream/70 border-t border-sage/30 flex items-center justify-between text-[11px] text-charcoal/70">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-softwhite rounded border border-sage/40">↑</kbd>
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-softwhite rounded border border-sage/40">↓</kbd>
              <span>Navigasi</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-softwhite rounded border border-sage/40">↵</kbd>
              <span>Pilih</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-softwhite rounded border border-sage/40">ESC</kbd>
              <span>Tutup</span>
            </span>
          </div>
          <span className="font-serif italic text-garden hidden sm:inline">
            NOVIO Alami × Premium × Modern × Botani
          </span>
        </div>
      </div>
    </div>
  );
}
