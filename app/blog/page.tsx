import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import BlogListClient from '@/components/BlogListClient';
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
      <BlogListClient initialPosts={blogPosts} />
    </div>
  );
}
