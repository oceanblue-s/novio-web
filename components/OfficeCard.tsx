import React from 'react';
import { Office } from '@/types';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

interface OfficeCardProps {
  office: Office;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function OfficeCard({ office, isSelected = false, onSelect }: OfficeCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`relative rounded-xl p-8 transition-all duration-300 cursor-pointer border ${
        isSelected
          ? 'bg-softwhite border-garden ring-2 ring-garden/20 shadow-md'
          : 'bg-softwhite/80 border-sage/40 hover:border-garden/60 shadow-sm'
      }`}
    >
      {office.isHeadquarter && (
        <span className="absolute top-6 right-6 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider bg-forest text-softwhite rounded-full">
          Kantor Pusat
        </span>
      )}

      <div className="mb-6">
        <h3 className="font-serif text-2xl font-medium text-charcoal mb-2">
          {office.name}
        </h3>
        <p className="text-xs font-semibold text-garden uppercase tracking-wider">
          {office.isHeadquarter ? 'Suaka Dataran Tinggi Jawa Barat' : 'Perwakilan Tropis Pesisir Bali'}
        </p>
      </div>

      <div className="space-y-4 text-sm text-charcoal/80 mb-8">
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-garden shrink-0 mt-1" />
          <p className="leading-relaxed">{office.address}</p>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-garden shrink-0" />
          <a
            href={`tel:${office.phone.replace(/\s+/g, '')}`}
            className="hover:text-garden transition-colors font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            {office.phone}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-garden shrink-0" />
          <a
            href={`mailto:${office.email}`}
            className="hover:text-garden transition-colors font-medium break-all"
            onClick={(e) => e.stopPropagation()}
          >
            {office.email}
          </a>
        </div>
      </div>

      <div className="pt-4 border-t border-cream-dark flex items-center justify-between">
        <span className="text-xs text-charcoal-muted">
          {isSelected ? 'Sedang Ditampilkan di Peta' : 'Klik untuk Tampilkan di Peta'}
        </span>
        <a
          href={office.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-garden hover:text-forest transition-colors uppercase tracking-wider"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Buka Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
