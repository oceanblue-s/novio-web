import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'prod-01',
    slug: 'novio-tisane-blends',
    name: 'Novio Tisane Blends',
    shortDescription:
      'Racikan teh herbal alami dari dedaunan dan rempah pilihan Indonesia untuk menyegarkan tubuh dan pikiran.',
    description:
      'Di Novio, kami memahami pentingnya hidup selaras dengan alam. Koleksi racikan tisane terbaru kami memadukan herba alami terbaik dari tanah subur Indonesia untuk membantu Anda memulihkan keseimbangan dan ketenangan harian. Menghadirkan 4 varian unggulan: Moon Bliss (daun rasberi & hibiscus), Sweet Lemon Verbena (lemon verbena, kayu manis, cengkeh & hibiscus), Colden Flu (jahe, cengkeh & serai untuk meredakan flu dan imunitas), dan Chamo Calm (chamomile & double mint untuk relaksasi dan tidur lelap). Dibuat 100% alami, bebas kafein, dan dipanen langsung dari petani lokal berkelanjutan.',
    coverImage: '/novio-tisane-blend.webp',
    gallery: [
      '/novio-tisane-blend.webp',
      'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Tisane & Herba',
    environment: 'Low-Light Quiet',
    features: [
      '100% Bahan Alami Tanpa Pengawet & Bebas Kafein',
      '4 Varian Khas: Moon Bliss, Sweet Lemon Verbena, Colden Flu, Chamo Calm',
      'Dipanen Berkelanjutan Bersama Petani Lokal',
      'Cocok untuk Seduhan Hangat Maupun Cold Brew Menyegarkan',
    ],
    specifications: {
      'Komposisi Utama': 'Daun Herba Kering, Bunga Hibiscus/Chamomile, Rempah Nusantara',
      'Kemasan': 'Jar Kedap Udara Higienis & Pouch Food Grade',
      'Saran Penyajian': 'Seduh 1-2 sdt dalam air 90°C selama 5-7 menit',
      'Penyimpanan': 'Simpan di tempat sejuk, kering, dan terhindar dari sinar matahari langsung',
      'Asal Bahan': 'Kebun Herba Dataran Tinggi Parongpong & Petani Mitra',
    },
    hotspots: [
      {
        x: 20,
        y: 50,
        title: 'Sweet Lemon Verbena',
        description:
          'Kombinasi lemon verbena harum dengan rempah kayu manis dan cengkeh untuk menyegarkan energi.',
      },
      {
        x: 40,
        y: 50,
        title: 'Colden Flu',
        description:
          'Herba jahe, cengkeh, dan serai penghangat yang melegakan tenggorokan dan meningkatkan imunitas.',
      },
      {
        x: 60,
        y: 50,
        title: 'Chamo Calm',
        description:
          'Perpaduan bunga chamomile dan double mint penenang untuk melepas penat dan tidur lebih nyenyak.',
      },
      {
        x: 80,
        y: 50,
        title: 'Moon Bliss',
        description:
          'Racikan daun rasberi dan bunga kembang sepatu dengan cita rasa asam segar yang menenangkan pikiran.',
      },
    ],
    origin: 'Parongpong, Bandung Barat',
    published: true,
  },
  {
    id: 'prod-02',
    slug: 'cuka-fermentasi-alami',
    name: 'Cuka Fermentasi Alami (Artisanal Vinegar)',
    shortDescription:
      'Ledakan cita rasa fermentasi alami dengan keseimbangan keasaman yang memperkaya kreasi kuliner gourmet.',
    description:
      'Dalam seni kuliner, cuka memegang peran istimewa sebagai bahan serbaguna yang mengubah hidangan sederhana menjadi mahakarya gourmet. Cuka fermentasi alami Novio dibuat dari bahan-bahan alami terbaik yang difermentasi secara cermat dan diperam hingga mencapai kesempurnaan. Keseimbangan asam dan rasa alaminya tidak sekadar masam, melainkan memberi kedalaman karakter yang melengkapi hidangan gurih maupun manis. Sangat ideal untuk saus salad vinaigrette, deglazing wajan tumis daging panggang, memperkaya sup & semur, hingga reduksi cuka untuk hidangan penutup berbahan buah.',
    coverImage: '/novio-artisanal-vinegar.webp',
    gallery: [
      '/novio-artisanal-vinegar.webp',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Fermentasi & Saus',
    environment: 'Low-Light Quiet',
    features: [
      'Fermentasi Alami Tanpa Asam Asetat Sintetis',
      'Keseimbangan Sempurna Antara Keasaman dan Kedalaman Rasa',
      'Kaya Senyawa Bioaktif & Probiotik Alami',
      'Bahan Esensial Andalan Para Chef untuk Vinaigrette & Deglazing',
    ],
    specifications: {
      'Bahan Dasar': 'Buah & Sari Pati Alami Terpilih, Ragi Fermentasi Alami',
      'Tingkat Keasaman': 'Seimbang & Halus di Lidah',
      'Volume Kemasan': 'Botol Kaca Gelap 250 ml / 500 ml',
      'Aplikasi Utama': 'Salad Dressing, Deglazing Saus Daging, Sup, Reduksi Buah',
      'Asal Produksi': 'Fasilitas Fermentasi Artisan Novio, Parongpong',
    },
    hotspots: [
      {
        x: 50,
        y: 35,
        title: 'Fermentasi Perlahan',
        description:
          'Difermentasi secara bertahap menjaga integritas nutrisi bahan mentah dan menghasilkan aroma kompleks.',
      },
      {
        x: 50,
        y: 75,
        title: 'Keseimbangan Rasa Gurih-Asam',
        description:
          'Kadar keasaman pas yang mencerahkan salad dan memotong lemak gurih pada sajian daging.',
      },
    ],
    origin: 'Fasilitas Fermentasi Artisan Parongpong',
    published: true,
  },
  {
    id: 'prod-03',
    slug: 'olahan-awetan-segar',
    name: 'Olahan Awetan Segar (Preserved Goods)',
    shortDescription:
      'Keaslian rasa buah dan sayur musiman yang ditangkap sempurna pada puncak kesegarannya.',
    description:
      'Dalam dunia kuliner yang bergerak cepat, cita rasa paling luar biasa sering kali datang dari bahan yang diawetkan pada puncak kesegarannya. Rangkaian olahan awetan segar Novio menghadirkan kemudahan bagi para chef untuk menikmati sari pati hasil panen terbaik sepanjang tahun. Melalui teknik pengawetan cermat yang menjaga tekstur, kerenyahan, dan nutrisi alaminya, mulai dari preserved lemons bercita rasa Mediterania untuk semur dan daging panggang, acar jamur kaya umami untuk papan charcuterie dan sandwich, hingga selai buah alami untuk pancake, yoghurt, dan glasir saus daging.',
    coverImage: '/novio-preserved-fruit-jars.webp',
    gallery: [
      '/novio-preserved-fruit-jars.webp',
      'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Olahan & Awetan',
    environment: 'Low-Light Quiet',
    features: [
      'Diawetkan Tepat pada Puncak Kematangan Alami',
      'Tekstur Renyah & Profil Rasa Asli Terjaga Sempurna',
      'Siap Pakai untuk Menghemat Waktu Persiapan Dapur Chef',
      'Pilihan Populer: Preserved Lemons, Acar Jamur Umami, Fruit Preserves',
    ],
    specifications: {
      'Kemasan': 'Jar Kaca Kedap Udara Steril Food Grade',
      'Daya Simpan': '6–12 Bulan pada Suhu Sejuk',
      'Penggunaan': 'Topping Charcuterie, Olahan Semur/Tagine, Saus Glasir Daging',
      'Standar Mutu': 'Bebas Pengawet Buatan Berbahaya',
    },
    hotspots: [
      {
        x: 45,
        y: 40,
        title: 'Preserved Lemons',
        description:
          'Sentuhan asam asin khas Mediterania yang mengangkat aroma semur, tagine, dan ayam panggang.',
      },
      {
        x: 65,
        y: 60,
        title: 'Pickled Umami Vegetables',
        description:
          'Kerenyahan sayur awetan dengan kedalaman rasa umami untuk pendamping daging dan charcuterie.',
      },
    ],
    origin: 'Dapur Pengolahan Bersih Parongpong',
    published: true,
  },
  {
    id: 'prod-04',
    slug: 'saus-cabai-fermentasi-artisan',
    name: 'Saus Cabai Fermentasi Artisan (Artisan Hot Sauce)',
    shortDescription:
      'Pedas berkarakter dari cabai pilihan yang difermentasi alami untuk harmoni rasa yang memikat.',
    description:
      'Hadirkan kehangatan dan ledakan rasa membara pada hidangan Anda. Koleksi saus cabai fermentasi Novio diolah dari cabai pilihan terbaik—mulai dari chipotle berasap, habanero cerah beraroma tropis, hingga jalapeño segar yang tajam. Rahasia kelezatannya terletak pada keseimbangan rasa dan tingkat kepedasan yang harmonis berkat proses fermentasi alami. Saus ini tidak menutupi keaslian rasa bahan utama, melainkan memperkaya rasa hidangan melalui lapisan pedas, asam lembut, dan aroma rempah. Sangat cocok untuk marinasi daging, saus cocolan/dip, hidangan panggang, hingga racikan koktail berani seperti Bloody Mary.',
    coverImage: '/novio-hot-sauce-bottles.webp',
    gallery: [
      '/novio-hot-sauce-bottles.webp',
      'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Fermentasi & Saus',
    environment: 'Low-Light Quiet',
    features: [
      'Fermentasi Cabai Alami untuk Menghasilkan Kompleksitas Rasa',
      'Varian Cabai Khas: Smoky Chipotle, Habanero, Jalapeño',
      'Memotong Lemak pada Hidangan Gurih & Menambah Kedalaman Rasa',
      'Sangat Serbaguna untuk Marinasi, Cocolan, dan Daging Panggang',
    ],
    specifications: {
      'Komposisi': 'Cabai Segar Fermentasi, Cuka Alami, Garam Laut, Rempah Khusus',
      'Tingkat Pedas': 'Sedang hingga Kuat (Medium to Bold Heat)',
      'Kemasan': 'Botol Kaca Dropper 150 ml / 250 ml',
      'Saran Penggunaan': 'Marinasi BBQ, Saus Tacos, Dressing Salad Pedas, Koktail',
    },
    hotspots: [
      {
        x: 40,
        y: 45,
        title: 'Keseimbangan Pedas & Asam',
        description:
          'Proses fermentasi alami melunakkan sengatan pedas dan memunculkan cita rasa umami buah cabai.',
      },
      {
        x: 65,
        y: 70,
        title: 'Aroma Asap Alami',
        description:
          'Karakter asap khas chipotle dan rempah alami yang memperkaya aroma hidangan panggang.',
      },
    ],
    origin: 'Fasilitas Fermentasi Artisan Parongpong',
    published: true,
  },
  {
    id: 'prod-05',
    slug: 'sayuran-acar-tradisional',
    name: 'Sayuran Acar Tradisional (Pickled Vegetables)',
    shortDescription:
      'Sentuhan renyah dan asam segar dari fermentasi tradisional aneka sayuran segar pilihan.',
    description:
      'Tradisi pengacaran kuno yang tidak hanya memperpanjang usia bahan pangan, melainkan juga mengisinya dengan profil rasa asam segar yang membangkitkan selera. Dibuat dengan metode tradisional menggunakan takaran seimbang antara cuka berkualitas, garam murni, dan rempah aromatik. Mulai dari acar mentimun renyah, wortel, hingga cabai pelangi. Acar Novio mempertahankan nilai nutrisi sayuran sekaligus memberikan tekstur renyah dan kesegaran asam yang sempurna sebagai penyeimbang hidangan daging kaya lemak, isian burger, topping taco, dan platter keju/charcuterie.',
    coverImage: '/novio-pickled-jars.webp',
    gallery: [
      '/novio-pickled-jars.webp',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Olahan & Awetan',
    environment: 'Low-Light Quiet',
    features: [
      'Tekstur Super Renyah dengan Keasaman yang Segar & Bersih',
      'Menggunakan Sayuran Segar Langsung dari Petani Lokal',
      'Kaya Probiotik Alami Hasil Fermentasi Tradisional',
      'Pelengkap Wajib untuk Burger, Sandwich, Salad, dan Charcuterie',
    ],
    specifications: {
      'Bahan': 'Mentimun, Wortel, Paprika, Bawang, Rempah, Garam Laut, Cuka Alami',
      'Tekstur': 'Renyah Alami (Crisp Crunch)',
      'Kemasan': 'Jar Kaca Kedap Udara 350 g / 500 g',
      'Penyimpanan': 'Simpan di lemari pendingin setelah dibuka',
    },
    hotspots: [
      {
        x: 45,
        y: 40,
        title: 'Kerenyahan Alami Terjaga',
        description:
          'Direndam dalam larutan garam dan cuka seimbang untuk menjaga tekstur renyah sayuran tetap prima.',
      },
      {
        x: 60,
        y: 70,
        title: 'Infusi Rempah Aromatik',
        description:
          'Kombinasi biji moster, adas, dan herba aromatik yang memberikan kesegaran pada setiap gigitan.',
      },
    ],
    origin: 'Dapur Pengolahan Parongpong, Bandung Barat',
    published: true,
  },
  {
    id: 'prod-06',
    slug: 'tisane-herbal-alami-pilihan',
    name: 'Tisane Herbal Alami Pilihan (Curated Tisanes)',
    shortDescription:
      'Seduhan dedaunan, herba, dan bunga kering murni yang menenangkan tubuh dan jiwa tanpa kafein.',
    description:
      'Tisane atau teh herbal menawarkan pengalaman aromatik menenangkan yang melampaui secangkir teh biasa. Bebas kafein dan sarat kebaikan herba, bunga, serta rempah tropis nusantara. Pilihan kurasi kami mencakup chamomile penenang, kesegaran kembang sepatu (hibiscus), hingga sentuhan lavender aromatik. Setiap bahan dipetik langsung dan dikeringkan secara teliti untuk menjaga kemurnian minyak atsiri dan khasiat kesehatannya. Nikmati sebagai seduhan hangat, cold brew segar semalaman, bahan dasar sirup herbal pastry, atau mixer koktail botani berkelas.',
    coverImage: '/novio-tisane-varieties.webp',
    gallery: [
      '/novio-tisane-varieties.webp',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Tisane & Herba',
    environment: 'Low-Light Quiet',
    features: [
      '100% Bebas Kafein (Caffeine-Free) Cocok Dinikmati Kapan Saja',
      'Dipetik Manual & Dikeringkan dengan Kontrol Suhu Presisi',
      'Mendukung Kualitas Tidur, Pencernaan, dan Kebugaran Tubuh',
      'Digemari Para Mixologist & Pastry Chef untuk Infusi Alami',
    ],
    specifications: {
      'Pilihan Varian': 'Chamomile Calm, Pure Hibiscus, Lemongrass Mint, Floral Lavender',
      'Karakter Rasa': 'Floral Lembut, Segar, Menenangkan',
      'Kemasan': 'Tin Canister Kedap Udara Eksklusif 50 g / 100 g',
      'Saran Seduh': '2-3 gram diseduh air panas 95°C selama 5 menit',
    },
    hotspots: [
      {
        x: 50,
        y: 40,
        title: 'Bunga Kering Alami',
        description:
          'Kuntum bunga chamomile dan lavender utuh yang mengunci aroma atsiri relaksasi murni.',
      },
      {
        x: 50,
        y: 75,
        title: 'Dehidrasi Terstandar',
        description:
          'Diproses dalam suhu terkontrol di Parongpong agar warna alami dan khasiat herbal tidak rusak.',
      },
    ],
    origin: 'Kebun Herba Dataran Tinggi Parongpong',
    published: true,
  },
  {
    id: 'prod-07',
    slug: 'madu-hutan-murni-alami',
    name: 'Madu Hutan Murni Alami (Raw Honey)',
    shortDescription:
      'Pemanis alami murni tanpa pemanasan dan tanpa filter, kaya enzim aktif dan antioksidan alami.',
    description:
      'Madu murni mentah (raw honey) adalah salah satu anugerah alam paling istimewa. Dipanen langsung dari sarang lebah tanpa proses pemanasan berlebih dan tanpa penyaringan mikro, madu kami mempertahankan seluruh enzim bermanfaat, vitamin, mineral, serta antioksidan alaminya. Menghadirkan profil rasa yang kaya dan beragam sesuai nektar bunga yang dihisap lebah. Madu murni Novio adalah pemanis superfood alami yang sempurna untuk sarapan bersama oatmeal/yoghurt, pemanis sehat untuk memanggang roti & kue, pelapis glasir gurih manis untuk daging panggang, atau dicampurkan ke dalam seduhan tisane hangat.',
    coverImage: '/novio-raw-honey-bottles.webp',
    gallery: [
      '/novio-raw-honey-bottles.webp',
      'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Olahan & Awetan',
    environment: 'Low-Light Quiet',
    features: [
      'Raw & Unfiltered — Mempertahankan Enzim Aktif & Propolis Alami',
      'Tanpa Campuran Gula Sintetis, Air, atau Pemanis Tambahan',
      'Meningkatkan Daya Tahan Tubuh & Meredakan Radang Tenggorokan',
      'Pilihan Favorit Chef Patiseri & Dapur Pemanggang Profesional',
    ],
    specifications: {
      'Sumber Nektar': 'Bunga Liar & Hutan Asri Nusantara (Multiflora)',
      'Tekstur': 'Kental Alami, Aroma Bunga Autentik',
      'Kemasan': 'Botol Kaca Segel Rapat 250 g / 500 g',
      'Penyimpanan': 'Suhu ruang (tidak perlu dimasukkan ke kulkas)',
    },
    hotspots: [
      {
        x: 45,
        y: 40,
        title: 'Murni Tanpa Filter Mikro',
        description:
          'Butiran pollen mikro dan propolis alami tetap terjaga, memberikan manfaat superfood sejati.',
      },
      {
        x: 55,
        y: 70,
        title: 'Glasir Kuliner Berkualitas',
        description:
          'Kekentalan dan aroma bunga yang membentuk lapisan karamel lezat pada daging panggang dan pastry.',
      },
    ],
    origin: 'Kemitraan Peternak Lebah Nusantara & Novio',
    published: true,
  },
  {
    id: 'prod-08',
    slug: 'microgreens-segar-pilihan',
    name: 'Microgreens Segar Pilihan (Fresh Microgreens)',
    shortDescription:
      'Dedaunan muda padat nutrisi dengan rasa pekat yang menyempurnakan hidangan fine dining.',
    description:
      'Kecil namun penuh daya! Microgreens dipanen pada tahap awal pertumbuhan saat daun sejati mulai muncul, mengunci konsentrasi rasa yang intens dan padat nutrisi hingga berkali-kali lipat dibanding sayuran dewasa. Dibudidayakan dengan media tanam organik bersih di fasilitas Parongpong. Menghadirkan varietas micro-arugula dengan rasa pedas merica yang tegas, micro-radish yang renyah dan tajam, hingga micro-basil yang manis aromatik. Menjadi andalan para chef fine dining untuk memberikan sentuhan visual elegan, tekstur renyah halus, dan ledakan rasa segar pada setiap piring hidangan.',
    coverImage: '/novio-microgreen-pots.webp',
    gallery: [
      '/novio-microgreen-pots.webp',
      'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Sayuran & Segar',
    environment: 'Bright Indirect',
    features: [
      'Kandungan Vitamin & Antioksidan Sangat Pekat (Superfood)',
      'Tekstur Renyah Segar dengan Karakter Rasa Kuat',
      'Varietas Populer: Micro Arugula, Red Radish, Basil, Pea Tendrils',
      'Garnish Wajib untuk Sup Gourmet, Daging, Salad, dan Appetizer',
    ],
    specifications: {
      'Usia Panen': '10–14 Hari Setelah Semai',
      'Media Tanam': 'Substrat Organik Steril Bebas Kontaminan',
      'Kemasan': 'Clamshell Eco-Friendly Berventilasi / Pot Hidup',
      'Daya Simpan': '7 Hari dalam Pendingin Suhu 4–8°C',
    },
    hotspots: [
      {
        x: 40,
        y: 35,
        title: 'Pucuk Daun Muda Padat Gizi',
        description:
          'Mengandung vitamin C, E, dan beta-karoten hingga 4-6 kali lipat lebih tinggi dari daun dewasa.',
      },
      {
        x: 60,
        y: 65,
        title: 'Ledakan Rasa Segar',
        description:
          'Karakter rasa pekat yang memberikan aksen pedas, manis, atau gurih instan pada hidangan plating.',
      },
    ],
    origin: 'Fasilitas Pembibitan Higienis Parongpong',
    published: true,
  },
  {
    id: 'prod-09',
    slug: 'sayuran-spesial-unik',
    name: 'Sayuran Spesial Unik (Specialty Vegetables)',
    shortDescription:
      'Varietas sayuran langka dan eksotis dengan warna cerah serta profil rasa tak terlupakan.',
    description:
      'Buka batasan eksplorasi kuliner Anda dengan sayuran spesial unik dari Novio. Menampilkan warna memukau, bentuk artistik, dan rasa yang berani—mulai dari wortel pelangi (rainbow carrots), ubi ungu istimewa, hingga bit pusaka dan labu mungil. Dipilih secara khusus dan dibudidayakan bersama petani mitra di tanah vulkanik subur untuk memastikan tekstur dan kemanisan optimal saat panen. Sayuran ini kaya antioksidan dan pigmen alami, sangat sempurna untuk panggangan warna-warni (roasted veggie medleys), puree bertekstur beludru, hingga salad mentah yang spektakuler secara visual.',
    coverImage: '/novio-specialty-vegetable-planter.webp',
    gallery: [
      '/novio-specialty-vegetable-planter.webp',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Sayuran & Segar',
    environment: 'Bright Indirect',
    features: [
      'Varietas Hortikultura Langka yang Memanjakan Mata & Lidah',
      'Warna Alami Pekat Kaya Kandungan Fitonutrien & Antioksidan',
      'Panen Segar Berkelanjutan Langsung dari Tanah Pegunungan',
      'Sangat Cocok untuk Puree Halus, Hidangan Panggang, dan Garnish Berseni',
    ],
    specifications: {
      'Varian Utama': 'Rainbow Carrots, Purple Sweet Potatoes, Heirloom Beets',
      'Kondisi': 'Segar Panen Pagi (Freshly Harvested)',
      'Karakter Rasa': 'Manis Alami, Renyah, Kaya Rasa Bumi (Earthy)',
      'Penyimpanan': 'Tempat Sejuk & Lemari Pendingin Sayuran',
    },
    hotspots: [
      {
        x: 45,
        y: 40,
        title: 'Pigmen Antosianin Alami',
        description:
          'Warna ungu, oranye, dan kuning alami kaya antioksidan yang mempercantik presentasi piring saji.',
      },
      {
        x: 60,
        y: 70,
        title: 'Tekstur Karamelisasi Sempurna',
        description:
          'Kadar gula alami seimbang yang terkaramelisasi indah saat dipanggang dalam oven dapur chef.',
      },
    ],
    origin: 'Kebun Dataran Tinggi Parongpong & Petani Mitra',
    published: true,
  },
  {
    id: 'prod-10',
    slug: 'bunga-yang-dapat-dimakan',
    name: 'Bunga yang Dapat Dimakan (Edible Flowers)',
    shortDescription:
      'Bunga segar organik yang aman dikonsumsi untuk menghadirkan keindahan dan aroma puitis pada hidangan.',
    description:
      'Dalam dunia keahlian memasak, tampilan visual sama pentingnya dengan kenikmatan rasa. Bunga yang dapat dimakan adalah cara alami menghadirkan keelokan ke piring saji dengan warna-warni memesona, aroma halus, dan rasa lembut yang mengejutkan. Pilihan bunga kami mencakup pansies, nasturtium bercita rasa agak pedas lada, dan viola yang anggun. Dibudidayakan secara 100% organik tanpa pestisida kimia sintetis, aman dikonsumsi langsung. Sempurna untuk dekorasi kue pengantin, taburan salad segar, infusi sirup minuman, maupun hiasan koktail aromatik.',
    coverImage: '/novio-edible-flower-palette.webp',
    gallery: [
      '/novio-edible-flower-palette.webp',
      'https://images.unsplash.com/photo-1599598425947-320af5832a89?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Sayuran & Segar',
    environment: 'Bright Indirect',
    features: [
      '100% Organik & Aman Dikonsumsi Langsung (Food Grade)',
      'Warna Cerah Alami dari Pansies, Violas, dan Nasturtiums',
      'Sentuhan Kemewahan Estetika untuk Dessert, Pastry, & Koktail',
      'Dipetik Tangan di Pagi Hari untuk Menjaga Kesegaran Mahkota',
    ],
    specifications: {
      'Varietas Bunga': 'Pansies, Nasturtiums, Violas, Borage, Marigold Mini',
      'Budidaya': 'Organik Tanpa Pestisida Kimia',
      'Kemasan': 'Kotak Khusus Berperedam Lembap (Chilled Box)',
      'Daya Simpan': '4–6 Hari pada Suhu 4–6°C',
    },
    hotspots: [
      {
        x: 48,
        y: 35,
        title: 'Pansies & Violas Segar',
        description:
          'Mahkota bunga lembut dengan aroma floral manis untuk hiasan dessert berkelas.',
      },
      {
        x: 65,
        y: 65,
        title: 'Nasturtium Beraroma Lada',
        description:
          'Memberikan aksen warna hangat dan sensasi pedas lembut yang mengejutkan di lidah.',
      },
    ],
    origin: 'Kebun Flora Konsumsi Parongpong, Bandung Barat',
    published: true,
  },
  {
    id: 'prod-11',
    slug: 'daun-muda-segar-baby-leaf',
    name: 'Daun Muda Segar (Fresh Baby Leaf)',
    shortDescription:
      'Dedaunan muda bertekstur lembut dan berasa ringan yang dipanen pada puncak kesegarannya.',
    description:
      'Dalam dunia inovasi kuliner modern, terkadang bahan paling sederhana memberikan pengaruh paling mendalam. Baby leaf Novio adalah dedaunan muda segar yang dipanen tepat saat helai daun masih sangat lembut dan renyah. Mulai dari baby spinach yang manis gurih, baby arugula berkarakter pedas lembut, hingga red chard dengan urat daun berwarna merah menyala. Teksturnya yang renyah halus dan rasa alaminya yang seimbang menjadikannya bahan dasar salad gourmet, isian sandwich berkelas, atau pelengkap hidangan daging dan makanan laut tanpa menutupi bumbu utama.',
    coverImage: '/novio-baby-leaf-spinach.webp',
    gallery: [
      '/novio-baby-leaf-spinach.webp',
      'https://images.unsplash.com/photo-1556911073-38141963c9e0?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Sayuran & Segar',
    environment: 'Bright Indirect',
    features: [
      'Dipanen Muda untuk Tekstur Paling Lembut & Rasa Ringan',
      'Pilihan Varietas: Baby Spinach, Baby Arugula, Red Chard',
      'Nutrisi Segar Tinggi Tanpa Serat Kasar',
      'Basis Terbaik untuk Salad Hotel Bintang Lima & Dapur Restoran',
    ],
    specifications: {
      'Kondisi': 'Dicuci Higienis & Ditiriskan (Ready to Plate)',
      'Kemasan': 'Pouch Berventilasi / Clamshell 100 g – 1 kg',
      'Suhu Penyimpanan': 'Pendingin 3–5°C',
      'Waktu Panen': 'Panen Harian Sesuai Pesanan Chef',
    },
    hotspots: [
      {
        x: 45,
        y: 40,
        title: 'Tekstur Lembut Renyah',
        description:
          'Kutikula daun tipis yang memberikan sensasi renyah segar tanpa rasa pahit.',
      },
      {
        x: 65,
        y: 65,
        title: 'Keseragaman Mutu',
        description:
          'Disortir helai demi helai di ruang bersih Parongpong untuk memenuhi standar dapur profesional.',
      },
    ],
    origin: 'Lahan Terbuka Dataran Tinggi Parongpong',
    published: true,
  },
  {
    id: 'prod-12',
    slug: 'tanaman-herbal-hidup-dalam-pot',
    name: 'Tanaman Herbal Hidup Dalam Pot (Living Potted Herbs)',
    shortDescription:
      'Herba kuliner hidup dalam pot siap petik untuk pasokan aroma segar berkelanjutan di dapur Anda.',
    description:
      'Bayangkan memiliki herba segar terbaik yang selalu dalam jangkauan tangan di dapur Anda. Rangkaian tanaman herbal hidup dalam pot dari Novio menghadirkan dedaunan herba segar yang siap dipetik kapan pun Anda memasak. Menghadirkan tanaman pokok dapur dunia seperti basil aromatik, rosemary beraroma pinus segar, thyme lembut, dan mint penyegar. Dirawat dengan media tanam organik subur agar terus tumbuh subur di dapur maupun teras Anda. Praktis, indah dipandang, dan menjamin Anda selalu mendapatkan herba beraroma paling segar tanpa risiko daun layu terbuang.',
    coverImage: '/novio-potted-plants-trio.webp',
    gallery: [
      '/novio-potted-plants-trio.webp',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Sayuran & Segar',
    environment: 'Veranda & Balcony',
    features: [
      'Herba Hidup Siap Petik Kapan Saja Sesuai Kebutuhan Memasak',
      'Varietas Kuliner Favorit: Sweet Basil, Rosemary, Thyme, Mint',
      'Mengurangi Sampah Dapur & Lebih Hemat Dibanding Membeli Herba Potong',
      'Menambah Keindahan Hijau dan Semerbak Aroma Segar di Dapur',
    ],
    specifications: {
      'Spesies Tersedia': 'Italian Sweet Basil, Tuscan Rosemary, French Thyme, Peppermint',
      'Media Tanam': 'Campuran Kompos Organik & Pumice Vulkanik Poros',
      'Diameter Pot': 'Pot Terakota / Polybag Eco 12–16 cm',
      'Perawatan': 'Cahaya matahari pagi dan siram saat media mulai mengering',
    },
    hotspots: [
      {
        x: 35,
        y: 45,
        title: 'Minyak Atsiri Kaya Rasa',
        description:
          'Daun hidup menghasilkan semerbak aroma dan rasa yang jauh lebih intens dibanding herba kering.',
      },
      {
        x: 65,
        y: 70,
        title: 'Pasokan Berkelanjutan',
        description:
          'Tumbuh kembali setelah dipangkas, menjamin ketersediaan herba segar setiap saat di dapur.',
      },
    ],
    origin: 'Kebun Pembibitan Herba Parongpong & Bali',
    published: true,
  },
  {
    id: 'prod-13',
    slug: 'kombucha-sparkling-tea',
    name: 'Kombucha Sparkling Probiotic Tea',
    shortDescription:
      'Kombucha adalah minuman fermentasi berbahan dasar teh yang memiliki rasa segar, sedikit asam, dan naturally sparkling. Melalui proses fermentasi, kombucha menghasilkan karakter rasa yang unik dan cocok dinikmati sebagai alternatif minuman harian yang lebih refreshing',
    description:
      'Kombucha merupakan minuman hasil fermentasi teh yang dikenal dengan karakter rasa segar, sedikit asam, dan naturally sparkling. Proses fermentasi membentuk rasa yang kompleks, ringan, dan khas, sehingga kombucha dapat dinikmati langsung sebagai minuman penyegar maupun dipadukan dengan berbagai sajian.\n\nDalam dunia kuliner, kombucha juga menarik digunakan sebagai pairing untuk makanan bercita rasa gurih, pedas, grilled, hingga hidangan ringan seperti salad dan pastry. Karakter acidity-nya membantu memberikan sensasi segar di antara suapan, sementara aroma teh dan botanical ingredients memberikan lapisan rasa yang lebih kompleks. Menghadirkan 4 varian cita rasa unik dalam kemasan kaleng praktis: Shishito Pepper dengan aksen segar eksotis, Rosella asam manis kaya antioksidan, Jamu Warisan Herbal Indonesia berpadu rempah rimpang berkhasiat, dan Blue Pea (bunga telang) beraroma floral menenangkan. Sangat cocok dinikmati langsung atau dikreasikan menjadi mocktail, welcome drink, atau beverage pairing untuk restoran, café, hotel, dan berbagai acara.',
    coverImage: '/novio-kombucha-cans.jpg',
    gallery: [
      '/novio-kombucha-cans.jpg',
      'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Fermentasi & Minuman',
    environment: 'Low-Light Quiet',
    features: [
      '100% Fermentasi Teh Alami Tanpa Karbonasi Buatan',
      'Naturally Sparkling & Kaya Probiotik Alami untuk Kesehatan Pencernaan',
      '4 Karakter Varian: Shishito Pepper, Rosella, Jamu Herbal, dan Blue Pea',
      'Beverage Pairing Sempurna untuk Sajian Gurih, Grilled, Salad, & Pastry',
      'Kemasan Kaleng 250 ml yang Praktis, Higienis, & Menjaga Kesegaran Maksimal',
    ],
    specifications: {
      'Bahan Dasar': 'Teh Pilihan, Kultur Probiotik Alami (SCOBY), Air Mata Air Pegunungan, Gula Tebu Alami',
      'Varian Kaleng': 'Shishito Pepper, Rosella, Jamu Warisan Herbal, Blue Pea',
      'Karakteristik Rasa': 'Segar, Sedikit Asam (Crisp Acidity), Naturally Sparkling',
      'Isi Bersih (Netto)': '250 ml (Kemasan Kaleng Aluminium Food Grade)',
      'Saran Penyimpanan': 'Simpan dingin 4–8°C untuk sensasi kesegaran terbaik',
      'Aplikasi Kuliner': 'Minuman Harian, Welcome Drink, Food Pairing, Bahan Racikan Mocktail',
      'Asal Produksi': 'Fasilitas Fermentasi Artisan Novio, Parongpong & Bali',
    },
    hotspots: [
      {
        x: 18,
        y: 55,
        title: 'Shishito Pepper Kombucha',
        description:
          'Kombucha dengan sensasi unik cabai shishito berkarakter vegetal segar dan lembut.',
      },
      {
        x: 38,
        y: 45,
        title: 'Rosella Kombucha',
        description:
          'Ekstrak kelopak kembang rosella merah dengan karakter asam buah segar kaya antioksidan.',
      },
      {
        x: 62,
        y: 55,
        title: 'Jamu Warisan Herbal Indonesia',
        description:
          'Racikan rempah rimpang kunyit dan temulawak dalam sparkling tea yang menyehatkan lambung.',
      },
      {
        x: 82,
        y: 45,
        title: 'Blue Pea (Bunga Telang) Kombucha',
        description:
          'Infusi bunga telang biru alami dengan aroma floral yang menenangkan dan visual memikat.',
      },
    ],
    origin: 'Fasilitas Fermentasi Artisan Parongpong',
    published: true,
  },
  {
    id: 'prod-14',
    slug: 'kombucha-syrup',
    name: 'Kombucha Syrup (Custard Apple Kombucha Syrup)',
    latinName: 'Annona squamosa',
    shortDescription:
      'Kombucha syrup adalah sirup artisan dengan karakter manis, asam, dan kompleks yang terinspirasi dari profil rasa fermentasi kombucha. Cocok digunakan sebagai mixer minuman, topping, maupun bahan kreasi kuliner.',
    description:
      'Kombucha syrup menghadirkan perpaduan rasa manis dan acidity yang khas, sehingga memberikan karakter yang lebih kompleks dibanding sirup biasa. Profil rasanya dapat memperkaya berbagai kreasi minuman maupun hidangan tanpa terasa terlalu flat atau sekadar manis.\n\nDalam dunia kuliner, kombucha syrup dapat digunakan sebagai base atau mixer untuk mocktail, sparkling drink, iced beverage, tea-based drink, hingga signature menu. Selain untuk minuman, produk ini juga dapat diaplikasikan sebagai topping dessert, glaze, dressing, drizzle, maupun elemen tambahan pada plating. Dibuat secara artisanal di Bali dengan memadukan sari buah srikaya (custard apple) tropis pilihan dan reduksi fermentasi kombucha alami dalam kemasan botol kaca elegan 250 ml.',
    coverImage: '/novio-kombucha-syrup.jpg',
    gallery: [
      '/novio-kombucha-syrup.jpg',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
    ],
    category: 'Fermentasi & Saus',
    environment: 'Low-Light Quiet',
    features: [
      'Perpaduan Manis Tropis Srikaya & Acidity Khas Fermentasi Kombucha',
      'Sangat Fleksibel: Mixer Mocktail, Kopi, Teh, Soda, hingga Topping Es Krim',
      'Handcrafted in Bali Menggunakan Sari Buah Srikaya (Custard Apple) Asli',
      'Memberikan Kedalaman Rasa Kompleks Tanpa Rasa Terlalu Flat atau Sekadar Manis',
      'Kemasan Botol Kaca Premium 250 ml Kedap Udara dengan Tutup Segel Higienis',
    ],
    specifications: {
      'Bahan Dasar': 'Ekstrak Buah Srikaya (Custard Apple), Konsentrat Fermentasi Teh Kombucha, Gula Tebu Alami',
      'Profil Rasa': 'Manis Lembut Tropis, Asam Segar Halus, Aroma Botanical Kompleks',
      'Isi Bersih': '250 ml (Botol Kaca Persegi Estetik)',
      'Aplikasi Beverage': 'Mocktail, Cocktail, Sparkling Soda, Cold Brew, Iced Tea',
      'Aplikasi Kuliner': 'Dessert Topping, Glaze Pastry, Drizzle Es Krim, Plating Fine Dining',
      'Saran Penyimpanan': 'Simpan di tempat sejuk dan terhindar dari sinar matahari langsung',
      'Asal Pembuatan': 'Handcrafted in Bali — Fasilitas Artisan Novio',
    },
    hotspots: [
      {
        x: 50,
        y: 40,
        title: 'Botol Kaca Artisan 250 ml',
        description:
          'Botol kaca persegi elegan kedap udara yang menjaga kestabilan rasa dan aroma botanical buah tropis.',
      },
      {
        x: 20,
        y: 75,
        title: 'Buah Srikaya (Custard Apple)',
        description:
          'Sari buah srikaya tropis pilihan yang memberikan tekstur rasa manis lembut khas buah surga.',
      },
      {
        x: 80,
        y: 70,
        title: 'Aplikasi Kreasi Minuman & Plating',
        description:
          'Mixer sempurna untuk mocktail berkilau, iced beverage segar, hingga garnish saus plating dessert.',
      },
    ],
    origin: 'Handcrafted in Bali',
    published: true,
  },
];
