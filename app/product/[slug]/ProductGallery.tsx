'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SpecimenHotspot from '@/components/SpecimenHotspot';
import { Sparkles, Eye } from 'lucide-react';

interface HotspotItem {
  x: number;
  y: number;
  title: string;
  description: string;
}

interface ProductGalleryProps {
  images: string[];
  name: string;
  hotspots?: HotspotItem[];
}

export default function ProductGallery({ images, name, hotspots }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [inspectMode, setInspectMode] = useState<boolean>(true);

  const activeImage = images[selectedIndex] || images[0];
  const hasHotspots = hotspots && hotspots.length > 0 && selectedIndex === 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image Container */}
      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-cream border border-sage/40 shadow-sm group">
        <Image
          src={activeImage}
          alt={`${name} - Main View`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover object-center transition-all duration-500"
        />

        {/* Botanical Hotspots Layer (visible on primary image) */}
        {hasHotspots && (
          <SpecimenHotspot hotspots={hotspots} enabled={inspectMode} />
        )}

        {/* Anatomy Inspection Toggle Button */}
        {hasHotspots && (
          <button
            type="button"
            onClick={() => setInspectMode(!inspectMode)}
            className={`absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md transition-all ${
              inspectMode
                ? 'bg-forest/90 text-softwhite border border-garden/50 shadow-md ring-2 ring-garden/20'
                : 'bg-softwhite/80 hover:bg-softwhite text-charcoal border border-sage/40'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${inspectMode ? 'text-sage' : 'text-garden'}`} />
            <span>{inspectMode ? 'Anatomy Mode: On' : 'Inspect Anatomy'}</span>
          </button>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => {
            const isCurrent = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  isCurrent
                    ? 'border-garden ring-2 ring-garden/20 scale-95'
                    : 'border-sage/40 hover:border-garden/60 opacity-75 hover:opacity-100'
                }`}
                aria-label={`View photo ${idx + 1} of ${name}`}
              >
                <Image
                  src={img}
                  alt={`${name} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
