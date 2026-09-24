'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSiteData } from '@/context/SiteDataContext';
import { siteConfig } from '@/data/site';
import { Product } from '@/types';
import {
  ArrowLeft,
  MapPin,
  Check,
  Shield,
  Loader2,
  Sparkles,
  Smartphone,
  Share2,
} from 'lucide-react';
import ProductGallery from './ProductGallery';
import ProductDetailActions from './ProductDetailActions';

interface DynamicProductDetailClientProps {
  slug: string;
  initialProduct?: Product;
}

export default function DynamicProductDetailClient({
  slug,
  initialProduct,
}: DynamicProductDetailClientProps) {
  const { products, openSyncModal } = useSiteData();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();

  // Find in live client-side datasets first, fallback to initial server product
  const liveProduct = products.find(
    (p) =>
      p.slug.toLowerCase().trim() === decodedSlug ||
      (initialProduct && p.id === initialProduct.id)
  );

  const product = liveProduct || initialProduct;

  // While hydrating, show a clean botanical skeleton to avoid premature "Not Found" flash
  if (!product && !isMounted) {
    return (
      <div className="pt-36 pb-32 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center text-forest animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin text-garden" />
        </div>
        <p className="text-sm font-medium text-charcoal/70">Memuat spesimen produk NOVIO...</p>
      </div>
    );
  }

  // Truly not found on this device
  if (!product) {
    return (
      <div className="pt-36 pb-32 max-w-xl mx-auto px-6 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-cream mx-auto flex items-center justify-center text-charcoal/40 border border-sage/30 mb-5">
          <Sparkles className="w-8 h-8 text-sage" />
        </div>
        <h2 className="font-serif text-3xl text-charcoal mb-3">Produk Tidak Ditemukan</h2>
        <p className="text-sm text-charcoal/70 mb-6 leading-relaxed">
          Produk dengan alamat ini belum terdaftar di katalog atau telah dihapus.
        </p>

        {/* Helpful Explanation if visited on mobile while edited on desktop */}
        <div className="p-5 bg-cream/80 rounded-2xl border border-sage/40 text-xs text-charcoal/80 text-left mb-8 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-forest text-sm">
            <Smartphone className="w-4 h-4 text-garden" />
            <span>Apakah Anda baru menambahkan produk ini di Laptop/Desktop?</span>
          </div>
          <p className="leading-relaxed text-[12px] text-charcoal/70">
            Perubahan lokal yang Anda buat di komputer tersimpan di memori browser laptop tersebut. Agar produk langsung muncul di HP ini, Anda dapat mengimpor file data atau membuka tautan sinkronisasi dari laptop:
          </p>
          <button
            type="button"
            onClick={openSyncModal}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-softwhite font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95"
          >
            <Smartphone className="w-4 h-4" />
            <span>📲 Buka Menu Sinkron / Impor Data di HP Ini</span>
          </button>
        </div>

        <Link
          href="/product"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest text-softwhite font-bold text-xs uppercase tracking-wider hover:bg-forest-light transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Produk</span>
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const whatsappInquiryUrl = `https://wa.me/${siteConfig.whatsappTarget}?text=${encodeURIComponent(
    `Halo NOVIO, saya tertarik untuk menanyakan produk "${product.name}" (ID: ${product.id}). Bisakah memberikan detail ketersediaan, kemasan, dan pemesanan saat ini?`
  )}`;

  return (
    <div className="pt-28 pb-24 bg-softwhite animate-fade-in">
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
              images={
                product.gallery && product.gallery.length > 0
                  ? product.gallery
                  : [product.coverImage || '/about-greenhouse-bg.jpg']
              }
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
                  Keunggulan &amp; Aplikasi Kuliner
                </h3>
                <ul className="space-y-2.5">
                  {(product.features || []).map((feature, idx) => (
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
              Deskripsi Produk &amp; Karakter Cita Rasa
            </h2>
            <div className="prose prose-stone text-charcoal/80 leading-relaxed space-y-4">
              <p className="text-base sm:text-lg leading-relaxed">{product.description}</p>
              <p className="text-sm leading-relaxed text-charcoal/70">
                Diproduksi dan dikurasi dengan cermat oleh Novio, menghadirkan kesegaran alami dan cita rasa autentik dari tanah Indonesia untuk dapur para chef profesional dan penikmat kuliner di seluruh nusantara.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="bg-cream rounded-xl p-6 border border-sage/30">
                <h3 className="font-serif text-xl font-medium text-charcoal mb-4">
                  Spesifikasi &amp; Informasi Produk
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
                      src={rel.coverImage || '/about-greenhouse-bg.jpg'}
                      alt={rel.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={
                        typeof rel.coverImage === 'string' &&
                        (rel.coverImage.startsWith('data:') || rel.coverImage.startsWith('http'))
                      }
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
