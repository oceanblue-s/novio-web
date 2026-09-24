# NOVIO — Company Profile Website

> **Natural × Premium × Modern × Botanical**  
> An editorial, botanical company profile website built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion, designed in accordance with the official **NOVIO Website Blueprint**.

---

## 🌿 Brand & Design System

### Color Palette Tokens
| Color Name | Hex Code | Tailwind Class | Application |
|---|---|---|---|
| **Forest Green** | `#183C2B` | `bg-forest` / `text-forest` | Deep brand background, global footer, primary dark headers |
| **Garden Green** | `#356B45` | `bg-garden` / `text-garden` | Botanical accent, interactive buttons, highlight badges |
| **Olive Leaf** | `#70855A` | `bg-olive` / `text-olive` | Muted natural accents, foliage undertones |
| **Sage** | `#A8B69A` | `bg-sage` / `text-sage` | Soft borders, tag badges, scrollbar thumb |
| **Earth Brown** | `#795C3A` | `bg-earth` / `text-earth` | Organic warmth, required field indicators, terracotta accents |
| **Warm Cream** | `#F4F0E6` | `bg-cream` / `text-cream` | Alternating section backgrounds, card containers |
| **Soft White** | `#FBFAF6` | `bg-softwhite` | Page canvas background, clean card bodies |
| **Charcoal** | `#20251F` | `bg-charcoal` / `text-charcoal` | High-legibility editorial typography |

### Typography
- **Major Headings**: `Playfair Display` (Serif, editorial, timeless, dignified)
- **Body & UI Text**: `Manrope` (Sans-serif, clean, modern, high legibility)
- Loaded via `next/font/google` for zero layout shift and local font bundling.

---

## 📁 Project Architecture & Folder Structure

```
novio-web/
├── app/
│   ├── layout.tsx                # Root layout with fonts, global Navbar & Footer
│   ├── page.tsx                  # Home: Hero, Commitment, Products, Team, Journal, CTA
│   ├── about/
│   │   └── page.tsx              # About: Philosophy, Parongpong nursery, Bali sanctuary
│   ├── product/
│   │   ├── page.tsx              # Product catalog with category filter & live search
│   │   ├── ProductCatalogClient.tsx
│   │   └── [slug]/
│   │       ├── page.tsx          # Dynamic product detail with specifications & WhatsApp CTA
│   │       └── ProductGallery.tsx # Interactive specimen photo gallery
│   ├── blog/
│   │   ├── page.tsx              # Journal listing with lead story and responsive grid
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic article with rich typography, author bio, SEO
│   ├── contact/
│   │   ├── page.tsx              # Contact hero & overview
│   │   └── ContactClient.tsx     # Dual office cards (Bandung/Bali), Google Maps embed, form
│   ├── not-found.tsx             # Botanical 404 error page
│   ├── sitemap.ts                # Dynamic SEO sitemap generator
│   └── globals.css               # Color variables, smooth scroll, custom scrollbars
├── components/
│   ├── Navbar.tsx                # Glassmorphic header with mobile drawer & quick WhatsApp
│   ├── Footer.tsx                # Deep Forest Green footer with dual office details
│   ├── Hero.tsx                  # Reusable hero banner with dark-green overlay
│   ├── SectionTitle.tsx          # Reusable editorial section header
│   ├── ProductCard.tsx           # Botanical card with subtle zoom and explore action
│   ├── BlogCard.tsx              # Journal card with category pill, reading time & date
│   ├── TeamCard.tsx              # Executive & horticultural specialist card
│   ├── ContactForm.tsx           # Validated form with direct WhatsApp deep-link generation
│   ├── OfficeCard.tsx            # Distinct cards for Bandung and Bali offices
│   └── GoogleMap.tsx             # Interactive map embed with location switcher
├── data/
│   ├── site.ts                   # Brand metadata, office locations, navigation items
│   ├── products.ts               # Typed botanical products catalog
│   ├── blog.ts                   # Typed editorial journal articles
│   └── team.ts                   # Team members and leadership bios
├── types/
│   └── index.ts                  # TypeScript interfaces matching blueprint data models
├── tailwind.config.ts            # Tailwind configuration with brand color tokens
├── tsconfig.json                 # Strict TypeScript configuration with `@/*` aliases
├── next.config.mjs               # Image remote patterns and Next.js settings
└── package.json                  # Dependencies: Next 14, React 18, Tailwind, Lucide, Framer Motion
```

---

## 🚀 Getting Started

### 1. Set Workspace Directory
Open or set your terminal workspace to:
```bash
cd "C:\Users\Bandung Hari Ini\.gemini\antigravity\scratch\novio-web"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📍 Contact & Office Information

### Bandung Head Office
- **Address**: Ciwarega, Karyawangi, Kec. Parongpong, Kabupaten Bandung Barat, Jawa Barat 40559
- **Phone**: 0813 1241 4863
- **Email**: `novio.customercare@gmail.com`
- **WhatsApp**: `+6281312414863`

### Bali Office
- **Address**: Jl Kedaung G 5 menesa nusa dua, Badung, Bali, Indonesia 80363
- **Phone**: 0811 2906 792
- **Email**: `nunik@noviotrade.com`

---

## 🌐 Future CMS / Supabase Integration
All data structures in `data/products.ts`, `data/blog.ts`, `data/team.ts`, and `data/site.ts` are strictly typed via interfaces in `types/index.ts`. When ready to migrate to a headless CMS (Sanity, Strapi) or Supabase:
1. Replace local arrays in `data/` with asynchronous fetch functions (`supabase.from('products').select('*')`).
2. Retain identical TypeScript interfaces to ensure seamless compatibility with existing components without markup modifications.

---

## 🚢 Deployment to Vercel
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import project on [Vercel](https://vercel.com).
3. The Next.js framework preset will automatically detect App Router settings.
4. Click **Deploy**.
