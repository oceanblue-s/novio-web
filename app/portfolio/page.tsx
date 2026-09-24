import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import PortfolioClient from './PortfolioClient';
import { portfolioProjects } from '@/data/portfolio';

export const metadata: Metadata = {
  title: 'Portofolio Ruang Hijau & Studi Kasus | NOVIO',
  description:
    'Jelajahi studi kasus arsitektural dan integrasi biofilik Novio di berbagai vila mewah di Bali, studio pegunungan di Bandung, dan ruang kerja eksekutif di Jakarta.',
  alternates: {
    canonical: 'https://novio-web.vercel.app/portfolio',
  },
  openGraph: {
    title: 'Portofolio Ruang Hijau & Studi Kasus | NOVIO',
    description:
      'Jelajahi studi kasus arsitektural dan integrasi biofilik Novio di berbagai vila mewah di Bali, studio pegunungan di Bandung, dan ruang kerja eksekutif di Jakarta.',
    url: 'https://novio-web.vercel.app/portfolio',
    images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80'],
  },
};

export default function PortfolioPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Portfolio Hero */}
      <Hero
        title="Ruang Hijau & Portofolio"
        subtitle="Ketika arsitektur bernapas alami. Mengkurasi ekosistem botani tangguh untuk perhotelan mewah, hunian privat istimewa, dan ruang kerja modern."
        badge="Portofolio Arsitektural & Studi Kasus"
        imageSrc="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=85"
        imageAlt="Portofolio Ruang Hijau dan Desain Botani Arsitektural Novio"
      />

      {/* Main Portfolio Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24 w-full">
        <PortfolioClient initialProjects={portfolioProjects} />
      </div>
    </div>
  );
}
