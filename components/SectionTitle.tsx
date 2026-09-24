import React from 'react';

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
    <div className={`flex flex-col max-w-3xl mb-12 sm:mb-16 ${alignClasses}`}>
      {label && (
        <span
          className={`text-xs font-semibold tracking-widest uppercase mb-3 px-3 py-1 rounded-full inline-block ${
            isDark
              ? 'text-sage bg-forest-light/60 border border-sage/20'
              : 'text-garden bg-cream border border-sage/30'
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-balance ${
          isDark ? 'text-softwhite' : 'text-charcoal'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed text-balance ${
            isDark ? 'text-cream/80' : 'text-charcoal/80'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
