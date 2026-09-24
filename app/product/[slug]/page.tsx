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
      title: 'Product Not Found | NOVIO',
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

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const whatsappInquiryUrl = `https://wa.me/${siteConfig.whatsappTarget}?text=${encodeURIComponent(
    `Halo NOVIO, saya tertarik untuk menanyakan produk "${product.name}" (ID: ${product.id}). Bisakah memberikan detail ketersediaan, kemasan, dan pemesanan saat ini?`
  )}`;

  const productJsonLd = {
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
  };

  return (
    <div className="pt-28 pb-24 bg-softwhite">
      {/* Schema.org Product Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal-muted hover:text-garden transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Produk</span>
          </Link>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Gallery Column */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.gallery}
              name={product.name}
              hotspots={product.hotspots}
            />
          </div>

          {/* Details & Inquiries Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-forest/10 text-forest rounded-full">
                  {product.category}
                </span>
                {product.origin && (
                  <span className="text-xs text-charcoal-muted flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sage" />
                    {product.origin}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal tracking-tight leading-tight mb-4">
                {product.name}
              </h1>

              <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed mb-6 font-light">
                {product.shortDescription}
              </p>

              {/* Chef Curation & WhatsApp Action Card */}
              <ProductDetailActions
                product={product}
                whatsappInquiryUrl={whatsappInquiryUrl}
              />

              {/* Key Features */}
              <div className="space-y-4 mb-8">
                <h3 className="font-serif text-lg font-medium text-charcoal">
                  Keunggulan & Aplikasi Kuliner
                </h3>
                <ul className="space-y-2.5">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-charcoal/80">
                      <Check className="w-4 h-4 text-garden shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quality Seal */}
            <div className="pt-6 border-t border-cream-dark flex items-center gap-3 text-xs text-charcoal-muted">
              <Shield className="w-5 h-5 text-garden shrink-0" />
              <span>
                Diolah secara higienis dari bahan alami berkualitas tinggi bersama petani lokal. Diperiksa mutunya sebelum pengiriman.
              </span>
            </div>
          </div>
        </div>

        {/* Extended Description & Specifications */}
        <div className="border-t border-sage/30 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
              Deskripsi Produk & Karakter Cita Rasa
            </h2>
            <div className="prose prose-stone text-charcoal/80 leading-relaxed space-y-4">
              <p className="text-base sm:text-lg leading-relaxed">{product.description}</p>
              <p className="text-sm leading-relaxed text-charcoal/70">
                Diproduksi dan dikurasi dengan cermat oleh Novio, menghadirkan kesegaran alami dan cita rasa autentik dari tanah Indonesia untuk dapur para chef profesional dan penikmat kuliner di seluruh nusantara.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            {product.specifications && (
              <div className="bg-cream rounded-xl p-6 border border-sage/30">
                <h3 className="font-serif text-xl font-medium text-charcoal mb-4">
                  Spesifikasi & Informasi Produk
                </h3>
                <dl className="space-y-3 divide-y divide-sage/20 text-sm">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="pt-3 first:pt-0 flex justify-between gap-4">
                      <dt className="text-charcoal-muted font-medium">{key}</dt>
                      <dd className="text-charcoal font-semibold text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-sage/30">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mb-8">
              Jelajahi Produk Pilihan Lainnya
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="group bg-softwhite rounded-lg overflow-hidden border border-sage/30 hover:border-garden transition-all flex flex-col"
                >
                  <Link href={`/product/${rel.slug}`} className="relative aspect-[4/3] block bg-cream">
                    <Image
                      src={rel.coverImage}
                      alt={rel.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-garden uppercase tracking-wider">
                        {rel.category}
                      </span>
                      <Link href={`/product/${rel.slug}`}>
                        <h4 className="font-serif text-lg font-medium text-charcoal group-hover:text-garden transition-colors mt-1">
                          {rel.name}
                        </h4>
                      </Link>
                    </div>
                    <div className="pt-3 mt-3 border-t border-cream-dark">
                      <Link
                        href={`/product/${rel.slug}`}
                        className="text-xs font-semibold uppercase tracking-wider text-garden hover:text-forest"
                      >
                        Lihat Produk →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
