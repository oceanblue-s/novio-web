import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { portfolioProjects } from '@/data/portfolio';
import { siteConfig } from '@/data/site';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ProjectCard from '@/components/ProjectCard';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Sparkles,
  MessageSquare,
  Quote,
  Layers,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const project = portfolioProjects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found | NOVIO',
    };
  }

  return {
    title: `${project.title} — Studi Kasus | NOVIO`,
    description: project.subtitle,
    alternates: {
      canonical: `${siteConfig.url}/portfolio/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | NOVIO`,
      description: project.subtitle,
      url: `${siteConfig.url}/portfolio/${project.slug}`,
      images: [
        {
          url: project.coverImage,
          width: 1600,
          height: 1000,
          alt: project.title,
        },
      ],
    },
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const project = portfolioProjects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  // Other projects for recommendations
  const relatedProjects = portfolioProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 2);

  return (
    <article className="min-h-screen bg-softwhite pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Navigation Breadcrumb */}
        <div className="py-6 border-b border-sage/30 flex items-center justify-between">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-charcoal/70 hover:text-garden transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Portofolio Ruang</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-charcoal-muted uppercase tracking-wider">
            <span>{project.clientCategory}</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>
        </div>

        {/* Project Header Title */}
        <div className="py-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream border border-sage/40 text-xs font-semibold uppercase tracking-wider text-garden mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>{project.location}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-charcoal tracking-tight leading-tight mb-6">
            {project.title}
          </h1>
          <p className="text-base sm:text-xl text-charcoal/80 leading-relaxed font-light">
            {project.subtitle}
          </p>
        </div>

        {/* Interactive Before & After Transformation Slider */}
        <div className="mb-16">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-garden block">
                Dokumentasi Transformasi
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-charcoal">
                Perbandingan Interaktif Sebelum &amp; Sesudah
              </h3>
            </div>
            <span className="text-xs text-charcoal-muted">
              Geser tombol pemisah untuk melihat kontras ruang secara nyata
            </span>
          </div>

          <BeforeAfterSlider
            beforeImage={project.beforeImage}
            afterImage={project.afterImage}
            beforeLabel={project.beforeLabel || 'Sebelum: Ruang Awal'}
            afterLabel={project.afterLabel || 'Sesudah: Suaka Hijau NOVIO'}
            aspectRatio="aspect-[16/9]"
            priority={true}
          />
        </div>

        {/* Editorial Case Study Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Main Narrative Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* The Challenge */}
            <section className="bg-cream rounded-xl p-8 border border-sage/30">
              <span className="text-xs font-semibold tracking-widest uppercase text-garden block mb-2">
                01 / Tantangan Arsitektural
              </span>
              <h2 className="font-serif text-2xl font-medium text-charcoal mb-4">
                Menyelaraskan Mikroklimat &amp; Harmoni Ruang
              </h2>
              <p className="text-charcoal/80 text-base leading-relaxed">
                {project.challenge}
              </p>
            </section>

            {/* The Botanical Solution */}
            <section className="bg-softwhite rounded-xl p-8 border border-sage/30 shadow-sm">
              <span className="text-xs font-semibold tracking-widest uppercase text-garden block mb-2">
                02 / Solusi Kurasi Botani <span translate="no" className="notranslate font-semibold">NOVIO</span>
              </span>
              <h2 className="font-serif text-2xl font-medium text-charcoal mb-4">
                Aklimatisasi Dataran Tinggi &amp; Kurasi Hidup
              </h2>
              <p className="text-charcoal/80 text-base leading-relaxed mb-6">
                {project.solution}
              </p>

              {/* Curated Specimen Palette */}
              <div className="pt-6 border-t border-sage/30">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-3">
                  Palet Spesimen Terpilih:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.curatedSpecimens.map((specimen, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-lg bg-cream border border-sage/30"
                    >
                      <Sparkles className="w-4 h-4 text-garden flex-shrink-0" />
                      <span className="text-xs font-medium text-charcoal">
                        {specimen}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Client Testimonial */}
            {project.testimonial && (
              <section className="p-8 rounded-xl bg-forest text-cream relative overflow-hidden border border-forest-light">
                <Quote className="w-12 h-12 text-sage/20 absolute -top-2 right-4 pointer-events-none" />
                <p className="font-serif text-lg sm:text-xl italic leading-relaxed text-softwhite mb-6 relative z-10">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-garden flex items-center justify-center text-softwhite font-serif text-sm font-semibold">
                    {project.testimonial.clientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-softwhite">
                      {project.testimonial.clientName}
                    </h4>
                    <p className="text-xs text-sage">
                      {project.testimonial.clientRole}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Architectural Gallery */}
            <section className="space-y-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-garden block">
                03 / Dokumentasi Visual
              </span>
              <h2 className="font-serif text-2xl font-medium text-charcoal mb-4">
                Galeri Dokumentasi Proyek
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden border border-sage/30 bg-cream"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} detail ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Project Specifications & CTA Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            {/* Specs Card */}
            <div className="bg-cream rounded-xl p-6 sm:p-8 border border-sage/40 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-medium text-charcoal border-b border-sage/30 pb-3">
                Spesifikasi &amp; Rincian Proyek
              </h3>

              {project.specs && (
                <dl className="space-y-4 text-xs">
                  {Object.entries(project.specs).map(([key, val]) => (
                    <div key={key} className="flex flex-col gap-1">
                      <dt className="text-charcoal-muted uppercase tracking-wider font-semibold">
                        {key}
                      </dt>
                      <dd className="text-charcoal font-medium text-sm leading-snug">
                        {val}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="pt-4 border-t border-sage/30 space-y-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsappTarget}?text=${encodeURIComponent(
                    `Halo NOVIO, saya ingin berkonsultasi mengenai kurasi botani terinspirasi dari studi kasus: "${project.title}" (${project.location}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-garden hover:bg-garden-light text-softwhite font-medium text-xs tracking-wider uppercase transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Konsultasikan Proyek Serupa</span>
                </a>

                <p className="text-[11px] text-charcoal/60 text-center leading-relaxed">
                  Terhubung langsung dengan studio kurator botani <span translate="no" className="notranslate font-medium">NOVIO</span> di Bandung &amp; Bali.
                </p>
              </div>
            </div>

            {/* Sustainable Provenance Note */}
            <div className="bg-softwhite rounded-xl p-5 border border-sage/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-garden flex-shrink-0 mt-0.5" />
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Semua spesimen dirawat secara berkelanjutan di nursery dataran tinggi Parongpong dan suaka Nusa Dua tanpa stimulasi kimia sintetis.
              </p>
            </div>
          </div>
        </div>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <section className="pt-16 border-t border-sage/30 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-garden block mb-1">
                  Eksplorasi Lanjutan
                </span>
                <h3 className="font-serif text-2xl font-medium text-charcoal">
                  Karya Ruang Hijau Lainnya
                </h3>
              </div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-garden hover:text-forest"
              >
                <span>Lihat Semua Proyek</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
