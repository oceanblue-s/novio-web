import React from 'react';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Kontak & Kemitraan Chef Kebun Parongpong & Bali | NOVIO',
  description:
    'Hubungi tim NOVIO di Bandung Barat dan Bali. Konsultasikan pasokan bahan kuliner alami, produk tani artisan, kemitraan chef, atau kunjungan ke kebun Parongpong.',
  alternates: {
    canonical: 'https://novio.vercel.app/contact',
  },
  openGraph: {
    title: 'Kontak & Kemitraan Chef Kebun Parongpong & Bali | NOVIO',
    description:
      'Hubungi tim NOVIO di Bandung Barat dan Bali. Konsultasikan pasokan bahan kuliner alami, produk tani artisan, kemitraan chef, atau kunjungan ke kebun Parongpong.',
    url: 'https://novio.vercel.app/contact',
    images: ['/about-greenhouse-bg.jpg'],
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Contact Hero */}
      <Hero
        title="Terhubung dengan NOVIO"
        subtitle="Konsultasikan instalasi lanskap kustom, akuisisi spesimen botani langka teraklimatisasi, atau jadwalkan kunjungan privat ke kebun greenhouse kami."
        badge="Konsultasi &amp; Lokasi Kebun"
        imageSrc="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=2000&q=85"
        imageAlt="Kontak Studio Botani dan Nursery NOVIO"
      />

      {/* Main Interactive Contact Experience */}
      <ContactClient />
    </div>
  );
}
