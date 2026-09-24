import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Jurnal & Inspirasi Kuliner Alami | NOVIO',
  description:
    'Catatan editorial, inovasi fermentasi artisan, panduan bahan kuliner, serta kisah pemberdayaan petani lokal bersama NOVIO.',
  alternates: {
    canonical: 'https://novio.vercel.app/blog',
  },
  openGraph: {
    title: 'Jurnal & Inspirasi Kuliner Alami | NOVIO',
    description:
      'Catatan editorial, inovasi fermentasi artisan, panduan bahan kuliner, serta kisah pemberdayaan petani lokal bersama NOVIO.',
    url: 'https://novio.vercel.app/blog',
    images: ['/novio-tisane-blend.webp'],
  },
};

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <div className="flex flex-col w-full">
      {/* Blog Hero */}
      <Hero
        title="Jurnal & Inspirasi Kuliner Alami"
        subtitle="Eksplorasi cita rasa alami Indonesia, seni fermentasi artisan, dan inspirasi kreasi dapur profesional dari kebun petani lokal ke meja saji."
        badge="Jurnal NOVIO"
        imageSrc="/about-greenhouse-bg.jpg"
        imageAlt="Editorial Jurnal Kuliner Artisan NOVIO"
      />

      {/* Main Listing Section */}
      <section className="py-20 px-6 sm:px-8 bg-softwhite">
        <div className="max-w-7xl mx-auto">
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
    </div>
  );
}
