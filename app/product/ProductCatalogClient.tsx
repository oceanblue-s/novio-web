'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { useChefCuration } from '@/context/ChefCurationContext';
import { useSiteData } from '@/context/SiteDataContext';
import {
  Search,
  SlidersHorizontal,
  Sun,
  Moon,
  Wind,
  Sparkles,
  X,
  ChefHat,
  ArrowUpDown,
  ArrowRight,
  Plus,
} from 'lucide-react';

interface ProductCatalogClientProps {
  initialProducts: Product[];
}

const ENVIRONMENTS = [
  { id: 'All', label: 'Semua Karakter', icon: Sparkles },
  { id: 'Low-Light Quiet', label: 'Penyimpanan Sejuk (Pantry)', icon: Moon },
  { id: 'Bright Indirect', label: 'Segar & Suhu Terjaga (Fresh)', icon: Sun },
  { id: 'Veranda & Balcony', label: 'Tanaman Pot Hidup (Teras/Dapur)', icon: Wind },
];

export default function ProductCatalogClient({ initialProducts }: ProductCatalogClientProps) {
  const { openDrawer, curatedItems } = useChefCuration();
  const { products: siteProducts, isEditMode, isPreviewMode, openCreateProduct } = useSiteData();
  const activeProducts = siteProducts ?? initialProducts;

  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'name-asc' | 'name-desc'>('default');

  const categories = useMemo(() => {
    const rawCats = Array.from(new Set(activeProducts.map((p) => p.category)));
    return ['Semua', ...rawCats];
  }, [activeProducts]);

  const filteredProducts = useMemo(() => {
    let result = activeProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Semua' || product.category === selectedCategory;
      const matchesEnvironment =
        selectedEnvironment === 'All' || product.environment === selectedEnvironment;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.origin && product.origin.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesEnvironment && matchesSearch;
    });

    if (sortBy === 'name-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [initialProducts, selectedCategory, selectedEnvironment, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'Semua' || selectedEnvironment !== 'All' || searchQuery !== '';

  const clearAllFilters = () => {
    setSelectedCategory('Semua');
    setSelectedEnvironment('All');
    setSearchQuery('');
    setSortBy('default');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
      {/* Chef Curation Welcome Banner */}
      <div className="mb-10 bg-gradient-to-r from-forest to-forest-light text-softwhite rounded-2xl p-6 sm:p-8 shadow-sm border border-sage/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-sage text-xs font-semibold uppercase tracking-wider">
            <ChefHat className="w-4 h-4" />
            <span>Layanan Uji Coba & Sampel Dapur Restoran</span>
          </div>
          <h2 className="font-serif text-2xl font-medium text-cream">
            Kurasi Sampel Kuliner untuk Chef Profesional
          </h2>
          <p className="text-xs sm:text-sm text-cream/80 leading-relaxed">
            Klik tombol <strong>&quot;+ Kurasi Chef&quot;</strong> pada setiap kartu produk untuk mengumpulkan daftar bahan yang ingin Anda uji coba, lalu ajukan permintaan sampel langsung via WhatsApp.
          </p>
        </div>

        <button
          type="button"
          onClick={openDrawer}
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-garden hover:bg-garden-light text-softwhite font-semibold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
        >
          <ChefHat className="w-4 h-4" />
          <span>Buka Baki Kurasi ({curatedItems.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* In-Context Admin Edit Action Banner */}
      {isEditMode && !isPreviewMode && (
        <div className="mb-8 p-4 rounded-xl bg-forest/10 border-2 border-dashed border-garden/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-forest">
              Mode Edit Aktif: Kelola &amp; Tambah Produk Baru Langsung
            </span>
          </div>
          <button
            type="button"
            onClick={openCreateProduct}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Produk Baru</span>
          </button>
        </div>
      )}

      {/* 1. Primary Filter & Search Bar */}
      <div className="space-y-5 mb-10 pb-8 border-b border-sage/30">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-forest text-softwhite shadow-sm'
                    : 'bg-cream/70 hover:bg-cream text-charcoal border border-sage/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input & Sort */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk artisan..."
                className="w-full pl-9 pr-8 py-2 rounded-full bg-cream/40 border border-sage/40 text-xs text-charcoal placeholder-charcoal/50 focus:outline-none focus:ring-2 focus:ring-garden focus:bg-softwhite transition-all"
              />
              <Search className="w-3.5 h-3.5 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal-muted hover:text-charcoal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="pl-3 pr-8 py-2 rounded-full bg-cream/40 border border-sage/40 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-garden cursor-pointer appearance-none"
                aria-label="Urutkan produk"
              >
                <option value="default">Urutan: Rekomendasi</option>
                <option value="name-asc">Nama: A - Z</option>
                <option value="name-desc">Nama: Z - A</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-charcoal-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 2. Secondary Environmental & Space Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted flex items-center gap-1.5 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-garden" />
            <span>Karakter Penyimpanan & Kesegaran:</span>
          </span>

          <div className="flex flex-wrap items-center gap-1.5">
            {ENVIRONMENTS.map((env) => {
              const Icon = env.icon;
              const isSelected = selectedEnvironment === env.id;

              return (
                <button
                  key={env.id}
                  type="button"
                  onClick={() => setSelectedEnvironment(env.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-garden text-softwhite shadow-sm'
                      : 'bg-softwhite hover:bg-cream text-charcoal/80 border border-sage/30'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{env.label}</span>
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-semibold text-earth hover:underline ml-2 flex items-center gap-1"
              >
                <span>Atur ulang filter</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header Status */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-xs text-charcoal-muted uppercase tracking-wider font-medium">
          Menampilkan {filteredProducts.length} dari {initialProducts.length} spesimen pilihan
        </span>
        {selectedEnvironment !== 'All' && (
          <span className="text-xs font-semibold text-garden bg-cream px-3 py-1 rounded-full border border-sage/30">
            Lingkungan: {ENVIRONMENTS.find((e) => e.id === selectedEnvironment)?.label || selectedEnvironment}
          </span>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-cream/40 rounded-xl border border-sage/30">
          <p className="font-serif text-xl text-charcoal mb-2">Tidak ada spesimen botani yang cocok</p>
          <p className="text-sm text-charcoal/70 mb-6">
            Coba ubah pilihan kategori, filter iklim mikro, atau hapus kata kunci pencarian Anda.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-forest text-softwhite text-xs font-semibold uppercase tracking-wider hover:bg-garden transition-colors"
          >
            <span>Reset Semua Filter</span>
          </button>
        </div>
      )}
    </div>
  );
}
