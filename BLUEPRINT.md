# 🌿 NOVIO — Master Project Blueprint
**Dokumen Arsitektur Sistem, Spesifikasi Desain, & Panduan Teknis Komprehensif**

---

## 📑 Daftar Isi
1. [Ringkasan Eksekutif & Identitas Brand](#1-ringkasan-eksekutif--identitas-brand)
2. [Arsitektur Sistem & Tech Stack](#2-arsitektur-sistem--tech-stack)
3. [Arsitektur Data Multi-Tier (Hybrid Storage)](#3-arsitektur-data-multi-tier-hybrid-storage)
4. [Fitur Utama & Modul Fungsional](#4-fitur-utama--modul-fungsional)
5. [Struktur Repositori & Direktori](#5-struktur-repositori--direktori)
6. [Skema Data & Kontrak TypeScript](#6-skema-data--kontrak-typescript)
7. [Sitemap, Routing & Rendering Strategy](#7-sitemap-routing--rendering-strategy)
8. [Sistem Desain (UI/UX & Desain Token)](#8-sistem-desain-uiux--desain-token)
9. [Keamanan, Operasional & Panduan Pemeliharaan](#9-keamanan-operasional--panduan-pemeliharaan)
10. [Rencana Pengembangan Masa Depan (Roadmap)](#10-rencana-pengembangan-masa-depan-roadmap)

---

## 1. Ringkasan Eksekutif & Identitas Brand

### 1.1 Profil Bisnis
**NOVIO** adalah atelier botani dan pemasok komoditas agrikultur premium Indonesia yang menggabungkan kemurnian alam, teknik pemeliharaan modern, dan estetika arsitektur biofilik berkelas.

NOVIO beroperasi melalui dua pusat operasional utama:
- **Studio Pusat & Kebun Pembibitan (Bandung Barat, Jawa Barat):** Terletak di Parongpong, fokus pada budidaya komoditas dataran tinggi (artisan tisane, microgreens gourmet, cuka fermentasi alami, edible flowers, dan pengolahan hasil panen).
- **Atelier Lanskap & Desain Biofilik (Nusa Dua, Badung, Bali):** Pusat konsultasi dan kurasi lanskap mewah untuk resort bintang lima, villa privat eksklusif, serta ruang komersial/kafe berkonsep botani tropis.

### 1.2 Nilai Inti (*Core Pillars*)
1. **Ketertelusuran Alami (*Organic & Traceable*):** Setiap komoditas dipanen langsung dari tanah vulkanis Parongpong dengan metode ramah lingkungan.
2. **Kualitas Artisan (*Artisan Batch Quality*):** Komoditas diproses dalam kuantitas terbatas (*small-batch*) untuk mempertahankan aroma, nutrisi, dan karakter khas.
3. **Harmoni Biofilik (*Biophilic Harmony*):** Membawa kehidupan botani alami ke dalam lanskap hidup manusia modern.
4. **Keberlanjutan Lingkungan (*Regenerative Practice*):** Pertanian tanpa limbah beracun, mendukung sirkularitas alam.
5. **Kurasi Terpercaya (*Hospitality-Grade Standards*):** Standar higienis dan visual yang memenuhi ekspektasi chef eksekutif dan arsitek lanskap internasional.
6. **Kemitraan Jangka Panjang (*Bespoke Consultation*):** Pendekatan personal mulai dari pemilihan bibit hingga instalasi lanskap dan perawatan berkala.

---

## 2. Arsitektur Sistem & Tech Stack

Sistem web NOVIO dibangun di atas fondasi teknologi web modern berbasis JAMstack dengan fokus performa tinggi, SEO maksimal, dan kemudahan manajemen konten langsung di halaman (*in-context editing*).

```
                      ┌───────────────────────────────────────────┐
                      │             KLIEN / BROWSER               │
                      │  (Desktop, Tablet, & Smartphone PWA-Ready)│
                      └─────────────────────┬─────────────────────┘
                                            │
                                            ▼
                      ┌───────────────────────────────────────────┐
                      │          NEXT.JS 14 (APP ROUTER)          │
                      │  - React 18 Server & Client Components    │
                      │  - SSG (Static Site Generation) 35 Pages  │
                      │  - Tailwind CSS 3.4 + Desain Token        │
                      └─────────────┬─────────────────────────────┘
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         │                                                     │
         ▼                                                     ▼
┌─────────────────────────────────┐           ┌─────────────────────────────────┐
│     CLIENT STORAGE ENGINE       │           │      SUPABASE CLOUD DATABASE    │
│ - LocalStorage Fast Cache       │◄─────────►│ - PostgreSQL (REST & Realtime)  │
│ - Ephemeral URL Hash/Query Sync │           │ - Persistent Cross-Device Sync  │
│ - Offline JSON Import/Export    │           │ - Row Level Security (Anon API) │
└─────────────────────────────────┘           └─────────────────────────────────┘
```

### 2.1 Komponen Teknologi Utama
| Layer | Teknologi | Versi | Alasan Pemilihan & Fungsi |
|---|---|---|---|
| **Core Framework** | Next.js (App Router) | `14.2.35` | SSR/SSG hibrida, rute dinamis cepat, optimasi aset gambar dan font bawaan. |
| **UI Library** | React | `18.3.1` | Komponen modular reaktif, state management via Context API. |
| **Language** | TypeScript | `5.x` | *Type-safety* ketat, integritas data produk, portfolio, dan artikel. |
| **Styling** | Tailwind CSS | `3.4.1` | Desain utilitas responsif, kustomisasi palet warna botani alam. |
| **Icons** | Lucide React | `0.378.0` | Set ikon SVG minimalis, elegan, dan ringan. |
| **Database Cloud** | Supabase | PostgreSQL 15 | Sinkronisasi data real-time antar laptop dan ponsel pengelola tanpa backend rumit. |
| **Animation & UX** | Framer Motion | `11.2.6` | Transisi halaman halus, interaksi *before-after slider*, dan accordion. |
| **Hosting & CI/CD** | Vercel | Edge Network | Deploy otomatis berbasis Git, global CDN caching, performa Core Web Vitals tinggi. |

---

## 3. Arsitektur Data Multi-Tier (Hybrid Storage)

Salah satu keunggulan terbesar NOVIO Web adalah **Arsitektur Data Hibrida 5 Lapis** yang memungkinkan pengelola mengedit data di mana saja tanpa khawatir data hilang atau perangkat tidak sinkron.

```
[Tier 1: Cloud Supabase]  ◄── Auto-Save ──►  [Tier 2: Browser LocalStorage]
         │                                                   │
         ▼                                                   ▼
[Tier 5: Backup File JSON]                 [Tier 3: URL Hash / WhatsApp Sync]
         │                                                   │
         └──────────────────► [Tier 4: Seed Data Static] ◄───┘
```

1. **Tier 1: Supabase Cloud Database (Paling Utama)**
   - Perubahan yang dilakukan di mode edit langsung otomatis tersimpan ke tabel `site_sections` di PostgreSQL Supabase.
   - Status sinkronisasi ditampilkan di bilah atas (*VisualEditBar*) dengan indikator: `Tersimpan di Cloud` / `Menyimpan...` / `Cloud Aktif`.
   - Menggunakan koneksi REST anonim dengan URL & Kunci API yang tersimpan aman.
2. **Tier 2: LocalStorage Fast Cache**
   - Setiap modifikasi disimpan seketika ke memori browser pengelola (`novio_admin_products`, `novio_admin_blog`, dsb.).
   - Menghasilkan pengalaman pengguna instan tanpa latensi jaringan (*zero-latency optimistic updates*).
3. **Tier 3: Cross-Device Ephemeral Sync (URL Hash / Query)**
   - Fitur "Sinkron HP" menghasilkan tautan terkompresi berisi seluruh data katalog baru.
   - Tautan ini dapat dikirimkan ke WhatsApp pengelola; saat dibuka di ponsel, seluruh produk dan editan langsung teraplikasikan ke memori HP.
4. **Tier 4: Seed Data Statis (Default Codebase)**
   - Jika pengguna baru membuka web untuk pertama kalinya dan belum terhubung ke database cloud, sistem membaca data baku dari folder `/data`.
5. **Tier 5: File Backup Ekspor / Impor JSON**
   - Pengelola dapat mengunduh file `.json` cadangan kapan saja dan mengunggahnya kembali ke perangkat lain hanya dalam 1 detik.

---

## 4. Fitur Utama & Modul Fungsional

### 4.1 In-Context Visual Content Management System (CMS)
- **Bilah Pengelola Ramping (`VisualEditBar.tsx`):**
  - Tinggi tetap `42px` yang terisolasi rapi di atas Navbar tanpa tumpang tindih.
  - Dilengkapi autentikasi PIN pengelola (`novio2026`).
  - Dilengkapi fitur *Pratinjau Pengunjung (Preview Mode)* untuk menyembunyikan tombol edit saat ingin mengecek tampilan riil.
- **Kartu Edit Langsung:**
  - Tombol `[Edit]` dan `[Hapus]` muncul tepat di atas setiap kartu Produk, Layanan, Portofolio, Artikel, dan Anggota Tim.
  - Tombol `[+ Tambah Item Baru]` tersedia langsung di setiap bagian katalog.
- **Arsitektur Modal Anti-Tembus (*Zero Bleed-Through*):**
  - Seluruh 15 jendela modal menggunakan z-index absolut tertinggi `z-[9999]`.
  - Latar belakang gelap berkelas `bg-black/80 backdrop-blur-md` yang menggelapkan halaman di belakang.
  - Warna kartu modal solid 100% (`#FBFAF6` atau `#F4F0E6`) sehingga teks dan elemen hero tidak akan pernah tembus atau bertabrakan.
  - *Body Scroll Lock*: Scroll halaman belakang otomatis terkunci saat modal terbuka.
  - Tombol melayang di pojok kiri bawah otomatis tersembunyi saat modal aktif.

### 4.2 Baki Kurasi Chef & Pengadaan (*Chef Curation Tray*)
- Dirancang khusus untuk klien B2B (Chef Eksekutif, Manajer F&B Hotel, Konsultan Kafe).
- Pengunjung dapat menekan tombol `+ Tambah ke Baki Kurasi` pada produk komoditas mana saja.
- Drawer baki kurasi (`ChefDrawer.tsx`) menghitung total komoditas, estimasi kebutuhan porsi, dan otomatis menyusun pesan format pemesanan instan ke WhatsApp.

### 4.3 Wizard Pembuat Brief Proyek Biofilik (`ProjectBriefWizard.tsx`)
- Alur 4 langkah interaktif untuk klien lanskap arsitektur:
  1. **Tipe Proyek:** Resort Mewah, Restoran/Kafe, Kantor Korporat, atau Hunian Privat.
  2. **Skala & Luas Area:** <100 m², 100-500 m², 500-2000 m², atau >2000 m².
  3. **Preferensi Botani:** Hutan Hujan Tropis, Tanaman Pangan Estetis, atau Taman Kering Minimalis.
  4. **Target Waktu & Anggaran:** Estimasi jadwal pengerjaan dan alokasi dana.
- Otomatis menghasilkan ringkasan brief teknis dan membuka percakapan WhatsApp dengan tim arsitek NOVIO.

### 4.4 Pencarian Global & Palet Perintah (`CommandPalette.tsx`)
- Dapat diakses dari tombol *Cari* di Navbar atau menggunakan tombol pintas `⌘K` (Mac) / `Ctrl+K` (Windows).
- Menelusuri seluruh database produk, spesifikasi, artikel jurnal, layanan, hingga navigasi halaman secara instan (*fuzzy-search*).

### 4.5 Slider Interaktif Komparasi Sebelum & Sesudah (`BeforeAfterSlider.tsx`)
- Digunakan pada studi kasus portofolio lanskap (misal: *Uluwatu Cliffside Sanctuary*).
- Pengguna dapat menggeser batas pemisah visual untuk melihat transformasi lahan sebelum dan sesudah instalasi botani oleh NOVIO.

### 4.6 Pengalih Bahasa Multilingual (`LanguageSwitcher.tsx`)
- Mendukung Bahasa Indonesia (ID) dan Bahasa Inggris (EN).
- Berbasis Google Translate API terintegrasi yang mempertahankan gaya tipografi dan tata letak elegan NOVIO.

### 4.7 Pemutar Musik Suasana Kebun (*Ambient Soundscape*)
- Komponen `AmbientAudioToggle.tsx` memungkinkan pengunjung mengaktifkan suara gemerisik daun dan alam Parongpong yang menenangkan saat menjelajahi website.

---

## 5. Struktur Repositori & Direktori

```
novio-web/
├── app/                                # Next.js 14 App Router
│   ├── layout.tsx                      # Root Layout, font Playfair & Manrope, Providers
│   ├── page.tsx                        # Beranda: Hero, Filosofi, Produk, Tim, Blog, CTA
│   ├── about/page.tsx                  # Tentang Kami: Kisah Parongpong & Nusa Dua
│   ├── product/                        # Katalog Produk
│   │   ├── page.tsx                    # Daftar produk dengan filter kategori
│   │   └── [slug]/page.tsx             # Detail produk spesifikasi & WhatsApp CTA
│   ├── services/page.tsx               # Layanan Konsultasi & Lanskap Botani
│   ├── portfolio/                      # Portofolio Proyek
│   │   ├── page.tsx                    # Galeri proyek selesai
│   │   └── [slug]/page.tsx             # Studi kasus mendalam (Before-After slider)
│   ├── blog/                           # Jurnal Botani & Wawasan
│   │   ├── page.tsx                    # Daftar artikel terbit
│   │   └── [slug]/page.tsx             # Halaman baca artikel editorial
│   ├── contact/page.tsx                # Kontak, formulir, & peta ganda (Bandung/Bali)
│   ├── brief/page.tsx                  # Wizard pembuat brief proyek interaktif
│   ├── admin/                          # Dashboard CMS Tabel & Kustomisasi
│   ├── api/cloud-sync/route.ts         # Endpoint API sinkronisasi cloud
│   ├── sitemap.ts                      # Generator sitemap SEO dinamis
│   ├── robots.ts                       # Konfigurasi perayap search engine
│   └── globals.css                     # Variabel warna botani, utilitas scrollbar
├── components/                         # Komponen Antarmuka Reusable
│   ├── Navbar.tsx                      # Header navigasi solid & responsif
│   ├── Footer.tsx                      # Footer Forest Green dengan kontak kantor
│   ├── VisualEditBar.tsx               # Bilah pengelola mode edit 42px
│   ├── ProductCard.tsx                 # Kartu produk dengan kontrol edit/hapus
│   ├── ServiceCard.tsx                 # Kartu paket layanan
│   ├── ProjectCard.tsx                 # Kartu portofolio proyek
│   ├── BlogCard.tsx                    # Kartu artikel jurnal
│   ├── TeamCard.tsx                    # Kartu anggota tim & spesialis
│   ├── BeforeAfterSlider.tsx           # Slider visual Before-After portofolio
│   ├── CommandPalette.tsx              # Modal pencarian cepat (Ctrl+K)
│   ├── ChefCurationDrawer.tsx          # Laci baki kurasi produk & rekap WA
│   ├── ProjectBriefWizard.tsx          # Wizard brief proyek biofilik 4-step
│   ├── GoogleMap.tsx                   # Peta interaktif studio kebun
│   ├── OfficeCard.tsx                  # Kartu detail alamat kantor Bandung/Bali
│   ├── AmbientAudioToggle.tsx          # Pemutar audio ambient botani
│   └── LanguageSwitcher.tsx            # Pengalih bahasa ID / EN
├── context/                            # React State & Context Providers
│   ├── SiteDataContext.tsx             # State sentral CRUD, Supabase sync, & 15 modal
│   ├── ChefCurationContext.tsx         # State baki kurasi produk & drawer
│   └── LiveCustomizerContext.tsx       # State kustomisasi teks dan heading dinamis
├── data/                               # Seed Data Statis Default
│   ├── products.ts                     # Katalog produk default
│   ├── services.ts                     # Daftar paket layanan default
│   ├── portfolio.ts                    # Daftar studi kasus portofolio default
│   ├── blog.ts                         # Artikel jurnal botani default
│   ├── team.ts                         # Anggota tim manajemen & kebun
│   └── site.ts                         # Konfigurasi situs & nomor WhatsApp
├── lib/                                # Utility Functions & Layanan Eksternal
│   ├── supabase.ts                     # Inisialisasi klien Supabase & konfigurasi
│   ├── supabaseService.ts              # Fungsi CRUD Supabase & skrip SQL otomatis
│   └── imageUtils.ts                   # Kompresi gambar client-side (Canvas WebP)
├── types/                              # Definisi Tipe TypeScript
│   └── index.ts                        # Interface Product, Blog, Service, Portfolio, dll.
├── public/                             # Aset Statis (Foto, Logo, Audio)
├── tailwind.config.ts                  # Konfigurasi tema, font, dan palet warna
├── next.config.mjs                     # Konfigurasi Next.js (optimasi gambar remote)
└── package.json                        # Dependensi proyek
```

---

## 6. Skema Data & Kontrak TypeScript

### 6.1 Model Data Inti (`types/index.ts`)

```typescript
// Produk Komoditas
export interface Product {
  id: string;
  slug: string;
  name: string;
  latinName?: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  gallery: string[];
  category: string;
  features: string[];
  published: boolean;
  inStock?: boolean;
  specifications?: Record<string, string>;
  origin?: string;
  environment?: 'Bright Indirect' | 'Low-Light Quiet' | 'AC-Resilient' | 'Veranda & Balcony';
  applications?: string[];
  chefNotes?: string;
  hotspots?: {
    x: number;
    y: number;
    title: string;
    description: string;
  }[];
}

// Layanan Konsultasi & Lanskap
export interface ServicePackage {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  targetAudience: string;
  coverImage: string;
  features: string[];
  deliverables: string[];
  pricingModel: string;
  guarantee: string;
  recommendedFor: string;
  whatsappMessage: string;
  popular?: boolean;
}

// Portofolio Proyek
export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  clientCategory: ProjectCategory;
  location: string;
  year: string;
  coverImage: string;
  gallery: string[];
  beforeImage: string;
  afterImage: string;
  excerpt: string;
  challenge: string;
  solution: string;
  curatedSpecimens: string[];
  testimonial?: {
    quote: string;
    clientName: string;
    clientRole: string;
  };
  featured: boolean;
}

// Artikel Jurnal
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords?: string[];
  };
  readTimeMinutes?: number;
}
```

### 6.2 Skema Tabel Supabase Cloud Database (`SQL`)

Struktur tabel di Supabase dibuat sangat fleksibel untuk menampung seluruh dataset dalam format JSONB berkecepatan tinggi:

```sql
-- Membuat tabel penyimpanan konfigurasi dan konten situs NOVIO
CREATE TABLE IF NOT EXISTS public.site_sections (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Mengaktifkan Row Level Security (RLS)
ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Baca Terbuka (Public Read)
CREATE POLICY "Public Read Site Sections" 
  ON public.site_sections 
  FOR SELECT 
  TO anon, authenticated 
  USING (true);

-- Kebijakan Simpan / Pembaruan Data Pengelola
CREATE POLICY "Allow Insert and Update Site Sections" 
  ON public.site_sections 
  FOR ALL 
  TO anon, authenticated 
  USING (true)
  WITH CHECK (true);
```

---

## 7. Sitemap, Routing & Rendering Strategy

| Rute URL | Tipe Halaman | Strategi Rendering | Deskripsi & Komponen Kunci |
|---|---|---|---|
| `/` | Beranda | SSG (Static) | Hero banner, nilai komitmen, cuplikan produk, tim, artikel terbaru, & CTA. |
| `/about` | Profil Perusahaan | SSG (Static) | Filosofi botani, profil studio Parongpong & Nusa Dua, serta sertifikasi. |
| `/product` | Katalog Produk | SSG (Static + Client Filter) | Filter kategori instan, pencarian, & tombol baki kurasi chef. |
| `/product/[slug]` | Detail Produk | SSG (Dynamic Paths) | Galeri foto spesimen, spesifikasi teknis, catatan chef, & tombol order WA. |
| `/services` | Halaman Layanan | SSG (Static) | Paket layanan biofilik, timeline alur kerja, & FAQ terperinci. |
| `/portfolio` | Galeri Portofolio | SSG (Static) | Filter kategori proyek lanskap resort, residensial, & kafe. |
| `/portfolio/[slug]`| Detail Portofolio | SSG (Dynamic Paths) | Slider Before-After interaktif, tantangan, solusi, & testimoni klien. |
| `/blog` | Jurnal Editorial | SSG (Static) | Berita hortikultura, riset tisane, & panduan botani kuliner. |
| `/blog/[slug]` | Artikel Jurnal | SSG (Dynamic Paths) | Pembaca artikel kaya tipografi, estimasi waktu baca, & rekomendasi. |
| `/contact` | Kontak & Lokasi | SSG (Static) | Formulir terintegrasi WhatsApp, alamat, & Google Maps interaktif dua studio. |
| `/brief` | Project Brief Wizard| SSG (Static) | Panduan konsultasi lanskap 4 langkah langsung terhubung ke arsitek. |
| `/admin` | CMS Dashboard | Client-Side (PIN Secured)| Tabel ringkasan seluruh entitas data untuk manajemen cepat. |
| `/sitemap.xml` | SEO Sitemap | Dynamic XML | Peta situs XML otomatis untuk Google Search Console. |
| `/robots.txt` | Aturan Spider | Dynamic Text | Instruksi perayapan mesin pencari. |

---

## 8. Sistem Desain (UI/UX & Desain Token)

### 8.1 Palet Warna Botani (*Botanical Color Palette*)

| Token | Nama Warna | Kode Hex | Penggunaan Utama |
|---|---|---|---|
| `forest` | **Forest Green** | `#183C2B` | Warna brand utama, header admin bar, latar belakang footer, teks primer. |
| `garden` | **Garden Green** | `#356B45` | Warna aksen alam, tombol aksi utama (*Call to Action*), highlight aktif. |
| `olive` | **Olive Leaf** | `#70855A` | Warna aksen dedaunan lembut, garis aksen, ornamen kartu. |
| `sage` | **Sage Green** | `#A8B69A` | Warna border halus, tag kategori, badge status, scrollbar thumb. |
| `earth` | **Earth Brown** | `#795C3A` | Warna tanah vulkanis hangat, indikator wajib pada form, tombol batal. |
| `cream` | **Warm Cream** | `#F4F0E6` | Latar belakang kartu modal, striping section beranda selang-seling. |
| `softwhite` | **Soft White** | `#FBFAF6` | Latar kanvas halaman utama, latar belakang form input dan kartu produk. |
| `charcoal` | **Charcoal Dark** | `#20251F` | Tipografi beranda dan isi artikel untuk keterbacaan kontras tinggi (*WCAG AAA*). |

### 8.2 Tipografi
- **Headings & Judul Utama:** `Playfair Display` (Google Fonts, Serif) — Memberikan kesan mewah (*luxury*), anggun, dan berkarakter editorial majalah botani premium.
- **Teks Paragraf & UI:** `Manrope` (Google Fonts, Sans-Serif) — Tipografi geometris bersih dengan keterbacaan tinggi di layar sentuh ponsel.

### 8.3 Breakpoint Responsif & Ergonomi Mobile
- `xs` (<480px): Mode smartphone satu kolom, tombol ramah jempol (tinggi sentuh minimum 42px).
- `sm` (640px): Tablet vertikal, modal memenuhi 92% tinggi layar (*safe-area friendly*).
- `md` (768px): Tablet horizontal, grid dua kolom untuk produk dan portofolio.
- `lg` (1024px): Laptop, grid 3-4 kolom dengan navigasi desktop lengkap.
- `xl` (1280px): Monitor desktop lebar, pembatasan `max-w-7xl` untuk visual terpusat dan seimbang.

---

## 9. Keamanan, Operasional & Panduan Pemeliharaan

### 9.1 Keamanan Sistem
1. **PIN Pengelola:** Akses mode edit visual dan dashboard CMS dilindungi oleh PIN `novio2026` (dapat diubah di `SiteDataContext.tsx`).
2. **Sanitasi Data:** Semua input formulir dan modal dibersihkan dari tag berbahaya sebelum disimpan ke LocalStorage atau Supabase.
3. **Optimasi Memori LocalStorage:** Gambar yang diunggah melalui formulir edit otomatis dikompresi ke format WebP berdimensi maksimum 1200px dan kualitas 75% via HTML5 Canvas (`imageUtils.ts`) agar tidak melebihi kuota penyimpanan browser.

### 9.2 Prosedur Menambah & Mengedit Produk
1. Buka website di browser dan klik tombol melayang **[Mode Edit Web]** di pojok kiri bawah.
2. Masukkan PIN pengelola: `novio2026`.
3. Navigasikan ke bagian **Produk**, lalu klik tombol **[+ Tambah Produk Baru]** atau klik **[Edit]** pada kartu produk yang ingin diubah.
4. Isi formulir: Nama, Kategori, Deskripsi, Fitur, dan unggah foto produk.
5. Klik **[Simpan Produk]**.
6. Sistem akan otomatis menyimpan ke memori lokal dan mengirimkan salinan data ke Supabase Cloud.

### 9.3 Prosedur Sinkronisasi Data ke HP
1. Pada bilah atas pengelola, klik tombol hijau **[Sinkron HP]**.
2. **Metode 1 (Supabase Cloud):** Jika Supabase sudah terhubung, HP Anda cukup membuka alamat web yang sama dan data otomatis terbarui.
3. **Metode 2 (Tautan WhatsApp Instan):** Klik tombol *Salin Link Sinkronisasi* atau *Kirim via WhatsApp*, lalu buka tautan tersebut di ponsel pengelola.
4. **Metode 3 (File JSON):** Klik tombol *Unduh File Cadangan (.json)* di laptop, lalu di HP buka menu Sinkron HP dan pilih *Impor File JSON*.

---

## 10. Rencana Pengembangan Masa Depan (Roadmap)

```
[Fase 1: Fondasi & Visual CMS] ──► [Fase 2: Supabase Cloud & PWA] ──► [Fase 3: B2B Portal & E-Commerce]
         (SELESAI)                          (SELESAI)                         (TERENCANA)
```

1. **Fase 1 (Selesai):** Pembuatan fondasi App Router Next.js, implementasi katalog produk, portofolio, jurnal botani, formulir kontak ganda, dan mode edit visual di halaman.
2. **Fase 2 (Selesai):** Integrasi hybrid database Supabase, perbaikan modal anti-bleedthrough, penguncian scroll, baki kurasi chef, pencarian Command Palette ⌘K, dan optimasi mobile responsif.
3. **Fase 3 (Masa Depan):**
   - **Payment Gateway Langsung:** Integrasi Midtrans / Xendit untuk pembayaran langsung sampel produk tisane dan cuka artisan.
   - **PWA Lengkap (*Progressive Web App*):** Dukungan instalasi aplikasi langsung di homescreen Android & iOS dengan kemampuan offline penuh.
   - **Kamera AR Botani:** Fitur WebXR untuk menempatkan spesimen tanaman secara virtual di ruangan hotel atau villa klien.
   - **Portal Pelanggan B2B:** Dashboard khusus untuk mitra hotel/restoran dengan harga grosir dan pelacakan jadwal panen rutin.

---
*Blueprint disusun secara resmi untuk proyek pengembangan website NOVIO.*  
*Hak Cipta © 2026 NOVIO Botanical & Agricultural Atelier. Seluruh Hak Cipta Dilindungi Undang-Undang.*
