'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig, offices } from '@/data/site';

export interface CustomizerSettings {
  site: {
    name: string;
    tagline: string;
    whatsappTarget: string;
    whatsappBali: string;
    generalEmail: string;
    mainAddress: string;
    baliAddress: string;
  };
  home: {
    heroBadge: string;
    heroHeadline: string;
    heroSubtitle: string;
    heroImage: string;
    ctaWhatsAppText: string;
    commitmentBadge: string;
    commitmentTitle: string;
    commitmentParagraph1: string;
    commitmentParagraph2: string;
    commitmentImage: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
    pillar5Title: string;
    pillar5Desc: string;
    pillar6Title: string;
    pillar6Desc: string;
    ctaHeadline: string;
    ctaSubtitle: string;
  };
  about: {
    heroTitle: string;
    heroSubtitle: string;
    originTitle: string;
    originParagraph1: string;
    originParagraph2: string;
    opportunityTitle: string;
    opportunityParagraph1: string;
    opportunityParagraph2: string;
  };
}

export const defaultCustomizerSettings: CustomizerSettings = {
  site: {
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    whatsappTarget: siteConfig.whatsappTarget,
    whatsappBali: '628112906792',
    generalEmail: siteConfig.generalEmail,
    mainAddress: siteConfig.mainAddress,
    baliAddress: offices[1]?.address || 'Jl Kedaung G 5 menesa nusa dua, Badung, Bali',
  },
  home: {
    heroBadge: 'Komponen Kuliner Alami × Hasil Tani Artisan',
    heroHeadline: 'Dua Suaka Botani Indonesia: Parongpong & Nusa Dua',
    heroSubtitle:
      'Dari kabut sejuk lereng gunung vulkanik Parongpong Bandung hingga keteduhan asri Nusa Dua Bali. Kami membudidayakan dan mengkurasi bahan kuliner alami bermutu tinggi bagi para chef profesional.',
    heroImage: '/about-greenhouse-bg.jpg',
    ctaWhatsAppText: 'Konsultasi Pasokan via WhatsApp',
    commitmentBadge: 'Komitmen Nyata Kami',
    commitmentTitle: 'Dibudidayakan dengan rasa hormat pada alam, dipandu oleh integritas ekologis.',
    commitmentParagraph1:
      'Novio, kami tidak sekadar menghadirkan tanaman. Kami mengkurasi organisme hidup yang siap beradaptasi dan tumbuh subur di ruang hunian modern. Setiap spesimen yang dirawat di kebun dataran tinggi Parongpong kami diaklimatisasi menggunakan substrat vulkanik organik, aerasi alami, dan perhatian penuh ketulusan.',
    commitmentParagraph2:
      'Filosofi kami merangkul keanekaragaman hayati, sentuhan keahlian artisan lokal pada setiap wadah tembikar, serta komitmen teguh terhadap budidaya berkelanjutan tanpa pemaksaan bahan kimia sintetis.',
    commitmentImage: '/commitment-flora.jpg',
    pillar1Title: 'Kualitas Utama',
    pillar1Desc: 'Mengutamakan bahan segar bermutu tinggi langsung dari petani lokal demi keunggulan kuliner para chef.',
    pillar2Title: 'Praktik Berkelanjutan',
    pillar2Desc: 'Metode produksi ramah lingkungan alami yang memberi manfaat jangka panjang bagi petani dan chef.',
    pillar3Title: 'Jaminan Kualitas',
    pillar3Desc: 'Perhatian cermat pada setiap detail menjamin standar kebersihan dan mutu tertinggi dari kebun ke meja saji.',
    pillar4Title: 'Jangkauan 11 Provinsi',
    pillar4Desc: 'Menjangkau para chef di berbagai kota di 11 provinsi Indonesia dengan rantai pasok yang andal dan terjaga.',
    pillar5Title: 'Produk Inovatif',
    pillar5Desc: 'Portofolio beragam dari sayuran spesial unik hingga saus fermentasi artisan yang memicu kreativitas kuliner.',
    pillar6Title: 'Dampak Komunitas',
    pillar6Desc: 'Misi nyata mengangkat komunitas melalui dukungan pertanian lokal dan pertumbuhan ekonomi petani yang berkeadilan.',
    ctaHeadline: 'Memiliki rencana proyek, ruang hijau impian, atau membutuhkan kurasi khusus?',
    ctaSubtitle:
      'Diskusikan langsung bersama direktur botani dan kurator kami di Bandung Barat atau Bali. Kami siap mendampingi pemilihan spesimen, instalasi ruang hijau, hingga panduan perawatan jangka panjang.',
  },
  about: {
    heroTitle: 'Kisah Perjalanan & Misi Kami',
    heroSubtitle: 'Menjadi berkat bagi sesama dengan menjadi mitra terbaik bagi para Chef di seluruh Indonesia.',
    originTitle: 'Lahir dari cinta pada tanah pertanian, tumbuh untuk menghubungkan petani dengan para chef terbaik.',
    originParagraph1:
      'Nunik, Retno, dan Danang lahir di sebuah desa kecil di Demak. Kami tumbuh besar menyaksikan langsung bagaimana kedua orang tua kami berjuang tanpa lelah sebagai petani. Pertanian bukanlah jalan yang mudah, tetapi di dalam hati kami yang paling dalam, kami menyadari bahwa bertani adalah bagian tak terpisahkan dari jati diri kami.',
    originParagraph2:
      'Hari ini, Novio Bali dan Novio Bandung bukan sekadar kegiatan bisnis biasa. Keduanya adalah tentang keluarga kami, jejak perjalanan hidup kami, dan harapan tulus kami untuk masa depan yang lebih cerah bagi para petani lokal Indonesia.',
    opportunityTitle: 'Menjembatani bahan artisan berkualitas tinggi langsung dari petani ke dapur para chef.',
    opportunityParagraph1:
      'Kakak tertua kami, Nunik, tidak langsung menjadi petani. Beliau mengawali kariernya di industri perhotelan dan kuliner (hospitality), berpindah ke berbagai daerah. Di sana, beliau menemukan fakta yang mengejutkan: para chef profesional kerap kesulitan menemukan bahan artisan segar dan bermutu tinggi yang konsisten dari petani lokal.',
    opportunityParagraph2:
      'Dari pengalaman tersebut, Nunik melihat sebuah peluang mulia yang sangat besar. Beliau menyadari bahwa bertani bukan sekadar tentang bertahan hidup—bertani bisa menjadi sebuah seni berharga, jalan terhormat untuk menciptakan produk berkualitas istimewa bagi para chef terkemuka di tanah air.',
  },
};

