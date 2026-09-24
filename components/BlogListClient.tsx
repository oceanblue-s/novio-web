'use client';

import React from 'react';
import { BlogPost } from '@/types';
import BlogCard from '@/components/BlogCard';
import { useSiteData } from '@/context/SiteDataContext';
import { Plus, Sparkles } from 'lucide-react';

interface BlogListClientProps {
  initialPosts: BlogPost[];
}

export default function BlogListClient({ initialPosts }: BlogListClientProps) {
  const { blogPosts: siteBlogs, isEditMode, isPreviewMode, openCreateBlog } = useSiteData();
  const blogs = siteBlogs ?? initialPosts;

  const featuredPost = blogs[0];
  const remainingPosts = blogs.slice(1);

  return (
    <section className="py-20 px-6 sm:px-8 bg-softwhite">
      <div className="max-w-7xl mx-auto">
        {/* Visual In-Context Edit Action Banner */}
        {isEditMode && !isPreviewMode && (
          <div className="mb-12 p-4 rounded-xl bg-forest/10 border-2 border-dashed border-garden/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-forest">
                Mode Edit Aktif: Tulis &amp; Kelola Artikel Jurnal Langsung
              </span>
            </div>
            <button
              type="button"
              onClick={openCreateBlog}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tulis Artikel Baru</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="text-center py-20 bg-cream rounded-2xl border border-sage/40 p-8 space-y-4">
            <p className="font-serif text-2xl text-charcoal">Belum Ada Artikel Jurnal</p>
            <p className="text-sm text-charcoal/70 max-w-md mx-auto">
              Saat ini belum ada artikel yang dipublikasikan. Anda dapat menulis artikel baru langsung dari halaman ini.
            </p>
            <button
              type="button"
              onClick={openCreateBlog}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold text-xs uppercase tracking-wider shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tulis Artikel Baru</span>
            </button>
          </div>
        )}

        {/* Featured Article */}
        {featuredPost && (
          <div className="mb-16">
            <BlogCard post={featuredPost} featured={true} />
          </div>
        )}

        {/* Remaining Articles Grid */}
        {remainingPosts.length > 0 && (
          <div>
            <div className="mb-8 pb-4 border-b border-sage/30 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-medium text-charcoal">
                Artikel &amp; Catatan Terbaru
              </h2>
              <span className="text-xs text-charcoal-muted uppercase tracking-wider">
                {remainingPosts.length} Artikel
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
