import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { siteConfig } from '@/data/site';
import { ArrowLeft, MapPin, Check, Shield } from 'lucide-react';
import ProductGallery from './ProductGallery';
import ProductDetailActions from './ProductDetailActions';
import DynamicProductDetailClient from './DynamicProductDetailClient';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Detail Produk | NOVIO',
    };
  }

  return {
    title: `${product.name} | Bahan Kuliner Alami NOVIO`,
    description: product.shortDescription,
    alternates: {
      canonical: `${siteConfig.url}/product/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | NOVIO`,
      description: product.shortDescription,
      url: `${siteConfig.url}/product/${product.slug}`,
      images: [
        {
          url: product.coverImage,
          width: 1200,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | NOVIO`,
      description: product.shortDescription,
      images: [product.coverImage],
    },
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = products.find((p) => p.slug === params.slug);

  const productJsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: `${siteConfig.url}${product.coverImage}`,
        description: product.description,
        category: product.category,
        brand: {
          '@type': 'Brand',
          name: 'NOVIO',
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'IDR',
          url: `${siteConfig.url}/product/${product.slug}`,
        },
      }
    : null;

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      <DynamicProductDetailClient slug={params.slug} initialProduct={product} />
    </>
  );
}
