'use client';

import React from 'react';
import Image from 'next/image';
import { TeamMember } from '@/types';
import { Pencil, Trash2 } from 'lucide-react';
import { useSiteData } from '@/context/SiteDataContext';

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  const { isEditMode, isPreviewMode, openEditTeam, deleteTeamMember } = useSiteData();

  return (
    <div className="group card-hover-lift bg-softwhite rounded-xl overflow-hidden border border-sage/30 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col relative">
      {/* Visual In-Context Edit Action Buttons (Admin Only) */}
      {isEditMode && !isPreviewMode && (
        <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 bg-forest/95 backdrop-blur-md p-1.5 rounded-lg border border-sage/50 shadow-xl">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openEditTeam(member);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cream hover:bg-softwhite text-forest text-xs font-bold transition-all shadow-xs"
            title="Edit Anggota Tim"
          >
            <Pencil className="w-3.5 h-3.5 text-garden" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (window.confirm(`Yakin ingin menghapus ${member.name}?`)) {
                deleteTeamMember(member.id);
              }
            }}
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-xs"
            title="Hapus Anggota Tim"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus</span>
          </button>
        </div>
      )}

      {/* Photo Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
        <Image
          src={member.photo || '/about-greenhouse-bg.jpg'}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
          unoptimized={typeof member.photo === 'string' && (member.photo.startsWith('data:') || member.photo.startsWith('http'))}
          className="object-cover object-center group-hover:scale-108 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Member Details */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-softwhite border-t border-sage/10">
        <div>
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold text-forest bg-sage/30 uppercase tracking-widest mb-2">
            {member.role}
          </span>
          <h3 className="font-serif text-lg font-medium text-charcoal group-hover:text-garden transition-colors mb-2">
            {member.name}
          </h3>
          <p className="text-xs text-charcoal/70 leading-relaxed">
            {member.shortBio}
          </p>
        </div>
      </div>
    </div>
  );
}
