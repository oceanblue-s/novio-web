import { ServicePackage, ServiceWorkflowStep, ServiceFAQ } from '@/types';

export const servicePackages: ServicePackage[] = [
  {
    id: 'srv-01',
    slug: 'bespoke-residential-styling',
    title: 'Penataan Botani Residensial',
    tagline: 'Kurasi tanaman khusus dan estetika ruang interior untuk hunian privat serta vila mewah.',
    description:
      'Kami mengkurasi instalasi tanaman hidup yang harmonis untuk vila mewah, penthouse, dan hunian privat. Mulai dari pemetaan pencahayaan alami hingga pengadaan spesimen arsitektural langka serta pot tembikar buatan tangan, tim kami mentransformasi ruang Anda menjadi suaka botani yang damai.',
    targetAudience: 'Vila Mewah, Penthouse, Rumah Warisan & Solarium',
    coverImage: '/private-villas-cultivation.jpg',
    features: [
      'Audit mendalam pencahayaan alami dan kelembapan di lokasi',
      'Cetak biru penataan botani arsitektural 3D',
      'Spesimen teraklimatisasi dataran tinggi dari kebun Parongpong',
      'Pot terakota Italia dan wadah batu vulkanik buatan tangan artisan',
      'Campuran media tanam organik kulit kayu aroid & pasir vulkanik beraerasi',
    ],
    deliverables: [
      'Laporan analisis lingkungan & iklim mikro ruang',
      'Moodboard digital & jadwal penataan botani',
      'Pengiriman khusus, penanaman teliti, & penataan di lokasi',
      'Buku panduan perawatan pribadi & alat pengukur kelembapan',
    ],
    pricingModel: 'Lingkup Proyek Kustom (Konsultasi & audit awal mulai dari Rp 1.500.000, diakumulasikan ke nilai kurasi)',
    guarantee: 'Garansi Kesehatan & Aklimatisasi Biologis 30 Hari dengan penggantian spesimen tanpa biaya',
    recommendedFor: 'Pemilik hunian yang mendambakan suasana asri, tenang, dan elegan dengan panduan perawatan yang mudah.',
    whatsappMessage:
      'Halo NOVIO, saya ingin berkonsultasi mengenai layanan Penataan Botani Residensial untuk hunian/vila saya.',
    popular: true,
  },
  {
    id: 'srv-02',
    slug: 'corporate-rental-maintenance',
    title: 'Sewa & Perawatan Tanaman Kantor',
    tagline: 'Layanan terpadu penyewaan tanaman dan pemeliharaan hortikultura berkala untuk ruang kerja produktif.',
    description:
      'Tingkatkan fokus kerja, segarkan sirkulasi udara dalam ruangan, dan hadirkan kenyamanan akustik alami dengan flora hidup. Program sewa korporat kami menawarkan solusi penyewaan tanaman tanpa belanja modal (zero-capex), disertai perawatan rutin mingguan oleh spesialis tanaman tersertifikasi.',
    targetAudience: 'Kantor Pusat Teknologi, Ruang Eksekutif, Coworking & Hotel Butik',
    coverImage: '/tech-hqs-greenery.jpg',
    features: [
      'Sewa bulanan fleksibel tanpa pembelian aset di awal (zero-capex)',
      'Kunjungan perawatan berkala mingguan atau dua mingguan',
      'Pembersihan debu daun, nutrisi organik, & pencegahan hama alami',
      'Pot berteknologi sub-irigasi dan reservoir air mandiri',
      'Jaminan penggantian tanaman yang layu dalam kurun waktu 48 jam',
    ],
    deliverables: [
      'Instalasi lengkap spesimen tanaman unggulan & pot berdesain modern',
      'Buku catatan digital pemeliharaan mingguan & kunjungan spesialis',
      'Rotasi berkala aksen tanaman hias setiap kuartal',
      'Manajer akun botani khusus yang siap membantu',
    ],
    pricingModel: 'Langganan Bulanan (Paket mulai dari Rp 3.500.000 / bulan)',
    guarantee: 'Garansi 100% Bebas Layu: Setiap tanaman yang menurun kesegarannya akan diganti tanpa biaya tambahan',
    recommendedFor: 'Perusahaan dan kantor yang menginginkan estetika hijau asri tanpa membebani tim pengelola gedung.',
    whatsappMessage:
      'Halo NOVIO, saya ingin bertanya mengenai program Sewa & Perawatan Tanaman Kantor untuk kantor kami.',
    popular: true,
  },
  {
    id: 'srv-03',
    slug: 'landscape-architecture-gardens',
    title: 'Arsitektur Lanskap & Taman Terbuka',
    tagline: 'Desain lanskap kontemporer dan tropis terpadu untuk resor, restoran, serta properti luas.',
    description:
      'Kami menghubungkan kemegahan struktur arsitektur dengan keelokan alam Indonesia. Dari teras tebing pesisir pantai di Bali hingga taman lereng pegunungan yang sejuk di Bandung, rancangan lanskap kami memadukan flora yang adaptif terhadap iklim mikro dengan susunan batu alami serta resapan air yang berkelanjutan.',
    targetAudience: 'Resor Mewah, Restoran Artisan, Kafe & Kawasan Properti',
    coverImage: '/resorts-landscape.jpg',
    features: [
      'Desain arsitektur lanskap terpadu hardscape dan softscape',
      'Pemilihan pohon peneduh dewasa dan barisan vegetasi penahan angin',
      'Sistem irigasi tetes otomatis hemat air dan mikro-kabut',
      'Tata pencahayaan botani malam hari dan zonasi ruang lanskap',
      'Pemulihan kualitas tanah menggunakan kompos pegunungan dan batu apung berpori',
    ],
    deliverables: [
      'Gambar visualisasi 3D dan cetak biru CAD lanskap lengkap',
      'Daftar kuantitas botani (BOQ) & jadwal penanaman terperinci',
      'Pengawasan lapangan dan instalasi langsung oleh kontraktor lanskap',
      'Peta panduan pemeliharaan properti lanskap selama 1 tahun',
    ],
    pricingModel: 'Kontrak Berbasis Proyek (Disesuaikan dengan luas area & kompleksitas rancangan lanskap)',
    guarantee: 'Garansi Penumbuhan Akar 90 Hari & Jaminan Mutu Struktural Lanskap',
    recommendedFor: 'Arsitek dan pengembang properti yang ingin menghadirkan lingkungan biofilik tropis autentik.',
    whatsappMessage:
      'Halo NOVIO, saya ingin mendiskusikan proyek Arsitektur Lanskap & Taman Terbuka.',
    popular: false,
  },
  {
    id: 'srv-04',
    slug: 'collector-sourcing-provenance',
    title: 'Pengadaan Spesimen Langka & Sertifikasi',
    tagline: 'Akuisisi etis, karantina ketat, dan sertifikasi asal-usul terpercaya untuk flora koleksi langka.',
    description:
      'Dikhususkan bagi para kolektor dan pecinta botani yang mendambakan mahakarya flora berkelas museum. Kami mengkhususkan diri dalam pengembangbiakan etis aroid langka, spesimen varigata dewasa, serta tanaman arsitektural yang disertai sertifikat asal-usul botani resmi.',
    targetAudience: 'Kolektor Tanaman Langka, Kurator Seni & Flagship Bergengsi',
    coverImage: '/botanical-connoisseurs.jpg',
    features: [
      'Pengadaan langsung dari kebun pembibitan dataran tinggi etis dan bersertifikat',
      'Karantina ketat 21 hari dan verifikasi integritas perakaran',
      'Wadah tembikar artisan pedestal khusus karya perajin lokal nusantara',
      'Sertifikat botani bertanda tangan berisi silsilah dan kesehatan genetik',
      'Transportasi ber-AC khusus penanganan ekstra aman ke seluruh Indonesia',
    ],
    deliverables: [
      'Sertifikat Asal-Usul Botani (Certificate of Botanical Provenance) bernomor resmi',
      'Dokumentasi silsilah genetik & catatan riwayat perbanyakan',
      'Konsultasi privat mengenai aklimatisasi iklim mikro dan tata cara perawatan',
      'Akses komunikasi langsung WhatsApp concierge ke Ahli Hortikultura Senior NOVIO',
    ],
    pricingModel: 'Berdasarkan Akuisisi Per Spesimen & Titip Rawat Kustom',
    guarantee: 'Jaminan Keaslian & Stabilitas Genetik dengan Inspeksi Fitosanitari Resmi',
    recommendedFor: 'Kolektor tanaman yang mencari spesimen pusaka berkualitas tinggi dengan silsilah terverifikasi.',
    whatsappMessage:
      'Halo NOVIO, saya mencari spesimen botani langka dengan sertifikat resmi.',
    popular: false,
  },
];

