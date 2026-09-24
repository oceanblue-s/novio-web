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
    <div className="group bg-softwhite rounded-lg overflow-hidden border border-sage/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative">
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
          </button>
        </div>
      )}

      {/* Photo Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover object-center group-hover:scale-105 transition-all duration-500 ease-out"
        />
      </div>

      {/* Member Details */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-softwhite">
        <div>
          <p className="text-[11px] font-semibold text-garden uppercase tracking-wider mb-1">
            {member.role}
          </p>
          <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
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
