'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PortfolioProject, ProjectCategory } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { siteConfig } from '@/data/site';
import { ArrowRight, MapPin, Sparkles, MessageSquare, Layers, Plus } from 'lucide-react';
import { useSiteData } from '@/context/SiteDataContext';

interface PortfolioClientProps {
  initialProjects: PortfolioProject[];
}

const CATEGORIES: Array<{ id: 'All' | ProjectCategory; label: string }> = [
  { id: 'All', label: 'Semua Kategori' },
  { id: 'Luxury Hospitality', label: 'Perhotelan Mewah' },
  { id: 'Bespoke Residential', label: 'Residensial Kustom' },
  { id: 'Corporate Biophilic', label: 'Korporat Biofilik' },
  { id: 'Commercial & Cafe', label: 'Komersial & Kafe' },
];

export default function PortfolioClient({ initialProjects }: PortfolioClientProps) {
  const { portfolioProjects: siteProjects, isEditMode, isPreviewMode, openCreatePortfolio } = useSiteData();
  const activeProjects = siteProjects && siteProjects.length > 0 ? siteProjects : initialProjects;

  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');

  // Featured project for the interactive before/after spotlight
  const spotlightProject = useMemo(() => {
    return activeProjects.find((p) => p.featured) || activeProjects[0];
  }, [activeProjects]);

  // Filtered project list
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return activeProjects;
    return activeProjects.filter((p) => p.clientCategory === selectedCategory);
  }, [activeProjects, selectedCategory]);

  return (
    <div className="space-y-20">
      {/* 1. Interactive Transformation Spotlight (Before/After Hero) */}
      {spotlightProject && (
        <section className="bg-cream rounded-2xl p-6 sm:p-10 border border-sage/40 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Interactive Slider */}
            <div className="lg:col-span-7">
              <BeforeAfterSlider
                beforeImage={spotlightProject.beforeImage}
                afterImage={spotlightProject.afterImage}
                beforeLabel={spotlightProject.beforeLabel}
                afterLabel={spotlightProject.afterLabel}
                aspectRatio="aspect-[16/10]"
                priority={true}
              />
            </div>

            {/* Right: Project Narrative */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-garden mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Transformasi Ruang Unggulan</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mb-3 leading-snug">
                {spotlightProject.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-charcoal-muted uppercase tracking-wider mb-4">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-garden" />
                  {spotlightProject.location}
                </span>
                <span>•</span>
                <span>{spotlightProject.clientCategory}</span>
              </div>

              <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed mb-6">
                {spotlightProject.excerpt}
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-charcoal-muted">
                  Palet Botani Terkurasi:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {spotlightProject.curatedSpecimens.map((specimen, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-softwhite px-3 py-1 rounded-full border border-sage/40 text-charcoal font-medium"
                    >
                      {specimen}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href={`/portfolio/${spotlightProject.slug}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-forest hover:bg-forest-light text-softwhite font-medium text-xs tracking-wider uppercase transition-colors shadow-sm"
                >
                  <span>Baca Studi Kasus Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/${siteConfig.whatsappTarget}?text=${encodeURIComponent(
                    `Halo NOVIO, saya tertarik untuk mendiskusikan konsep penataan botani serupa dengan "${spotlightProject.title}".`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-softwhite hover:bg-cream-dark text-charcoal font-medium text-xs tracking-wider uppercase transition-colors border border-sage/40"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-garden" />
                  <span>Konsultasi Konsep Serupa</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Filter Tabs & Portfolio Grid */}
      <section className="space-y-8">
        {/* In-Context Admin Edit Action Banner */}
        {isEditMode && !isPreviewMode && (
          <div className="p-4 rounded-xl bg-forest/10 border-2 border-dashed border-garden/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-forest">
                Mode Edit Aktif: Kelola &amp; Tambah Studi Kasus Portofolio Langsung
              </span>
            </div>
            <button
              type="button"
              onClick={openCreatePortfolio}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Portofolio Baru</span>
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-sage/30 pb-5">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-garden block mb-1">
              Kurasi Ruang Hijau
            </span>
            <h3 className="font-serif text-2xl font-medium text-charcoal">
              Jelajahi Portofolio Kami
            </h3>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2" role="tablist">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full transition-all ${
                    isActive
                      ? 'bg-forest text-softwhite shadow-sm'
                      : 'bg-cream text-charcoal/70 hover:bg-sage/20 hover:text-charcoal border border-sage/30'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-cream rounded-xl border border-sage/30">
            <Layers className="w-8 h-8 text-sage mx-auto mb-3" />
            <p className="text-base font-serif text-charcoal mb-1">Belum ada proyek dalam kategori ini</p>
            <p className="text-sm text-charcoal/70">
              Coba pilih kategori lain atau lihat seluruh proyek kami.
            </p>
          </div>
        )}
      </section>

      {/* 3. Bottom Consultation Banner */}
      <section className="bg-forest text-softwhite rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden border border-forest-light">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-semibold tracking-widest uppercase text-sage bg-forest-light/60 px-3 py-1 rounded-full border border-sage/30 inline-block">
            Kolaborasi Arsitektural & Lanskap
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-medium leading-tight">
            Memiliki ruang arsitektur yang membutuhkan sentuhan botani?
          </h3>
          <p className="text-cream/80 text-sm sm:text-base leading-relaxed">
            Mulai dari vila tropis di Bali hingga hunian dataran tinggi di Bandung dan ruang kantor di Jakarta, spesialis hortikultura kami siap merancang ekosistem hidup yang selaras dengan iklim mikro Anda.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.whatsappTarget}?text=${encodeURIComponent(
                'Halo NOVIO, saya ingin berkonsultasi mengenai proyek penataan lanskap atau interior botani.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-garden hover:bg-garden-light text-softwhite font-medium text-xs tracking-widest uppercase transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Konsultasi Bersama Spesialis Botani</span>
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-softwhite/10 hover:bg-softwhite/20 text-cream font-medium text-xs tracking-widest uppercase transition-colors border border-sage/40"
            >
              <span>Kunjungi Kontak & Studio</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
