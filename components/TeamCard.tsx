import React from 'react';
import Image from 'next/image';
import { TeamMember } from '@/types';

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="group bg-softwhite rounded-lg overflow-hidden border border-sage/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
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
