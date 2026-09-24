'use client';

import React, { useState } from 'react';
import { Sparkles, X, Plus } from 'lucide-react';

interface HotspotItem {
  x: number;
  y: number;
  title: string;
  description: string;
}

interface SpecimenHotspotProps {
  hotspots: HotspotItem[];
  enabled: boolean;
}

export default function SpecimenHotspot({ hotspots, enabled }: SpecimenHotspotProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  if (!enabled || !hotspots || hotspots.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {hotspots.map((spot, idx) => {
        const isActive = activeIdx === idx;

        return (
          <div
            key={idx}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            {/* Pulsing Pin Button */}
            <button
              type="button"
              onClick={() => setActiveIdx(isActive ? null : idx)}
              className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                isActive ? 'scale-110' : 'hover:scale-110'
              }`}
              aria-label={`Inspect botanical feature: ${spot.title}`}
              aria-expanded={isActive}
            >
              {/* Outer Pulse Ring */}
              <span className="absolute inset-0 rounded-full bg-garden/40 animate-ping" />
              {/* Inner Circle */}
              <span
                className={`relative w-7 h-7 rounded-full flex items-center justify-center border-2 border-softwhite shadow-lg transition-colors ${
                  isActive ? 'bg-forest text-softwhite' : 'bg-garden text-softwhite hover:bg-forest'
                }`}
              >
                {isActive ? (
                  <Sparkles className="w-3.5 h-3.5 text-sage" />
                ) : (
                  <Plus className="w-3.5 h-3.5 text-softwhite" />
                )}
              </span>
            </button>

            {/* Popover Callout Card */}
            {isActive && (
              <div
                className={`absolute z-30 w-64 sm:w-72 bg-softwhite/95 backdrop-blur-md rounded-xl p-4 border border-sage/50 shadow-2xl transition-all ${
                  spot.y > 60 ? 'bottom-full mb-3' : 'top-full mt-3'
                } ${spot.x > 50 ? 'right-0 -translate-x-4' : 'left-0 translate-x-4'}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5 border-b border-sage/20 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-garden">
                    <Sparkles className="w-3 h-3 text-garden" />
                    <span>Botanical Callout</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIdx(null);
                    }}
                    className="text-charcoal/50 hover:text-charcoal p-0.5 rounded"
                    aria-label="Close callout"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="font-serif text-base font-medium text-charcoal mb-1 leading-snug">
                  {spot.title}
                </h4>
                <p className="text-xs text-charcoal/80 leading-relaxed">
                  {spot.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
