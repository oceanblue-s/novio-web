import React from 'react';
import type { Metadata } from 'next';
import AdminClient from './AdminClient';

export const metadata: Metadata = {
  title: 'Portal Pengelola & Manajemen Konten | NOVIO',
  description: 'Portal internal pengelola produk, artikel, dan pengaturan website NOVIO.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