export const workflowSteps: ServiceWorkflowStep[] = [
  {
    stepNumber: '01',
    title: 'Audit Ruang & Iklim Mikro',
    subtitle: 'Memahami kondisi lingkungan hidup pada ruangan Anda',
    description:
      'Spesialis kami mengunjungi lokasi Anda (atau melakukan analisis mendalam terhadap cetak biru arsitektur) untuk mengukur tingkat pencahayaan lux alami, pergerakan udara, hembusan pendingin ruangan (AC), serta fluktuasi kelembapan di pagi, siang, dan senja.',
    keyDeliverable: 'Laporan Audit Pencahayaan & Kualitas Udara Ruang',
  },
  {
    stepNumber: '02',
    title: 'Cetak Biru Botani & Kurasi Wadah',
    subtitle: 'Menyelaraskan perpaduan flora alami dengan konsep arsitektur',
    description:
      'Kami menyusun rencana kurasi terpadu yang memadukan setiap zona iklim mikro dengan spesies flora yang ideal, dilengkapi pot terakota, keramik stoneware, atau pot fiberstone berkarakter arsitektural yang serasi dengan material interior Anda.',
    keyDeliverable: 'Tata Letak Visual 3D & Jadwal Spesimen Botani',
  },
  {
    stepNumber: '03',
    title: 'Aklimatisasi Kebun Dataran Tinggi',
    subtitle: 'Mengondisikan spesimen agar tumbuh tangguh dan berdaya hidup panjang di dalam ruangan',
    description:
      'Setiap spesimen dikondisikan terlebih dahulu di kebun pembibitan dataran tinggi Parongpong atau sanctuary Nusa Dua Bali. Kami merapikan akar, memindahkannya ke media organik berpori, dan memverifikasi vigor fotosintesis sebelum pengiriman.',
    keyDeliverable: 'Tanaman Teraklimatisasi dengan Sertifikasi Kesehatan',
  },
  {
    stepNumber: '04',
    title: 'Instalasi Eksklusif & Penataan Ruang',
    subtitle: 'Pemasangan rapi, bersih, dan menghormati ketenangan ruang Anda',
    description:
      'Tim ahli kami mengantarkan, memasang sistem drainase yang aman, membersihkan dedaunan, dan menata setiap pot sesuai garis arsitektur ruangan dengan alas pelindung bersih tanpa mengganggu kenyamanan hunian atau kantor Anda.',
    keyDeliverable: 'Instalasi Ruang Hijau Hidup yang Sempurna',
  },
  {
    stepNumber: '05',
    title: 'Garansi Biologis & Perawatan Berkala',
    subtitle: 'Menjaga kesegaran abadi dan ketenangan pikiran Anda',
    description:
      'Setiap proyek dilindungi oleh garansi kesehatan tanaman kami. Untuk klien korporat, layanan concierge hortikultura kami melakukan kunjungan perawatan mingguan terjadwal untuk memangkas, membersihkan, dan memelihara ekosistem tanaman secara berkesinambungan.',
    keyDeliverable: 'Garansi Kesehatan Tanaman & Concierge Perawatan Rutin',
  },
];

