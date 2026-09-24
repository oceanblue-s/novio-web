'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig, navItems, offices } from '@/data/site';
import { Mail, Phone, MapPin, MessageSquare, ArrowUpRight, Lock, Pencil, Sparkles, CheckCircle2, ShieldCheck, Leaf } from 'lucide-react';
import { useSiteData } from '@/context/SiteDataContext';

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const { customizerSettings, isEditMode, isPreviewMode, openEditContact } = useSiteData();
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  if (pathname === '/admin/customize') {
    return null;
  }

  return (
    <footer className="bg-forest text-cream/90 pt-16 pb-12 border-t border-forest-light relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-garden/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Newsletter / Warta Panen Bar */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-forest-light/40 border border-sage/30 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-sage flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-garden" />
              Warta Panen &amp; Spesimen Baru
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-medium text-softwhite">
              Dapatkan Pembaruan Musim Panen &amp; Riset Kuliner
            </h4>
            <p className="text-xs text-cream/75 leading-relaxed">
              Katalog panen harian, rilis cuka fermentasi terbatas, dan studi kasus penataan botani dikirim langsung ke surel Anda.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full lg:w-auto shrink-0">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Alamat surel chef / tim Anda..."
              className="px-4 py-2.5 rounded-xl bg-forest/80 border border-sage/40 text-softwhite placeholder-cream/40 text-xs focus:outline-none focus:ring-2 focus:ring-sage min-w-[260px]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-garden hover:bg-garden-light text-softwhite font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Terdaftar!</span>
                </>
              ) : (
                <>
                  <span>Berlangganan</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="notranslate inline-flex items-center gap-3 group" translate="no">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm border border-sage/40 shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src="/novio-logo.png"
                  alt="Logo NOVIO"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="notranslate font-serif text-3xl font-bold tracking-widest text-softwhite group-hover:text-sage transition-colors" translate="no">
                NOVIO
              </span>
            </Link>
            <p className="text-sm font-medium tracking-wide text-sage uppercase">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-cream/80 leading-relaxed max-w-sm">
              Menghadirkan bahan kuliner alami bermutu tinggi dari kebun petani lokal untuk para chef profesional dan penikmat kuliner di seluruh Indonesia. Berbasis di Parongpong Bandung dan Nusa Dua Bali.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${siteConfig.whatsappTarget}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase bg-garden hover:bg-garden-light text-softwhite px-4 py-2.5 rounded transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Layanan Pelanggan WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-softwhite mb-4 tracking-wide">
              Navigasi
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-softwhite transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sage/60 group-hover:bg-sage transition-colors"></span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bandung Head Office */}
          <div className="relative">
            {isEditMode && !isPreviewMode && (
              <div className="mb-3">
                <button
                  type="button"
                  onClick={openEditContact}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cream hover:bg-softwhite text-forest text-xs font-bold transition-all shadow-md"
                  title="Edit Kontak & Alamat"
                >
                  <Pencil className="w-3.5 h-3.5 text-garden" />
                  <span>Edit Kontak &amp; Alamat</span>
                </button>
              </div>
            )}
            <h3 className="font-serif text-lg font-semibold text-softwhite mb-4 tracking-wide">
              Kantor Pusat Bandung
            </h3>
            <div className="space-y-3 text-sm text-cream/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sage shrink-0 mt-1" />
                <p className="leading-relaxed">
                  {customizerSettings.site.mainAddress}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sage shrink-0" />
                <a
                  href={`tel:${customizerSettings.site.whatsappTarget}`}
                  className="hover:text-softwhite transition-colors"
                >
                  {customizerSettings.site.whatsappTarget}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sage shrink-0" />
                <a
                  href={`mailto:${customizerSettings.site.generalEmail}`}
                  className="hover:text-softwhite transition-colors break-all"
                >
                  {customizerSettings.site.generalEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Bali Office */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-softwhite mb-4 tracking-wide">
              Kantor Cabang Bali
            </h3>
            <div className="space-y-3 text-sm text-cream/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sage shrink-0 mt-1" />
                <p className="leading-relaxed">
                  {customizerSettings.site.baliAddress}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sage shrink-0" />
                <a
                  href={`tel:${customizerSettings.site.whatsappBali}`}
                  className="hover:text-softwhite transition-colors"
                >
                  {customizerSettings.site.whatsappBali}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sage shrink-0" />
                <a
                  href={`mailto:${customizerSettings.site.generalEmail}`}
                  className="hover:text-softwhite transition-colors break-all"
                >
                  {customizerSettings.site.generalEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quality & Ethics Badges */}
        <div className="pt-8 pb-8 border-t border-forest-light/40 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-cream/80">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-garden shrink-0" />
            <span>100% Organik &amp; Bebas Sintetis</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-garden shrink-0" />
            <span>Standar Mutu Pangan &amp; Horeca</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-garden shrink-0" />
            <span>Fair Trade Petani Jawa &amp; Bali</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-garden shrink-0" />
            <span>Garansi Rantai Dingin 24 Jam</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-forest-light/60 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/60 gap-4">
          <p>
            © {currentYear} NOVIO. Hak cipta dilindungi undang-undang. Alami × Premium × Modern × Botani.
          </p>
          <div className="flex items-center space-x-6">
            <span>Bandung Barat & Bali, Indonesia</span>
            <span>•</span>
            <Link href="/contact" className="hover:text-softwhite transition-colors">
              Kontak & Informasi
            </Link>
            <span>•</span>
            <Link
              href="/admin"
              className="hover:text-softwhite text-cream/40 transition-colors inline-flex items-center gap-1"
              title="Portal Pengelola NOVIO"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
