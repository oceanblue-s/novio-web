'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { products as defaultProducts } from '@/data/products';
import { blogPosts as defaultBlogPosts } from '@/data/blog';
import { portfolioProjects as defaultPortfolio } from '@/data/portfolio';
import { servicePackages as defaultServices } from '@/data/services';
import { teamMembers as defaultTeam } from '@/data/team';
import { siteConfig as defaultSiteConfig, offices as defaultOffices } from '@/data/site';
import { Product, BlogPost, PortfolioProject, ServicePackage, TeamMember, Office } from '@/types';
import {
  CustomizerSettings,
  defaultCustomizerSettings,
  safeMergeSettings,
} from '@/context/LiveCustomizerContext';
import {
  X,
  Upload,
  Check,
  Trash2,
  Save,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  Plus,
  Pencil,
  Sparkles,
} from 'lucide-react';

const ADMIN_PIN = 'novio2026';
const STORAGE_PREFIX = 'novio_admin_';
const STORAGE_CUSTOMIZER_KEY = 'novio_live_customizer_settings_v1';
const STORAGE_EDIT_MODE_KEY = 'novio_visual_edit_mode_active';

interface SiteDataContextType {
  // State
  isEditMode: boolean;
  isPreviewMode: boolean;
  products: Product[];
  blogPosts: BlogPost[];
  portfolioProjects: PortfolioProject[];
  servicePackages: ServicePackage[];
  teamMembers: TeamMember[];
  customizerSettings: CustomizerSettings;

  // Mode Toggles
  enableEditMode: () => void;
  disableEditMode: () => void;
  togglePreviewMode: () => void;

  // CRUD Operations
  saveProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  saveBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  savePortfolioProject: (project: PortfolioProject) => void;
  deletePortfolioProject: (id: string) => void;
  saveServicePackage: (service: ServicePackage) => void;
  deleteServicePackage: (id: string) => void;
  saveTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  updateCustomizerSettings: (settings: Partial<CustomizerSettings>) => void;

