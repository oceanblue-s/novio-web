# PANDUAN DEPLOYMENT WEBSITE NOVIO — UNTUK TIM IT

Dokumen ini ditujukan untuk **Tim IT / DevOps Client** yang akan meng-host dan men-deploy website resmi **NOVIO** pada domain **`noviotrade.com`**.

---

## 1. Spesifikasi Teknis & Prasyarat Sistem

| Komponen | Spesifikasi | Keterangan |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14 (App Router)** | React 18, TypeScript, Tailwind CSS |
| **Node.js Runtime** | **Node.js v18.18.0+** atau **v20.x LTS** *(Disarankan)* | Minimal v18.18 |
| **Package Manager** | `npm` (disertakan `package-lock.json`), `yarn`, atau `pnpm` | Standar npm |
| **Port Default** | Port `3000` (dapat disesuaikan via flag `-p`) | Reverse proxy ke 80/443 |
| **Domain Resmi** | `https://noviotrade.com` & `https://www.noviotrade.com` | Sudah terkonfigurasi di metadata |

---

## 2. Environment Variables (.env)

Buat file `.env` atau `.env.production` di root direktori proyek (contoh template ada pada `.env.example`):

```bash
# Supabase Cloud Database (Opsional / Recommended)
NEXT_PUBLIC_SUPABASE_URL=https://jrvmfcikqptxjxiaytej.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impydm1mY2lrcXB0eGp4aWF5dGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjQxNjEsImV4cCI6MjEwNTg0MDE2MX0.Ue4wIDy1V_0sGKFYiWakTdC2vT4_nibdYKzaRaIgMfw
```

> **Catatan:** Jika Supabase belum dikonfigurasi, sistem memiliki **fallback otomatis** membaca dataset lokal dari folder `/data/` sehingga website tetap dapat berjalan normal 100%.

---

## 3. Langkah Instalasi & Build Standar

Jalankan perintah berikut di direktori proyek:

```bash
# 1. Install dependencies
npm install

# 2. Build aplikasi produksi
npm run build

# 3. Jalankan server produksi
npm run start
```
Secara default aplikasi akan berjalan di `http://localhost:3000`.

---

## 4. Opsi Deployment Server

### Opsi A: VPS Linux (Ubuntu / Debian) dengan PM2 & Nginx (Sangat Direkomendasikan)

#### 1. Jalankan dengan PM2 Process Manager:
```bash
# Install PM2 jika belum ada
npm install -g pm2

# Jalankan service Next.js
pm2 start npm --name "noviotrade" -- start -- -p 3000

# Pastikan PM2 restart otomatis saat server reboot
pm2 startup
pm2 save
```

#### 2. Konfigurasi Nginx Reverse Proxy (`/etc/nginx/sites-available/noviotrade.com`):
```nginx
server {
    server_name noviotrade.com www.noviotrade.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 3. Pasang SSL Gratis (Certbot):
```bash
sudo certbot --nginx -d noviotrade.com -d www.noviotrade.com
```

---

### Opsi B: Docker Container

Jika tim IT menggunakan Docker, buat file `Dockerfile` berikut:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "start"]
```

Build dan jalankan:
```bash
docker build -t noviotrade-web .
docker run -d -p 3000:3000 --name noviotrade noviotrade-web
```

---

### Opsi C: cPanel / CyberPanel / CloudPanel (Node.js Selector)

1. Upload seluruh file proyek ke folder aplikasi (misal `/home/user/noviotrade`).
2. Di menu **Setup Node.js App** (cPanel):
   - **Node.js version**: `18.x` atau `20.x`
   - **Application mode**: `Production`
   - **Application root**: `noviotrade`
   - **Application startup file**: `node_modules/next/dist/bin/next`
   - **Application arguments**: `start`
3. Klik **Run NPM Install**, lalu buka terminal cPanel untuk menjalankan `npm run build`.
4. Klik **Restart Application**.

---

## 5. Struktur Konten & Manajemen Website

- **Katalog Produk**: Berada di [`data/products.ts`](./data/products.ts).
- **Artikel & Jurnal**: Berada di [`data/blog.ts`](./data/blog.ts).
- **Data Tim & Kantor**: Berada di [`data/team.ts`](./data/team.ts) dan [`data/site.ts`](./data/site.ts).
- **Aset Gambar / Media**: Berada di folder [`public/`](./public/).
- **Portal Admin Internal**: Dapat diakses di rute `/admin` dengan autentikasi PIN pengelola (default PIN dapat diatur ulang di `app/admin/AdminClient.tsx`).
