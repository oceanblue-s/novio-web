'use client';

import React from 'react';
import { Office } from '@/types';
import { MapPin, Navigation } from 'lucide-react';

interface GoogleMapProps {
  activeOffice: Office;
  offices: Office[];
  onSelectOffice: (office: Office) => void;
}

export default function GoogleMap({
  activeOffice,
  offices,
  onSelectOffice,
}: GoogleMapProps) {
  return (
    <div className="bg-softwhite rounded-xl overflow-hidden border border-sage/40 shadow-sm">
      {/* Map Header / Location Switcher */}
      <div className="p-4 sm:p-6 bg-cream flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sage/30">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-garden" />
          <div>
            <h4 className="font-serif text-lg font-medium text-charcoal">
              {activeOffice.name}
            </h4>
            <p className="text-xs text-charcoal/70 line-clamp-1">{activeOffice.address}</p>
          </div>
        </div>

        {/* Office Switcher Tabs */}
        <div className="flex items-center bg-softwhite rounded-lg p-1 border border-sage/30">
          {offices.map((office) => {
            const isActive = office.id === activeOffice.id;
            return (
              <button
                key={office.id}
                type="button"
                onClick={() => onSelectOffice(office)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  isActive
                    ? 'bg-forest text-softwhite shadow-xs'
                    : 'text-charcoal hover:text-garden'
                }`}
              >
                {office.name.replace(' Office', '')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Iframe */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-cream/50">
        <iframe
          src={activeOffice.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Peta Google Maps untuk ${activeOffice.name}`}
          className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        />

        {/* Quick directions floating button */}
        <div className="absolute bottom-4 right-4 z-10">
          <a
            href={activeOffice.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-forest text-softwhite text-xs font-medium uppercase tracking-wider shadow-lg hover:bg-forest-light transition-all backdrop-blur-sm"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Petunjuk Arah</span>
          </a>
        </div>
      </div>
    </div>
  );
}
