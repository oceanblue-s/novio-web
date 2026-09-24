'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PortfolioProject } from '@/types';
import { ArrowUpRight, MapPin, Sparkles, Pencil, Trash2 } from 'lucide-react';
import { useSiteData } from '@/context/SiteDataContext';

interface ProjectCardProps {
  project: PortfolioProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { isEditMode, isPreviewMode, openEditPortfolio, deletePortfolioProject } = useSiteData();

  return (
    <article className="group bg-softwhite rounded-lg overflow-hidden border border-sage/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative">
      {/* Visual In-Context Edit Action Buttons (Admin Only) */}
      {isEditMode && !isPreviewMode && (
        <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 bg-forest/95 backdrop-blur-md p-1.5 rounded-lg border border-sage/50 shadow-xl">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openEditPortfolio(project);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cream hover:bg-softwhite text-forest text-xs font-bold transition-all shadow-xs"
            title="Edit Portofolio Ini"
          >
            <Pencil className="w-3.5 h-3.5 text-garden" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (window.confirm(`Yakin ingin menghapus portofolio "${project.title}"?`)) {
                deletePortfolioProject(project.id);
              }
            }}
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-xs"
            title="Hapus Portofolio Ini"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus</span>
          </button>
        </div>
      )}

      {/* Image Container */}
      <Link
        href={`/portfolio/${project.slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-cream block"
        aria-label={`View architectural case study for ${project.title}`}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Subtle dark green vignette on hover */}
        <div className="absolute inset-0 bg-forest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-forest/85 backdrop-blur-sm text-softwhite rounded shadow-sm">
          {project.clientCategory}
        </span>

        {/* Location Badge */}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-softwhite/90 backdrop-blur-md text-charcoal rounded shadow-sm">
          <MapPin className="w-3 h-3 text-garden" />
          <span>{project.location}</span>
        </span>
      </Link>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between bg-softwhite">
        <div>
          <div className="flex items-center justify-between text-xs text-charcoal-muted uppercase tracking-wider mb-2">
            <span>{project.year}</span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 text-garden font-semibold">
                <Sparkles className="w-3 h-3" />
                Unggulan
              </span>
            )}
          </div>

          <Link href={`/portfolio/${project.slug}`} className="group-hover:text-garden transition-colors">
            <h3 className="font-serif text-xl font-medium text-charcoal mb-2 line-clamp-1">
              {project.title}
            </h3>
          </Link>

          <p className="text-sm text-charcoal/70 leading-relaxed line-clamp-2 mb-4">
            {project.excerpt}
          </p>

          {/* Curated Specimen Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.curatedSpecimens.slice(0, 3).map((specimen, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-cream text-charcoal/80 px-2 py-0.5 rounded border border-sage/30"
              >
                {specimen}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-cream-dark flex items-center justify-between">
          <span className="text-xs text-charcoal-muted uppercase tracking-wider font-medium">
            Studi Kasus
          </span>
          <Link
            href={`/portfolio/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-garden group-hover:text-forest transition-colors"
          >
            <span>Jelajahi Proyek</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
