import React from 'react';
import type { Metadata } from 'next';
import CustomizerClient from './CustomizerClient';

export const metadata: Metadata = {
  title: 'Studio Sesuaikan Website (Visual Editor) | NOVIO',
  description: 'Sesuaikan tampilan, teks filosofi, kontak, dan konten website NOVIO secara visual real-time.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CustomizePage() {
  return <CustomizerClient />;
}
