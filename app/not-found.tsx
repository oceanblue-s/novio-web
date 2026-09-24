import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-softwhite px-6 py-24 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cream border border-sage/40 text-garden">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-widest text-garden block">
          Galat 404 • Halaman Tidak Ditemukan
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-medium text-charcoal tracking-tight">
          Tersesat di Rimbunnya Dedaunan
        </h1>

        <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed">
          Jalur navigasi atau spesimen botani yang Anda tuju telah dipindahkan atau belum tersedia dalam katalog konservatori kami saat ini.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-forest hover:bg-forest-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/product"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-cream hover:bg-cream-dark text-charcoal text-xs font-semibold uppercase tracking-wider border border-sage/40 transition-colors"
          >
            <span>Jelajahi Koleksi Tanaman</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
