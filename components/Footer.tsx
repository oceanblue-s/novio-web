import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, navItems, offices } from '@/data/site';
import { Mail, Phone, MapPin, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest text-cream/90 pt-16 pb-12 border-t border-forest-light">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
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
          <div>
            <h3 className="font-serif text-lg font-semibold text-softwhite mb-4 tracking-wide">
              Kantor Pusat Bandung
            </h3>
            <div className="space-y-3 text-sm text-cream/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sage shrink-0 mt-1" />
                <p className="leading-relaxed">
                  Ciwarega, Karyawangi, Kec. Parongpong, Kabupaten Bandung Barat, Jawa Barat 40559
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sage shrink-0" />
                <a
                  href="tel:081312414863"
                  className="hover:text-softwhite transition-colors"
                >
                  0813 1241 4863
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sage shrink-0" />
                <a
                  href="mailto:novio.customercare@gmail.com"
                  className="hover:text-softwhite transition-colors break-all"
                >
                  novio.customercare@gmail.com
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
                  Jl Kedaung G 5 menesa nusa dua, Badung, Bali, Indonesia 80363
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sage shrink-0" />
                <a
                  href="tel:08112906792"
                  className="hover:text-softwhite transition-colors"
                >
                  0811 2906 792
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sage shrink-0" />
                <a
                  href="mailto:nunik@noviotrade.com"
                  className="hover:text-softwhite transition-colors break-all"
                >
                  nunik@noviotrade.com
                </a>
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
