'use client';

import React from 'react';
import Image from 'next/image';
import { useLiveCustomizer } from '@/context/LiveCustomizerContext';
import { Award, Leaf, ShieldCheck, Sun, Sprout, HeartHandshake, Pencil } from 'lucide-react';
import { useSiteData } from '@/context/SiteDataContext';

export default function HomeCommitmentClient() {
  const { settings } = useLiveCustomizer();
  const { isEditMode, isPreviewMode, openEditCommitment } = useSiteData();

  return (
    <section className="py-24 px-6 sm:px-8 bg-cream border-y border-sage/30 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-garden bg-softwhite px-3 py-1 rounded-full border border-sage/40 inline-block">
                {settings?.home?.commitmentBadge || 'Komitmen Nyata Kami'}
              </span>
              {isEditMode && !isPreviewMode && (
                <button
                  type="button"
                  onClick={openEditCommitment}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest text-cream hover:text-softwhite text-xs font-bold uppercase tracking-wider border border-sage/40 shadow-sm transition-all hover:scale-105"
                  title="Edit Filosofi & 6 Pilar"
                >
                  <Pencil className="w-3.5 h-3.5 text-garden" />
                  <span>Edit Filosofi &amp; 6 Pilar</span>
                </button>
              )}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal tracking-tight leading-tight mb-6">
              {settings?.home?.commitmentTitle ||
                'Dibudidayakan dengan rasa hormat pada alam, dipandu oleh integritas ekologis.'}
            </h2>
            <p className="text-charcoal/80 text-base sm:text-lg leading-relaxed mb-6">
              {settings?.home?.commitmentParagraph1 ||
                'Novio, kami tidak sekadar menghadirkan tanaman. Kami mengkurasi organisme hidup yang siap beradaptasi dan tumbuh subur di ruang hunian modern. Setiap spesimen yang dirawat di kebun dataran tinggi Parongpong kami diaklimatisasi menggunakan substrat vulkanik organik, aerasi alami, dan perhatian penuh ketulusan.'}
            </p>
            {settings?.home?.commitmentParagraph2 && (
              <p className="text-charcoal/70 text-base leading-relaxed mb-8">
                {settings.home.commitmentParagraph2}
              </p>
            )}

            {/* Detail Komitmen Kualitas & Keberlanjutan (6 Pilar dari PDF) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-sage/40">
              {/* Pilar 1 */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-medium text-charcoal text-base">
                  {settings?.home?.pillar1Title || 'Kualitas Utama'}
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  {settings?.home?.pillar1Desc ||
                    'Mengutamakan bahan segar bermutu tinggi langsung dari petani lokal demi keunggulan kuliner para chef.'}
                </p>
              </div>

              {/* Pilar 2 */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                  <Leaf className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-medium text-charcoal text-base">
                  {settings?.home?.pillar2Title || 'Praktik Berkelanjutan'}
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  {settings?.home?.pillar2Desc ||
                    'Metode produksi ramah lingkungan alami yang memberi manfaat jangka panjang bagi petani dan chef.'}
                </p>
              </div>

              {/* Pilar 3 */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-medium text-charcoal text-base">
                  {settings?.home?.pillar3Title || 'Jaminan Kualitas'}
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  {settings?.home?.pillar3Desc ||
                    'Perhatian cermat pada setiap detail menjamin standar kebersihan dan mutu tertinggi dari kebun ke meja saji.'}
                </p>
              </div>

              {/* Pilar 4 */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                  <Sun className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-medium text-charcoal text-base">
                  {settings?.home?.pillar4Title || 'Jangkauan 11 Provinsi'}
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  {settings?.home?.pillar4Desc ||
                    'Menjangkau para chef di berbagai kota di 11 provinsi Indonesia dengan rantai pasok yang andal dan terjaga.'}
                </p>
              </div>

              {/* Pilar 5 */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                  <Sprout className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-medium text-charcoal text-base">
                  {settings?.home?.pillar5Title || 'Produk Inovatif'}
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  {settings?.home?.pillar5Desc ||
                    'Portofolio beragam dari sayuran spesial unik hingga saus fermentasi artisan yang memicu kreativitas kuliner.'}
                </p>
              </div>

              {/* Pilar 6 */}
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-medium text-charcoal text-base">
                  {settings?.home?.pillar6Title || 'Dampak Komunitas'}
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  {settings?.home?.pillar6Desc ||
                    'Misi nyata mengangkat komunitas melalui dukungan pertanian lokal dan pertumbuhan ekonomi petani yang berkeadilan.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Editorial Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-sage/40">
              <Image
                src={settings?.home?.commitmentImage || '/commitment-flora.jpg'}
                alt="Novio Botanical Parongpong Highland Blooms"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-softwhite">
                <p className="text-xs uppercase tracking-widest text-sage mb-1">
                  Fasilitas Budidaya Parongpong
                </p>
                <p className="font-serif text-lg text-cream">
                  Kabut vulkanik dan siklus pencahayaan alami di ketinggian 1.250 mdpl.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
