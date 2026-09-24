import React from 'react';
import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'Tentang Kisah Perjalanan & Misi Kami | NOVIO',
  description:
    'Kisah perjalanan Nunik, Retno, dan Danang dari Demak hingga mendirikan Novio di Bali dan Bandung untuk memberdayakan petani lokal dan menjadi mitra terbaik bagi para Chef.',
  alternates: {
    canonical: 'https://novio-web.vercel.app/about',
  },
  openGraph: {
    title: 'Tentang Kisah Perjalanan & Misi Kami | NOVIO',
    description:
      'Kisah perjalanan Nunik, Retno, dan Danang dari Demak hingga mendirikan Novio di Bali dan Bandung untuk memberdayakan petani lokal dan menjadi mitra terbaik bagi para Chef.',
    url: 'https://novio-web.vercel.app/about',
    images: ['/about-greenhouse-bg.jpg'],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
