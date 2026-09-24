'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronsLeftRight, Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string; // e.g. "aspect-[16/10]", "aspect-[4/3]", "aspect-[16/9]"
  className?: string;
  priority?: boolean;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Sebelum: Ruang Kosong',
  afterLabel = 'Sesudah: Ruang Hijau NOVIO',
  aspectRatio = 'aspect-[16/10]',
  className = '',
  priority = false,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-xl border border-sage/40 shadow-lg group focus:outline-none focus:ring-2 focus:ring-garden ${aspectRatio} ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Perbandingan interaktif ruangan sebelum dan sesudah kurasi botani"
      style={{ touchAction: 'none' }}
    >
      {/* 1. Underlying "Before" Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          className="object-cover object-center"
          priority={priority}
        />
        {/* Before Label Badge */}
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
          <span className="bg-charcoal/80 backdrop-blur-md text-softwhite/90 text-xs tracking-wider uppercase font-medium px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
            {beforeLabel}
          </span>
        </div>
      </div>

      {/* 2. Top "After" Image with Clip-Path */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          clipPath: `inset(0 ${(100 - sliderPosition).toFixed(2)}% 0 0)`,
        }}
      >
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          className="object-cover object-center"
          priority={priority}
        />
        {/* After Label Badge */}
        <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-forest/90 backdrop-blur-md text-cream text-xs tracking-wider uppercase font-medium px-3.5 py-1.5 rounded-full border border-sage/40 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-sage" />
            <span>{afterLabel}</span>
          </span>
        </div>
      </div>

      {/* 3. Divider Line & Drag Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-softwhite/90 shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none transition-transform"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Button */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-forest text-softwhite border-2 border-softwhite shadow-xl flex items-center justify-center cursor-ew-resize group-hover:scale-105 group-hover:bg-garden transition-all">
          <ChevronsLeftRight className="w-5 h-5 text-softwhite" />
        </div>
      </div>

      {/* Hint on hover */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="bg-charcoal/70 backdrop-blur-sm text-softwhite/90 text-[11px] tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-white/10">
          Geser untuk membandingkan
        </span>
      </div>
    </div>
  );
}
