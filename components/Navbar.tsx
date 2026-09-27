'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navItems, siteConfig } from '@/data/site';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useSiteData } from '@/context/SiteDataContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isEditMode, isPreviewMode } = useSiteData();
  const showEditBar = isEditMode && !isPreviewMode;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (pathname === '/admin/customize') {
    return null;
  }

  return (
    <header
      className={`fixed ${showEditBar ? 'top-[42px]' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-forest/98 backdrop-blur-md shadow-lg border-b border-sage/20 py-3 text-softwhite'
          : 'bg-forest/95 backdrop-blur-md py-3.5 sm:py-4 text-softwhite border-b border-white/10 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="notranslate group flex items-center gap-2.5 text-decoration-none focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          aria-label="NOVIO Home"
          translate="no"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shadow-sm border border-sage/40 shrink-0 group-hover:scale-105 group-hover:border-sage transition-all">
            <Image
              src="/novio-logo.png"
              alt="Logo NOVIO"
              fill
              sizes="36px"
              priority
              className="object-contain"
            />
          </div>
          <span className="notranslate font-serif text-2xl font-bold tracking-widest text-softwhite group-hover:text-sage transition-colors" translate="no">
            NOVIO
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-sage group-hover:bg-emerald-300 inline-block transition-colors animate-pulse"></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 lg:space-x-8" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
                  isActive
                    ? 'text-sage font-bold'
                    : 'text-cream/90 hover:text-softwhite'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sage rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Language Switcher */}
          <LanguageSwitcher />

          <a
            href={`https://wa.me/${siteConfig.whatsappTarget}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shine-hover inline-flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-bold uppercase tracking-wider bg-garden hover:bg-garden-light text-softwhite transition-all shadow-md hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-garden"
          >
            <span>WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded text-cream hover:text-softwhite focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            aria-label={isMobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-forest/98 backdrop-blur-xl border-t border-forest-light px-6 py-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4 max-h-[calc(100vh-80px)] overflow-y-auto shadow-2xl">
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-base font-medium tracking-wide uppercase py-2 border-b border-forest-light/40 transition-colors ${
                    isActive ? 'text-sage font-semibold' : 'text-cream hover:text-softwhite'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Language Switcher */}
            <LanguageSwitcher variant="mobile" />

            <a
              href={`https://wa.me/${siteConfig.whatsappTarget}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 w-full py-3 rounded bg-garden text-softwhite font-medium text-sm tracking-wider uppercase"
            >
              <span>Hubungi via WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
