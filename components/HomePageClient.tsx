'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HomeHeroClient from '@/components/HomeHeroClient';
import HomeCommitmentClient from '@/components/HomeCommitmentClient';
import HomeCtaClient from '@/components/HomeCtaClient';
import SectionTitle from '@/components/SectionTitle';
import ProductCard from '@/components/ProductCard';
import BlogCard from '@/components/BlogCard';
import TeamCard from '@/components/TeamCard';
import ServiceCard from '@/components/ServiceCard';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import TrustStatsBanner from '@/components/TrustStatsBanner';
import { useSiteData } from '@/context/SiteDataContext';
import {
  ArrowRight,
  Sparkles,
  MapPin,
  ArrowUpRight,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react';

export default function HomePageClient() {
  const {
    products,
    blogPosts,
    portfolioProjects,
    servicePackages,
    teamMembers,
    customizerSettings,
    isEditMode,
    isPreviewMode,
    openCreateProduct,
    openCreateBlog,
    openCreateService,
    openCreatePortfolio,
    openCreateTeam,
    openEditService,
    deleteServicePackage,
    openEditProductSection,
    openEditServicesSection,
    openEditPortfolioSection,
    openEditTeamSection,
    openEditBlogSection,
  } = useSiteData();

  // Curated products for home preview
  const featuredProducts = products.slice(0, 6);
  // Featured project for before/after spotlight
  const featuredProject = portfolioProjects.find((p) => p.featured) || portfolioProjects[0];
  // Latest 3 blog articles
  const latestArticles = blogPosts.slice(0, 3);
  // Live services
  const displayedServices = servicePackages.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Dual-Sanctuary Interactive Hero Section */}
      <HomeHeroClient />

      {/* 1b. Trust & Artisan Culinary Metrics */}
      <TrustStatsBanner />

      {/* 2. Commitment Section (Connected to Live Customizer & In-Context Edit) */}
      <HomeCommitmentClient />

      {/* 3. Botanical Practices & Services */}
      <section className="py-24 px-6 sm:px-8 bg-softwhite">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <SectionTitle
              label={customizerSettings.home.servicesSectionBadge || 'Praktik & Layanan Hidup Kami'}
              title={customizerSettings.home.servicesSectionTitle || 'Penataan Botani & Perawatan Lanskap'}
              subtitle={customizerSettings.home.servicesSectionSubtitle || 'Dari hunian residensial privat hingga ruang kerja korporat dan lanskap resor bernilai tinggi.'}
              align="left"
            />
            <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
              {isEditMode && !isPreviewMode && (
                <>
                  <button
                    type="button"
                    onClick={openEditServicesSection}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-forest/90 hover:bg-forest text-softwhite font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                    title="Edit Judul & Narasi Bagian Layanan"
                  >
                    <Pencil className="w-3.5 h-3.5 text-sage" />
                    <span>Edit Bagian</span>
                  </button>
                  <button
                    type="button"
                    onClick={openCreateService}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Tambah Layanan</span>
                  </button>
                </>
              )}
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-garden hover:text-forest transition-colors group"
              >
                <span>Lihat Semua Layanan</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedServices.map((service) => (
              <div
                key={service.id}
                className="bg-cream rounded-xl p-6 border border-sage/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative"
              >
                {/* Visual In-Context Edit Action Buttons (Admin Only) */}
                {isEditMode && !isPreviewMode && (
                  <div className="absolute top-3 right-3 z-30 flex items-center gap-1 bg-forest/95 backdrop-blur-md p-1 rounded-lg border border-sage/50 shadow-xl">
                    <button
                      type="button"
                      onClick={() => openEditService(service)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cream hover:bg-softwhite text-forest text-[11px] font-bold"
                      title="Edit Layanan"
                    >
                      <Pencil className="w-3 h-3 text-garden" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Hapus layanan "${service.title}"?`)) {
                          deleteServicePackage(service.id);
                        }
                      }}
                      className="p-1 rounded bg-red-600/90 hover:bg-red-600 text-white text-[11px]"
                      title="Hapus Layanan"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Hapus</span>
                    </button>
                  </div>
                )}

                <div>
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-softwhite">
                    <Image
                      src={service.coverImage}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-wider bg-forest/90 text-softwhite px-2 py-0.5 rounded">
                      {service.targetAudience.split(',')[0]}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-charcoal mb-2 group-hover:text-garden transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed mb-4 line-clamp-2">
                    {service.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-sage/30 mt-auto">
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-garden hover:text-forest transition-colors"
                  >
                    <span>Pelajari Layanan</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Curated Product Preview */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Living Spaces / Portfolio Showcase */}
      {featuredProject && (
        <section className="py-24 px-6 sm:px-8 bg-cream border-t border-sage/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <SectionTitle
                label={customizerSettings.home.portfolioSectionBadge || 'Portofolio Ruang Hijau'}
                title={customizerSettings.home.portfolioSectionTitle || 'Ketika Arsitektur Bernapas Alami'}
                subtitle={customizerSettings.home.portfolioSectionSubtitle || 'Jelajahi transformasi ruang botani kami di berbagai vila mewah, studio arsitektur, dan ruang korporat biofilik.'}
                align="left"
              />
              <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                {isEditMode && !isPreviewMode && (
                  <>
                    <button
                      type="button"
                      onClick={openEditPortfolioSection}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-forest/90 hover:bg-forest text-softwhite font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                      title="Edit Judul & Narasi Bagian Portofolio"
                    >
                      <Pencil className="w-3.5 h-3.5 text-sage" />
                      <span>Edit Bagian</span>
                    </button>
                    <button
                      type="button"
                      onClick={openCreatePortfolio}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Tambah Portofolio</span>
                    </button>
                  </>
                )}
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-garden hover:text-forest transition-colors group"
                >
                  <span>Jelajahi Semua Studi Kasus</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Featured Before/After Comparison Card */}
            <div className="bg-softwhite rounded-2xl p-6 sm:p-10 border border-sage/40 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7">
                  <BeforeAfterSlider
                    beforeImage={featuredProject.beforeImage}
                    afterImage={featuredProject.afterImage}
                    beforeLabel={featuredProject.beforeLabel}
                    afterLabel={featuredProject.afterLabel}
                    aspectRatio="aspect-[16/10]"
                  />
                </div>

                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-garden mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Transformasi Ruang Unggulan NOVIO</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mb-3 leading-snug">
                    {featuredProject.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-charcoal-muted uppercase tracking-wider mb-4">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-garden" />
                      {featuredProject.location}
                    </span>
                    <span>•</span>
                    <span>{featuredProject.clientCategory}</span>
                  </div>

                  <p className="text-sm text-charcoal/80 leading-relaxed mb-6">
                    {featuredProject.excerpt}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      href={`/portfolio/${featuredProject.slug}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-forest hover:bg-forest-light text-softwhite font-medium text-xs tracking-wider uppercase transition-colors shadow-sm"
                    >
                      <span>Lihat Studi Kasus</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/portfolio"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-cream hover:bg-cream-dark text-charcoal font-medium text-xs tracking-wider uppercase transition-colors border border-sage/40"
                    >
                      <span>Jelajahi Semua Proyek</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
