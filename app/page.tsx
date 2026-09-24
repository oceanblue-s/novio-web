import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import HomeHeroClient from '@/components/HomeHeroClient';
import HomeCommitmentClient from '@/components/HomeCommitmentClient';
import HomeCtaClient from '@/components/HomeCtaClient';
import SectionTitle from '@/components/SectionTitle';
import ProductCard from '@/components/ProductCard';
import BlogCard from '@/components/BlogCard';
import TeamCard from '@/components/TeamCard';
import { products } from '@/data/products';
import { blogPosts } from '@/data/blog';
import { teamMembers } from '@/data/team';
import { portfolioProjects } from '@/data/portfolio';
import { servicePackages } from '@/data/services';
import { siteConfig } from '@/data/site';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { ArrowRight, Leaf, Sparkles, ShieldCheck, Sprout, MessageSquare, MapPin, ArrowUpRight, Check, Sun, HeartHandshake, Award } from 'lucide-react';

export default function HomePage() {
  // Curated products for home preview
  const featuredProducts = products.slice(0, 3);
  // Featured project for before/after spotlight
  const featuredProject = portfolioProjects.find((p) => p.featured) || portfolioProjects[0];
  // Latest 2-3 blog articles
  const latestArticles = blogPosts.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Dual-Sanctuary Interactive Hero Section */}
      <HomeHeroClient />

      {/* 2. Commitment Section (Connected to Live Customizer) */}
      <HomeCommitmentClient />

      {/* 3. Botanical Practices & Services */}
      <section className="py-24 px-6 sm:px-8 bg-softwhite">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionTitle
              label="Praktik & Layanan Hidup Kami"
              title="Penataan Botani & Perawatan Lanskap"
              subtitle="Dari hunian residensial privat hingga ruang kerja korporat dan lanskap resor bernilai tinggi."
              align="left"
            />
            <div className="mt-4 md:mt-0">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-garden hover:text-forest transition-colors group"
              >
                <span>Lihat Semua Layanan & Alur Kerja</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicePackages.map((service) => (
              <div
                key={service.id}
                className="bg-cream rounded-xl p-6 border border-sage/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
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
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionTitle
              label="Komponen Kuliner Alami Indonesia"
              title="Kurasi Bahan Alami & Fermentasi Artisan"
              subtitle="Bahan alami premium yang diolah dengan ketulusan — dari bunga yang dapat dimakan dan hasil bumi segar hingga kreasi produk fermentasi artisan."
              align="left"
            />
            <div className="mt-4 md:mt-0">
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

      {/* 4. Living Spaces / Portfolio Showcase */}
      {featuredProject && (
        <section className="py-24 px-6 sm:px-8 bg-cream border-t border-sage/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <SectionTitle
                label="Portofolio Ruang Hijau"
                title="Ketika Arsitektur Bernapas Alami"
                subtitle="Jelajahi transformasi ruang botani kami di berbagai vila mewah, studio arsitektur, dan ruang korporat biofilik."
                align="left"
              />
              <div className="mt-4 md:mt-0">
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

      {/* 5. Team / Members Section */}
      <section className="py-24 px-6 sm:px-8 bg-softwhite border-t border-sage/30">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            label="Keluarga Pendiri & Tim NOVIO"
            title="Bersaudara yang Berdedikasi Memberdayakan Petani"
            subtitle="Kenali Nunik, Retno, Danang, dan tim ahli yang berjuang memutus rantai distribusi yang tidak adil serta menjadi mitra terbaik bagi para Chef di Indonesia."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Blog / Journal Preview */}
      <section className="py-24 px-6 sm:px-8 bg-softwhite">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionTitle
              label="Jurnal NOVIO"
              title="Perspektif & Catatan Editorial"
              subtitle="Refleksi mendalam tentang arsitektur biofilik, perawatan spesimen tanaman, dan gaya hidup selaras alam."
              align="left"
            />
            <div className="mt-4 md:mt-0">
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

      {/* 6. WhatsApp CTA Banner before Footer (Connected to Live Customizer) */}
      <HomeCtaClient />
    </div>
  );
}
