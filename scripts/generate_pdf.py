import os
import sys
import base64
import subprocess
import shutil

print("Preparing to generate NOVIO Master Project Blueprint PDF...")

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
logo_path = os.path.join(base_dir, 'public', 'novio-logo.png')
logo_base64 = ''
if os.path.exists(logo_path):
    with open(logo_path, 'rb') as f:
        logo_base64 = 'data:image/png;base64,' + base64.b64encode(f.read()).decode('utf-8')

html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>NOVIO — Master Project Blueprint</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    @page {{
      size: A4 portrait;
      margin: 16mm 14mm 16mm 14mm;
      @bottom-right {{
        content: counter(page);
        font-family: 'Manrope', sans-serif;
        font-size: 8pt;
        color: #70855A;
      }}
      @bottom-left {{
        content: "NOVIO Botanical Atelier — Master Blueprint v2.4";
        font-family: 'Manrope', sans-serif;
        font-size: 8pt;
        color: #70855A;
      }}
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #20251F;
      background-color: #FFFFFF;
      font-size: 9pt;
      line-height: 1.5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}

    .cover-page {{
      page-break-after: always;
      height: 100vh;
      min-height: 250mm;
      background: linear-gradient(145deg, #0F271C 0%, #183C2B 55%, #23533C 100%);
      color: #FBFAF6;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 26mm 18mm 22mm 18mm;
      border-radius: 6px;
    }}

    .cover-top {{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}

    .cover-logo-wrapper {{
      display: flex;
      align-items: center;
      gap: 14px;
    }}

    .cover-logo-img {{
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 2px solid #A8B69A;
      background: #0F271C;
      object-fit: contain;
      padding: 4px;
    }}

    .cover-brand-title {{
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 26pt;
      letter-spacing: 0.15em;
      font-weight: 800;
      color: #FBFAF6;
    }}

    .cover-pill-badge {{
      display: inline-block;
      padding: 5px 12px;
      background: rgba(168, 182, 154, 0.2);
      border: 1px solid rgba(168, 182, 154, 0.5);
      border-radius: 20px;
      font-size: 8pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #A8B69A;
    }}

    .cover-center {{
      margin: auto 0;
      padding-top: 15mm;
      padding-bottom: 15mm;
    }}

    .cover-doc-type {{
      font-size: 10pt;
      font-weight: 800;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: #A8B69A;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .cover-doc-type::before {{
      content: "";
      display: inline-block;
      width: 28px;
      height: 2px;
      background-color: #A8B69A;
    }}

    .cover-main-title {{
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 32pt;
      font-weight: 800;
      line-height: 1.15;
      color: #FBFAF6;
      margin-bottom: 14px;
    }}

    .cover-subtitle {{
      font-size: 12pt;
      font-weight: 400;
      color: #E8E2D2;
      max-width: 600px;
      line-height: 1.55;
    }}

    .cover-meta-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      padding-top: 18px;
      border-top: 1px solid rgba(168, 182, 154, 0.3);
    }}

    .cover-meta-item h5 {{
      font-size: 7pt;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #A8B69A;
      margin-bottom: 3px;
      font-weight: 700;
    }}

    .cover-meta-item p {{
      font-size: 9pt;
      font-weight: 600;
      color: #FBFAF6;
    }}

    .section-break {{
      page-break-before: always;
    }}

    h1, h2, h3, h4 {{
      font-family: 'Playfair Display', Georgia, serif;
      color: #183C2B;
      page-break-after: avoid;
    }}

    h1 {{
      font-size: 18pt;
      font-weight: 800;
      border-bottom: 2px solid #356B45;
      padding-bottom: 5px;
      margin-top: 14px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    h2 {{
      font-size: 13pt;
      font-weight: 700;
      color: #23533C;
      margin-top: 14px;
      margin-bottom: 6px;
    }}

    h3 {{
      font-size: 10.5pt;
      font-weight: 700;
      color: #356B45;
      margin-top: 10px;
      margin-bottom: 5px;
    }}

    p {{
      margin-bottom: 8px;
      text-align: justify;
      color: #20251F;
    }}

    strong {{
      color: #183C2B;
      font-weight: 700;
    }}

    table {{
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 14px 0;
      font-size: 8pt;
      page-break-inside: avoid;
    }}

    th {{
      background-color: #183C2B;
      color: #FBFAF6;
      font-weight: 700;
      text-align: left;
      padding: 7px 9px;
      border: 1px solid #183C2B;
      text-transform: uppercase;
      font-size: 7pt;
      letter-spacing: 0.05em;
    }}

    td {{
      padding: 6px 9px;
      border: 1px solid #D6DFC9;
      color: #20251F;
      vertical-align: top;
    }}

    tr:nth-child(even) td {{
      background-color: #F8F6F0;
    }}

    .diagram-wrapper {{
      background: #F4F0E6;
      border: 1.5px solid #A8B69A;
      border-radius: 8px;
      padding: 14px;
      margin: 12px 0;
      page-break-inside: avoid;
    }}

    .diagram-title {{
      font-size: 8.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #183C2B;
      margin-bottom: 10px;
      text-align: center;
    }}

    .arch-grid {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }}

    .arch-card {{
      background: #FFFFFF;
      border: 1px solid #CCD6C0;
      border-radius: 6px;
      padding: 9px;
    }}

    .arch-card-header {{
      font-size: 8pt;
      font-weight: 800;
      color: #183C2B;
      border-bottom: 1.5px solid #356B45;
      padding-bottom: 3px;
      margin-bottom: 5px;
    }}

    .arch-card ul {{
      list-style-type: none;
      padding-left: 0;
    }}

    .arch-card li {{
      font-size: 7.5pt;
      color: #4A5248;
      margin-bottom: 3px;
    }}

    .arch-card li::before {{
      content: "• ";
      color: #356B45;
      font-weight: bold;
    }}

    pre {{
      background-color: #131E18;
      color: #E2EBD8;
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 7pt;
      line-height: 1.4;
      padding: 10px 12px;
      border-radius: 6px;
      border-left: 3px solid #356B45;
      margin: 8px 0 12px 0;
      overflow-x: hidden;
      white-space: pre-wrap;
      page-break-inside: avoid;
    }}

    code {{
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 7.5pt;
      background: #EAE6DB;
      color: #183C2B;
      padding: 1px 4px;
      border-radius: 3px;
    }}

    .callout-box {{
      background-color: #F8FBF7;
      border-left: 3.5px solid #356B45;
      padding: 8px 12px;
      border-radius: 0 6px 6px 0;
      margin: 10px 0;
      page-break-inside: avoid;
    }}

    .callout-title {{
      font-weight: 800;
      font-size: 8pt;
      color: #183C2B;
      margin-bottom: 3px;
    }}

    .callout-content {{
      font-size: 8pt;
      color: #374151;
      margin: 0;
    }}

    .feature-grid {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin: 10px 0;
      page-break-inside: avoid;
    }}

    .feature-card {{
      background: #FAF8F2;
      border: 1px solid #D6DFC9;
      border-radius: 6px;
      padding: 9px 11px;
    }}

    .feature-card-title {{
      font-size: 8.5pt;
      font-weight: 700;
      color: #183C2B;
      margin-bottom: 3px;
    }}

    .feature-card-desc {{
      font-size: 7.5pt;
      color: #4B5563;
      margin: 0;
      line-height: 1.4;
    }}

    .color-swatch-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin: 10px 0;
      page-break-inside: avoid;
    }}

    .color-swatch-card {{
      border: 1px solid #D6DFC9;
      border-radius: 6px;
      overflow: hidden;
      background: #FFFFFF;
    }}

    .color-swatch-box {{
      height: 32px;
      width: 100%;
    }}

    .color-swatch-info {{
      padding: 5px 7px;
    }}

    .color-swatch-name {{
      font-size: 7.5pt;
      font-weight: 700;
      color: #20251F;
    }}

    .color-swatch-hex {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 7pt;
      color: #6B7280;
    }}

    .doc-footer {{
      margin-top: 24px;
      padding-top: 10px;
      border-top: 1px solid #D6DFC9;
      display: flex;
      justify-content: space-between;
      font-size: 7pt;
      color: #70855A;
      page-break-inside: avoid;
    }}
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-top">
      <div class="cover-logo-wrapper">
        <img class="cover-logo-img" src="{logo_base64}" alt="NOVIO Logo" />
        <div>
          <div class="cover-brand-title">NOVIO</div>
          <div style="font-size: 8pt; letter-spacing: 0.12em; color: #A8B69A; text-transform: uppercase;">Botanical &amp; Agricultural Atelier</div>
        </div>
      </div>
      <div class="cover-pill-badge">Official Architecture Document</div>
    </div>

    <div class="cover-center">
      <div class="cover-doc-type">Master Project Blueprint</div>
      <div class="cover-main-title">Sistem Aplikasi Web &amp; CMS Botani Terintegrasi</div>
      <div class="cover-subtitle">
        Dokumen teknis komprehensif yang memetakan arsitektur sistem, skema data multi-tier, desain antarmuka, protokol sinkronisasi cloud, dan operasional platform web resmi NOVIO.
      </div>
    </div>

    <div>
      <div class="cover-meta-grid">
        <div class="cover-meta-item">
          <h5>Versi Dokumen</h5>
          <p>v2.4 (Production-Ready)</p>
        </div>
        <div class="cover-meta-item">
          <h5>Status Rilis</h5>
          <p>Live on Vercel Edge</p>
        </div>
        <div class="cover-meta-item">
          <h5>Pusat Operasional</h5>
          <p>Parongpong &amp; Nusa Dua</p>
        </div>
        <div class="cover-meta-item">
          <h5>Waktu Penyusunan</h5>
          <p>September 2026</p>
        </div>
      </div>
    </div>
  </div>

  <!-- TABLE OF CONTENTS & EXECUTIVE SUMMARY -->
  <div>
    <h1>1. Ringkasan Eksekutif &amp; Identitas Brand</h1>
    
    <h2>1.1 Profil Perusahaan</h2>
    <p>
      <strong>NOVIO</strong> adalah atelier botani terpadu dan penyedia komoditas agrikultur artisan premium Indonesia. Menggabungkan kesuburan tanah vulkanis dataran tinggi Parongpong dengan teknik hortikultura berstandar internasional, NOVIO melayani dua vertikal pasar strategis:
    </p>

    <div class="feature-grid">
      <div class="feature-card">
        <div class="feature-card-title">🌱 Kebun Induk &amp; Pembibitan Parongpong</div>
        <div class="feature-card-desc">
          <strong>Lokasi:</strong> Bandung Barat, Jawa Barat.<br>
          <strong>Fokus:</strong> Produksi komoditas panen artisan (racikan tisane herbal, microgreens gourmet, cuka fermentasi alami berumur, bunga konsumsi/edible flowers, dan hasil olahan segar dataran tinggi).
        </div>
      </div>
      <div class="feature-card">
        <div class="feature-card-title">🌺 Studio Desain Biofilik &amp; Lanskap Bali</div>
        <div class="feature-card-desc">
          <strong>Lokasi:</strong> Nusa Dua, Badung, Bali.<br>
          <strong>Fokus:</strong> Konsultasi, rancang bangun, dan kurasi instalasi botani mewah untuk resort bintang lima, villa privat eksklusif, kantor korporat modern, dan ruang makan gastronomi.
        </div>
      </div>
    </div>

    <h2>1.2 Enam Pilar Filosofi (Core Pillars)</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Pilar Filosofi</th>
          <th style="width: 35%;">Manifestasi Teknis</th>
          <th style="width: 40%;">Dampak pada Pengguna / Klien</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1. Ketertelusuran Alami (Traceable Origin)</strong></td>
          <td>Setiap komoditas memiliki label elevasi tanam dan tanggal panen batch Parongpong.</td>
          <td>Klien hotel dan restoran mendapatkan transparansi bahan baku higienis kualitas gourmet.</td>
        </tr>
        <tr>
          <td><strong>2. Kualitas Artisan (Small-Batch)</strong></td>
          <td>Pengolahan dalam kuantitas terbatas, tanpa zat aditif buatan atau pewarna kimiawi.</td>
          <td>Aroma, rasa alami, dan khasiat fitonutrien tanaman tetap terjaga maksimal.</td>
        </tr>
        <tr>
          <td><strong>3. Harmoni Biofilik (Biophilic Harmony)</strong></td>
          <td>Penyatuan tanaman hidup ke dalam arsitektur hunian dan perhotelan.</td>
          <td>Meningkatkan kualitas udara, menurunkan tingkat stres, dan menghadirkan kemewahan alami.</td>
        </tr>
        <tr>
          <td><strong>4. Praktik Regeneratif (Eco-Regenerative)</strong></td>
          <td>Penggunaan kompos sisa panen organik dan penghematan sirkulasi air kabut.</td>
          <td>Memastikan kelestarian ekosistem tanah pegunungan untuk generasi mendatang.</td>
        </tr>
        <tr>
          <td><strong>5. Standar Hospitaliti (Hospitality-Grade)</strong></td>
          <td>Sortir visual ketat sesuai parameter estetika chef eksekutif dan fotografer kuliner.</td>
          <td>Kerapian visual dan ketahanan komoditas yang siap saji di meja santap mewah.</td>
        </tr>
        <tr>
          <td><strong>6. Kemitraan Kustom (Bespoke Service)</strong></td>
          <td>Layanan konsultasi pemilihan bibit, penataan ruang, hingga perawatan berkala.</td>
          <td>Kenyamanan klien VIP dengan pendampingan langsung dari agronomis NOVIO.</td>
        </tr>
      </tbody>
    </table>

    <div class="callout-box">
      <div class="callout-title">🎯 Tujuan Platform Web</div>
      <p class="callout-content">
        Platform web NOVIO dirancang sebagai <strong>Digital Showroom &amp; Visual Procurement Engine</strong> interaktif yang memudahkan pengelola memperbarui katalog secara instan, serta memfasilitasi chef dan arsitek dalam menyusun pesanan komoditas via WhatsApp secara langsung.
      </p>
    </div>
  </div>

  <!-- SECTION 2: SYSTEM ARCHITECTURE -->
  <div class="section-break">
    <h1>2. Arsitektur Sistem &amp; Tech Stack</h1>

    <div class="diagram-wrapper">
      <div class="diagram-title">Diagram Arsitektur Komponen Jamstack NOVIO</div>
      <div class="arch-grid">
        <div class="arch-card">
          <div class="arch-card-header">Presentation Layer</div>
          <ul>
            <li>Next.js 14.2.35 (App Router)</li>
            <li>React 18.3 Server Components</li>
            <li>Tailwind CSS 3.4 Utilitas</li>
            <li>Google Fonts Playfair &amp; Manrope</li>
            <li>Lucide React Modern Icons</li>
            <li>Framer Motion Interaksi Animasi</li>
          </ul>
        </div>
        <div class="arch-card">
          <div class="arch-card-header">Business &amp; CMS Layer</div>
          <ul>
            <li>VisualEditBar (Mode Edit 42px)</li>
            <li>PIN Security Engine (novio2026)</li>
            <li>Chef Curation Tray Context</li>
            <li>Project Brief Wizard 4-Step</li>
            <li>Global Command Palette (Ctrl+K)</li>
            <li>Canvas Image Compression WebP</li>
          </ul>
        </div>
        <div class="arch-card">
          <div class="arch-card-header">Storage &amp; Infra Layer</div>
          <ul>
            <li>Supabase PostgreSQL (Cloud)</li>
            <li>Browser LocalStorage (Fast Cache)</li>
            <li>Compressed URL Hash Sync</li>
            <li>Vercel Edge CDN Deployment</li>
            <li>Static Site Generation (35 Rute)</li>
            <li>Dynamic Sitemap.xml Generator</li>
          </ul>
        </div>
      </div>
    </div>

    <h2>2.1 Spesifikasi Dependensi Produksi</h2>
    <table>
      <thead>
        <tr>
          <th>Modul / Paket</th>
          <th>Versi</th>
          <th>Tipe Dependensi</th>
          <th>Peran Spesifik dalam Sistem</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>next</code></td>
          <td>14.2.35</td>
          <td>Framework Inti</td>
          <td>Rendering SSR/SSG, optimasi gambar remote, dynamic routes <code>[slug]</code>.</td>
        </tr>
        <tr>
          <td><code>react</code> / <code>react-dom</code></td>
          <td>18.3.1</td>
          <td>UI Library</td>
          <td>Virtual DOM, concurrent features, Context API state management.</td>
        </tr>
        <tr>
          <td><code>typescript</code></td>
          <td>^5</td>
          <td>Compiler</td>
          <td>Strict type checking untuk data Product, Portfolio, Blog, dan Service.</td>
        </tr>
        <tr>
          <td><code>tailwindcss</code></td>
          <td>^3.4.1</td>
          <td>Styling Engine</td>
          <td>Kompilasi CSS utilitas, desain token palet botani, responsif mobile.</td>
        </tr>
        <tr>
          <td><code>@supabase/supabase-js</code></td>
          <td>^2.49.1</td>
          <td>Database Client</td>
          <td>Koneksi REST API &amp; Realtime PostgreSQL untuk sinkronisasi cloud.</td>
        </tr>
        <tr>
          <td><code>lucide-react</code></td>
          <td>^0.378.0</td>
          <td>Ikon Vektor</td>
          <td>Set ikon visual minimalis dan ringan di seluruh antarmuka.</td>
        </tr>
        <tr>
          <td><code>framer-motion</code></td>
          <td>^11.2.6</td>
          <td>Animasi</td>
          <td>Slider Before-After, transisi accordion, dan baki kurasi drawer.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SECTION 3: MULTI-TIER DATA ENGINE -->
  <div class="section-break">
    <h1>3. Arsitektur Data Multi-Tier (Hybrid Storage)</h1>
    <p>
      Tantangan terbesar sistem website portabel adalah bagaimana memastikan pengelola dapat mengedit data langsung dari halaman tanpa harus membuka panel admin terpisah, sekaligus menjamin data tersebut <strong>otomatis tersinkronisasi permanen ke cloud</strong> dan dapat dipindahkan ke HP secara instan.
    </p>

    <div class="feature-grid">
      <div class="feature-card">
        <div class="feature-card-title">☁️ Tier 1: Supabase Cloud Database (PostgreSQL)</div>
        <div class="feature-card-desc">
          Setiap kali ada penambahan atau pengubahan produk/teks, sistem otomatis menyimpan payload JSONB ke tabel <code>site_sections</code> di Supabase. Begitu tersimpan, pengunjung lain di seluruh dunia langsung melihat data terbaru secara permanen.
        </div>
      </div>
      <div class="feature-card">
        <div class="feature-card-title">⚡ Tier 2: Browser LocalStorage (Fast Cache)</div>
        <div class="feature-card-desc">
          Menyimpan salinan data di memori browser pengelola secara optimistik. Memberikan kecepatan instan 0 milidetik saat mengklik simpan tanpa menunggu respon server.
        </div>
      </div>
      <div class="feature-card">
        <div class="feature-card-title">📲 Tier 3: Ephemeral URL Hash / Query Sync</div>
        <div class="feature-card-desc">
          Modul sinkronisasi yang mengompres seluruh database menjadi string tautan unik. Pengelola dapat menyalin tautan ini dan membukanya di HP atau mengirimkannya via WhatsApp untuk sinkronisasi 1-klik.
        </div>
      </div>
      <div class="feature-card">
        <div class="feature-card-title">📦 Tier 4: Hardcoded Baseline Seed Data</div>
        <div class="feature-card-desc">
          Jika browser pengunjung baru belum memiliki data LocalStorage dan Supabase sedang offline, aplikasi secara mulus menggunakan data bawaan di direktori <code>data/</code> sebagai cadangan aman.
        </div>
      </div>
    </div>

    <h2>3.1 Alur Kerja Sinkronisasi Data Otomatis</h2>
    <div class="callout-box">
      <div class="callout-title">Siklus Hidup Edit Data:</div>
      <p class="callout-content">
        Pengelola menekan <code>[Simpan Produk]</code> ➔ Sistem memperbarui State React ➔ Menulis ke <code>localStorage</code> (Cache Lokal) ➔ Mengirim payload ke Supabase Cloud REST API ➔ Mengubah badge status di bilah atas menjadi <code>[Tersimpan di Cloud]</code> secara real-time.
      </p>
    </div>
  </div>

  <!-- SECTION 4: CORE FEATURES & CAPABILITIES -->
  <div class="section-break">
    <h1>4. Fitur Utama &amp; Modul Interaktif</h1>

    <h2>4.1 In-Context Visual CMS &amp; Modal Anti-Tembus (Zero Bleed-Through)</h2>
    <ul>
      <li><strong>Bilah Pengelola Ramping (42px):</strong> Berada di puncak layar dengan z-index <code>z-[60]</code>, tidak menutupi atau bertabrakan dengan logo Navbar di bawahnya. Dilengkapi tombol aktivasi PIN (<code>novio2026</code>).</li>
      <li><strong>15 Jendela Modal Solid 100%:</strong> Seluruh modal edit beroperasi di layer tertinggi <code>z-[9999]</code>. Dilengkapi latar belakang fisik solid (<code>#FBFAF6</code> dan <code>#F4F0E6</code>) serta overlay hitam gelap <code>bg-black/80 backdrop-blur-md</code>. Teks hero atau navbar tidak akan pernah tembus pandang.</li>
      <li><strong>Body Scroll Lock:</strong> Ketika modal terbuka, scroll halaman belakang otomatis dikunci (<code>overflow: hidden</code>) untuk mencegah halaman bergeser.</li>
      <li><strong>Auto-Hide Floating Controls:</strong> Tombol status di pojok kiri bawah otomatis disembunyikan saat modal terbuka sehingga tombol aksi <code>[TUTUP JENDELA]</code> dan <code>[SIMPAN]</code> tidak tertimpa.</li>
    </ul>

    <h2>4.2 Baki Kurasi Chef (Chef Curation Tray)</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <div class="feature-card-title">🍳 Bookmark Cepat Spesimen Komoditas</div>
        <div class="feature-card-desc">
          Koki dapat menambahkan produk ke baki kurasi dari halaman katalog atau halaman detail hanya dengan satu ketukan tombol.
        </div>
      </div>
      <div class="feature-card">
        <div class="feature-card-title">📝 Rekap Pesanan &amp; Export ke WhatsApp</div>
        <div class="feature-card-desc">
          Baki kurasi otomatis menyusun daftar komoditas terpilih menjadi pesan teks terformat rapi dan membuka aplikasi WhatsApp tim penjualan NOVIO.
        </div>
      </div>
    </div>

    <h2>4.3 Wizard Pembuat Brief Lanskap Biofilik (4 Langkah)</h2>
    <table>
      <thead>
        <tr>
          <th>Langkah</th>
          <th>Nama Tahapan</th>
          <th>Pilihan Opsi Kunci</th>
          <th>Tujuan Output</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Tahap 1</strong></td>
          <td>Tipologi Ruang Proyek</td>
          <td>Resort Mewah, Restoran/Kafe, Kantor Korporat, Villa Privat.</td>
          <td>Menentukan tema arsitektur dan kebutuhan ketahanan tanaman.</td>
        </tr>
        <tr>
          <td><strong>Tahap 2</strong></td>
          <td>Skala Luas Area</td>
          <td>&lt;100 m², 100 - 500 m², 500 - 2000 m², &gt;2000 m².</td>
          <td>Perhitungan kuota bibit dan tim pelaksana lanskap.</td>
        </tr>
        <tr>
          <td><strong>Tahap 3</strong></td>
          <td>Preferensi Karakter Flora</td>
          <td>Hutan Hujan Tropis, Tanaman Pangan Estetis, Taman Kering Zen.</td>
          <td>Kurasi spesimen botani Parongpong yang cocok.</td>
        </tr>
        <tr>
          <td><strong>Tahap 4</strong></td>
          <td>Target Waktu &amp; Alokasi</td>
          <td>Jadwal realisasi &amp; rentang anggaran proyek.</td>
          <td>Penyusunan proposal komersial formal oleh tim arsitek.</td>
        </tr>
      </tbody>
    </table>

    <h2>4.4 Fitur Pendukung Interaktif Lainnya</h2>
    <p>
      - <strong>Slider Before &amp; After:</strong> Menampilkan transformasi lahan secara visual di halaman studi kasus proyek portofolio.<br>
      - <strong>Command Palette (⌘K / Ctrl+K):</strong> Navigasi dan pencarian instan ke seluruh penjuru website.<br>
      - <strong>Pengalih Bahasa (Language Switcher):</strong> Dukungan dwibahasa Bahasa Indonesia dan Bahasa Inggris.<br>
      - <strong>Audio Ambient Kebun:</strong> Pemutar musik suara alam Parongpong yang dapat diaktifkan di pojok bawah.
    </p>
  </div>

  <!-- SECTION 5: DATABASE SCHEMA & TYPESCRIPT -->
  <div class="section-break">
    <h1>5. Skema Data &amp; Kontrak TypeScript</h1>

    <h3>5.1 Skema SQL Supabase Cloud Database</h3>
    <pre><code>-- Tabel Penyimpanan Bagian &amp; Entitas Situs NOVIO
CREATE TABLE IF NOT EXISTS public.site_sections (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Pengaktifan Keamanan Row Level Security (RLS)
ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Baca Terbuka (Public Read)
CREATE POLICY "Public Read Site Sections" 
  ON public.site_sections FOR SELECT 
  TO anon, authenticated USING (true);

-- Kebijakan Simpan &amp; Perbarui Data
CREATE POLICY "Allow Insert and Update Site Sections" 
  ON public.site_sections FOR ALL 
  TO anon, authenticated USING (true) 
  WITH CHECK (true);</code></pre>

    <h3>5.2 Definisi Model Produk &amp; Layanan (TypeScript)</h3>
    <pre><code>export interface Product {{
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
  specifications?: Record&lt;string, string&gt;;
  origin?: string;
  environment?: 'Bright Indirect' | 'Low-Light Quiet' | 'AC-Resilient' | 'Veranda &amp; Balcony';
  applications?: string[];
  chefNotes?: string;
}}

export interface ServicePackage {{
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
}}</code></pre>
  </div>

  <!-- SECTION 6: SITEMAP & DESIGN SYSTEM -->
  <div class="section-break">
    <h1>6. Sitemap, Routing &amp; Sistem Desain</h1>

    <h2>6.1 Peta Situs &amp; Strategi Rendering (35 Halaman)</h2>
    <table>
      <thead>
        <tr>
          <th>URL Rute</th>
          <th>Tipe Rendering</th>
          <th>Fungsi Utama</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>/</code></td>
          <td>Static (SSG)</td>
          <td>Beranda utama, Hero banner, 6 Pilar, Cuplikan Produk, Tim, Blog, &amp; CTA WhatsApp.</td>
        </tr>
        <tr>
          <td><code>/about</code></td>
          <td>Static (SSG)</td>
          <td>Profil sejarah Parongpong nursery, atelier Bali, nilai botani, &amp; sertifikasi.</td>
        </tr>
        <tr>
          <td><code>/product</code></td>
          <td>Static + Client Filter</td>
          <td>Katalog lengkap produk panen dengan filter kategori instan &amp; baki kurasi.</td>
        </tr>
        <tr>
          <td><code>/product/[slug]</code></td>
          <td>Dynamic SSG Paths (12 Rute)</td>
          <td>Detail komoditas panen, foto spesimen, origin info, &amp; pemesanan langsung WA.</td>
        </tr>
        <tr>
          <td><code>/services</code></td>
          <td>Static (SSG)</td>
          <td>Daftar paket konsultasi biofilik, timeline alur kerja, &amp; FAQ komprehensif.</td>
        </tr>
        <tr>
          <td><code>/portfolio</code></td>
          <td>Static (SSG)</td>
          <td>Galeri studi kasus proyek resort bintang lima, villa privat, &amp; kafe.</td>
        </tr>
        <tr>
          <td><code>/portfolio/[slug]</code></td>
          <td>Dynamic SSG Paths (4 Rute)</td>
          <td>Laporan proyek mendalam dengan slider Before-After &amp; testimoni klien.</td>
        </tr>
        <tr>
          <td><code>/blog</code></td>
          <td>Static (SSG)</td>
          <td>Jurnal botani, artikel riset tisane, dan tren gastronomi alami.</td>
        </tr>
        <tr>
          <td><code>/blog/[slug]</code></td>
          <td>Dynamic SSG Paths (3 Rute)</td>
          <td>Artikel baca editorial ramah SEO dengan estimasi waktu baca &amp; author bio.</td>
        </tr>
        <tr>
          <td><code>/contact</code></td>
          <td>Static (SSG)</td>
          <td>Formulir kontak terintegrasi, alamat dua studio, dan peta Google interaktif.</td>
        </tr>
        <tr>
          <td><code>/brief</code></td>
          <td>Static (SSG)</td>
          <td>Wizard interaktif 4-langkah penyusun brief proyek lanskap biofilik.</td>
        </tr>
        <tr>
          <td><code>/admin</code></td>
          <td>Client-Side (PIN Secured)</td>
          <td>Tabel ringkasan seluruh entitas data untuk manajemen cepat pengelola.</td>
        </tr>
      </tbody>
    </table>

    <h2>6.2 Sistem Desain &amp; Palet Warna Botani</h2>
    <div class="color-swatch-grid">
      <div class="color-swatch-card">
        <div class="color-swatch-box" style="background-color: #183C2B;"></div>
        <div class="color-swatch-info">
          <div class="color-swatch-name">Forest Green</div>
          <div class="color-swatch-hex">#183C2B (bg-forest)</div>
        </div>
      </div>
      <div class="color-swatch-card">
        <div class="color-swatch-box" style="background-color: #356B45;"></div>
        <div class="color-swatch-info">
          <div class="color-swatch-name">Garden Green</div>
          <div class="color-swatch-hex">#356B45 (bg-garden)</div>
        </div>
      </div>
      <div class="color-swatch-card">
        <div class="color-swatch-box" style="background-color: #70855A;"></div>
        <div class="color-swatch-info">
          <div class="color-swatch-name">Olive Leaf</div>
          <div class="color-swatch-hex">#70855A (bg-olive)</div>
        </div>
      </div>
      <div class="color-swatch-card">
        <div class="color-swatch-box" style="background-color: #A8B69A;"></div>
        <div class="color-swatch-info">
          <div class="color-swatch-name">Sage Green</div>
          <div class="color-swatch-hex">#A8B69A (bg-sage)</div>
        </div>
      </div>
      <div class="color-swatch-card">
        <div class="color-swatch-box" style="background-color: #795C3A;"></div>
        <div class="color-swatch-info">
          <div class="color-swatch-name">Earth Brown</div>
          <div class="color-swatch-hex">#795C3A (bg-earth)</div>
        </div>
      </div>
      <div class="color-swatch-card">
        <div class="color-swatch-box" style="background-color: #F4F0E6; border-bottom: 1px solid #ddd;"></div>
        <div class="color-swatch-info">
          <div class="color-swatch-name">Warm Cream</div>
          <div class="color-swatch-hex">#F4F0E6 (bg-cream)</div>
        </div>
      </div>
      <div class="color-swatch-card">
        <div class="color-swatch-box" style="background-color: #FBFAF6; border-bottom: 1px solid #ddd;"></div>
        <div class="color-swatch-info">
          <div class="color-swatch-name">Soft White</div>
          <div class="color-swatch-hex">#FBFAF6 (bg-softwhite)</div>
        </div>
      </div>
      <div class="color-swatch-card">
        <div class="color-swatch-box" style="background-color: #20251F;"></div>
        <div class="color-swatch-info">
          <div class="color-swatch-name">Charcoal</div>
          <div class="color-swatch-hex">#20251F (bg-charcoal)</div>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 7: OPERATIONS, SECURITY, & ROADMAP -->
  <div class="section-break">
    <h1>7. Operasional, Keamanan &amp; Roadmap Masa Depan</h1>

    <h2>7.1 Panduan Keamanan &amp; Integritas Data</h2>
    <ul>
      <li><strong>Proteksi PIN:</strong> Seluruh operasi CRUD di halaman dibatasi oleh otentikasi PIN <code>novio2026</code>.</li>
      <li><strong>Kompresi Gambar Otomatis:</strong> Gambar yang diunggah dikompresi ke WebP resolusi maksimum 1200px dan kualitas 75% via HTML5 Canvas sebelum disimpan, menjaga ukuran payload di bawah 100KB per item.</li>
      <li><strong>Sanitasi Form:</strong> Input teks disanitasi dari potensi serangan XSS sebelum ditulis ke LocalStorage atau Supabase.</li>
    </ul>

    <h2>7.2 Prosedur Sinkronisasi Data ke Ponsel Pengelola</h2>
    <div class="callout-box">
      <div class="callout-title">Langkah Sinkronisasi Cepat:</div>
      <p class="callout-content">
        1. Buka website di Laptop dan klik tombol hijau <strong>[Sinkron HP]</strong> di bilah atas.<br>
        2. Pilih <strong>Metode 1 (Supabase Cloud)</strong> jika database aktif, atau <strong>Metode 2 (Kirim Link ke WhatsApp)</strong>.<br>
        3. Buka tautan di browser ponsel pengelola, dan semua perubahan akan langsung teraplikasikan ke memori HP.
      </p>
    </div>

    <h2>7.3 Roadmap Pengembangan Fitur Mendatang</h2>
    <table>
      <thead>
        <tr>
          <th>Fase</th>
          <th>Nama Fitur</th>
          <th>Deskripsi &amp; Estimasi Nilai Bisnis</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Fase 1</strong></td>
          <td>Core Architecture &amp; Visual CMS</td>
          <td>Website profil App Router, katalog komoditas, portofolio, dan mode edit langsung.</td>
          <td><span style="color: #16A34A; font-weight: bold;">SELESAI</span></td>
        </tr>
        <tr>
          <td><strong>Fase 2</strong></td>
          <td>Hybrid Cloud &amp; Zero-Bleed Modal</td>
          <td>Integrasi Supabase Cloud, kunci scroll, baki kurasi chef, dan responsive touch mobile.</td>
          <td><span style="color: #16A34A; font-weight: bold;">SELESAI</span></td>
        </tr>
        <tr>
          <td><strong>Fase 3</strong></td>
          <td>Payment Gateway Midtrans / Xendit</td>
          <td>Pembelian langsung paket sampel tisane dan cuka artisan untuk pengiriman kilat.</td>
          <td><span style="color: #D97706; font-weight: bold;">TERENCANA</span></td>
        </tr>
        <tr>
          <td><strong>Fase 4</strong></td>
          <td>PWA &amp; Kamera AR Biofilik</td>
          <td>Instalasi PWA offline dan fitur AR untuk memvisualisasikan tanaman di ruangan klien.</td>
          <td><span style="color: #D97706; font-weight: bold;">TERENCANA</span></td>
        </tr>
      </tbody>
    </table>

    <div class="doc-footer">
      <div><strong>NOVIO Botanical &amp; Agricultural Atelier</strong> — Bandung &amp; Bali</div>
      <div>Dokumen Resmi Disusun pada September 2026 — Hak Cipta Dilindungi Undang-Undang</div>
    </div>
  </div>

</body>
</html>
"""

html_path = os.path.join(base_dir, 'scripts', 'blueprint_render.html')
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"HTML written to {html_path}")

chrome_exe = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
edge_exe = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
browser_exe = chrome_exe if os.path.exists(chrome_exe) else edge_exe

public_pdf = os.path.join(base_dir, 'public', 'NOVIO_Master_Project_Blueprint.pdf')
root_pdf = os.path.join(base_dir, 'NOVIO_Master_Project_Blueprint.pdf')

print(f"Using browser: {browser_exe}")
cmd = [
    browser_exe,
    '--headless',
    '--disable-gpu',
    '--run-all-compositor-stages-before-draw',
    '--no-pdf-header-footer',
    f'--print-to-pdf={public_pdf}',
    html_path
]

res = subprocess.run(cmd, capture_output=True, text=True)
print(f"Chrome return code: {res.returncode}")

if os.path.exists(public_pdf):
    file_size = os.path.getsize(public_pdf)
    print(f"SUCCESS: Generated PDF at {public_pdf} ({file_size} bytes)")
    shutil.copyfile(public_pdf, root_pdf)
    print(f"Copied PDF to root: {root_pdf}")
    # Also copy to brain artifact dir if it exists
    brain_dir = os.path.expanduser(r"C:\Users\user\.gemini\antigravity\brain\1cce93b2-ac1a-428b-abb6-e4c9e0812caa")
    if os.path.exists(brain_dir):
        brain_pdf = os.path.join(brain_dir, "NOVIO_Master_Project_Blueprint.pdf")
        shutil.copyfile(public_pdf, brain_pdf)
        print(f"Copied PDF to brain dir: {brain_pdf}")
else:
    print("ERROR: PDF was not created!")
    sys.exit(1)
