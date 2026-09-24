import React from 'react';
import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  imageSrc: string;
  imageAlt?: string;
  isHome?: boolean;
  children?: React.ReactNode;
}

export default function Hero({
  title,
  subtitle,
  badge,
  imageSrc,
  imageAlt = 'Novio Botanical Environment',
  isHome = false,
  children,
}: HeroProps) {
  return (
    <section
      className={`relative w-full overflow-hidden flex items-center justify-center text-center ${
        isHome ? 'min-h-[88vh] sm:min-h-[92vh]' : 'min-h-[50vh] sm:min-h-[56vh] pt-24 pb-16'
      }`}
    >
      {/* Background Image with Next/Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Subtle Dark-Green Overlay for optimal text legibility */}
        <div className="absolute inset-0 bg-forest/65 backdrop-contrast-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 py-16 text-softwhite flex flex-col items-center">
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest/60 border border-sage/40 text-sage text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            <span>{badge}</span>
          </div>
        )}

        <h1
          className={`font-serif tracking-tight text-softwhite mb-6 text-balance ${
            isHome
              ? 'text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider'
              : 'text-3xl sm:text-5xl md:text-6xl font-semibold'
          }`}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className={`text-cream/90 font-normal leading-relaxed text-balance max-w-2xl ${
              isHome ? 'text-lg sm:text-xl md:text-2xl' : 'text-base sm:text-lg'
            }`}
          >
            {subtitle}
          </p>
        )}

        {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-4">{children}</div>}
      </div>
    </section>
  );
}