  // Modal Openers for In-Context Editing
  openEditProduct: (product: Product) => void;
  openCreateProduct: () => void;
  openEditBlog: (post: BlogPost) => void;
  openCreateBlog: () => void;
  openEditPortfolio: (project: PortfolioProject) => void;
  openCreatePortfolio: () => void;
  openEditService: (service: ServicePackage) => void;
  openCreateService: () => void;
  openEditTeam: (member: TeamMember) => void;
  openCreateTeam: () => void;
  openEditHero: () => void;
  openEditCommitment: () => void;
  openEditContact: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  // Edit mode flags
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPinText, setShowPinText] = useState(false);

  // Datasets
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultBlogPosts);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>(defaultPortfolio);
  const [servicePackages, setServicePackages] = useState<ServicePackage[]>(defaultServices);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultTeam);
  const [customizerSettings, setCustomizerSettings] = useState<CustomizerSettings>(defaultCustomizerSettings);

  // Active Modals
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);

  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioProject | null>(null);
  const [isCreatingPortfolio, setIsCreatingPortfolio] = useState(false);

  const [editingService, setEditingService] = useState<ServicePackage | null>(null);
  const [isCreatingService, setIsCreatingService] = useState(false);

  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);

  const [isEditingHero, setIsEditingHero] = useState(false);
  const [isEditingCommitment, setIsEditingCommitment] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);

  // Load datasets and edit mode on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // Load datasets from localStorage
        const p = window.localStorage.getItem(`${STORAGE_PREFIX}products`);
        if (p) setProducts(JSON.parse(p));

        const b = window.localStorage.getItem(`${STORAGE_PREFIX}blog`);
        if (b) setBlogPosts(JSON.parse(b));

        const port = window.localStorage.getItem(`${STORAGE_PREFIX}portfolio`);
        if (port) setPortfolioProjects(JSON.parse(port));

        const s = window.localStorage.getItem(`${STORAGE_PREFIX}services`);
        if (s) setServicePackages(JSON.parse(s));

        const t = window.localStorage.getItem(`${STORAGE_PREFIX}team`);
        if (t) setTeamMembers(JSON.parse(t));

        const cust = window.localStorage.getItem(STORAGE_CUSTOMIZER_KEY);
        if (cust) setCustomizerSettings((prev) => safeMergeSettings(prev, JSON.parse(cust)));

        // Check if edit mode active
        const urlParams = new URLSearchParams(window.location.search);
        const hasEditQuery = urlParams.get('edit') === 'true';
        const isEditStored = window.localStorage?.getItem(STORAGE_EDIT_MODE_KEY) === 'true';

        if (hasEditQuery || isEditStored) {
          setIsEditMode(true);
          window.localStorage?.setItem(STORAGE_EDIT_MODE_KEY, 'true');
          window.sessionStorage?.setItem('novio_admin_authenticated', 'true');
        }
      }
    } catch {}
  }, []);

  // Mode Toggles
  const enableEditMode = () => {
    setIsEditMode(true);
    setIsPreviewMode(false);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage?.setItem(STORAGE_EDIT_MODE_KEY, 'true');
        window.sessionStorage?.setItem('novio_admin_authenticated', 'true');
      }
    } catch {}
  };

  const disableEditMode = () => {
    setIsEditMode(false);
    setIsPreviewMode(false);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(STORAGE_EDIT_MODE_KEY);
      }
    } catch {}
  };

  const togglePreviewMode = () => {
    setIsPreviewMode((prev) => !prev);
  };

  const handleUnlockPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      try {
        if (typeof window !== 'undefined' && window.sessionStorage) {
          window.sessionStorage.setItem('novio_admin_authenticated', 'true');
          window.localStorage?.setItem(STORAGE_EDIT_MODE_KEY, 'true');
        }
      } catch {}
      setIsEditMode(true);
      setShowPinModal(false);
      setPinError('');
    } else {
      setPinError('PIN salah. Silakan coba lagi (default: novio2026).');
    }
  };

  // -------------------------------------------------------------
  // CRUD PERSISTENCE HELPERS
  // -------------------------------------------------------------
  const persistProducts = (updated: Product[]) => {
    setProducts(updated);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(`${STORAGE_PREFIX}products`, JSON.stringify(updated));
      }
    } catch {}
  };

  const saveProduct = (product: Product) => {
    const exists = products.some((p) => p.id === product.id);
    const updated = exists ? products.map((p) => (p.id === product.id ? product : p)) : [product, ...products];
    persistProducts(updated);
    setEditingProduct(null);
    setIsCreatingProduct(false);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    persistProducts(updated);
  };

  const persistBlog = (updated: BlogPost[]) => {
    setBlogPosts(updated);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(`${STORAGE_PREFIX}blog`, JSON.stringify(updated));
      }
    } catch {}
  };

  const saveBlogPost = (post: BlogPost) => {
    const exists = blogPosts.some((b) => b.id === post.id);
    const updated = exists ? blogPosts.map((b) => (b.id === post.id ? post : b)) : [post, ...blogPosts];
    persistBlog(updated);
    setEditingBlog(null);
    setIsCreatingBlog(false);
  };

  const deleteBlogPost = (id: string) => {
    const updated = blogPosts.filter((b) => b.id !== id);
    persistBlog(updated);
  };

  const persistPortfolio = (updated: PortfolioProject[]) => {
    setPortfolioProjects(updated);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(`${STORAGE_PREFIX}portfolio`, JSON.stringify(updated));
      }
    } catch {}
  };

  const savePortfolioProject = (project: PortfolioProject) => {
    const exists = portfolioProjects.some((p) => p.id === project.id);
    const updated = exists ? portfolioProjects.map((p) => (p.id === project.id ? project : p)) : [project, ...portfolioProjects];
    persistPortfolio(updated);
    setEditingPortfolio(null);
    setIsCreatingPortfolio(false);
  };

  const deletePortfolioProject = (id: string) => {
    const updated = portfolioProjects.filter((p) => p.id !== id);
    persistPortfolio(updated);
  };

  const persistServices = (updated: ServicePackage[]) => {
    setServicePackages(updated);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(`${STORAGE_PREFIX}services`, JSON.stringify(updated));
      }
    } catch {}
  };

  const saveServicePackage = (service: ServicePackage) => {
    const exists = servicePackages.some((s) => s.id === service.id);
    const updated = exists ? servicePackages.map((s) => (s.id === service.id ? service : s)) : [service, ...servicePackages];
    persistServices(updated);
    setEditingService(null);
    setIsCreatingService(false);
  };

  const deleteServicePackage = (id: string) => {
    const updated = servicePackages.filter((s) => s.id !== id);
    persistServices(updated);
  };

  const persistTeam = (updated: TeamMember[]) => {
    setTeamMembers(updated);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(`${STORAGE_PREFIX}team`, JSON.stringify(updated));
      }
    } catch {}
  };

  const saveTeamMember = (member: TeamMember) => {
    const exists = teamMembers.some((t) => t.id === member.id);
    const updated = exists ? teamMembers.map((t) => (t.id === member.id ? member : t)) : [...teamMembers, member];
    persistTeam(updated);
    setEditingTeam(null);
    setIsCreatingTeam(false);
  };

  const deleteTeamMember = (id: string) => {
    const updated = teamMembers.filter((t) => t.id !== id);
    persistTeam(updated);
  };

  const updateCustomizerSettings = (newSettings: Partial<CustomizerSettings>) => {
    setCustomizerSettings((prev) => {
      const merged = safeMergeSettings(prev, newSettings);
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(STORAGE_CUSTOMIZER_KEY, JSON.stringify(merged));
        }
      } catch {}
      return merged;
    });
  };

  // Helper for image upload to base64
  const handleImageFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    onDone: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) onDone(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        isEditMode,
        isPreviewMode,
        products,
        blogPosts,
        portfolioProjects,
        servicePackages,
        teamMembers,
        customizerSettings,

        enableEditMode,
        disableEditMode,
        togglePreviewMode,

        saveProduct,
        deleteProduct,
        saveBlogPost,
        deleteBlogPost,
        savePortfolioProject,
        deletePortfolioProject,
        saveServicePackage,
        deleteServicePackage,
        saveTeamMember,
        deleteTeamMember,
        updateCustomizerSettings,

        openEditProduct: (p) => setEditingProduct(p),
        openCreateProduct: () => {
          setEditingProduct({
            id: `prod_${Date.now()}`,
            name: '',
            slug: `produk-${Date.now()}`,
            category: 'Tisane & Botanical Blends',
            shortDescription: '',
            description: '',
            coverImage: '/about-greenhouse-bg.jpg',
            gallery: [],
            features: ['Alami', 'Segar'],
            published: true,
          });
          setIsCreatingProduct(true);
        },
        openEditBlog: (b) => setEditingBlog(b),
        openCreateBlog: () => {
          setEditingBlog({
            id: `blog_${Date.now()}`,
            title: '',
            slug: `artikel-${Date.now()}`,
            category: 'Kuliner & Chef',
            excerpt: '',
            content: '',
            coverImage: '/about-greenhouse-bg.jpg',
            author: { name: 'Tim Redaksi Novio', role: 'Kurator Botani', avatar: '/novio-logo.png' },
            publishedAt: new Date().toISOString(),
            tags: ['Bahan Alami', 'Artisan'],
            seo: { title: '', description: '' },
          });
          setIsCreatingBlog(true);
        },
        openEditPortfolio: (p) => setEditingPortfolio(p),
        openCreatePortfolio: () => {
          setEditingPortfolio({
            id: `proj_${Date.now()}`,
            title: '',
            subtitle: '',
            slug: `proyek-${Date.now()}`,
            clientCategory: 'Luxury Hospitality',
            location: 'Bandung / Bali',
            year: `${new Date().getFullYear()}`,
            coverImage: '/commitment-flora.jpg',
            gallery: [],
            beforeImage: '/commitment-flora.jpg',
            afterImage: '/about-greenhouse-bg.jpg',
            beforeLabel: 'Sebelum',
            afterLabel: 'Sesudah Kurasi',
            excerpt: '',
            challenge: '',
            solution: '',
            curatedSpecimens: [],
            featured: false,
          });
          setIsCreatingPortfolio(true);
        },
        openEditService: (s) => setEditingService(s),
        openCreateService: () => {
          setEditingService({
            id: `srv_${Date.now()}`,
            title: '',
            slug: `layanan-${Date.now()}`,
            tagline: '',
            description: '',
            targetAudience: 'Chef & Restoran',
            coverImage: '/about-greenhouse-bg.jpg',
            features: ['Konsultasi Spesifikasi', 'Pengiriman Terjadwal'],
            deliverables: ['Pasokan Segar', 'Katalog B2B'],
            pricingModel: 'Kemitraan Pasokan B2B',
            guarantee: 'Jaminan Kesegaran Alami',
            recommendedFor: 'Hotel & Restoran Profesional',
            whatsappMessage: 'Halo Novio, saya ingin berkonsultasi mengenai pasokan bahan.',
            popular: false,
          });
          setIsCreatingService(true);
        },
        openEditTeam: (t) => setEditingTeam(t),
        openCreateTeam: () => {
          setEditingTeam({
            id: `team_${Date.now()}`,
            name: '',
            role: '',
            photo: '/novio-logo.png',
            shortBio: '',
            order: teamMembers.length + 1,
          });
          setIsCreatingTeam(true);
        },
        openEditHero: () => setIsEditingHero(true),
        openEditCommitment: () => setIsEditingCommitment(true),
        openEditContact: () => setIsEditingContact(true),
      }}
    >
      {children}

      {/* ------------------------------------------------------------- */}
      {/* 1. PIN UNLOCK MODAL */}
      {/* ------------------------------------------------------------- */}
      {showPinModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full bg-cream rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-sage/30 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-forest text-softwhite flex items-center justify-center font-bold text-xs">
                  🌱
                </div>
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  Buka Mode Edit Visual
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPinModal(false)}
                className="p-1 text-charcoal/60 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-charcoal/75 leading-relaxed">
              Masukkan PIN pengelola untuk mengaktifkan tombol <strong>Edit</strong>, <strong>Hapus</strong>, dan <strong>Tambah</strong> langsung di setiap komponen halaman.
            </p>

            <form onSubmit={handleUnlockPin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  PIN Pengelola
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPinText ? 'text' : 'password'}
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
                    onClick={() => setShowPinText(!showPinText)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal"
                  >
                    {showPinText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {pinError && (
                  <p className="text-xs text-earth font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{pinError}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 py-2.5 rounded-lg bg-softwhite hover:bg-cream-dark text-charcoal text-xs font-semibold uppercase tracking-wider border border-sage/40"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-garden hover:bg-garden-light text-softwhite text-xs font-semibold uppercase tracking-wider shadow-md"
                >
                  Aktifkan Mode Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. PRODUCT EDIT / ADD MODAL */}
      {/* ------------------------------------------------------------- */}
      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-2xl w-full bg-softwhite rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sage/30 pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-garden" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  {isCreatingProduct ? 'Tambah Produk Baru' : `Edit Produk: ${editingProduct.name}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setIsCreatingProduct(false);
                }}
                className="p-1 text-charcoal/60 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveProduct(editingProduct);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Nama Produk *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Contoh: Tisane Bunga Telang"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Kategori *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Tisane, Fermentasi, Edible Flowers..."
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Deskripsi Singkat *</label>
                <textarea
                  rows={2}
                  required
                  value={editingProduct.shortDescription}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                  placeholder="Ringkasan singkat produk..."
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Foto Produk (URL atau Upload) *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingProduct.coverImage}
                    onChange={(e) => setEditingProduct({ ...editingProduct, coverImage: e.target.value })}
                    className="flex-1 p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal text-xs"
                    placeholder="https://... atau /nama-file.jpg"
                  />
                  <label className="px-3.5 py-2.5 rounded-lg bg-forest text-softwhite font-semibold cursor-pointer hover:bg-forest-light flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-sage" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFile(e, (dataUrl) => setEditingProduct({ ...editingProduct, coverImage: dataUrl }))}
                    />
                  </label>
                </div>
                {editingProduct.coverImage && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-sage/40 mt-2">
                    <Image src={editingProduct.coverImage} alt="Pratinjau" fill sizes="80px" className="object-cover" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsCreatingProduct(false);
                  }}
                  className="px-4 py-2.5 rounded-lg bg-cream hover:bg-cream-dark text-charcoal font-semibold uppercase tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Produk</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. HERO SECTION EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      {isEditingHero && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-xl w-full bg-softwhite rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sage/30 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-garden" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  Edit Banner Hero (Bagian Atas Beranda)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingHero(false)}
                className="p-1 text-charcoal/60 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Badge Atas</label>
                <input
                  type="text"
                  value={customizerSettings.home.heroBadge}
                  onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, heroBadge: e.target.value } })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Judul Hero (Nama Brand)</label>
                <input
                  type="text"
                  value={customizerSettings.site.name}
                  onChange={(e) => updateCustomizerSettings({ site: { ...customizerSettings.site, name: e.target.value } })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Subjudul / Headline Narasi</label>
                <input
                  type="text"
                  value={customizerSettings.home.heroHeadline}
                  onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, heroHeadline: e.target.value } })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Paragraf Penjelas</label>
                <textarea
                  rows={3}
                  value={customizerSettings.home.heroSubtitle}
                  onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, heroSubtitle: e.target.value } })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Teks Tombol WhatsApp</label>
                <input
                  type="text"
                  value={customizerSettings.home.ctaWhatsAppText}
                  onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, ctaWhatsAppText: e.target.value } })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                <button
                  type="button"
                  onClick={() => setIsEditingHero(false)}
                  className="px-6 py-2.5 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold uppercase tracking-wider shadow-md"
                >
                  Selesai & Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. COMMITMENT & 6 PILLARS EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      {isEditingCommitment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-2xl w-full bg-softwhite rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sage/30 pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-garden" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  Edit Filosofi & 6 Pilar Nilai
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingCommitment(false)}
                className="p-1 text-charcoal/60 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Judul Komitmen</label>
                <input
                  type="text"
                  value={customizerSettings.home.commitmentTitle}
                  onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, commitmentTitle: e.target.value } })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Paragraf Filosofi</label>
                <textarea
                  rows={3}
                  value={customizerSettings.home.commitmentParagraph1}
                  onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, commitmentParagraph1: e.target.value } })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="pt-2 border-t border-sage/30">
                <span className="font-bold uppercase tracking-wider text-garden block mb-2">
                  Edit 6 Pilar Nilai
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-2.5 bg-cream rounded-lg border border-sage/30 space-y-1">
                    <label className="font-bold text-charcoal">Pilar 1</label>
                    <input
                      type="text"
                      value={customizerSettings.home.pillar1Title}
                      onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, pillar1Title: e.target.value } })}
                      className="w-full p-1.5 rounded bg-softwhite border border-sage/30"
                    />
                    <textarea
                      rows={2}
                      value={customizerSettings.home.pillar1Desc}
                      onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, pillar1Desc: e.target.value } })}
                      className="w-full p-1.5 rounded bg-softwhite border border-sage/30 text-[11px]"
                    />
                  </div>

                  <div className="p-2.5 bg-cream rounded-lg border border-sage/30 space-y-1">
                    <label className="font-bold text-charcoal">Pilar 2</label>
                    <input
                      type="text"
                      value={customizerSettings.home.pillar2Title}
                      onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, pillar2Title: e.target.value } })}
                      className="w-full p-1.5 rounded bg-softwhite border border-sage/30"
                    />
                    <textarea
                      rows={2}
                      value={customizerSettings.home.pillar2Desc}
                      onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, pillar2Desc: e.target.value } })}
                      className="w-full p-1.5 rounded bg-softwhite border border-sage/30 text-[11px]"
                    />
                  </div>

                  <div className="p-2.5 bg-cream rounded-lg border border-sage/30 space-y-1">
                    <label className="font-bold text-charcoal">Pilar 3</label>
                    <input
                      type="text"
                      value={customizerSettings.home.pillar3Title}
                      onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, pillar3Title: e.target.value } })}
                      className="w-full p-1.5 rounded bg-softwhite border border-sage/30"
                    />
                    <textarea
                      rows={2}
                      value={customizerSettings.home.pillar3Desc}
                      onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, pillar3Desc: e.target.value } })}
                      className="w-full p-1.5 rounded bg-softwhite border border-sage/30 text-[11px]"
                    />
                  </div>

                  <div className="p-2.5 bg-cream rounded-lg border border-sage/30 space-y-1">
                    <label className="font-bold text-charcoal">Pilar 4</label>
                    <input
                      type="text"
                      value={customizerSettings.home.pillar4Title}
                      onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, pillar4Title: e.target.value } })}
                      className="w-full p-1.5 rounded bg-softwhite border border-sage/30"
                    />
                    <textarea
                      rows={2}
                      value={customizerSettings.home.pillar4Desc}
                      onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, pillar4Desc: e.target.value } })}
                      className="w-full p-1.5 rounded bg-softwhite border border-sage/30 text-[11px]"
                    />
                  </div>

                  <div className="p-2.5 bg-cream rounded-lg border border-sage/30 space-y-1">
                    <label className="font-bold text-charcoal">Pilar 5</label>
                    <input
                      type="text"
                      value={customizerSettings.home.pillar5Title}
                      onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, pillar5Title: e.target.value } })}
                      className="w-full p-1.5 rounded bg-softwhite border border-sage/30"
                    />
                    <textarea
                      rows={2}
                      value={customizerSettings.home.pillar5Desc}
                      onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, pillar5Desc: e.target.value } })}
                      className="w-full p-1.5 rounded bg-softwhite border border-sage/30 text-[11px]"
                    />
                  </div>

                  <div className="p-2.5 bg-cream rounded-lg border border-sage/30 space-y-1">
                    <label className="font-bold text-charcoal">Pilar 6</label>
                    <input
                      type="text"
                      value={customizerSettings.home.pillar6Title}
                      onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, pillar6Title: e.target.value } })}
                      className="w-full p-1.5 rounded bg-softwhite border border-sage/30"
                    />
                    <textarea
                      rows={2}
                      value={customizerSettings.home.pillar6Desc}
                      onChange={(e) => updateCustomizerSettings({ home: { ...customizerSettings.home, pillar6Desc: e.target.value } })}
                      className="w-full p-1.5 rounded bg-softwhite border border-sage/30 text-[11px]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                <button
                  type="button"
                  onClick={() => setIsEditingCommitment(false)}
                  className="px-6 py-2.5 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold uppercase tracking-wider shadow-md"
                >
                  Selesai & Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </SiteDataContext.Provider>
  );
}

export function useSiteData(): SiteDataContextType {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
