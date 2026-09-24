import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientAudioToggle from '@/components/AmbientAudioToggle';
import WhatsAppBubble from '@/components/WhatsAppBubble';
import GoogleTranslateScript from '@/components/GoogleTranslateScript';
import { LiveCustomizerProvider } from '@/context/LiveCustomizerContext';
import { SiteDataProvider } from '@/context/SiteDataContext';
import VisualEditBar from '@/components/VisualEditBar';
import { ChefCurationProvider } from '@/context/ChefCurationContext';
import ChefCurationDrawer from '@/components/ChefCurationDrawer';
import CommandPalette from '@/components/CommandPalette';
import ProductQuickViewModal from '@/components/ProductQuickViewModal';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#183C2B',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://novio.vercel.app'),
  title: {
    default: 'NOVIO — Komponen Kuliner Alami × Hasil Tani Artisan Indonesia',
    template: '%s | NOVIO',
  },
  description:
    'Menghadirkan bahan kuliner alami bermutu tinggi dari kebun petani lokal untuk para chef profesional dan penikmat kuliner di seluruh Indonesia. Berbasis di Parongpong Bandung Barat dan Nusa Dua Bali.',
  keywords: [
    'NOVIO',
    'PT Novio Berkah Bersaudara',
    'Komponen Kuliner Alami',
    'Bahan Kuliner Alami Indonesia',
    'Hasil Tani Artisan',
    'Tisane Herbal Alami',
    'Cuka Fermentasi Alami',
    'Artisanal Vinegar',
    'Microgreens Segar Bandung',
    'Edible Flowers Indonesia',
    'Bunga Konsumsi Organik',
    'Sayuran Spesial Chef',
    'Madu Hutan Murni Alami',
    'Daun Muda Baby Leaf',
    'Tanaman Herbal Hidup Pot',
    'Mitra Chef Indonesia',
    'Petani Lokal Parongpong',
    'Nusa Dua Bali',
  ],
  authors: [{ name: 'PT. Novio Berkah Bersaudara', url: 'https://novio.vercel.app' }],
  creator: 'PT. Novio Berkah Bersaudara',
  publisher: 'NOVIO',
  alternates: {
    canonical: 'https://novio.vercel.app',
  },
  icons: {
    icon: '/novio-logo.png',
    shortcut: '/novio-logo.png',
    apple: '/novio-logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://novio.vercel.app',
    siteName: 'NOVIO',
    title: 'NOVIO — Komponen Kuliner Alami × Hasil Tani Artisan Indonesia',
    description:
      'Menghadirkan bahan kuliner alami bermutu tinggi dari kebun petani lokal untuk para chef profesional dan penikmat kuliner di seluruh Indonesia.',
    images: [
      {
        url: '/about-greenhouse-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'NOVIO — Komponen Kuliner Alami & Tani Artisan Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOVIO — Komponen Kuliner Alami × Hasil Tani Artisan Indonesia',
    description:
      'Menghadirkan bahan kuliner alami bermutu tinggi dari kebun petani lokal untuk para chef profesional di seluruh Indonesia.',
    images: ['/about-greenhouse-bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PT. Novio Berkah Bersaudara',
    alternateName: 'NOVIO',
    url: 'https://novio.vercel.app',
    logo: 'https://novio.vercel.app/novio-logo.png',
    description:
      'Penyedia komponen kuliner alami dan hasil tani artisan Indonesia untuk para chef profesional, hotel, restoran, dan penikmat kuliner.',
    foundingLocation: 'Demak, Jawa Tengah, Indonesia',
    founders: [
      { '@type': 'Person', name: 'Nunik Saraswati' },
      { '@type': 'Person', name: 'Retno' },
      { '@type': 'Person', name: 'Danang' },
    ],
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Ciwarega, Karyawangi, Kec. Parongpong',
        addressLocality: 'Bandung Barat',
        addressRegion: 'Jawa Barat',
        postalCode: '40559',
        addressCountry: 'ID',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Jl Kedaung G 5 Menesa Nusa Dua',
        addressLocality: 'Badung',
        addressRegion: 'Bali',
        postalCode: '80363',
        addressCountry: 'ID',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+62-813-1241-4863',
        contactType: 'customer support',
        availableLanguage: ['Indonesian', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+62-811-2906-792',
        contactType: 'chef partnership & sales',
        availableLanguage: ['Indonesian', 'English'],
      },
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NOVIO',
    url: 'https://novio.vercel.app',
    description: 'Komponen Kuliner Alami × Hasil Tani Artisan Indonesia',
    inLanguage: 'id-ID',
    publisher: {
      '@type': 'Organization',
      name: 'PT. Novio Berkah Bersaudara',
    },
  };

  return (
    <html lang="id" className={`${playfair.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-softwhite text-charcoal selection:bg-sage/40 selection:text-forest">
        <LiveCustomizerProvider>
          <SiteDataProvider>
            <VisualEditBar />
            <ChefCurationProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <WhatsAppBubble />
              <ChefCurationDrawer />
              <CommandPalette />
              <ProductQuickViewModal />
              <AmbientAudioToggle />
              <GoogleTranslateScript />
            </ChefCurationProvider>
          </SiteDataProvider>
        </LiveCustomizerProvider>
      </body>
    </html>
  );
}
