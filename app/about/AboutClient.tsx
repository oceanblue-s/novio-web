'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import { useLiveCustomizer } from '@/context/LiveCustomizerContext';
import { ArrowRight, ShieldCheck, HeartHandshake, Sparkles, Users } from 'lucide-react';

export default function AboutClient() {
  const { settings } = useLiveCustomizer();

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero */}
      <Hero
        title={settings?.about?.heroTitle || 'Kisah Perjalanan & Misi Kami'}
        subtitle={
          settings?.about?.heroSubtitle ||
          'Menjadi berkat bagi sesama dengan menjadi mitra terbaik bagi para Chef di seluruh Indonesia.'
        }
        badge="Tentang Novio"
        imageSrc="/about-greenhouse-bg.jpg"
        imageAlt="Kebun Pembibitan dan Budidaya Novio di Dataran Tinggi Parongpong"
      />

      {/* 2. Concise Intro: Origin in Demak */}
      <section className="py-20 px-6 sm:px-8 bg-softwhite">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-garden bg-cream px-3 py-1 rounded-full border border-sage/40 inline-block mb-4">
            Akar Perjalanan Kami
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal tracking-tight leading-tight mb-8">
            {settings?.about?.originTitle ||
              'Lahir dari cinta pada tanah pertanian, tumbuh untuk menghubungkan petani dengan para chef terbaik.'}
          </h2>
          <p className="text-charcoal/80 text-lg sm:text-xl leading-relaxed font-light mb-6">
            {settings?.about?.originParagraph1 ||
              'Nunik, Retno, dan Danang lahir di sebuah desa kecil di Demak. Kami tumbuh besar menyaksikan langsung bagaimana kedua orang tua kami berjuang tanpa lelah sebagai petani. Pertanian bukanlah jalan yang mudah, tetapi di dalam hati kami yang paling dalam, kami menyadari bahwa bertani adalah bagian tak terpisahkan dari jati diri kami.'}
          </p>
          <p className="text-charcoal/70 text-base sm:text-lg leading-relaxed font-light">
            {settings?.about?.originParagraph2 ||
              'Hari ini, Novio Bali dan Novio Bandung bukan sekadar kegiatan bisnis biasa. Keduanya adalah tentang keluarga kami, jejak perjalanan hidup kami, dan harapan tulus kami untuk masa depan yang lebih cerah bagi para petani lokal Indonesia.'}
          </p>
        </div>
      </section>

      {/* 3. The Problem & Big Opportunity (Hospitality to Artisan Farming) */}
      <section className="py-24 px-6 sm:px-8 bg-cream border-y border-sage/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Left */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-earth">
                Tantangan & Peluang Nyata
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal leading-tight">
                {settings?.about?.opportunityTitle ||
                  'Menjembatani bahan artisan berkualitas tinggi langsung dari petani ke dapur para chef.'}
              </h3>
              <p className="text-charcoal/80 text-base sm:text-lg leading-relaxed">
                {settings?.about?.opportunityParagraph1 ||
                  'Kakak tertua kami, Nunik, tidak langsung menjadi petani. Beliau mengawali kariernya di industri perhotelan dan kuliner (hospitality), berpindah ke berbagai daerah. Di sana, beliau menemukan fakta yang mengejutkan: para chef profesional kerap kesulitan menemukan bahan artisan segar dan bermutu tinggi yang konsisten dari petani lokal.'}
              </p>
              <p className="text-charcoal/70 text-base leading-relaxed">
                {settings?.about?.opportunityParagraph2 ||
                  'Dari pengalaman tersebut, Nunik melihat sebuah peluang mulia yang sangat besar. Beliau menyadari bahwa bertani bukan sekadar tentang bertahan hidup—bertani bisa menjadi sebuah seni berharga, jalan terhormat untuk menciptakan produk berkualitas istimewa bagi para chef terkemuka di tanah air.'}
              </p>
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-garden">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Kualitas Artisan Sesuai Standar Dapur Profesional</span>
                </div>
              </div>
            </div>

            {/* Photo Right */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-sage/40">
                <Image
                  src="/highland-provenance-processing.jpg"
                  alt="Fasilitas pengolahan hasil panen dan pengemasan higienis Parongpong"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-softwhite">
                  <p className="text-xs uppercase tracking-widest text-sage mb-0.5">
                    Kebun & Pascapanen Bandung
                  </p>
                  <p className="font-serif text-sm text-cream">
                    Kombinasi tanah subur, iklim sejuk Parongpong, dan seleksi teliti untuk dapur profesional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Break The Unfair: Legalized as PT & Dedicated Siblings */}
      <section className="py-24 px-6 sm:px-8 bg-softwhite">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Photo Left */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-sage/40">
                <Image
                  src="/botanical-dehydrator-processing.jpg"
                  alt="Pengolahan dan dehidrasi botani higienis Novio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text Right */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-garden">
                Memutus Rantai Tidak Adil • Menjadi PT Resmi
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal leading-tight">
                Membangun usaha dari nol untuk kesejahteraan petani yang berkeadilan.
              </h3>
              <p className="text-charcoal/80 text-base sm:text-lg leading-relaxed">
                Akhirnya, Nunik memutuskan pulang dan memulai usaha dari nol. Bersama Retno, kami membangun usaha pertanian artisan di Bali dan kemudian mengembangkannya di Bandung. Berbekal sumber daya yang terbatas, kami memulai perjuangan berat untuk memutus rantai distribusi yang tidak adil (tengkulak) yang selama bertahun-tahun merugikan petani.
              </p>
              <p className="text-charcoal/70 text-base leading-relaxed">
                Sebagai bukti komitmen kuat kami untuk mendampingi para chef dan merangkul petani secara transparan, kami melegalkan usaha kami menjadi Perseroan Terbatas (PT. Novio Berkah Bersaudara). Hal ini menjamin seluruh tata kelola berjalan secara profesional, berstandar tinggi, dan penuh rasa tanggung jawab.
              </p>
              <p className="text-charcoal/70 text-base leading-relaxed">
                Ketika usaha kami mulai berkembang, adik bungsu kami, Danang, turut bergabung. Bersama-sama, kami tidak hanya membangun bisnis, melainkan juga membantu para petani lain memperoleh penghasilan yang jauh lebih adil, layak, dan berkelanjutan.
              </p>
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-garden">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Menjamin Kesejahteraan Finansial yang Berkelanjutan bagi Petani</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Vision & Core Pillars */}
      <section className="py-24 px-6 sm:px-8 bg-cream border-t border-sage/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-garden bg-softwhite px-3 py-1 rounded-full border border-sage/40 inline-block mb-4">
              Visi Luhur Kami
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal tracking-tight leading-tight mb-4">
              Menjadi berkat bagi sesama dengan menjadi mitra terbaik bagi para Chef.
            </h2>
            <p className="text-charcoal/70 text-base sm:text-lg">
              Prinsip yang menuntun setiap keputusan budidaya, riset produk, dan relasi kami dengan komunitas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Box 1: Mitra Terbaik bagi Chef */}
            <div className="p-8 sm:p-10 rounded-2xl bg-softwhite border border-sage/40 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-charcoal">
                Cara Menjadi Mitra Terbaik bagi Chef
              </h3>
              <p className="text-charcoal/80 leading-relaxed text-base">
                Kami menyediakan beraneka ragam produk bermutu tinggi yang memicu kreativitas dan inovasi di industri kuliner, serta berkomitmen menghadirkan layanan yang saling menguntungkan dan terpercaya bagi para mitra profesional maupun pelanggan setia kami.
              </p>
              <ul className="space-y-2 pt-2 text-sm text-charcoal/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                  Kesesuaian spesifikasi ketat untuk kebutuhan dapur hotel, restoran, dan kafe
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                  Pasokan stabil mencakup 11 provinsi di seluruh Indonesia
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                  Inovasi produk fermentasi, tisane, bunga konsumsi, dan sayuran unik
                </li>
              </ul>
            </div>

            {/* Box 2: Berkat bagi Sesama */}
            <div className="p-8 sm:p-10 rounded-2xl bg-softwhite border border-sage/40 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-charcoal">
                Cara Menjadi Berkat bagi Sesama
              </h3>
              <p className="text-charcoal/80 leading-relaxed text-base">
                Kami memberdayakan sumber daya manusia dalam aspek kesejahteraan fisik, mental, emosional, dan spiritual. Kami bertekad memberi dampak positif bagi masyarakat sekitar dan senantiasa mendukung kelestarian ekosistem lingkungan yang hijau.
              </p>
              <ul className="space-y-2 pt-2 text-sm text-charcoal/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                  Pembinaan kesejahteraan holistik bagi petani mitra dan staf kerja kami
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                  Praktik pertanian bebas bahan kimia perusak tanah untuk masa depan bumi
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest" />
                  Dukungan ekonomi riil bagi komunitas pedesaan dan keluarga petani
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-20 px-6 sm:px-8 bg-softwhite border-t border-sage/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal mb-4">
            Mari Bersama Mendukung Petani Lokal Indonesia
          </h2>
          <p className="text-charcoal/70 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Jelajahi portofolio bahan kuliner artisan kami, atau hubungi tim kami di Bandung Barat dan Bali untuk peluang kerja sama pasokan dapur Anda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/product"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-forest hover:bg-forest-light text-softwhite font-medium text-sm tracking-wider uppercase transition-colors"
            >
              <span>Jelajahi Produk Kami</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-cream hover:bg-cream-dark text-charcoal font-medium text-sm tracking-wider uppercase border border-sage/40 transition-colors"
            >
              <span>Hubungi Novio</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
