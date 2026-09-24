'use client';

import React from 'react';
import Link from 'next/link';
import { useSiteData } from '@/context/SiteDataContext';
import { ArrowLeft, MapPin, Check, Shield } from 'lucide-react';
import ProductGallery from './ProductGallery';
import ProductDetailActions from './ProductDetailActions';

export default function DynamicProductDetailClient({ slug }: { slug: string }) {
  const { products } = useSiteData();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="pt-32 pb-24 max-w-xl mx-auto px-6 text-center">
        <h2 className="font-serif text-2xl text-charcoal mb-3">Produk Tidak Ditemukan</h2>
        <p className="text-sm text-charcoal/70 mb-8 leading-relaxed">
          Produk dengan alamat ini belum terdaftar di katalog atau telah dihapus.
        </p>
        <Link
          href="/product"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-forest text-softwhite font-semibold text-xs uppercase tracking-wider hover:bg-forest-light transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog Produk</span>
        </Link>
      </div>
    );
  }

  const whatsappInquiryUrl = `https://wa.me/6281312414863?text=${encodeURIComponent(
    `Halo NOVIO, saya tertarik untuk menanyakan produk "${product.name}" (ID: ${product.id}). Bisakah memberikan detail ketersediaan, kemasan, dan pemesanan saat ini?`
  )}`;

  return (
    <div className="pt-28 pb-24 bg-softwhite">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-8">
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal-muted hover:text-garden transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Produk</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.gallery && product.gallery.length > 0 ? product.gallery : [product.coverImage]}
              name={product.name}
              hotspots={product.hotspots}
            />
          </div>

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

              <ProductDetailActions
                product={product}
                whatsappInquiryUrl={whatsappInquiryUrl}
              />

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

            <div className="pt-6 border-t border-cream-dark flex items-center gap-3 text-xs text-charcoal-muted">
              <Shield className="w-5 h-5 text-garden shrink-0" />
              <span>
                Diolah secara higienis dari bahan alami berkualitas tinggi bersama petani lokal. Diperiksa mutunya sebelum pengiriman.
              </span>
            </div>
          </div>
        </div>

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
        </div>
      </div>
    </div>
  );
}
