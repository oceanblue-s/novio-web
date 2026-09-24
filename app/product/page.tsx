import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ProductCatalogClient from './ProductCatalogClient';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Katalog Komponen Kuliner Alami & Produk Tani Artisan | NOVIO',
  description:
    'Jelajahi kurasi bahan alami premium Novio: racikan tisane herbal, cuka fermentasi artisan, olahan awetan segar, saus cabai, microgreens, sayuran spesial, bunga konsumsi, dan herba kuliner.',
  alternates: {
    canonical: 'https://novio-web.vercel.app/product',
  },
  openGraph: {
    title: 'Katalog Komponen Kuliner Alami & Produk Tani Artisan | NOVIO',
    description:
      'Jelajahi kurasi bahan alami premium Novio: racikan tisane herbal, cuka fermentasi artisan, olahan awetan segar, saus cabai, microgreens, sayuran spesial, bunga konsumsi, dan herba kuliner.',
    url: 'https://novio-web.vercel.app/product',
    images: ['/novio-tisane-blend.webp'],
  },
};

export default function ProductPage() {
  const publishedProducts = products.filter((p) => p.published);

  return (
    <div className="flex flex-col w-full">
      {/* Product Hero */}
      <Hero
        title="Komponen Kuliner Alami Indonesia"
        subtitle="Bahan alami premium yang diolah dengan ketulusan — dari bunga yang dapat dimakan dan hasil bumi segar hingga kreasi produk fermentasi artisan."
        badge="Katalog Kuliner & Hasil Tani Artisan"
        imageSrc="/about-greenhouse-bg.jpg"
        imageAlt="Katalog Komponen Kuliner Alami Novio"
      />

      {/* Catalog Grid with Filters */}
      <ProductCatalogClient initialProducts={publishedProducts} />
    </div>
  );
}
