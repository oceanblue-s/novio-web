'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products as defaultProducts } from '@/data/products';
import { blogPosts as defaultBlogPosts } from '@/data/blog';
import { portfolioProjects as defaultPortfolio } from '@/data/portfolio';
import { servicePackages as defaultServices } from '@/data/services';
import { teamMembers as defaultTeam } from '@/data/team';
import { siteConfig as defaultSiteConfig, offices as defaultOffices } from '@/data/site';
import { Product, BlogPost, PortfolioProject, ServicePackage, TeamMember, Office } from '@/types';
import {
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Save,
  Check,
  X,
  Search,
  ExternalLink,
  ChefHat,
  Leaf,
  FileText,
  Phone,
  MapPin,
  Download,
  Copy,
  AlertCircle,
  Briefcase,
  Users,
  Compass,
  Upload,
  Image as ImageIcon,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

const ADMIN_PIN = 'novio2026';
const STORAGE_PREFIX = 'novio_admin_';

export default function AdminClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [pinError, setPinError] = useState('');

  // Active Tab: products, blog, portfolio, services, team, site, export
  const [activeTab, setActiveTab] = useState<
    'products' | 'blog' | 'portfolio' | 'services' | 'team' | 'site' | 'export'
  >('products');

  // State Datasets
  const [productsList, setProductsList] = useState<Product[]>(defaultProducts);
  const [blogList, setBlogList] = useState<BlogPost[]>(defaultBlogPosts);
  const [portfolioList, setPortfolioList] = useState<PortfolioProject[]>(defaultPortfolio);
  const [servicesList, setServicesList] = useState<ServicePackage[]>(defaultServices);
  const [teamList, setTeamList] = useState<TeamMember[]>(defaultTeam);
  const [siteData, setSiteData] = useState(defaultSiteConfig);
  const [officesData, setOfficesData] = useState<Office[]>(defaultOffices);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Active Editing Modals
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);

  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const [editingService, setEditingService] = useState<ServicePackage | null>(null);
  const [isCreatingService, setIsCreatingService] = useState(false);

  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  const [copyFeedback, setCopyFeedback] = useState('');

  // Check auth & load stored data
  useEffect(() => {
    if (sessionStorage.getItem('novio_admin_authenticated') === 'true') {
      setIsAuthenticated(true);
    }
    try {
      const p = localStorage.getItem(`${STORAGE_PREFIX}products`);
      if (p) setProductsList(JSON.parse(p));
      const b = localStorage.getItem(`${STORAGE_PREFIX}blog`);
      if (b) setBlogList(JSON.parse(b));
      const port = localStorage.getItem(`${STORAGE_PREFIX}portfolio`);
      if (port) setPortfolioList(JSON.parse(port));
      const s = localStorage.getItem(`${STORAGE_PREFIX}services`);
      if (s) setServicesList(JSON.parse(s));
      const t = localStorage.getItem(`${STORAGE_PREFIX}team`);
      if (t) setTeamList(JSON.parse(t));
      const sc = localStorage.getItem(`${STORAGE_PREFIX}site`);
      if (sc) setSiteData(JSON.parse(sc));
      const off = localStorage.getItem(`${STORAGE_PREFIX}offices`);
      if (off) setOfficesData(JSON.parse(off));
    } catch {}
  }, []);

  // Save Helpers
  const persist = (key: string, data: unknown) => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(data));
    } catch {}
  };

  // Image Upload to Base64 preview helper
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onDone: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) onDone(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Auth Submit
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem('novio_admin_authenticated', 'true');
      setPinError('');
    } else {
      setPinError('PIN salah. Silakan coba kembali (default: novio2026)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('novio_admin_authenticated');
    setPinInput('');
  };

  // Copy helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(`Kode ${label} berhasil disalin!`);
    setTimeout(() => setCopyFeedback(''), 4000);
  };

  // -------------------------------------------------------------
  // 1. PIN Screen
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-softwhite flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-cream rounded-2xl p-8 sm:p-10 border border-sage/40 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-14 h-14 rounded-full overflow-hidden mx-auto shadow-sm border border-sage/40">
              <Image src="/novio-logo.png" alt="Logo NOVIO" fill sizes="56px" className="object-contain" />
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-wider text-charcoal">
              Portal Admin Sentral NOVIO
            </h1>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Pusat kendali penuh untuk mengedit Produk, Artikel, Portofolio, Layanan, Tim, dan Kontak.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                PIN Akses Pengelola
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPin ? 'text' : 'password'}
                  required
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  placeholder="Masukkan PIN (default: novio2026)"
                  className="w-full pl-10 pr-10 py-3 rounded-lg bg-softwhite border border-sage/40 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-garden"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {pinError && (
                <p className="text-xs text-earth font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{pinError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-forest hover:bg-forest-light text-softwhite font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4 text-sage" />
              <span>Buka Dashboard Pengelola</span>
            </button>
          </form>

          <div className="pt-4 border-t border-sage/30 text-center">
            <Link
              href="/"
              className="text-xs text-charcoal/70 hover:text-garden transition-colors inline-flex items-center gap-1"
            >
              <span>← Kembali ke Website Publik NOVIO</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. Main CMS Portal
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-softwhite pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Header Bar */}
        <div className="bg-forest text-softwhite rounded-2xl p-6 sm:p-8 mb-8 border border-forest-light shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-forest-light/60 border border-sage/40 shrink-0">
              <Image src="/novio-logo.png" alt="Logo NOVIO" fill sizes="48px" className="object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-sage font-semibold">
                  Sistem Manajemen Konten Sentral
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide">
                Portal Admin Lengkap NOVIO
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cream/15 hover:bg-cream/25 text-cream border border-sage/40 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <span>Lihat Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-earth/80 hover:bg-earth text-softwhite text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu (All 7 Sections) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-sage/30 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-forest text-softwhite shadow-sm'
                : 'bg-cream text-charcoal/70 hover:bg-cream-dark'
            }`}
          >
            <Leaf className="w-4 h-4 text-sage" />
            <span>Produk ({productsList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('blog')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'blog'
                ? 'bg-forest text-softwhite shadow-sm'
                : 'bg-cream text-charcoal/70 hover:bg-cream-dark'
            }`}
          >
            <FileText className="w-4 h-4 text-sage" />
            <span>Artikel ({blogList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('portfolio')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'portfolio'
                ? 'bg-forest text-softwhite shadow-sm'
                : 'bg-cream text-charcoal/70 hover:bg-cream-dark'
            }`}
          >
            <Compass className="w-4 h-4 text-sage" />
            <span>Portofolio ({portfolioList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'services'
                ? 'bg-forest text-softwhite shadow-sm'
                : 'bg-cream text-charcoal/70 hover:bg-cream-dark'
            }`}
          >
            <Briefcase className="w-4 h-4 text-sage" />
            <span>Layanan ({servicesList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'team'
                ? 'bg-forest text-softwhite shadow-sm'
                : 'bg-cream text-charcoal/70 hover:bg-cream-dark'
            }`}
          >
            <Users className="w-4 h-4 text-sage" />
            <span>Tim ({teamList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('site')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'site'
                ? 'bg-forest text-softwhite shadow-sm'
                : 'bg-cream text-charcoal/70 hover:bg-cream-dark'
            }`}
          >
            <Phone className="w-4 h-4 text-sage" />
            <span>Kontak & WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'export'
                ? 'bg-forest text-softwhite shadow-sm'
                : 'bg-cream text-charcoal/70 hover:bg-cream-dark'
            }`}
          >
            <Download className="w-4 h-4 text-sage" />
            <span>Ekspor & Backup Kode</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 1. PRODUK */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari produk..."
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-cream border border-sage/40 text-charcoal focus:outline-none focus:ring-1 focus:ring-garden"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingProduct({
                    id: `prod-${Date.now().toString().slice(-4)}`,
                    slug: 'produk-baru',
                    name: '',
                    shortDescription: '',
                    description: '',
                    coverImage: '/novio-baby-leaf-spinach.webp',
                    gallery: ['/novio-baby-leaf-spinach.webp'],
                    category: 'Hasil Segar & Daun',
                    environment: 'Bright Indirect',
                    features: ['100% Alami & Organik', 'Dipanen Segar untuk Dapur Chef'],
                    published: true,
                    origin: 'Parongpong, Bandung Barat',
                    specifications: {
                      Kemasan: 'Pouch Higienis / Box Suhu Terjaga',
                      Penyimpanan: 'Chiller 4-8°C',
                    },
                  });
                  setIsCreatingProduct(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-garden hover:bg-garden-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Produk Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsList
                .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((p) => (
                  <div
                    key={p.id}
                    className="bg-cream/60 rounded-xl p-5 border border-sage/40 flex flex-col justify-between hover:bg-cream transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-softwhite border border-sage/30">
                        <Image src={p.coverImage} alt={p.name} fill sizes="33vw" className="object-cover" />
                        <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-wider bg-forest/90 text-softwhite px-2 py-0.5 rounded">
                          {p.category}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-medium text-charcoal">{p.name}</h3>
                      <p className="text-xs text-charcoal/70 line-clamp-2">{p.shortDescription}</p>
                      <p className="text-[11px] text-charcoal-muted">Asal: {p.origin || '-'}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-sage/30 flex items-center justify-between gap-2">
                      <Link
                        href={`/product/${p.slug}`}
                        target="_blank"
                        className="text-xs font-semibold text-garden hover:text-forest flex items-center gap-1"
                      >
                        <span>Lihat Web</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProduct(p);
                            setIsCreatingProduct(false);
                          }}
                          className="p-2 rounded-lg bg-softwhite hover:bg-forest hover:text-softwhite text-charcoal border border-sage/30 text-xs transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Hapus produk "${p.name}"?`)) {
                              const updated = productsList.filter((item) => item.id !== p.id);
                              setProductsList(updated);
                              persist('products', updated);
                            }
                          }}
                          className="p-2 rounded-lg bg-softwhite hover:bg-earth hover:text-softwhite text-charcoal border border-sage/30 text-xs transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 2. ARTIKEL BLOG */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-medium text-charcoal">Artikel Jurnal ({blogList.length})</h2>
              <button
                type="button"
                onClick={() => {
                  setEditingBlog({
                    id: `blog-${Date.now().toString().slice(-4)}`,
                    slug: 'artikel-baru',
                    title: '',
                    excerpt: '',
                    content: '',
                    coverImage: '/greenhouse-hero.jpg',
                    category: 'Sains & Pertanian',
                    author: { name: 'Danang', role: 'Direktur Hortikultura', avatar: '/team-member-3.png' },
                    publishedAt: '24 September 2026',
                    tags: ['Novio', 'Kuliner Alami'],
                    seo: { title: 'Artikel | Novio', description: 'Editorial Novio' },
                  });
                  setIsCreatingBlog(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-garden hover:bg-garden-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tulis Artikel Baru</span>
              </button>
            </div>

            <div className="space-y-4">
              {blogList.map((article) => (
                <div
                  key={article.id}
                  className="bg-cream/60 rounded-xl p-5 border border-sage/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-cream transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-softwhite shrink-0 border border-sage/30">
                      <Image src={article.coverImage} alt={article.title} fill sizes="80px" className="object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-garden">
                        {article.category} • {article.publishedAt}
                      </span>
                      <h3 className="font-serif text-base font-medium text-charcoal">{article.title}</h3>
                      <p className="text-xs text-charcoal/70 line-clamp-1">{article.excerpt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <Link
                      href={`/blog/${article.slug}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-lg bg-softwhite text-xs font-semibold text-charcoal hover:text-garden border border-sage/30 flex items-center gap-1"
                    >
                      <span>Buka</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBlog(article);
                        setIsCreatingBlog(false);
                      }}
                      className="p-2 rounded-lg bg-softwhite hover:bg-forest hover:text-softwhite text-charcoal border border-sage/30 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Hapus artikel "${article.title}"?`)) {
                          const updated = blogList.filter((b) => b.id !== article.id);
                          setBlogList(updated);
                          persist('blog', updated);
                        }
                      }}
                      className="p-2 rounded-lg bg-softwhite hover:bg-earth hover:text-softwhite text-charcoal border border-sage/30 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 3. PORTOFOLIO PROYEK */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-medium text-charcoal">
                Portofolio Ruang & Lanskap ({portfolioList.length})
              </h2>
              <button
                type="button"
                onClick={() => {
                  setEditingProject({
                    id: `proj-${Date.now().toString().slice(-4)}`,
                    slug: 'proyek-baru',
                    title: '',
                    subtitle: '',
                    clientCategory: 'Perhotelan Mewah',
                    location: 'Bali / Bandung',
                    year: '2025',
                    coverImage: '/luxury-hospitality-lab.jpg',
                    gallery: ['/luxury-hospitality-lab.jpg'],
                    beforeImage: '/compare-before-flora.jpg',
                    afterImage: '/compare-after-flora.jpg',
                    excerpt: '',
                    challenge: '',
                    solution: '',
                    curatedSpecimens: ['Ficus Lyrata', 'Philodendron Bipinnatifidum'],
                    featured: false,
                  });
                  setIsCreatingProject(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-garden hover:bg-garden-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Proyek Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioList.map((proj) => (
                <div key={proj.id} className="bg-cream/60 rounded-xl p-5 border border-sage/40 space-y-4">
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-softwhite border border-sage/30">
                    <Image src={proj.coverImage} alt={proj.title} fill sizes="50vw" className="object-cover" />
                    <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase bg-forest/90 text-softwhite px-2 py-0.5 rounded">
                      {proj.clientCategory}
                    </span>
                    {proj.featured && (
                      <span className="absolute top-2 right-2 text-[10px] font-semibold uppercase bg-garden text-softwhite px-2 py-0.5 rounded shadow-sm">
                        Unggulan Home
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-charcoal-muted uppercase">
                      {proj.location} • {proj.year}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-charcoal">{proj.title}</h3>
                    <p className="text-xs text-charcoal/70 line-clamp-2 mt-1">{proj.excerpt}</p>
                  </div>
                  <div className="pt-3 border-t border-sage/30 flex items-center justify-between">
                    <Link
                      href={`/portfolio/${proj.slug}`}
                      target="_blank"
                      className="text-xs font-semibold text-garden hover:text-forest flex items-center gap-1"
                    >
                      <span>Lihat Halaman</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject(proj);
                          setIsCreatingProject(false);
                        }}
                        className="p-2 rounded-lg bg-softwhite hover:bg-forest hover:text-softwhite text-charcoal border border-sage/30 text-xs transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Hapus proyek "${proj.title}"?`)) {
                            const updated = portfolioList.filter((item) => item.id !== proj.id);
                            setPortfolioList(updated);
                            persist('portfolio', updated);
                          }
                        }}
                        className="p-2 rounded-lg bg-softwhite hover:bg-earth hover:text-softwhite text-charcoal border border-sage/30 text-xs transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 4. LAYANAN & PAKET */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-medium text-charcoal">
                Paket Layanan Botani ({servicesList.length})
              </h2>
              <button
                type="button"
                onClick={() => {
                  setEditingService({
                    id: `srv-${Date.now().toString().slice(-4)}`,
                    slug: 'layanan-baru',
                    title: '',
                    tagline: '',
                    description: '',
                    targetAudience: 'Residensial / Korporat',
                    coverImage: '/private-villas-cultivation.jpg',
                    features: ['Konsultasi Botani Langsung', 'Aklimatisasi Tanaman Parongpong'],
                    deliverables: ['Laporan Analisis Iklim Mikro', 'Jadwal Perawatan Berkala'],
                    pricingModel: 'Paket Kustom Sesuai Kebutuhan',
                    guarantee: 'Garansi Kesehatan Tanaman 30 Hari',
                    recommendedFor: 'Pemilik hunian atau ruang kantor biofilik',
                    whatsappMessage: 'Halo NOVIO, saya ingin bertanya tentang layanan baru.',
                  });
                  setIsCreatingService(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-garden hover:bg-garden-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Layanan Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicesList.map((srv) => (
                <div key={srv.id} className="bg-cream/60 rounded-xl p-5 border border-sage/40 space-y-3">
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-softwhite border border-sage/30">
                    <Image src={srv.coverImage} alt={srv.title} fill sizes="50vw" className="object-cover" />
                    <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase bg-forest/90 text-softwhite px-2 py-0.5 rounded">
                      {srv.targetAudience.split(',')[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-charcoal">{srv.title}</h3>
                    <p className="text-xs text-charcoal/70 line-clamp-2 mt-1">{srv.tagline}</p>
                    <p className="text-[11px] font-mono text-garden font-semibold mt-2">{srv.pricingModel}</p>
                  </div>
                  <div className="pt-3 border-t border-sage/30 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingService(srv);
                        setIsCreatingService(false);
                      }}
                      className="p-2 rounded-lg bg-softwhite hover:bg-forest hover:text-softwhite text-charcoal border border-sage/30 text-xs transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Hapus layanan "${srv.title}"?`)) {
                          const updated = servicesList.filter((s) => s.id !== s.id);
                          setServicesList(updated);
                          persist('services', updated);
                        }
                      }}
                      className="p-2 rounded-lg bg-softwhite hover:bg-earth hover:text-softwhite text-charcoal border border-sage/30 text-xs transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 5. TIM & PENDIRI */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-medium text-charcoal">
                Anggota Tim & Pendiri ({teamList.length})
              </h2>
              <button
                type="button"
                onClick={() => {
                  setEditingTeam({
                    id: `team-${Date.now().toString().slice(-4)}`,
                    name: '',
                    role: '',
                    photo: '/team-member-1.png',
                    shortBio: '',
                    order: teamList.length + 1,
                  });
                  setIsCreatingTeam(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-garden hover:bg-garden-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Anggota Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {teamList.map((member) => (
                <div key={member.id} className="bg-cream/60 rounded-xl p-4 border border-sage/40 flex flex-col justify-between text-center space-y-3">
                  <div className="relative aspect-square w-24 h-24 mx-auto rounded-full overflow-hidden bg-softwhite border-2 border-sage/40">
                    <Image src={member.photo} alt={member.name} fill sizes="96px" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-charcoal">{member.name}</h3>
                    <p className="text-[10px] text-garden font-medium">{member.role}</p>
                    <p className="text-[11px] text-charcoal/70 line-clamp-3 mt-1.5">{member.shortBio}</p>
                  </div>
                  <div className="pt-2 border-t border-sage/30 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTeam(member);
                        setIsCreatingTeam(false);
                      }}
                      className="p-1.5 rounded-lg bg-softwhite hover:bg-forest hover:text-softwhite text-charcoal border border-sage/30 text-xs transition-colors"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Hapus anggota "${member.name}"?`)) {
                          const updated = teamList.filter((m) => m.id !== member.id);
                          setTeamList(updated);
                          persist('team', updated);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-softwhite hover:bg-earth hover:text-softwhite text-charcoal border border-sage/30 text-xs transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 6. KONTAK & KANTOR */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'site' && (
          <div className="max-w-3xl space-y-8">
            {/* Global Settings */}
            <div className="bg-cream/60 rounded-2xl p-6 sm:p-8 border border-sage/40 space-y-4">
              <h2 className="font-serif text-xl font-medium text-charcoal">
                Informasi Utama & WhatsApp Perusahaan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">
                    Nomor WhatsApp Utama (Bandung)
                  </label>
                  <input
                    type="text"
                    value={siteData.whatsappTarget}
                    onChange={(e) => setSiteData({ ...siteData, whatsappTarget: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-softwhite border border-sage/40 text-charcoal font-mono"
                  />
                  <p className="text-[10px] text-charcoal-muted">Contoh: 6281312414863</p>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">
                    Email Resmi
                  </label>
                  <input
                    type="email"
                    value={siteData.generalEmail}
                    onChange={(e) => setSiteData({ ...siteData, generalEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-softwhite border border-sage/40 text-charcoal"
                  />
                </div>
              </div>
            </div>

            {/* Offices (Bandung & Bali) */}
            <div className="bg-cream/60 rounded-2xl p-6 sm:p-8 border border-sage/40 space-y-6">
              <h2 className="font-serif text-xl font-medium text-charcoal">
                Kantor Pusat & Kantor Cabang
              </h2>
              <div className="space-y-6">
                {officesData.map((office, idx) => (
                  <div key={office.id} className="bg-softwhite p-5 rounded-xl border border-sage/30 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-semibold text-charcoal">{office.name}</span>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-forest/10 text-forest">
                        {office.isHeadquarter ? 'Headquarter' : 'Cabang'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-charcoal-muted">Telepon / WA:</label>
                        <input
                          type="text"
                          value={office.phone}
                          onChange={(e) => {
                            const updated = [...officesData];
                            updated[idx].phone = e.target.value;
                            setOfficesData(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-cream/40 border border-sage/40 text-charcoal mt-1"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-charcoal-muted">Email:</label>
                        <input
                          type="text"
                          value={office.email}
                          onChange={(e) => {
                            const updated = [...officesData];
                            updated[idx].email = e.target.value;
                            setOfficesData(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-cream/40 border border-sage/40 text-charcoal mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-charcoal-muted">Alamat Lengkap:</label>
                      <textarea
                        rows={2}
                        value={office.address}
                        onChange={(e) => {
                          const updated = [...officesData];
                          updated[idx].address = e.target.value;
                          setOfficesData(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-cream/40 border border-sage/40 text-charcoal mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  persist('site', siteData);
                  persist('offices', officesData);
                  alert('Pengaturan kontak & kantor berhasil disimpan!');
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-forest hover:bg-forest-light text-softwhite font-semibold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                <Save className="w-4 h-4 text-sage" />
                <span>Simpan Seluruh Pengaturan Kontak</span>
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 7. EKSPOR KODE & BACKUP */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'export' && (
          <div className="max-w-4xl space-y-6">
            <div className="bg-cream/60 rounded-2xl p-6 sm:p-8 border border-sage/40 space-y-4">
              <h2 className="font-serif text-xl font-medium text-charcoal">
                Pusat Ekspor & Salin Kode Permanen (GitHub / Vercel)
              </h2>
              <p className="text-xs text-charcoal/80 leading-relaxed">
                Setiap kali Anda mengedit produk, artikel, portofolio, atau kontak di halaman ini, Anda bisa menyalin kode TypeScript yang sudah terformat rapi untuk ditempelkan ke file proyek jika ingin perubahan langsung terunggah ke Vercel!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      `import { Product } from '@/types';\n\nexport const products: Product[] = ${JSON.stringify(
                        productsList,
                        null,
                        2
                      )};\n`,
                      'data/products.ts'
                    )
                  }
                  className="p-3 rounded-xl bg-softwhite hover:bg-forest hover:text-softwhite text-charcoal border border-sage/40 text-xs font-semibold text-left transition-colors flex items-center justify-between"
                >
                  <span>1. Salin data/products.ts</span>
                  <Copy className="w-4 h-4 text-garden" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      `import { BlogPost } from '@/types';\n\nexport const blogPosts: BlogPost[] = ${JSON.stringify(
                        blogList,
                        null,
                        2
                      )};\n`,
                      'data/blog.ts'
                    )
                  }
                  className="p-3 rounded-xl bg-softwhite hover:bg-forest hover:text-softwhite text-charcoal border border-sage/40 text-xs font-semibold text-left transition-colors flex items-center justify-between"
                >
                  <span>2. Salin data/blog.ts</span>
                  <Copy className="w-4 h-4 text-garden" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      `import { PortfolioProject } from '@/types';\n\nexport const portfolioProjects: PortfolioProject[] = ${JSON.stringify(
                        portfolioList,
                        null,
                        2
                      )};\n`,
                      'data/portfolio.ts'
                    )
                  }
                  className="p-3 rounded-xl bg-softwhite hover:bg-forest hover:text-softwhite text-charcoal border border-sage/40 text-xs font-semibold text-left transition-colors flex items-center justify-between"
                >
                  <span>3. Salin data/portfolio.ts</span>
                  <Copy className="w-4 h-4 text-garden" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      `import { ServicePackage, ServiceWorkflowStep, ServiceFAQ } from '@/types';\n\nexport const servicePackages: ServicePackage[] = ${JSON.stringify(
                        servicesList,
                        null,
                        2
                      )};\n`,
                      'data/services.ts'
                    )
                  }
                  className="p-3 rounded-xl bg-softwhite hover:bg-forest hover:text-softwhite text-charcoal border border-sage/40 text-xs font-semibold text-left transition-colors flex items-center justify-between"
                >
                  <span>4. Salin data/services.ts</span>
                  <Copy className="w-4 h-4 text-garden" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      `import { TeamMember } from '@/types';\n\nexport const teamMembers: TeamMember[] = ${JSON.stringify(
                        teamList,
                        null,
                        2
                      )};\n`,
                      'data/team.ts'
                    )
                  }
                  className="p-3 rounded-xl bg-softwhite hover:bg-forest hover:text-softwhite text-charcoal border border-sage/40 text-xs font-semibold text-left transition-colors flex items-center justify-between"
                >
                  <span>5. Salin data/team.ts</span>
                  <Copy className="w-4 h-4 text-garden" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const fullBackup = {
                      products: productsList,
                      blog: blogList,
                      portfolio: portfolioList,
                      services: servicesList,
                      team: teamList,
                      site: siteData,
                      offices: officesData,
                      exportedAt: new Date().toISOString(),
                    };
                    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], {
                      type: 'application/json',
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `novio-full-database-${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="p-3 rounded-xl bg-garden text-softwhite hover:bg-garden-light text-xs font-semibold text-left transition-colors flex items-center justify-between shadow-sm"
                >
                  <span>Download Backup Lengkap JSON</span>
                  <Download className="w-4 h-4 text-white" />
                </button>
              </div>

              {copyFeedback && (
                <div className="p-3 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-fade-in mt-4">
                  <Check className="w-4 h-4" />
                  <span>{copyFeedback}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODAL: EDIT / CREATE PRODUCT (LENGKAP DENGAN UPLOAD FOTO) */}
        {/* ------------------------------------------------------------- */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm" onClick={() => setEditingProduct(null)} />
            <div className="relative w-full max-w-2xl bg-softwhite rounded-2xl shadow-2xl border border-sage/40 p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto space-y-5">
              <div className="flex items-center justify-between border-b border-sage/30 pb-3">
                <h3 className="font-serif text-xl font-medium text-charcoal">
                  {isCreatingProduct ? 'Tambah Produk Baru' : `Edit: ${editingProduct.name}`}
                </h3>
                <button type="button" onClick={() => setEditingProduct(null)} className="p-1 text-charcoal-muted hover:text-charcoal">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  let updated = [...productsList];
                  if (isCreatingProduct) {
                    updated = [editingProduct, ...productsList];
                  } else {
                    updated = productsList.map((p) => (p.id === editingProduct.id ? editingProduct : p));
                  }
                  setProductsList(updated);
                  persist('products', updated);
                  setEditingProduct(null);
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">Nama Produk *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        setEditingProduct({
                          ...editingProduct,
                          name,
                          slug: isCreatingProduct ? slug : editingProduct.slug,
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">Slug URL (/product/...) *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.slug}
                      onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal font-mono"
                    />
                  </div>
                </div>

                {/* Foto Sampul + Image Upload Button */}
                <div className="space-y-2 p-3 bg-cream/40 rounded-xl border border-sage/30">
                  <label className="font-semibold uppercase tracking-wider text-charcoal flex items-center justify-between">
                    <span>Foto Produk (Path atau Upload File) *</span>
                    <span className="text-[10px] text-garden font-normal">Bisa upload langsung dari laptop</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      required
                      value={editingProduct.coverImage}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          coverImage: e.target.value,
                          gallery: [e.target.value],
                        })
                      }
                      className="flex-1 px-3 py-2 rounded-lg bg-softwhite border border-sage/40 text-charcoal text-xs"
                      placeholder="/nama-foto.webp atau url https://"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-forest hover:bg-forest-light text-softwhite font-semibold text-xs cursor-pointer transition-colors shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Pilih Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (dataUrl) =>
                            setEditingProduct({
                              ...editingProduct,
                              coverImage: dataUrl,
                              gallery: [dataUrl],
                            })
                          )
                        }
                      />
                    </label>
                  </div>
                  {editingProduct.coverImage && (
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-sage/40 mt-1">
                      <Image src={editingProduct.coverImage} alt="Preview" fill sizes="96px" className="object-cover" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">Kategori *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">Asal Kebun / Provenance</label>
                    <input
                      type="text"
                      value={editingProduct.origin || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, origin: e.target.value })}
                      placeholder="cth: Parongpong, Bandung Barat"
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">Deskripsi Ringkas *</label>
                  <textarea
                    rows={2}
                    required
                    value={editingProduct.shortDescription}
                    onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">Deskripsi Lengkap & Kuliner</label>
                  <textarea
                    rows={4}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-sage/30">
                  <button type="button" onClick={() => setEditingProduct(null)} className="px-5 py-2.5 rounded-lg border border-sage/40 text-charcoal">
                    Batal
                  </button>
                  <button type="submit" className="px-6 py-2.5 rounded-lg bg-forest hover:bg-forest-light text-softwhite font-semibold flex items-center gap-2">
                    <Save className="w-4 h-4 text-sage" />
                    <span>Simpan Produk</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODAL: EDIT / CREATE PORTOFOLIO */}
        {/* ------------------------------------------------------------- */}
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm" onClick={() => setEditingProject(null)} />
            <div className="relative w-full max-w-2xl bg-softwhite rounded-2xl shadow-2xl border border-sage/40 p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto space-y-5">
              <div className="flex items-center justify-between border-b border-sage/30 pb-3">
                <h3 className="font-serif text-xl font-medium text-charcoal">
                  {isCreatingProject ? 'Tambah Proyek Portofolio' : `Edit: ${editingProject.title}`}
                </h3>
                <button type="button" onClick={() => setEditingProject(null)} className="p-1 text-charcoal-muted hover:text-charcoal">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  let updated = [...portfolioList];
                  if (isCreatingProject) {
                    updated = [editingProject, ...portfolioList];
                  } else {
                    updated = portfolioList.map((p) => (p.id === editingProject.id ? editingProject : p));
                  }
                  setPortfolioList(updated);
                  persist('portfolio', updated);
                  setEditingProject(null);
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">Judul Proyek *</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        setEditingProject({
                          ...editingProject,
                          title,
                          slug: isCreatingProject ? slug : editingProject.slug,
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">Lokasi *</label>
                    <input
                      type="text"
                      required
                      value={editingProject.location}
                      onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                      placeholder="cth: Uluwatu, Bali"
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                    />
                  </div>
                </div>

                <div className="space-y-2 p-3 bg-cream/40 rounded-xl border border-sage/30">
                  <label className="font-semibold uppercase tracking-wider text-charcoal flex items-center justify-between">
                    <span>Foto Utama Proyek *</span>
                    <span className="text-[10px] text-garden">Pilih dari laptop</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      required
                      value={editingProject.coverImage}
                      onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg bg-softwhite border border-sage/40 text-charcoal"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-forest hover:bg-forest-light text-softwhite font-semibold text-xs cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (dataUrl) =>
                            setEditingProject({ ...editingProject, coverImage: dataUrl })
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">Ringkasan Proyek *</label>
                  <textarea
                    rows={2}
                    required
                    value={editingProject.excerpt}
                    onChange={(e) => setEditingProject({ ...editingProject, excerpt: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">Tantangan Lapangan</label>
                    <textarea
                      rows={3}
                      value={editingProject.challenge}
                      onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">Solusi Botani NOVIO</label>
                    <textarea
                      rows={3}
                      value={editingProject.solution}
                      onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-sage/30">
                  <button type="button" onClick={() => setEditingProject(null)} className="px-5 py-2.5 rounded-lg border border-sage/40 text-charcoal">
                    Batal
                  </button>
                  <button type="submit" className="px-6 py-2.5 rounded-lg bg-forest hover:bg-forest-light text-softwhite font-semibold flex items-center gap-2">
                    <Save className="w-4 h-4 text-sage" />
                    <span>Simpan Proyek</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODAL: EDIT / CREATE TIM */}
        {/* ------------------------------------------------------------- */}
        {editingTeam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm" onClick={() => setEditingTeam(null)} />
            <div className="relative w-full max-w-md bg-softwhite rounded-2xl shadow-2xl border border-sage/40 p-6 sm:p-8 z-10 space-y-5">
              <div className="flex items-center justify-between border-b border-sage/30 pb-3">
                <h3 className="font-serif text-xl font-medium text-charcoal">
                  {isCreatingTeam ? 'Tambah Anggota Tim' : `Edit: ${editingTeam.name}`}
                </h3>
                <button type="button" onClick={() => setEditingTeam(null)} className="p-1 text-charcoal-muted hover:text-charcoal">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  let updated = [...teamList];
                  if (isCreatingTeam) {
                    updated = [...teamList, editingTeam];
                  } else {
                    updated = teamList.map((m) => (m.id === editingTeam.id ? editingTeam : m));
                  }
                  setTeamList(updated);
                  persist('team', updated);
                  setEditingTeam(null);
                }}
                className="space-y-4 text-xs"
              >
                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">Nama Anggota *</label>
                  <input
                    type="text"
                    required
                    value={editingTeam.name}
                    onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">Jabatan / Peran *</label>
                  <input
                    type="text"
                    required
                    value={editingTeam.role}
                    onChange={(e) => setEditingTeam({ ...editingTeam, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                  />
                </div>

                <div className="space-y-2 p-3 bg-cream/40 rounded-xl border border-sage/30">
                  <label className="font-semibold uppercase tracking-wider text-charcoal flex items-center justify-between">
                    <span>Foto Profil *</span>
                    <span className="text-[10px] text-garden">Pilih dari laptop</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      value={editingTeam.photo}
                      onChange={(e) => setEditingTeam({ ...editingTeam, photo: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-lg bg-softwhite border border-sage/40 text-charcoal"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-forest text-softwhite font-semibold text-xs cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (dataUrl) =>
                            setEditingTeam({ ...editingTeam, photo: dataUrl })
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">Bio Singkat</label>
                  <textarea
                    rows={3}
                    value={editingTeam.shortBio}
                    onChange={(e) => setEditingTeam({ ...editingTeam, shortBio: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                  <button type="button" onClick={() => setEditingTeam(null)} className="px-4 py-2 rounded-lg border border-sage/40 text-charcoal">
                    Batal
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-lg bg-forest text-softwhite font-semibold">
                    Simpan Anggota
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* ------------------------------------------------------------- */}
        {/* MODAL: EDIT / CREATE ARTIKEL BLOG */}
        {/* ------------------------------------------------------------- */}
        {editingBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
              onClick={() => setEditingBlog(null)}
            />
            <div className="relative w-full max-w-2xl bg-softwhite rounded-2xl shadow-2xl border border-sage/40 p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto space-y-5">
              <div className="flex items-center justify-between border-b border-sage/30 pb-3">
                <h3 className="font-serif text-xl font-medium text-charcoal">
                  {isCreatingBlog ? 'Tulis Artikel Jurnal Baru' : `Edit: ${editingBlog.title}`}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="p-1 text-charcoal-muted hover:text-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  let updated = [...blogList];
                  if (isCreatingBlog) {
                    updated = [editingBlog, ...blogList];
                  } else {
                    updated = blogList.map((b) => (b.id === editingBlog.id ? editingBlog : b));
                  }
                  setBlogList(updated);
                  persist('blog', updated);
                  setEditingBlog(null);
                }}
                className="space-y-4 text-xs"
              >
                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">
                    Judul Artikel *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBlog.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');
                      setEditingBlog({
                        ...editingBlog,
                        title,
                        slug: isCreatingBlog ? slug : editingBlog.slug,
                      });
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">
                      Slug URL (/blog/...) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingBlog.slug}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, slug: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">
                      Kategori *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingBlog.category}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, category: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                    />
                  </div>
                </div>

                {/* Cover Image Upload */}
                <div className="space-y-2 p-3 bg-cream/40 rounded-xl border border-sage/30">
                  <label className="font-semibold uppercase tracking-wider text-charcoal flex items-center justify-between">
                    <span>Foto Sampul Artikel *</span>
                    <span className="text-[10px] text-garden">Pilih dari laptop</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      required
                      value={editingBlog.coverImage}
                      onChange={(e) =>
                        setEditingBlog({ ...editingBlog, coverImage: e.target.value })
                      }
                      className="flex-1 px-3 py-2 rounded-lg bg-softwhite border border-sage/40 text-charcoal"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-forest text-softwhite font-semibold text-xs cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (dataUrl) =>
                            setEditingBlog({ ...editingBlog, coverImage: dataUrl })
                          )
                        }
                      />
                    </label>
                  </div>
                  {editingBlog.coverImage && (
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-sage/40 mt-1">
                      <Image src={editingBlog.coverImage} alt="Preview" fill sizes="96px" className="object-cover" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">
                      Nama Penulis *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingBlog.author.name}
                      onChange={(e) =>
                        setEditingBlog({
                          ...editingBlog,
                          author: { ...editingBlog.author, name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">
                      Peran / Jabatan Penulis
                    </label>
                    <input
                      type="text"
                      value={editingBlog.author.role}
                      onChange={(e) =>
                        setEditingBlog({
                          ...editingBlog,
                          author: { ...editingBlog.author, role: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">
                    Ringkasan Artikel (Excerpt) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingBlog.excerpt}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, excerpt: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">
                    Isi Artikel Lengkap *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={editingBlog.content}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, content: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal font-sans"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                  <button
                    type="button"
                    onClick={() => setEditingBlog(null)}
                    className="px-4 py-2 rounded-lg border border-sage/40 text-charcoal"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-forest text-softwhite font-semibold flex items-center gap-2"
                  >
                    <Save className="w-4 h-4 text-sage" />
                    <span>Simpan Artikel</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODAL: EDIT / CREATE LAYANAN */}
        {/* ------------------------------------------------------------- */}
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
              onClick={() => setEditingService(null)}
            />
            <div className="relative w-full max-w-2xl bg-softwhite rounded-2xl shadow-2xl border border-sage/40 p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto space-y-5">
              <div className="flex items-center justify-between border-b border-sage/30 pb-3">
                <h3 className="font-serif text-xl font-medium text-charcoal">
                  {isCreatingService ? 'Tambah Layanan Baru' : `Edit: ${editingService.title}`}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="p-1 text-charcoal-muted hover:text-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  let updated = [...servicesList];
                  if (isCreatingService) {
                    updated = [editingService, ...servicesList];
                  } else {
                    updated = servicesList.map((s) => (s.id === editingService.id ? editingService : s));
                  }
                  setServicesList(updated);
                  persist('services', updated);
                  setEditingService(null);
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">
                      Nama Layanan *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingService.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)+/g, '');
                        setEditingService({
                          ...editingService,
                          title,
                          slug: isCreatingService ? slug : editingService.slug,
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">
                      Target Pengguna *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingService.targetAudience}
                      onChange={(e) =>
                        setEditingService({ ...editingService, targetAudience: e.target.value })
                      }
                      placeholder="Vila Mewah, Perkantoran, dsb"
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                    />
                  </div>
                </div>

                <div className="space-y-2 p-3 bg-cream/40 rounded-xl border border-sage/30">
                  <label className="font-semibold uppercase tracking-wider text-charcoal flex items-center justify-between">
                    <span>Foto Banner Layanan *</span>
                    <span className="text-[10px] text-garden">Pilih dari laptop</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      required
                      value={editingService.coverImage}
                      onChange={(e) =>
                        setEditingService({ ...editingService, coverImage: e.target.value })
                      }
                      className="flex-1 px-3 py-2 rounded-lg bg-softwhite border border-sage/40 text-charcoal"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-forest text-softwhite font-semibold text-xs cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (dataUrl) =>
                            setEditingService({ ...editingService, coverImage: dataUrl })
                          )
                        }
                      />
                    </label>
                  </div>
                  {editingService.coverImage && (
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-sage/40 mt-1">
                      <Image src={editingService.coverImage} alt="Preview" fill sizes="96px" className="object-cover" />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">
                    Tagline Ringkas *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.tagline}
                    onChange={(e) =>
                      setEditingService({ ...editingService, tagline: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">
                    Deskripsi Lengkap Layanan *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={editingService.description}
                    onChange={(e) =>
                      setEditingService({ ...editingService, description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">
                      Model Biaya / Harga
                    </label>
                    <input
                      type="text"
                      value={editingService.pricingModel}
                      onChange={(e) =>
                        setEditingService({ ...editingService, pricingModel: e.target.value })
                      }
                      placeholder="cth: Mulai dari Rp 1.500.000"
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">
                      Garansi Layanan
                    </label>
                    <input
                      type="text"
                      value={editingService.guarantee}
                      onChange={(e) =>
                        setEditingService({ ...editingService, guarantee: e.target.value })
                      }
                      placeholder="cth: Garansi Aklimatisasi 30 Hari"
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 rounded-lg border border-sage/40 text-charcoal"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-forest text-softwhite font-semibold flex items-center gap-2"
                  >
                    <Save className="w-4 h-4 text-sage" />
                    <span>Simpan Layanan</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