export function safeMergeSettings(
  defaults: CustomizerSettings,
  incoming?: Partial<CustomizerSettings> | null
): CustomizerSettings {
  if (!incoming || typeof incoming !== 'object') {
    return defaults;
  }
  return {
    site: {
      ...defaults.site,
      ...(incoming.site && typeof incoming.site === 'object' ? incoming.site : {}),
    },
    home: {
      ...defaults.home,
      ...(incoming.home && typeof incoming.home === 'object' ? incoming.home : {}),
    },
    about: {
      ...defaults.about,
      ...(incoming.about && typeof incoming.about === 'object' ? incoming.about : {}),
    },
  };
}

const STORAGE_CUSTOMIZER_KEY = 'novio_live_customizer_settings_v1';

interface LiveCustomizerContextType {
  settings: CustomizerSettings;
  updateSettings: (newSettings: Partial<CustomizerSettings>) => void;
  resetSettings: () => void;
  isCustomizerActive: boolean;
}

const LiveCustomizerContext = createContext<LiveCustomizerContextType | undefined>(undefined);

export function LiveCustomizerProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<CustomizerSettings>(defaultCustomizerSettings);
  const [isCustomizerActive, setIsCustomizerActive] = useState(false);

  useEffect(() => {
    // 1. Safely load from localStorage with full fallback
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(STORAGE_CUSTOMIZER_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setSettings((prev) => safeMergeSettings(prev, parsed));
        }
      }
    } catch {
      // Storage access blocked or restricted
    }

    // 2. Safely check if inside customizer iframe or parent
    try {
      if (typeof window !== 'undefined') {
        let isIframe = false;
        try {
          isIframe = window.self !== window.top;
        } catch {
          isIframe = true;
        }
        const urlParams = new URLSearchParams(window.location.search);
        if (isIframe || urlParams.get('customizer') === 'true') {
          setIsCustomizerActive(true);
        }
      }
    } catch {
      // Ignore cross-origin frame check error
    }

    // 3. Listen for postMessage from parent customizer window
    const handleMessage = (event: MessageEvent) => {
      try {
        if (
          event.data &&
          typeof event.data === 'object' &&
          event.data.type === 'NOVIO_CUSTOMIZER_UPDATE' &&
          event.data.payload
        ) {
          setSettings((prev) => safeMergeSettings(prev, event.data.payload));
        }
      } catch {
        // Ignore message error
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, []);

  const updateSettings = (newSettings: Partial<CustomizerSettings>) => {
    setSettings((prev) => {
      const merged = safeMergeSettings(prev, newSettings);
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(STORAGE_CUSTOMIZER_KEY, JSON.stringify(merged));
        }
      } catch {}
      return merged;
    });
  };

  const resetSettings = () => {
    setSettings(defaultCustomizerSettings);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(STORAGE_CUSTOMIZER_KEY);
      }
    } catch {}
  };

  return (
    <LiveCustomizerContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        isCustomizerActive,
      }}
    >
      {children}
    </LiveCustomizerContext.Provider>
  );
}

export function useLiveCustomizer(): LiveCustomizerContextType {
  const context = useContext(LiveCustomizerContext);
  if (!context || !context.settings) {
    return {
      settings: defaultCustomizerSettings,
      updateSettings: () => {},
      resetSettings: () => {},
      isCustomizerActive: false,
    };
  }

  // Double-guarantee all sub-objects exist even if partially manipulated
  const safeSettings = safeMergeSettings(defaultCustomizerSettings, context.settings);

  return {
    ...context,
    settings: safeSettings,
  };
}