export const serviceFAQs: ServiceFAQ[] = [
  {
    question: 'Bagaimana cara kerja program Sewa Tanaman Kantor Korporat?',
    answer:
      'Layanan sewa korporat kami memungkinkan perusahaan mempercantik ruang kerja dengan tanaman dan pot premium tanpa perlu mengeluarkan anggaran pembelian aset di awal (zero-capex). Anda cukup membayar biaya bulanan yang mencakup penyediaan tanaman, pot desainer, pengiriman, serta kunjungan perawatan berkala setiap minggu. Jika ada tanaman yang menurun kesehatannya atau layu, kami akan langsung menggantinya tanpa biaya tambahan.',
    category: 'Sewa Korporat',
  },
  {
    question: 'Apa saja yang termasuk dalam Garansi Biologis 30 Hari untuk penataan residensial?',
    answer:
      'Karena seluruh spesimen Novio telah melalui proses aklimatisasi menyeluruh di kebun dataran tinggi kami, stres perpindahan tanaman sangat minimal. Namun, demi ketenangan Anda, jika ada tanaman yang menunjukkan tanda-tanda penurunan genetik atau gagal beradaptasi dalam 30 hari setelah pemasangan, spesialis kami akan mengevaluasi, merawat, atau menggantinya secara cuma-cuma.',
    category: 'Residensial',
  },
  {
    question: 'Apakah Novio melayani proyek di luar Bandung dan Bali?',
    answer:
      'Ya, tentu. Meskipun kebun pembibitan utama dan tim kami berpusat di Parongpong (Bandung Barat) dan Nusa Dua (Bali), kami secara rutin menangani proyek penataan residensial mewah dan korporat di Jakarta (Jabodetabek) serta Surabaya. Armada transportasi ber-AC khusus disiapkan untuk seluruh pengiriman jarak jauh demi menjaga kesegaran tanaman.',
    category: 'Umum',
  },
  {
    question: 'Bagaimana cara memastikan tanaman tetap bertahan di ruangan ber-AC selama 24 jam penuh?',
    answer:
      'Kami secara khusus memilih kultivar tanaman yang secara alami mampu beradaptasi dengan kelembapan rendah (seperti varietas aroid tertentu, ficus, dan sansevieria tangguh), lalu menanamnya di media vulkanik penyerap kelembapan dengan pot bersistem sub-irigasi kapiler. Jadwal perawatan kami juga mencakup penyemprotan kabut daun (foliar misting) dan nutrisi organik pelindung sel tanaman.',
    category: 'Perawatan Botani',
  },
  {
    question: 'Bisakah Novio bekerja sama langsung dengan arsitek atau desainer interior kami?',
    answer:
      'Sangat bisa. Kami sering berkolaborasi erat dengan biro arsitektur dan desainer interior sejak tahap konsep maupun konstruksi. Kami dapat meninjau denah tata ruang, memberikan saran teknis mengenai bak tanam (recessed planter) dan jalur drainase, serta memastikan spesifikasi pencahayaan buatan memenuhi kebutuhan fotosintesis tanaman.',
    category: 'Kolaborasi Desain',
  },
];
