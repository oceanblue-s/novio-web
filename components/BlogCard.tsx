'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types';
import { Calendar, Clock, ArrowRight, Pencil, Trash2 } from 'lucide-react';
import { useSiteData } from '@/context/SiteDataContext';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const { isEditMode, isPreviewMode, openEditBlog, deleteBlogPost } = useSiteData();
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('id-ID', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (featured) {
    return (
      <article className="group card-hover-lift bg-softwhite rounded-2xl overflow-hidden border border-sage/40 shadow-sm hover:shadow-xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 mb-12 relative">
        {/* Visual In-Context Edit Action Buttons (Admin Only) */}
        {isEditMode && !isPreviewMode && (
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-forest/95 backdrop-blur-md p-1.5 rounded-lg border border-sage/50 shadow-xl">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openEditBlog(post);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cream hover:bg-softwhite text-forest text-xs font-bold transition-all shadow-xs"
              title="Edit Artikel Ini"
            >
              <Pencil className="w-3.5 h-3.5 text-garden" />
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.confirm(`Yakin ingin menghapus artikel "${post.title}"?`)) {
                  deleteBlogPost(post.id);
                }
              }}
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-xs"
              title="Hapus Artikel Ini"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus</span>
            </button>
          </div>
        )}
        {/* Large Featured Image */}
        <Link
          href={`/blog/${post.slug}`}
          className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto w-full overflow-hidden bg-cream block"
          aria-label={`Baca artikel: ${post.title}`}
        >
          <Image
            src={post.coverImage || '/about-greenhouse-bg.jpg'}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            unoptimized={typeof post.coverImage === 'string' && (post.coverImage.startsWith('data:') || post.coverImage.startsWith('http'))}
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-forest/90 backdrop-blur-sm text-softwhite rounded-lg shadow-sm border border-sage/30">
            Artikel Pilihan
          </span>
        </Link>

        {/* Content */}
        <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 text-xs text-charcoal-muted uppercase tracking-wider mb-4 font-medium">
              <span className="text-garden font-bold">{post.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-sage" />
                {formattedDate}
              </span>
              {post.readTimeMinutes && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sage" />
                    {post.readTimeMinutes} mnt baca
                  </span>
                </>
              )}
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h3 className="font-serif text-2xl lg:text-3xl font-medium text-charcoal group-hover:text-garden transition-colors leading-tight mb-4">
                {post.title}
              </h3>
            </Link>

            <p className="text-charcoal/70 text-base leading-relaxed mb-6">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-6 border-t border-sage/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-sage/30 border border-sage/40">
                <Image
                  src={post.author.avatar || '/novio-logo.png'}
                  alt={post.author.name}
                  fill
                  unoptimized={typeof post.author.avatar === 'string' && (post.author.avatar.startsWith('data:') || post.author.avatar.startsWith('http'))}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-charcoal">{post.author.name}</p>
                <p className="text-[11px] text-charcoal-muted">{post.author.role}</p>
              </div>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-garden hover:text-forest transition-colors"
            >
              <span>Baca Artikel</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group card-hover-lift bg-softwhite rounded-xl overflow-hidden border border-sage/30 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full relative">
      {/* Visual In-Context Edit Action Buttons (Admin Only) */}
      {isEditMode && !isPreviewMode && (
        <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 bg-forest/95 backdrop-blur-md p-1.5 rounded-lg border border-sage/50 shadow-xl">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openEditBlog(post);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cream hover:bg-softwhite text-forest text-xs font-bold transition-all shadow-xs"
            title="Edit Artikel Ini"
          >
            <Pencil className="w-3.5 h-3.5 text-garden" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (window.confirm(`Yakin ingin menghapus artikel "${post.title}"?`)) {
                deleteBlogPost(post.id);
              }
            }}
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-xs"
            title="Hapus Artikel Ini"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus</span>
          </button>
        </div>
      )}

      {/* Thumbnail */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-cream block"
        aria-label={`Baca artikel: ${post.title}`}
      >
        <Image
          src={post.coverImage || '/about-greenhouse-bg.jpg'}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={typeof post.coverImage === 'string' && (post.coverImage.startsWith('data:') || post.coverImage.startsWith('http'))}
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-forest/85 backdrop-blur-sm text-softwhite rounded-md border border-sage/30 shadow-xs">
          {post.category}
        </span>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-charcoal-muted mb-3 font-medium">
            <Calendar className="w-3.5 h-3.5 text-sage" />
            <span>{formattedDate}</span>
            {post.readTimeMinutes && (
              <>
                <span>•</span>
                <span>{post.readTimeMinutes} mnt baca</span>
              </>
            )}
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="font-serif text-xl font-medium text-charcoal group-hover:text-garden transition-colors leading-snug mb-3 line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-sm text-charcoal/70 leading-relaxed line-clamp-2 mb-6">
            {post.excerpt}
          </p>
        </div>

        {/* Read More Action */}
        <div className="pt-4 border-t border-sage/20 flex items-center justify-between">
          <span className="text-xs text-charcoal-muted font-medium">{post.author.name}</span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-garden group-hover:text-forest transition-colors"
          >
            <span>Baca Selengkapnya</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
