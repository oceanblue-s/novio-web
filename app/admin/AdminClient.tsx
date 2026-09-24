'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products as defaultProducts } from '@/data/products';
import { blogPosts as defaultBlogPosts } from '@/data/blog';
import { siteConfig as defaultSiteConfig, offices as defaultOffices } from '@/data/site';
import { Product, BlogPost } from '@/types';
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
  ArrowRight,
  ExternalLink,
  ChefHat,
  Leaf,
  FileText,
  Phone,
  MapPin,
  Download,
  Copy,
  AlertCircle,
  Sparkles,
  Layers,
} from 'lucide-react';

const ADMIN_PIN = 'novio2026';
const STORAGE_PRODUCTS_KEY = 'novio_admin_products_v1';
const STORAGE_BLOG_KEY = 'novio_admin_blog_v1';
const STORAGE_AUTH_KEY = 'novio_admin_authenticated';

export default function AdminClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [pinError, setPinError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'products' | 'blog' | 'site' | 'export'>('products');

  // Products State
  const [productsList, setProductsList] = useState<Product[]>(defaultProducts);
  const [productSearch, setProductSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  // Blog State
  const [blogList, setBlogList] = useState<BlogPost[]>(defaultBlogPosts);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);

  // Site Config State
  const [siteData, setSiteData] = useState(defaultSiteConfig);
  const [copySuccess, setCopySuccess] = useState('');

  // Check auth & load storage on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem(STORAGE_AUTH_KEY);
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    try {
      const storedProds = localStorage.getItem(STORAGE_PRODUCTS_KEY);
      if (storedProds) {
        setProductsList(JSON.parse(storedProds));
      }
      const storedBlog = localStorage.getItem(STORAGE_BLOG_KEY);
      if (storedBlog) {
        setBlogList(JSON.parse(storedBlog));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save to localStorage whenever data changes
  const saveProductsToStorage = (newList: Product[]) => {
    setProductsList(newList);
    try {
      localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(newList));
    } catch {}
  };

  const saveBlogToStorage = (newList: BlogPost[]) => {
    setBlogList(newList);
    try {
      localStorage.setItem(STORAGE_BLOG_KEY, JSON.stringify(newList));
    } catch {}
  };

  // Auth Submit
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem(STORAGE_AUTH_KEY, 'true');
      setPinError('');
    } else {
      setPinError('PIN salah. Silakan coba kembali (default: novio2026)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(STORAGE_AUTH_KEY);
    setPinInput('');
  };

  // -------------------------------------------------------------
  // Product CRUD
  // -------------------------------------------------------------
  const handleSaveProduct = (product: Product) => {
    if (isCreatingProduct) {
      const exists = productsList.some((p) => p.id === product.id);
      const finalId = exists ? `prod-${Date.now()}` : product.id;
      const updated = [{ ...product, id: finalId }, ...productsList];
      saveProductsToStorage(updated);
    } else {
      const updated = productsList.map((p) => (p.id === product.id ? product : p));
      saveProductsToStorage(updated);
    }
    setEditingProduct(null);
    setIsCreatingProduct(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Yakin ingin menghapus produk "${name}"?`)) {
      const updated = productsList.filter((p) => p.id !== id);
      saveProductsToStorage(updated);
    }
  };

  const handleStartCreateProduct = () => {
    const newProd: Product = {
      id: `prod-${Date.now().toString().slice(-4)}`,
      slug: 'produk-baru-novio',
      name: '',
      shortDescription: '',
      description: '',
      coverImage: '/novio-baby-leaf-spinach.webp',
      gallery: ['/novio-baby-leaf-spinach.webp'],
      category: 'Hasil Segar & Daun',
      environment: 'Bright Indirect',
      features: ['100% Alami Bebas Pestisida', 'Dipanen Segar untuk Dapur Chef'],
      published: true,
      origin: 'Parongpong, Bandung Barat',
      specifications: {
        Kemasan: 'Pouch Higienis / Box Suhu Terjaga',
        Penyimpanan: 'Chiller 4-8°C',
      },
    };
    setEditingProduct(newProd);
    setIsCreatingProduct(true);
  };

  // -------------------------------------------------------------
  // Blog CRUD
  // -------------------------------------------------------------
  const handleSaveBlog = (blog: BlogPost) => {
    if (isCreatingBlog) {
      const updated = [{ ...blog, id: `blog-${Date.now().toString().slice(-4)}` }, ...blogList];
      saveBlogToStorage(updated);
    } else {
      const updated = blogList.map((b) => (b.id === blog.id ? blog : b));
      saveBlogToStorage(updated);
    }
    setEditingBlog(null);
    setIsCreatingBlog(false);
  };

  const handleDeleteBlog = (id: string, title: string) => {
    if (window.confirm(`Yakin ingin menghapus artikel "${title}"?`)) {
      const updated = blogList.filter((b) => b.id !== id);
      saveBlogToStorage(updated);
    }
  };

  const handleStartCreateBlog = () => {
    const newBlog: BlogPost = {
      id: `blog-${Date.now().toString().slice(-4)}`,
      slug: 'artikel-baru-novio',
      title: '',
      excerpt: '',
      content: '',
      coverImage: '/greenhouse-hero.jpg',
      category: 'Sains & Pertanian',
      author: {
        name: 'Danang',
        role: 'Direktur Hortikultura & Budidaya',
        avatar: '/team-member-3.png',
      },
      publishedAt: '24 September 2026',
      tags: ['Novio', 'Petani Lokal', 'Kuliner Alami'],
      seo: {
        title: 'Artikel Baru | Jurnal NOVIO',
        description: 'Catatan editorial dan sains pertanian alami NOVIO.',
      },
    };
    setEditingBlog(newBlog);
    setIsCreatingBlog(true);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return productsList;
    const q = productSearch.toLowerCase();
    return productsList.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    );
  }, [productsList, productSearch]);

  // Export helper
  const handleCopyTypeScriptCode = () => {
    const code = `import { Product } from '@/types';\n\nexport const products: Product[] = ${JSON.stringify(
      productsList,
      null,
      2
    )};\n`;
    navigator.clipboard.writeText(code);
    setCopySuccess('Kode data/products.ts berhasil disalin ke clipboard!');
    setTimeout(() => setCopySuccess(''), 4000);
  };

  const handleDownloadJSON = () => {
    const data = {
      products: productsList,
      blog: blogList,
      site: siteData,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `novio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // -------------------------------------------------------------
  // 1. PIN Login Screen
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-softwhite flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-cream rounded-2xl p-8 sm:p-10 border border-sage/40 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-14 h-14 rounded-full overflow-hidden mx-auto shadow-sm border border-sage/40">
              <Image
                src="/novio-logo.png"
                alt="Logo NOVIO"
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
            <h1 className="font-serif text-2xl font-bold tracking-wider text-charcoal">
              Portal Admin NOVIO
            </h1>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Masuk untuk mengelola produk kuliner, artikel jurnal, dan pengaturan website.
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
                  aria-label={showPin ? 'Sembunyikan PIN' : 'Tampilkan PIN'}
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
  // 2. Main Admin Dashboard
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-softwhite pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Header Bar */}
        <div className="bg-forest text-softwhite rounded-2xl p-6 sm:p-8 mb-8 border border-forest-light shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-forest-light/60 border border-sage/40 shrink-0">
              <Image
                src="/novio-logo.png"
                alt="Logo NOVIO"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-sage font-semibold">
                  Dashboard Manajemen Konten
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide">
                Portal Pengelola NOVIO
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cream/15 hover:bg-cream/25 text-cream border border-sage/40 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <span>Lihat Web Live</span>
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-sage/30 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-forest text-softwhite shadow-sm'
                : 'bg-cream text-charcoal/70 hover:bg-cream-dark'
            }`}
          >
            <Leaf className="w-4 h-4 text-sage" />
            <span>Katalog Produk ({productsList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('blog')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'blog'
                ? 'bg-forest text-softwhite shadow-sm'
                : 'bg-cream text-charcoal/70 hover:bg-cream-dark'
            }`}
          >
            <FileText className="w-4 h-4 text-sage" />
            <span>Artikel Jurnal ({blogList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('site')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
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
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'export'
                ? 'bg-forest text-softwhite shadow-sm'
                : 'bg-cream text-charcoal/70 hover:bg-cream-dark'
            }`}
          >
            <Download className="w-4 h-4 text-sage" />
            <span>Backup & Ekspor Kode</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: PRODUCT MANAGER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Cari produk di admin..."
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-cream border border-sage/40 text-charcoal focus:outline-none focus:ring-1 focus:ring-garden"
                />
              </div>

              <button
                type="button"
                onClick={handleStartCreateProduct}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-garden hover:bg-garden-light text-softwhite text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Produk Baru</span>
              </button>
            </div>

            {/* Products Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-cream/60 rounded-xl p-5 border border-sage/40 flex flex-col justify-between hover:bg-cream transition-all group"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-softwhite border border-sage/30">
                      <Image
                        src={p.coverImage}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-wider bg-forest/90 text-softwhite px-2 py-0.5 rounded">
                        {p.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-medium text-charcoal">
                        {p.name}
                      </h3>
                      <p className="text-xs text-charcoal/70 line-clamp-2 mt-1">
                        {p.shortDescription}
                      </p>
                    </div>

                    <div className="text-[11px] text-charcoal-muted space-y-0.5">
                      <p>Asal: {p.origin || 'Kebun Mitra'}</p>
                      <p>Karakter: {p.environment || '-'}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-sage/30 flex items-center justify-between gap-2">
                    <Link
                      href={`/product/${p.slug}`}
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
                          setEditingProduct(p);
                          setIsCreatingProduct(false);
                        }}
                        className="p-2 rounded-lg bg-softwhite hover:bg-forest hover:text-softwhite text-charcoal border border-sage/30 text-xs transition-colors"
                        title="Edit Produk"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        className="p-2 rounded-lg bg-softwhite hover:bg-earth hover:text-softwhite text-charcoal border border-sage/30 text-xs transition-colors"
                        title="Hapus Produk"
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
        {/* TAB 2: BLOG MANAGER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-medium text-charcoal">
                Daftar Artikel Jurnal ({blogList.length})
              </h2>
              <button
                type="button"
                onClick={handleStartCreateBlog}
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
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-garden">
                        {article.category} • {article.publishedAt}
                      </span>
                      <h3 className="font-serif text-base font-medium text-charcoal">
                        {article.title}
                      </h3>
                      <p className="text-xs text-charcoal/70 line-clamp-1">
                        {article.excerpt}
                      </p>
                      <p className="text-[11px] text-charcoal-muted">
                        Penulis: {article.author.name} ({article.author.role})
                      </p>
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
                      title="Edit Artikel"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteBlog(article.id, article.title)}
                      className="p-2 rounded-lg bg-softwhite hover:bg-earth hover:text-softwhite text-charcoal border border-sage/30 transition-colors"
                      title="Hapus Artikel"
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
        {/* TAB 3: SITE CONFIG & WHATSAPP */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'site' && (
          <div className="max-w-2xl bg-cream/60 rounded-2xl p-6 sm:p-8 border border-sage/40 space-y-6">
            <div>
              <h2 className="font-serif text-xl font-medium text-charcoal">
                Pengaturan Kontak & WhatsApp
              </h2>
              <p className="text-xs text-charcoal/70 mt-1">
                Informasi ini digunakan di seluruh tombol WhatsApp, header, footer, dan kartu kantor.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold uppercase tracking-wider text-charcoal">
                  Nomor WhatsApp Utama (Bandung / Pesanan Kuliner)
                </label>
                <input
                  type="text"
                  value={siteData.whatsappTarget}
                  onChange={(e) => setSiteData({ ...siteData, whatsappTarget: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-softwhite border border-sage/40 text-charcoal"
                />
                <p className="text-[10px] text-charcoal-muted">
                  Format tanpa tanda &apos;+&apos; (contoh: 6281312414863)
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-semibold uppercase tracking-wider text-charcoal">
                  Email Layanan Pelanggan
                </label>
                <input
                  type="email"
                  value={siteData.generalEmail}
                  onChange={(e) => setSiteData({ ...siteData, generalEmail: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-softwhite border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold uppercase tracking-wider text-charcoal">
                  Alamat Kantor Pusat Bandung
                </label>
                <textarea
                  rows={2}
                  value={siteData.mainAddress}
                  onChange={(e) => setSiteData({ ...siteData, mainAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-softwhite border border-sage/40 text-charcoal"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    alert('Pengaturan kontak tersimpan di sesi admin!');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-forest hover:bg-forest-light text-softwhite font-semibold uppercase tracking-wider"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Pengaturan Kontak</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: BACKUP & EKSPOR KODE */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'export' && (
          <div className="max-w-3xl space-y-6">
            <div className="bg-cream/60 rounded-2xl p-6 sm:p-8 border border-sage/40 space-y-4">
              <h2 className="font-serif text-xl font-medium text-charcoal">
                Ekspor & Sinkronisasi Kode Data
              </h2>
              <p className="text-xs text-charcoal/80 leading-relaxed">
                Ketika Anda menambah produk atau artikel baru lewat halaman admin ini, data disimpan langsung di browser Anda. Jika Anda ingin perubahan ini menjadi **permanen di Vercel untuk semua pengunjung**:
              </p>

              <ol className="text-xs text-charcoal/80 space-y-2 list-decimal list-inside bg-softwhite p-4 rounded-xl border border-sage/30">
                <li>Klik tombol <strong>&quot;Salin Kode data/products.ts&quot;</strong> di bawah.</li>
                <li>Buka file <code>data/products.ts</code> di komputer Anda lalu paste (timpa isinya).</li>
                <li>Jalankan <code>git add . && git commit -m &quot;Update produk&quot; && git push</code> ke GitHub.</li>
              </ol>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopyTypeScriptCode}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest hover:bg-forest-light text-softwhite text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Copy className="w-4 h-4" />
                  <span>Salin Kode data/products.ts</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadJSON}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-garden hover:bg-garden-light text-softwhite text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup JSON</span>
                </button>
              </div>

              {copySuccess && (
                <div className="p-3 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-fade-in">
                  <Check className="w-4 h-4" />
                  <span>{copySuccess}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PRODUCT EDIT / CREATE MODAL */}
        {/* ------------------------------------------------------------- */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
              onClick={() => setEditingProduct(null)}
            />

            <div className="relative w-full max-w-2xl bg-softwhite rounded-2xl shadow-2xl border border-sage/40 p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b border-sage/30 pb-4">
                <h3 className="font-serif text-xl font-medium text-charcoal">
                  {isCreatingProduct ? 'Tambah Produk Baru' : `Edit: ${editingProduct.name}`}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="p-1.5 text-charcoal-muted hover:text-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveProduct(editingProduct);
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">
                      Nama Produk *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        const slug = name
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)+/g, '');
                        setEditingProduct({
                          ...editingProduct,
                          name,
                          slug: isCreatingProduct ? slug : editingProduct.slug,
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal focus:ring-1 focus:ring-garden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">
                      Slug URL (/product/...) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.slug}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, slug: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal focus:ring-1 focus:ring-garden font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">
                      Kategori *
                    </label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, category: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal focus:ring-1 focus:ring-garden"
                    >
                      <option value="Hasil Segar & Daun">Hasil Segar & Daun</option>
                      <option value="Tisane & Herba">Tisane & Herba</option>
                      <option value="Fermentasi Alami">Fermentasi Alami</option>
                      <option value="Sayuran Spesial">Sayuran Spesial</option>
                      <option value="Olahan Awetan & Madu">Olahan Awetan & Madu</option>
                      <option value="Tanaman Pot Hidup">Tanaman Pot Hidup</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">
                      Karakter Penyimpanan *
                    </label>
                    <select
                      value={editingProduct.environment || 'Bright Indirect'}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          environment: e.target.value as Product['environment'],
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal focus:ring-1 focus:ring-garden"
                    >
                      <option value="Bright Indirect">Segar & Suhu Terjaga (Fresh)</option>
                      <option value="Low-Light Quiet">Penyimpanan Sejuk (Pantry)</option>
                      <option value="Veranda & Balcony">Tanaman Pot Hidup (Teras/Dapur)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">
                      Path Foto Sampul (di folder public/) *
                    </label>
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
                      placeholder="/nama-foto.webp atau link https://"
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal focus:ring-1 focus:ring-garden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold uppercase tracking-wider text-charcoal">
                      Asal Kebun / Provenance
                    </label>
                    <input
                      type="text"
                      value={editingProduct.origin || ''}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, origin: e.target.value })
                      }
                      placeholder="cth: Parongpong, Bandung Barat"
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal focus:ring-1 focus:ring-garden"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">
                    Deskripsi Ringkas (Tampil di Kartu Katalog) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingProduct.shortDescription}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, shortDescription: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal focus:ring-1 focus:ring-garden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold uppercase tracking-wider text-charcoal">
                    Deskripsi Lengkap & Aplikasi Kuliner
                  </label>
                  <textarea
                    rows={4}
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal focus:ring-1 focus:ring-garden"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-sage/30">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-5 py-2.5 rounded-lg text-charcoal hover:bg-cream border border-sage/40 font-semibold uppercase tracking-wider"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-forest hover:bg-forest-light text-softwhite font-semibold uppercase tracking-wider flex items-center gap-2"
                  >
                    <Save className="w-4 h-4 text-sage" />
                    <span>Simpan Produk</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* BLOG EDIT / CREATE MODAL */}
        {/* ------------------------------------------------------------- */}
        {editingBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
              className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
              onClick={() => setEditingBlog(null)}
            />

            <div className="relative w-full max-w-2xl bg-softwhite rounded-2xl shadow-2xl border border-sage/40 p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b border-sage/30 pb-4">
                <h3 className="font-serif text-xl font-medium text-charcoal">
                  {isCreatingBlog ? 'Tulis Artikel Jurnal Baru' : `Edit: ${editingBlog.title}`}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="p-1.5 text-charcoal-muted hover:text-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveBlog(editingBlog);
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
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal focus:ring-1 focus:ring-garden"
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
                      onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal focus:ring-1 focus:ring-garden font-mono"
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
                      onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal focus:ring-1 focus:ring-garden"
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
                    onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal focus:ring-1 focus:ring-garden"
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
                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-cream/40 border border-sage/40 text-charcoal focus:ring-1 focus:ring-garden font-sans"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-sage/30">
                  <button
                    type="button"
                    onClick={() => setEditingBlog(null)}
                    className="px-5 py-2.5 rounded-lg text-charcoal hover:bg-cream border border-sage/40 font-semibold uppercase tracking-wider"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-forest hover:bg-forest-light text-softwhite font-semibold uppercase tracking-wider flex items-center gap-2"
                  >
                    <Save className="w-4 h-4 text-sage" />
                    <span>Simpan Artikel</span>
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
