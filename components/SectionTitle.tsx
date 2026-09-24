import React from 'react';
import { Sprout } from 'lucide-react';

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
}: SectionTitleProps) {
  const isDark = theme === 'dark';
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={`flex flex-col max-w-3xl mb-10 sm:mb-14 ${alignClasses}`}>
      {label && (
        <div className="flex items-center gap-1.5 mb-3.5">
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-xs ${
              isDark
                ? 'text-sage bg-forest-light/70 border border-sage/30'
                : 'text-forest bg-cream/90 border border-sage/40'
            }`}
          >
            <Sprout className="w-3.5 h-3.5 text-garden shrink-0" />
            <span>{label}</span>
          </span>
        </div>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-balance leading-tight ${
          isDark ? 'text-softwhite' : 'text-charcoal'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm sm:text-base md:text-lg leading-relaxed text-balance font-light ${
            isDark ? 'text-cream/85' : 'text-charcoal/75'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
