'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { ArrowUpRight, Eye, ChefHat, Check, Pencil, Trash2 } from 'lucide-react';
import { useChefCuration } from '@/context/ChefCurationContext';
import { useSiteData } from '@/context/SiteDataContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { openQuickView, addItem, removeItem, isItemCurated } = useChefCuration();
  const { isEditMode, isPreviewMode, openEditProduct, deleteProduct } = useSiteData();
  const isCurated = isItemCurated(product.id);

  const handleToggleCurate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCurated) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <article className="group bg-softwhite rounded-xl overflow-hidden border border-sage/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative">
      {/* Visual In-Context Edit Action Buttons (Admin Only) */}
      {isEditMode && !isPreviewMode && (
        <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 bg-forest/95 backdrop-blur-md p-1.5 rounded-lg border border-sage/50 shadow-xl">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openEditProduct(product);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cream hover:bg-softwhite text-forest text-xs font-bold transition-all shadow-xs"
            title="Edit Produk Ini"
          >
            <Pencil className="w-3.5 h-3.5 text-garden" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (window.confirm(`Yakin ingin menghapus produk "${product.name}"?`)) {
                deleteProduct(product.id);
              }
            }}
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-xs"
            title="Hapus Produk Ini"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus</span>
          </button>
        </div>
      )}

      {/* Image Container with subtle zoom */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream block">
        <Link
          href={`/product/${product.slug}`}
          aria-label={`Lihat detail lengkap ${product.name}`}
          className="block w-full h-full"
        >
          <Image
            src={product.coverImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {/* Subtle hover overlay */}
          <div className="absolute inset-0 bg-forest/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Category Pill */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-forest/85 backdrop-blur-sm text-softwhite rounded shadow-xs pointer-events-none">
          {product.category}
        </span>

        {/* Quick Action Floating Overlay on Card Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            type="button"
            onClick={handleQuickView}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-softwhite/95 hover:bg-softwhite text-charcoal text-xs font-semibold uppercase tracking-wider shadow-md backdrop-blur-sm border border-sage/40 transition-transform active:scale-95"
            aria-label={`Lihat cepat ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5 text-garden" />
            <span>Lihat Cepat</span>
          </button>

          <button
            type="button"
            onClick={handleToggleCurate}
            className={`p-2 rounded-lg text-xs font-semibold shadow-md backdrop-blur-sm border transition-all active:scale-95 ${
              isCurated
                ? 'bg-garden text-softwhite border-garden'
                : 'bg-forest/90 hover:bg-forest text-softwhite border-sage/40'
            }`}
            aria-label={isCurated ? 'Hapus dari baki kurasi' : 'Tambah ke baki kurasi chef'}
            title={isCurated ? 'Sudah di baki kurasi chef' : 'Tambah ke baki kurasi chef'}
          >
            {isCurated ? <Check className="w-4 h-4" /> : <ChefHat className="w-4 h-4 text-sage" />}
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between bg-softwhite">
        <div>
          <Link
            href={`/product/${product.slug}`}
            className="group-hover:text-garden transition-colors"
          >
            <h3 className="font-serif text-xl font-medium text-charcoal mb-2 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-charcoal/70 leading-relaxed line-clamp-2 mb-4">
            {product.shortDescription}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-cream-dark flex items-center justify-between">
          <button
            type="button"
            onClick={handleToggleCurate}
            className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
              isCurated
                ? 'text-garden hover:text-garden-light'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>{isCurated ? 'Di Baki Kurasi' : '+ Kurasi Chef'}</span>
          </button>

          <Link
            href={`/product/${product.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-garden group-hover:text-forest transition-colors"
          >
            <span>Lihat Detail</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
