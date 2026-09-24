import { PortfolioProject } from '@/types';

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'proj-01',
    slug: 'uluwatu-cliffside-sanctuary',
    title: 'Sanctuary Pesisir Tebing Uluwatu',
    subtitle: 'Integrasi biofilik tepi laut untuk vila privat mewah di Uluwatu.',
    clientCategory: 'Perhotelan Mewah',
    location: 'Uluwatu, Bali',
    year: '2025',
    coverImage: '/luxury-hospitality-lab.jpg',
    gallery: [
      '/luxury-hospitality-lab.jpg',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    ],
    beforeImage: '/compare-before-flora.jpg',
    afterImage: '/compare-after-flora.jpg',
    beforeLabel: 'Budidaya: Pembibitan Spesimen NOVIO',
    afterLabel: 'Panen: Hasil Tani & Flora Segar NOVIO',
    excerpt:
      'Mentransformasi area vila menjadi ruang peristirahatan botani yang asri, tahan terhadap hembusan angin pesisir dan paparan sinar matahari tropis.',
    challenge:
      'Properti ini menghadapi hembusan angin laut kencang dengan kadar garam tinggi serta paparan terik matahari sore. Tanaman hias biasa cepat mengering dan layu, sehingga teras batu kapur yang luas dan paviliun berplafon tinggi terasa kaku, gersang, dan bersuhu panas.',
    solution:
      'Studio hortikultura Bali kami mengaklimatisasi tanaman spesimen tahan kondisi pesisir maritim dari nursery Nusa Dua. Kami membentuk mikroklimat bertingkat: kanopi tinggi Ficus Lyrata untuk peneduh lembut, Philodendron Bipinnatifidum berdaun kokoh sebagai penahan angin, serta pot terakota vulkanik artisan dengan media tanam berpori dan aerasi alami.',
    curatedSpecimens: [
      'Ficus Lyrata Grandis',
      'Philodendron Bipinnatifidum',
      'Monstera Deliciosa Heritage',
      'Rhapis Excelsa Coastal',
    ],
    specs: {
      'Cakupan Proyek': 'Paviliun Hunian Interior & Teras Menghadap Laut',
      'Luas Area': '380 m²',
      'Mikroklimat': 'Paparan UV tinggi, hembusan angin laut tropis lembap',
      'Material Wadah': 'Pot Terakota Buatan Tangan & Batu Basal Vulkanik',
      'Layanan Perawatan': 'Konsinyasi Perawatan Botani Berkala Dua Mingguan',
    },
    testimonial: {
      quote:
        'NOVIO mentransformasi paviliun batu kapur kami yang semula dingin menjadi suaka hidup yang bernapas dan menenangkan. Tanaman-tanamannya tumbuh sangat subur melewati dua musim hujan dengan ketahanan yang mengagumkan.',
      clientName: 'Julian & Claire Vance',
      clientRole: 'Pemilik Vila Privat, Uluwatu',
    },
    featured: true,
  },
  {
    id: 'proj-02',
    slug: 'dago-highland-glasshouse-atelier',
    title: 'Atelier Rumah Kaca Dataran Tinggi Dago',
    subtitle: 'Kurasi aroid langka dan penataan dedaunan bertekstur untuk studio arsitektur di Dago Atas.',
    clientCategory: 'Residensial Kustom',
    location: 'Dago Atas, Bandung',
    year: '2024',
    coverImage: '/bespoke-residential-prep-station.jpg',
    gallery: [
      '/bespoke-residential-prep-station.jpg',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    beforeImage:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1600&q=80',
    beforeLabel: 'Sebelum: Interior Beton Dingin',
    afterLabel: 'Sesudah: Kehangatan Botani Dataran Tinggi NOVIO',
    excerpt:
      'Mengintegrasikan aroid beludru dataran tinggi dan tembikar arsitektural ke dalam studio residensial kaca dan baja modern di perbukitan Bandung.',
    challenge:
      'Dinding kaca penuh dari lantai hingga plafon memicu fluktuasi suhu ekstrem antara dinginnya malam dataran tinggi (17°C) dan efek rumah kaca terik siang hari (32°C). Klien menginginkan tanaman patung berdaun langka yang mampu menahan perubahan suhu tanpa kehilangan simetri daunnya.',
    solution:
      'Kami mengambil spesimen langsung dari nursery Parongpong kami, di mana tanaman dibudidayakan secara alami pada elevasi dan fluktuasi suhu harian yang serupa. Kami menata Anthurium Clarinervium beludru dan Monstera bercelah di dekat lorong sirkulasi udara tak langsung, dipadukan dengan pot tanah liat alami yang mengisolasi akar dari kejut termal.',
    curatedSpecimens: [
      'Anthurium Clarinervium Grandis',
      'Monstera Albo Variegata',
      'Philodendron Melanochrysum',
      'Aglaonema Pictum Tricolor',
    ],
    specs: {
      'Cakupan Proyek': 'Studio Mezanin, Sudut Membaca & Solarium Kaca',
      'Luas Area': '220 m²',
      'Mikroklimat': 'Dataran tinggi sejuk, elevasi 1.100 mdpl, cahaya tak langsung',
      'Material Wadah': 'Keramik Berglazur & Tanah Liat Alami Parongpong',
      'Layanan Perawatan': 'Sistem Kapiler Mandiri + Pemantauan Rutin Bulanan',
    },
    testimonial: {
      quote:
        'Keseimbangan botani ini menghadirkan ketenangan luar biasa pada meja kerja studio kami. Rasanya seperti membawa kesejukan hutan pinus Bandung langsung ke dalam ruang kerja.',
      clientName: 'Reza Pratama',
      clientRole: 'Arsitek Utama, Studio Dago',
    },
    featured: true,
  },
  {
    id: 'proj-03',
    slug: 'scbd-biophilic-executive-headquarters',
    title: 'Kantor Pusat Biofilik SCBD',
    subtitle: 'Penataan ruang hijau korporat berskala besar di tiga lantai eksekutif kawasan pusat bisnis Jakarta.',
    clientCategory: 'Korporat Biofilik',
    location: 'SCBD, Jakarta',
    year: '2025',
    coverImage: '/corporate-sop-production.jpg',
    gallery: [
      '/corporate-sop-production.jpg',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    ],
    beforeImage:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    beforeLabel: 'Sebelum: Ruang Kantor Konvensional yang Gersang',
    afterLabel: 'Sesudah: Pusat Oksigen & Suaka Biofilik NOVIO',
    excerpt:
      'Merevitalisasi ruang kerja ber-AC sentral 24/7 dengan dedaunan pembersih udara berdaya tahan tinggi dan partisi biofilik peredam akustik.',
    challenge:
      'Pendingin udara sentral non-stop 24/7, pencahayaan lampu LED buatan, dan kelembapan rendah membuat tanaman kantor standar cepat layu dan mengering. Gema akustik di ruang rapat kaca juga mengganggu konsentrasi kerja.',
    solution:
      'NOVIO merancang sekat partisi lumut alami peredam akustik dan menempatkan spesimen penyaring udara teraklimatisasi seperti Sansevieria Masoniana dan Epipremnum Pinnatum pada tiang vertikal dengan reservoir sub-irigasi tertutup. Kualitas udara dan kenyamanan akustik meningkat secara signifikan.',
    curatedSpecimens: [
      'Sansevieria Masoniana Whale Fin',
      'Epipremnum Pinnatum Cebu Blue',
      'Zamioculcas Zamiifolia Raven',
      'Dracaena Reflexa Song of India',
    ],
    specs: {
      'Cakupan Proyek': 'Ruang Rapat Direksi, Open Space & Atrium Lobi',
      'Luas Area': '850 m²',
      'Mikroklimat': 'Suhu stabil AC 21°C, pencahayaan spektrum buatan penuh',
      'Material Wadah': 'Fiberstone Minimalis Arsitektural (Finishing Charcoal)',
      'Layanan Perawatan': 'Kontrak Perawatan Penuh Mingguan Korporat',
    },
    testimonial: {
      quote:
        'Seluruh staf kami memuji kesejukan dan ketenangan ruang hijau ini. NOVIO menangani seluruh desain, instalasi, dan perawatan mingguan tanpa mengganggu aktivitas operasional harian kantor kami.',
      clientName: 'Amanda Danuwidjaja',
      clientRole: 'VP of Workplace Experience, Fintech Capital',
    },
    featured: false,
  },
  {
    id: 'proj-04',
    slug: 'canggu-botanical-pavilion-cafe',
    title: 'Paviliun Botani Canggu',
    subtitle: 'Kurasi kanopi tropis rimbun untuk kafe artisan dan roastery di pesisir Canggu, Bali.',
    clientCategory: 'Komersial & Kafe',
    location: 'Canggu, Bali',
    year: '2024',
    coverImage: '/cleanroom-anteroom-vestibule.jpg',
    gallery: [
      '/cleanroom-anteroom-vestibule.jpg',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80',
    ],
    beforeImage:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1600&q=80',
    beforeLabel: 'Sebelum: Beton & Baja Terbuka',
    afterLabel: 'Sesudah: Kanopi Rimbun Hutan Tropis NOVIO',
    excerpt:
      'Mengkurasi aroid menjuntai, epifit gantung, dan pohon palem aksen untuk menciptakan pengalaman bersantap semi-terbuka bernuansa hutan hujan alami.',
    challenge:
      'Lalu lintas pengunjung yang padat, hawa panas dapur, dan cipratan air hujan semi-luar ruang membutuhkan perakaran yang sangat kuat terhadap erosi tanah maupun risiko hama tanpa mengotori lantai kafe.',
    solution:
      'Kami memasang gugusan epifit paku tanduk rusa (Platycerium) yang ditempel pada lempengan kayu keras alami, bersanding dengan Alocasia Macrorrhiza raksasa dalam guci terakota berukuran besar. Kanopi alami ini secara nyata menurunkan suhu udara di bawah naungan veranda.',
    curatedSpecimens: [
      'Platycerium Grande (Tanduk Rusa)',
      'Alocasia Macrorrhiza Giant Taro',
      'Philodendron Selloum Gold',
      'Monstera Deliciosa Heritage',
    ],
    specs: {
      'Cakupan Proyek': 'Veranda Semi-Terbuka & Area Bar Kopi',
      'Luas Area': '310 m²',
      'Mikroklimat': 'Tropis terbuka, sirkulasi angin alami, terkena tempias hujan',
      'Material Wadah': 'Terakota Alami Tahan Cuaca & Papan Kayu Jati Alami',
      'Layanan Perawatan': 'Penyegaran & Pemeliharaan Botani Mingguan',
    },
    testimonial: {
      quote:
        'Tata hijau botani ini menjadi daya tarik visual utama dan spot foto favorit pengunjung kafe kami. Rasanya seperti bersantai di bawah kanopi hutan hujan tropis yang tertata apik.',
      clientName: 'Marcus Lindholm',
      clientRole: 'Co-Founder, Pavilion Roastery Canggu',
    },
    featured: false,
  },
];
