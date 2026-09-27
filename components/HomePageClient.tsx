'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import HomeHeroClient from '@/components/HomeHeroClient';
import HomeCommitmentClient from '@/components/HomeCommitmentClient';
import HomeCtaClient from '@/components/HomeCtaClient';
import SectionTitle from '@/components/SectionTitle';
import ProductCard from '@/components/ProductCard';
import BlogCard from '@/components/BlogCard';
import TeamCard from '@/components/TeamCard';
import TrustStatsBanner from '@/components/TrustStatsBanner';
import ChefTestimonials from '@/components/ChefTestimonials';
import HarvestCalendarBanner from '@/components/HarvestCalendarBanner';
import { useSiteData } from '@/context/SiteDataContext';
import {
  ArrowRight,
  Sparkles,
  Plus,
  Pencil,
} from 'lucide-react';

export default function HomePageClient() {
  const {
    products,
    blogPosts,
    teamMembers,
    customizerSettings,
    isEditMode,
    isPreviewMode,
    openCreateProduct,
    openCreateBlog,
    openCreateTeam,
    openEditProductSection,
    openEditTeamSection,
    openEditBlogSection,
  } = useSiteData();

  const [homeProductFilter, setHomeProductFilter] = useState<string>('all');

  // Prioritize newly added artisan products (Kombucha series) while keeping full catalog available
  const sortedProducts = useMemo(() => {
    const newItems = products.filter((p) => p.slug.includes('kombucha'));
    const standardItems = products.filter((p) => !p.slug.includes('kombucha'));
    return [...newItems, ...standardItems];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = sortedProducts;
    if (homeProductFilter === 'fermentasi') {
      list = sortedProducts.filter(
        (p) =>
          p.category.toLowerCase().includes('fermentasi') ||
          p.category.toLowerCase().includes('minuman') ||
          p.category.toLowerCase().includes('saus')
      );
    } else if (homeProductFilter === 'tisane') {
      list = sortedProducts.filter(
        (p) =>
          p.category.toLowerCase().includes('tisane') ||
          p.category.toLowerCase().includes('herba')
      );
    } else if (homeProductFilter === 'sayuran') {
      list = sortedProducts.filter(
        (p) =>
          p.category.toLowerCase().includes('sayur') ||
          p.category.toLowerCase().includes('microgreen') ||
          p.category.toLowerCase().includes('bunga')
      );
    } else if (homeProductFilter === 'awetan') {
      list = sortedProducts.filter(
        (p) =>
          p.category.toLowerCase().includes('olahan') ||
          p.category.toLowerCase().includes('awetan') ||
          p.category.toLowerCase().includes('madu')
      );
    }
    return list.slice(0, 6);
  }, [sortedProducts, homeProductFilter]);

  // Latest 3 blog articles
  const latestArticles = blogPosts.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Dual-Sanctuary Interactive Hero Section */}
      <HomeHeroClient />

      {/* 1b. Trust & Artisan Culinary Metrics */}
      <TrustStatsBanner />

      {/* 2. Commitment Section (Connected to Live Customizer & In-Context Edit) */}
      <HomeCommitmentClient />

      {/* 3. Curated Product Preview */}
      <section className="py-24 px-6 sm:px-8 bg-cream border-t border-sage/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <SectionTitle
              label={customizerSettings.home.productSectionBadge || 'Komponen Kuliner Alami Indonesia'}
              title={customizerSettings.home.productSectionTitle || 'Kurasi Bahan Alami & Fermentasi Artisan'}
              subtitle={customizerSettings.home.productSectionSubtitle || 'Bahan alami premium yang diolah dengan ketulusan — dari bunga yang dapat dimakan dan hasil bumi segar hingga kreasi produk fermentasi artisan.'}
              align="left"
            />
            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              {isEditMode && !isPreviewMode && (
                <>
                  <button
                    type="button"
                    onClick={openEditProductSection}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-forest/90 hover:bg-forest text-softwhite font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                    title="Edit Judul & Narasi Bagian Produk"
                  >
                    <Pencil className="w-3.5 h-3.5 text-sage" />
                    <span>Edit Bagian</span>
                  </button>
                  <button
                    type="button"
                    onClick={openCreateProduct}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Tambah Produk</span>
                  </button>
                </>
              )}
              <Link
                href="/product"
                className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-garden hover:text-forest transition-colors group"
              >
                <span>Lihat Seluruh Katalog</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* New Release Artisan Kombucha Spotlight Banner */}
          <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-forest via-forest-light to-garden text-softwhite shadow-xl border border-sage/40 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-forest text-xs font-extrabold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Rilisan Baru • Botanical Probiotic Collection</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight">
                Kombucha Sparkling Probiotic Tea &amp; Custard Apple Syrup
              </h3>
              <p className="text-xs sm:text-sm text-softwhite/85 leading-relaxed font-light">
                Sensasi teh fermentasi alami naturally effervescent dalam 4 varian kaleng botani nusantara, serta sirup srikaya artisan untuk racikan beverage mixer dan plating kuliner gourmet.
              </p>
            </div>
            <div className="flex items-center gap-3 z-10 shrink-0 flex-wrap">
              <Link
                href="/product/kombucha-sparkling-tea"
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-forest font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                Kombucha Kaleng
              </Link>
              <Link
                href="/product/kombucha-syrup"
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-softwhite border border-white/30 font-bold text-xs uppercase tracking-wider transition-all backdrop-blur-sm active:scale-95"
              >
                Kombucha Syrup
              </Link>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {[
              { id: 'all', label: 'Semua Koleksi' },
              { id: 'fermentasi', label: 'Fermentasi & Minuman' },
              { id: 'tisane', label: 'Tisane & Herba' },
              { id: 'sayuran', label: 'Microgreens & Sayur' },
              { id: 'awetan', label: 'Olahan & Awetan' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setHomeProductFilter(tab.id)}
                className={`text-xs px-4 py-2 rounded-full font-semibold uppercase tracking-wider transition-all duration-300 ${
                  homeProductFilter === tab.id
                    ? 'bg-forest text-softwhite shadow-md'
                    : 'bg-softwhite text-charcoal/70 border border-sage/40 hover:bg-cream hover:text-charcoal'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4b. Seasonal Harvest Calendar & Cold-Chain Logistics */}
      <HarvestCalendarBanner />

      {/* 4. Chef & Kitchen Partner Testimonials */}
      <ChefTestimonials />

      {/* 6. Team / Members Section */}
      <section className="py-24 px-6 sm:px-8 bg-softwhite border-t border-sage/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <SectionTitle
              label={customizerSettings.home.teamSectionBadge || 'Keluarga Pendiri & Tim NOVIO'}
              title={customizerSettings.home.teamSectionTitle || 'Bersaudara yang Berdedikasi Memberdayakan Petani'}
              subtitle={customizerSettings.home.teamSectionSubtitle || 'Kenali Nunik, Retno, Danang, dan tim ahli yang berjuang memutus rantai distribusi yang tidak adil serta menjadi mitra terbaik bagi para Chef di Indonesia.'}
              align="center"
            />
            {isEditMode && !isPreviewMode && (
              <div className="mt-4 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={openEditTeamSection}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-forest/90 hover:bg-forest text-softwhite font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                  title="Edit Judul & Narasi Bagian Tim"
                >
                  <Pencil className="w-3.5 h-3.5 text-sage" />
                  <span>Edit Bagian</span>
                </button>
                <button
                  type="button"
                  onClick={openCreateTeam}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Anggota Tim</span>
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Blog / Journal Preview */}
      <section className="py-24 px-6 sm:px-8 bg-softwhite border-t border-sage/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <SectionTitle
              label={customizerSettings.home.blogSectionBadge || 'Jurnal NOVIO'}
              title={customizerSettings.home.blogSectionTitle || 'Perspektif & Catatan Editorial'}
              subtitle={customizerSettings.home.blogSectionSubtitle || 'Refleksi mendalam tentang arsitektur biofilik, perawatan spesimen tanaman, dan gaya hidup selaras alam.'}
              align="left"
            />
            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              {isEditMode && !isPreviewMode && (
                <>
                  <button
                    type="button"
                    onClick={openEditBlogSection}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-forest/90 hover:bg-forest text-softwhite font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                    title="Edit Judul & Narasi Bagian Jurnal"
                  >
                    <Pencil className="w-3.5 h-3.5 text-sage" />
                    <span>Edit Bagian</span>
                  </button>
                  <button
                    type="button"
                    onClick={openCreateBlog}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Tulis Artikel Baru</span>
                  </button>
                </>
              )}
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-garden hover:text-forest transition-colors group"
              >
                <span>Baca Semua Cerita</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. WhatsApp CTA Banner before Footer (Connected to Live Customizer) */}
      <HomeCtaClient />
    </div>
  );
}
