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
import { compressImageFile, safeSetLocalStorage } from '@/lib/imageUtils';
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
  Phone,
  Mail,
  MapPin,
  FileText,
  Layers,
  User,
  Star,
  BookOpen,
  Briefcase,
  Users,
  Smartphone,
  ArrowRightLeft,
  Download,
  Copy,
  Share2,
} from 'lucide-react';

const ADMIN_PIN = 'novio2026';
const STORAGE_PREFIX = 'novio_admin_';
const STORAGE_CUSTOMIZER_KEY = 'novio_live_customizer_settings_v1';
const STORAGE_EDIT_MODE_KEY = 'novio_visual_edit_mode_active';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

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
  openEditProductSection: () => void;
  openEditServicesSection: () => void;
  openEditPortfolioSection: () => void;
  openEditTeamSection: () => void;
  openEditBlogSection: () => void;

  // Cross-Device Sync & Backup Helpers
  generateSyncUrl: (mode?: 'hash' | 'query') => string;
  importSyncData: (jsonStr: string) => boolean;
  getExportDataJson: () => string;
  isSyncModalOpen: boolean;
  openSyncModal: () => void;
  closeSyncModal: () => void;
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
  const [isEditingProductSection, setIsEditingProductSection] = useState(false);
  const [isEditingServicesSection, setIsEditingServicesSection] = useState(false);
  const [isEditingPortfolioSection, setIsEditingPortfolioSection] = useState(false);
  const [isEditingTeamSection, setIsEditingTeamSection] = useState(false);
  const [isEditingBlogSection, setIsEditingBlogSection] = useState(false);

  // Sync Modal State
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [syncCodeInput, setSyncCodeInput] = useState('');
  const [syncCopied, setSyncCopied] = useState(false);

  const importSyncData = (jsonStr: string): boolean => {
    try {
      let parsed = JSON.parse(jsonStr);
      if (typeof parsed === 'string') {
        parsed = JSON.parse(parsed);
      }

      let changed = false;

      if (Array.isArray(parsed)) {
        setProducts(parsed);
        safeSetLocalStorage(`${STORAGE_PREFIX}products`, JSON.stringify(parsed));
        changed = true;
      } else if (typeof parsed === 'object' && parsed !== null) {
        if (parsed.products && Array.isArray(parsed.products)) {
          setProducts(parsed.products);
          safeSetLocalStorage(`${STORAGE_PREFIX}products`, JSON.stringify(parsed.products));
          changed = true;
        }
        if (parsed.blog && Array.isArray(parsed.blog)) {
          setBlogPosts(parsed.blog);
          safeSetLocalStorage(`${STORAGE_PREFIX}blog`, JSON.stringify(parsed.blog));
          changed = true;
        }
        if (parsed.portfolio && Array.isArray(parsed.portfolio)) {
          setPortfolioProjects(parsed.portfolio);
          safeSetLocalStorage(`${STORAGE_PREFIX}portfolio`, JSON.stringify(parsed.portfolio));
          changed = true;
        }
        if (parsed.services && Array.isArray(parsed.services)) {
          setServicePackages(parsed.services);
          safeSetLocalStorage(`${STORAGE_PREFIX}services`, JSON.stringify(parsed.services));
          changed = true;
        }
        if (parsed.team && Array.isArray(parsed.team)) {
          setTeamMembers(parsed.team);
          safeSetLocalStorage(`${STORAGE_PREFIX}team`, JSON.stringify(parsed.team));
          changed = true;
        }
        if (parsed.customizer) {
          setCustomizerSettings((prev) => safeMergeSettings(prev, parsed.customizer));
          safeSetLocalStorage(STORAGE_CUSTOMIZER_KEY, JSON.stringify(parsed.customizer));
          changed = true;
        }
      }
      return changed;
    } catch (err) {
      console.error('importSyncData error:', err);
      return false;
    }
  };

  const getExportDataJson = (): string => {
    try {
      const payload = {
        products,
        blog: blogPosts,
        portfolio: portfolioProjects,
        services: servicePackages,
        team: teamMembers,
        customizer: customizerSettings,
        exportedAt: new Date().toISOString(),
        siteVersion: 'novio-v1',
      };
      return JSON.stringify(payload, null, 2);
    } catch {
      return '';
    }
  };

  const generateSyncUrl = (mode: 'hash' | 'query' = 'hash'): string => {
    try {
      if (typeof window === 'undefined') return '';
      const payload = {
        products,
        blog: blogPosts,
        portfolio: portfolioProjects,
        services: servicePackages,
        team: teamMembers,
        customizer: customizerSettings,
      };
      const jsonStr = JSON.stringify(payload);
      const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
      if (mode === 'hash') {
        return `${window.location.origin}/#sync=${b64}`;
      }
      return `${window.location.origin}/?syncData=${b64}`;
    } catch {
      return '';
    }
  };

  // Load datasets and edit mode on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);

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

        // Check for syncData in URL query or hash
        let syncParam = urlParams.get('syncData') || urlParams.get('sync');
        if (!syncParam && window.location.hash) {
          const hashClean = window.location.hash.replace(/^#/, '');
          if (hashClean.startsWith('sync=')) {
            syncParam = hashClean.slice(5);
          } else if (hashClean.startsWith('syncData=')) {
            syncParam = hashClean.slice(9);
          } else {
            const hashParams = new URLSearchParams(hashClean);
            syncParam = hashParams.get('syncData') || hashParams.get('sync');
          }
        }

        if (syncParam) {
          try {
            const decodedJson = decodeURIComponent(escape(atob(syncParam)));
            const success = importSyncData(decodedJson);
            if (success) {
              alert('✅ Berhasil Mensinkronkan Data!\nProduk dan editan dari laptop Anda kini telah tersimpan di HP ini.');
              const cleanUrl = window.location.pathname;
              window.history.replaceState({}, document.title, cleanUrl);
            }
          } catch (err) {
            console.error('Failed to parse sync payload:', err);
          }
        }

        // Check if edit mode active
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
    safeSetLocalStorage(`${STORAGE_PREFIX}products`, JSON.stringify(updated));
  };

  const saveProduct = (product: Product) => {
    const cleanProduct: Product = {
      ...product,
      name: product.name.trim() || 'Produk Baru Novio',
      slug: product.slug.trim() || slugify(product.name || 'produk-baru') || `produk-${Date.now()}`,
      category: product.category.trim() || 'Tisane & Botanical Blends',
      shortDescription: product.shortDescription.trim() || 'Deskripsi singkat produk segar novio.',
      description: product.description?.trim() || product.shortDescription.trim() || 'Deskripsi lengkap produk.',
      coverImage: product.coverImage?.trim() || '/about-greenhouse-bg.jpg',
      features: Array.isArray(product.features) && product.features.length > 0 ? product.features : ['Alami', 'Segar'],
      published: product.published ?? true,
    };
    const exists = products.some((p) => p.id === cleanProduct.id);
    const updated = exists ? products.map((p) => (p.id === cleanProduct.id ? cleanProduct : p)) : [cleanProduct, ...products];
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
    safeSetLocalStorage(`${STORAGE_PREFIX}blog`, JSON.stringify(updated));
  };

  const saveBlogPost = (post: BlogPost) => {
    const cleanPost: BlogPost = {
      ...post,
      title: post.title.trim() || 'Artikel Baru Novio',
      slug: post.slug.trim() || slugify(post.title || 'artikel-baru') || `artikel-${Date.now()}`,
      excerpt: post.excerpt.trim() || 'Ringkasan artikel jurnal novio.',
      coverImage: post.coverImage?.trim() || '/about-greenhouse-bg.jpg',
    };
    const exists = blogPosts.some((b) => b.id === cleanPost.id);
    const updated = exists ? blogPosts.map((b) => (b.id === cleanPost.id ? cleanPost : b)) : [cleanPost, ...blogPosts];
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
    safeSetLocalStorage(`${STORAGE_PREFIX}portfolio`, JSON.stringify(updated));
  };

  const savePortfolioProject = (project: PortfolioProject) => {
    const cleanProject: PortfolioProject = {
      ...project,
      title: project.title.trim() || 'Proyek Baru Novio',
      slug: project.slug.trim() || slugify(project.title || 'proyek-baru') || `proyek-${Date.now()}`,
      coverImage: project.coverImage?.trim() || '/commitment-flora.jpg',
      beforeImage: project.beforeImage?.trim() || '/commitment-flora.jpg',
      afterImage: project.afterImage?.trim() || '/about-greenhouse-bg.jpg',
    };
    const exists = portfolioProjects.some((p) => p.id === cleanProject.id);
    const updated = exists ? portfolioProjects.map((p) => (p.id === cleanProject.id ? cleanProject : p)) : [cleanProject, ...portfolioProjects];
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
    safeSetLocalStorage(`${STORAGE_PREFIX}services`, JSON.stringify(updated));
  };

  const saveServicePackage = (service: ServicePackage) => {
    const cleanService: ServicePackage = {
      ...service,
      title: service.title.trim() || 'Layanan Baru Novio',
      slug: service.slug.trim() || slugify(service.title || 'layanan-baru') || `layanan-${Date.now()}`,
      coverImage: service.coverImage?.trim() || '/about-greenhouse-bg.jpg',
    };
    const exists = servicePackages.some((s) => s.id === cleanService.id);
    const updated = exists ? servicePackages.map((s) => (s.id === cleanService.id ? cleanService : s)) : [cleanService, ...servicePackages];
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
    safeSetLocalStorage(`${STORAGE_PREFIX}team`, JSON.stringify(updated));
  };

  const saveTeamMember = (member: TeamMember) => {
    const cleanMember: TeamMember = {
      ...member,
      name: member.name.trim() || 'Anggota Tim Novio',
      photo: member.photo?.trim() || '/novio-logo.png',
    };
    const exists = teamMembers.some((t) => t.id === cleanMember.id);
    const updated = exists ? teamMembers.map((t) => (t.id === cleanMember.id ? cleanMember : t)) : [...teamMembers, cleanMember];
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
      safeSetLocalStorage(STORAGE_CUSTOMIZER_KEY, JSON.stringify(merged));
      return merged;
    });
  };

  // Helper for image upload with auto-compression to avoid localStorage QuotaExceededError
  const handleImageFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    onDone: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImageFile(file)
        .then((compressed) => {
          onDone(compressed);
        })
        .catch(() => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const result = event.target?.result as string;
            if (result) onDone(result);
          };
          reader.readAsDataURL(file);
        });
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
        openEditProductSection: () => setIsEditingProductSection(true),
        openEditServicesSection: () => setIsEditingServicesSection(true),
        openEditPortfolioSection: () => setIsEditingPortfolioSection(true),
        openEditTeamSection: () => setIsEditingTeamSection(true),
        openEditBlogSection: () => setIsEditingBlogSection(true),

        // Cross-device sync & backup
        generateSyncUrl,
        importSyncData,
        getExportDataJson,
        isSyncModalOpen,
        openSyncModal: () => setIsSyncModalOpen(true),
        closeSyncModal: () => setIsSyncModalOpen(false),
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
                    onChange={(e) => {
                      const newName = e.target.value;
                      setEditingProduct({
                        ...editingProduct,
                        name: newName,
                        slug: isCreatingProduct && (!editingProduct.slug || editingProduct.slug.startsWith('produk-'))
                          ? slugify(newName) || editingProduct.slug
                          : editingProduct.slug,
                      });
                    }}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Contoh: Tisane Bunga Telang"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Slug URL (Alamat Web) *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.slug}
                    onChange={(e) => setEditingProduct({ ...editingProduct, slug: slugify(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="tisane-bunga-telang"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Kategori Produk *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Tisane & Botanical Blends, Fermentasi, Edible Flowers..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Asal Panen / Asal Daerah</label>
                  <input
                    type="text"
                    value={editingProduct.origin || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, origin: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Parongpong, Bandung Barat atau Nusa Dua, Bali"
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
                  placeholder="Ringkasan singkat produk untuk kartu katalog..."
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Deskripsi Lengkap</label>
                <textarea
                  rows={4}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                  placeholder="Detail lengkap mengenai rasa, aroma, proses olah, dan keistimewaan bahan..."
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Keunggulan / Fitur (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={editingProduct.features ? editingProduct.features.join(', ') : ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                  placeholder="Contoh: 100% Organik, Panen Harian, Grade Chef"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Foto Produk (URL atau Upload Langsung) *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingProduct.coverImage}
                    onChange={(e) => setEditingProduct({ ...editingProduct, coverImage: e.target.value })}
                    className="flex-1 p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal text-xs"
                    placeholder="https://... atau /about-greenhouse-bg.jpg"
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

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="prod-published"
                  checked={editingProduct.published}
                  onChange={(e) => setEditingProduct({ ...editingProduct, published: e.target.checked })}
                  className="rounded border-sage text-garden focus:ring-garden"
                />
                <label htmlFor="prod-published" className="font-medium text-charcoal">
                  Tampilkan produk di katalog publik
                </label>
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
      {/* 3. BLOG POST EDIT / ADD MODAL */}
      {/* ------------------------------------------------------------- */}
      {editingBlog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-2xl w-full bg-softwhite rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sage/30 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-garden" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  {isCreatingBlog ? 'Tulis Artikel Jurnal Baru' : `Edit Artikel: ${editingBlog.title}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingBlog(null);
                  setIsCreatingBlog(false);
                }}
                className="p-1 text-charcoal/60 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveBlogPost(editingBlog);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Judul Artikel *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setEditingBlog({
                        ...editingBlog,
                        title: newTitle,
                        slug: isCreatingBlog && (!editingBlog.slug || editingBlog.slug.startsWith('artikel-'))
                          ? slugify(newTitle) || editingBlog.slug
                          : editingBlog.slug,
                      });
                    }}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Contoh: Filosofi Fermentasi Artisan di Dapur Chef"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Slug URL (Alamat Web) *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.slug}
                    onChange={(e) => setEditingBlog({ ...editingBlog, slug: slugify(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="filosofi-fermentasi-artisan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Kategori *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Kuliner & Chef, Artisan, Botani..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Nama Penulis</label>
                  <input
                    type="text"
                    value={editingBlog.author?.name || ''}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        author: { ...editingBlog.author, name: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Tim Redaksi Novio"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Peran Penulis</label>
                  <input
                    type="text"
                    value={editingBlog.author?.role || ''}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        author: { ...editingBlog.author, role: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Kurator Botani / Chef"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Ringkasan / Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={editingBlog.excerpt}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                  placeholder="Ringkasan singkat artikel untuk pengantar..."
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Konten Lengkap Artikel *</label>
                <textarea
                  rows={8}
                  required
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden font-mono text-[11px]"
                  placeholder="Tulis narasi lengkap artikel di sini..."
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Foto Sampul Artikel (URL atau Upload) *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingBlog.coverImage}
                    onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                    className="flex-1 p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal text-xs"
                    placeholder="https://... atau /about-greenhouse-bg.jpg"
                  />
                  <label className="px-3.5 py-2.5 rounded-lg bg-forest text-softwhite font-semibold cursor-pointer hover:bg-forest-light flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-sage" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFile(e, (dataUrl) => setEditingBlog({ ...editingBlog, coverImage: dataUrl }))}
                    />
                  </label>
                </div>
                {editingBlog.coverImage && (
                  <div className="relative w-28 h-16 rounded-lg overflow-hidden border border-sage/40 mt-2">
                    <Image src={editingBlog.coverImage} alt="Pratinjau" fill sizes="112px" className="object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Tag / Topik (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    value={editingBlog.tags ? editingBlog.tags.join(', ') : ''}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Bahan Alami, Artisan, Kuliner"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Estimasi Waktu Baca (Menit)</label>
                  <input
                    type="number"
                    min={1}
                    value={editingBlog.readTimeMinutes || 3}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTimeMinutes: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                <button
                  type="button"
                  onClick={() => {
                    setEditingBlog(null);
                    setIsCreatingBlog(false);
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
                  <span>Simpan Artikel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. SERVICE PACKAGE EDIT / ADD MODAL */}
      {/* ------------------------------------------------------------- */}
      {editingService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-2xl w-full bg-softwhite rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sage/30 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-garden" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  {isCreatingService ? 'Tambah Layanan Baru' : `Edit Layanan: ${editingService.title}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingService(null);
                  setIsCreatingService(false);
                }}
                className="p-1 text-charcoal/60 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveServicePackage(editingService);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Nama Layanan *</label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setEditingService({
                        ...editingService,
                        title: newTitle,
                        slug: isCreatingService && (!editingService.slug || editingService.slug.startsWith('layanan-'))
                          ? slugify(newTitle) || editingService.slug
                          : editingService.slug,
                      });
                    }}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Contoh: Pasokan Bahan Kuliner Restoran & Chef"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Slug URL (Alamat Web) *</label>
                  <input
                    type="text"
                    required
                    value={editingService.slug}
                    onChange={(e) => setEditingService({ ...editingService, slug: slugify(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="pasokan-bahan-kuliner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Tagline Ringkas *</label>
                  <input
                    type="text"
                    required
                    value={editingService.tagline}
                    onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Kemitraan pasokan bahan tani segar teraklimatisasi..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Target Klien *</label>
                  <input
                    type="text"
                    required
                    value={editingService.targetAudience}
                    onChange={(e) => setEditingService({ ...editingService, targetAudience: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Chef, Restoran Fine Dining, Resor..."
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Deskripsi Lengkap Layanan *</label>
                <textarea
                  rows={3}
                  required
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                  placeholder="Penjelasan menyeluruh mengenai cakupan layanan ini..."
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Foto Sampul Layanan (URL atau Upload) *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingService.coverImage}
                    onChange={(e) => setEditingService({ ...editingService, coverImage: e.target.value })}
                    className="flex-1 p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal text-xs"
                    placeholder="https://... atau /about-greenhouse-bg.jpg"
                  />
                  <label className="px-3.5 py-2.5 rounded-lg bg-forest text-softwhite font-semibold cursor-pointer hover:bg-forest-light flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-sage" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFile(e, (dataUrl) => setEditingService({ ...editingService, coverImage: dataUrl }))}
                    />
                  </label>
                </div>
                {editingService.coverImage && (
                  <div className="relative w-28 h-16 rounded-lg overflow-hidden border border-sage/40 mt-2">
                    <Image src={editingService.coverImage} alt="Pratinjau" fill sizes="112px" className="object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Model Kerja Sama / Harga</label>
                  <input
                    type="text"
                    value={editingService.pricingModel}
                    onChange={(e) => setEditingService({ ...editingService, pricingModel: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Kontrak Pasokan B2B / Berdasarkan Volume"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Jaminan Mutu / Garansi</label>
                  <input
                    type="text"
                    value={editingService.guarantee}
                    onChange={(e) => setEditingService({ ...editingService, guarantee: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Garansi Kesegaran Panen Hari Sama"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Fitur Utama (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    value={editingService.features ? editingService.features.join(', ') : ''}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Konsultasi Menu, Jadwal Panen Rutin, Sampel Gratis"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Hasil Serah Terima (Deliverables)</label>
                  <input
                    type="text"
                    value={editingService.deliverables ? editingService.deliverables.join(', ') : ''}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        deliverables: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Katalog Mingguan, Pengiriman Terkontrol"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="srv-popular"
                  checked={!!editingService.popular}
                  onChange={(e) => setEditingService({ ...editingService, popular: e.target.checked })}
                  className="rounded border-sage text-garden focus:ring-garden"
                />
                <label htmlFor="srv-popular" className="font-medium text-charcoal">
                  Tandai sebagai layanan &quot;Paling Diminati&quot; (Popular Badge)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                <button
                  type="button"
                  onClick={() => {
                    setEditingService(null);
                    setIsCreatingService(false);
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
                  <span>Simpan Layanan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 5. PORTFOLIO PROJECT EDIT / ADD MODAL */}
      {/* ------------------------------------------------------------- */}
      {editingPortfolio && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-2xl w-full bg-softwhite rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sage/30 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-garden" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  {isCreatingPortfolio ? 'Tambah Portofolio Proyek Baru' : `Edit Portofolio: ${editingPortfolio.title}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingPortfolio(null);
                  setIsCreatingPortfolio(false);
                }}
                className="p-1 text-charcoal/60 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                savePortfolioProject(editingPortfolio);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Judul Proyek *</label>
                  <input
                    type="text"
                    required
                    value={editingPortfolio.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setEditingPortfolio({
                        ...editingPortfolio,
                        title: newTitle,
                        slug: isCreatingPortfolio && (!editingPortfolio.slug || editingPortfolio.slug.startsWith('proyek-'))
                          ? slugify(newTitle) || editingPortfolio.slug
                          : editingPortfolio.slug,
                      });
                    }}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Contoh: Cliffside Sanctuary Uluwatu"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Slug URL (Alamat Web) *</label>
                  <input
                    type="text"
                    required
                    value={editingPortfolio.slug}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, slug: slugify(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="cliffside-sanctuary-uluwatu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Kategori Klien</label>
                  <select
                    value={editingPortfolio.clientCategory}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, clientCategory: e.target.value as any })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                  >
                    <option value="Luxury Hospitality">Luxury Hospitality</option>
                    <option value="Bespoke Residential">Bespoke Residential</option>
                    <option value="Corporate Biophilic">Corporate Biophilic</option>
                    <option value="Commercial & Cafe">Commercial & Cafe</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Lokasi *</label>
                  <input
                    type="text"
                    required
                    value={editingPortfolio.location}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, location: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Uluwatu, Bali / Parongpong"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Tahun</label>
                  <input
                    type="text"
                    value={editingPortfolio.year}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, year: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="2026"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Subjudul / Konsep Inti</label>
                <input
                  type="text"
                  value={editingPortfolio.subtitle}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, subtitle: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                  placeholder="Integrasi flora pesisir tahan salinitas dengan arsitektur tropis..."
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Ringkasan Proyek (Excerpt) *</label>
                <textarea
                  rows={2}
                  required
                  value={editingPortfolio.excerpt}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, excerpt: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                  placeholder="Ringkasan studi kasus transformasi..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Tantangan Ruang (Challenge)</label>
                  <textarea
                    rows={2}
                    value={editingPortfolio.challenge}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, challenge: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Kondisi awal sebelum intervensi botani..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Solusi Kurasi (Solution)</label>
                  <textarea
                    rows={2}
                    value={editingPortfolio.solution}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, solution: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                    placeholder="Langkah spesifik pemilihan spesimen dan tata ruang..."
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Foto Utama / Cover (URL atau Upload) *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingPortfolio.coverImage}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, coverImage: e.target.value })}
                    className="flex-1 p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal text-xs"
                    placeholder="https://... atau /commitment-flora.jpg"
                  />
                  <label className="px-3.5 py-2.5 rounded-lg bg-forest text-softwhite font-semibold cursor-pointer hover:bg-forest-light flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-sage" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFile(e, (dataUrl) => setEditingPortfolio({ ...editingPortfolio, coverImage: dataUrl }))}
                    />
                  </label>
                </div>
              </div>

              {/* Before & After Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-sage/30">
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Foto SEBELUM (Before)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingPortfolio.beforeImage}
                      onChange={(e) => setEditingPortfolio({ ...editingPortfolio, beforeImage: e.target.value })}
                      className="flex-1 p-2 rounded bg-cream border border-sage/40 text-[11px]"
                    />
                    <label className="p-2 rounded bg-forest text-softwhite cursor-pointer hover:bg-forest-light shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFile(e, (dataUrl) => setEditingPortfolio({ ...editingPortfolio, beforeImage: dataUrl }))}
                      />
                    </label>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Foto SESUDAH (After)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingPortfolio.afterImage}
                      onChange={(e) => setEditingPortfolio({ ...editingPortfolio, afterImage: e.target.value })}
                      className="flex-1 p-2 rounded bg-cream border border-sage/40 text-[11px]"
                    />
                    <label className="p-2 rounded bg-forest text-softwhite cursor-pointer hover:bg-forest-light shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFile(e, (dataUrl) => setEditingPortfolio({ ...editingPortfolio, afterImage: dataUrl }))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="port-featured"
                  checked={!!editingPortfolio.featured}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, featured: e.target.checked })}
                  className="rounded border-sage text-garden focus:ring-garden"
                />
                <label htmlFor="port-featured" className="font-medium text-charcoal">
                  Tampilkan di sorotan Before/After Beranda (Featured Showcase)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                <button
                  type="button"
                  onClick={() => {
                    setEditingPortfolio(null);
                    setIsCreatingPortfolio(false);
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
                  <span>Simpan Portofolio</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 6. TEAM MEMBER EDIT / ADD MODAL */}
      {/* ------------------------------------------------------------- */}
      {editingTeam && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-md w-full bg-softwhite rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sage/30 pb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-garden" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  {isCreatingTeam ? 'Tambah Anggota Tim' : `Edit Anggota Tim: ${editingTeam.name}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingTeam(null);
                  setIsCreatingTeam(false);
                }}
                className="p-1 text-charcoal/60 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveTeamMember(editingTeam);
              }}
              className="space-y-4 text-xs"
            >
              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={editingTeam.name}
                  onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                  placeholder="Contoh: Danang Santoso"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Jabatan / Posisi *</label>
                <input
                  type="text"
                  required
                  value={editingTeam.role}
                  onChange={(e) => setEditingTeam({ ...editingTeam, role: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                  placeholder="Pendiri & Direktur Operasional"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Foto Profil (URL atau Upload) *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingTeam.photo}
                    onChange={(e) => setEditingTeam({ ...editingTeam, photo: e.target.value })}
                    className="flex-1 p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal text-xs"
                    placeholder="https://... atau /novio-logo.png"
                  />
                  <label className="px-3.5 py-2.5 rounded-lg bg-forest text-softwhite font-semibold cursor-pointer hover:bg-forest-light flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-sage" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFile(e, (dataUrl) => setEditingTeam({ ...editingTeam, photo: dataUrl }))}
                    />
                  </label>
                </div>
                {editingTeam.photo && (
                  <div className="relative w-16 h-20 rounded-lg overflow-hidden border border-sage/40 mt-2">
                    <Image src={editingTeam.photo} alt="Pratinjau" fill sizes="80px" className="object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Biografi Singkat</label>
                <textarea
                  rows={3}
                  value={editingTeam.shortBio}
                  onChange={(e) => setEditingTeam({ ...editingTeam, shortBio: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                  placeholder="Peran dan latar belakang dalam memberdayakan petani..."
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Urutan Tampilan</label>
                <input
                  type="number"
                  value={editingTeam.order}
                  onChange={(e) => setEditingTeam({ ...editingTeam, order: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal focus:ring-2 focus:ring-garden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                <button
                  type="button"
                  onClick={() => {
                    setEditingTeam(null);
                    setIsCreatingTeam(false);
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
                  <span>Simpan Anggota</span>
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

      {/* ------------------------------------------------------------- */}
      {/* 7. CONTACT & STUDIO LOCATIONS EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      {isEditingContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-xl w-full bg-softwhite rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sage/30 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-garden" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  Edit Kontak &amp; Lokasi Studio Kebun
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingContact(false)}
                className="p-1 text-charcoal/60 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Nomor WhatsApp Pusat (Bandung Barat)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={customizerSettings.site.whatsappTarget}
                    onChange={(e) =>
                      updateCustomizerSettings({
                        site: { ...customizerSettings.site, whatsappTarget: e.target.value },
                      })
                    }
                    className="w-full pl-9 p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                    placeholder="6281312414863"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Nomor WhatsApp Cabang (Bali)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={customizerSettings.site.whatsappBali}
                    onChange={(e) =>
                      updateCustomizerSettings({
                        site: { ...customizerSettings.site, whatsappBali: e.target.value },
                      })
                    }
                    className="w-full pl-9 p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                    placeholder="628112906792"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Email Resmi Pelayanan</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={customizerSettings.site.generalEmail}
                    onChange={(e) =>
                      updateCustomizerSettings({
                        site: { ...customizerSettings.site, generalEmail: e.target.value },
                      })
                    }
                    className="w-full pl-9 p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                    placeholder="novio.customercare@gmail.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Alamat Kebun Greenhouse Parongpong, Bandung</label>
                <textarea
                  rows={2}
                  value={customizerSettings.site.mainAddress}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      site: { ...customizerSettings.site, mainAddress: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Alamat Studio Nusa Dua, Bali</label>
                <textarea
                  rows={2}
                  value={customizerSettings.site.baliAddress}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      site: { ...customizerSettings.site, baliAddress: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                <button
                  type="button"
                  onClick={() => setIsEditingContact(false)}
                  className="px-6 py-2.5 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Selesai &amp; Simpan Kontak</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 8. PRODUCT SECTION HEADING EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      {isEditingProductSection && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-xl w-full bg-softwhite rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sage/30 pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-garden" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  Edit Judul &amp; Narasi Bagian Produk (Beranda)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingProductSection(false)}
                className="p-1 text-charcoal/60 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Badge / Kategori Atas</label>
                <input
                  type="text"
                  value={customizerSettings.home.productSectionBadge}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, productSectionBadge: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                  placeholder="Komponen Kuliner Alami Indonesia"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Judul Utama Bagian Produk</label>
                <input
                  type="text"
                  value={customizerSettings.home.productSectionTitle}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, productSectionTitle: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                  placeholder="Kurasi Bahan Alami & Fermentasi Artisan"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Subjudul / Paragraf Pengantar</label>
                <textarea
                  rows={3}
                  value={customizerSettings.home.productSectionSubtitle}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, productSectionSubtitle: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                  placeholder="Bahan alami premium yang diolah dengan ketulusan..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                <button
                  type="button"
                  onClick={() => setIsEditingProductSection(false)}
                  className="px-6 py-2.5 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Selesai &amp; Simpan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 9. SERVICES SECTION HEADING EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      {isEditingServicesSection && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-xl w-full bg-softwhite rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sage/30 pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-garden" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  Edit Judul &amp; Narasi Bagian Layanan (Beranda)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingServicesSection(false)}
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
                  value={customizerSettings.home.servicesSectionBadge}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, servicesSectionBadge: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Judul Utama Layanan</label>
                <input
                  type="text"
                  value={customizerSettings.home.servicesSectionTitle}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, servicesSectionTitle: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Subjudul / Paragraf Pengantar</label>
                <textarea
                  rows={3}
                  value={customizerSettings.home.servicesSectionSubtitle}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, servicesSectionSubtitle: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                <button
                  type="button"
                  onClick={() => setIsEditingServicesSection(false)}
                  className="px-6 py-2.5 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Selesai &amp; Simpan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 10. PORTFOLIO SECTION HEADING EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      {isEditingPortfolioSection && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-xl w-full bg-softwhite rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sage/30 pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-garden" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  Edit Judul &amp; Narasi Bagian Portofolio (Beranda)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingPortfolioSection(false)}
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
                  value={customizerSettings.home.portfolioSectionBadge}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, portfolioSectionBadge: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Judul Utama Portofolio</label>
                <input
                  type="text"
                  value={customizerSettings.home.portfolioSectionTitle}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, portfolioSectionTitle: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Subjudul / Paragraf Pengantar</label>
                <textarea
                  rows={3}
                  value={customizerSettings.home.portfolioSectionSubtitle}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, portfolioSectionSubtitle: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                <button
                  type="button"
                  onClick={() => setIsEditingPortfolioSection(false)}
                  className="px-6 py-2.5 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Selesai &amp; Simpan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 11. TEAM SECTION HEADING EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      {isEditingTeamSection && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-xl w-full bg-softwhite rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sage/30 pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-garden" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  Edit Judul &amp; Narasi Bagian Tim (Beranda)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingTeamSection(false)}
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
                  value={customizerSettings.home.teamSectionBadge}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, teamSectionBadge: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Judul Utama Bagian Tim</label>
                <input
                  type="text"
                  value={customizerSettings.home.teamSectionTitle}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, teamSectionTitle: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Subjudul / Paragraf Pengantar</label>
                <textarea
                  rows={3}
                  value={customizerSettings.home.teamSectionSubtitle}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, teamSectionSubtitle: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                <button
                  type="button"
                  onClick={() => setIsEditingTeamSection(false)}
                  className="px-6 py-2.5 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Selesai &amp; Simpan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 12. BLOG SECTION HEADING EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      {isEditingBlogSection && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-xl w-full bg-softwhite rounded-2xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sage/30 pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-garden" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  Edit Judul &amp; Narasi Bagian Jurnal/Blog (Beranda)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingBlogSection(false)}
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
                  value={customizerSettings.home.blogSectionBadge}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, blogSectionBadge: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Judul Utama Jurnal</label>
                <input
                  type="text"
                  value={customizerSettings.home.blogSectionTitle}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, blogSectionTitle: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-charcoal">Subjudul / Paragraf Pengantar</label>
                <textarea
                  rows={3}
                  value={customizerSettings.home.blogSectionSubtitle}
                  onChange={(e) =>
                    updateCustomizerSettings({
                      home: { ...customizerSettings.home, blogSectionSubtitle: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-cream border border-sage/40 text-charcoal"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-sage/30">
                <button
                  type="button"
                  onClick={() => setIsEditingBlogSection(false)}
                  className="px-6 py-2.5 rounded-lg bg-garden hover:bg-garden-light text-softwhite font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Selesai &amp; Simpan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MULTI-DEVICE SYNC & BACKUP MODAL */}
      {/* ------------------------------------------------------------- */}
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="max-w-2xl w-full bg-cream rounded-3xl p-6 sm:p-8 border border-sage/40 shadow-2xl space-y-6 my-auto max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-sage/30 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-forest text-softwhite flex items-center justify-center shadow-md">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                    Sinkronisasi HP &amp; Cadangan Data
                  </h3>
                  <p className="text-xs text-charcoal/70">
                    Pindahkan produk dan editan dari Laptop ke HP, atau simpan file cadangan.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSyncModalOpen(false)}
                className="w-8 h-8 rounded-full bg-charcoal/5 hover:bg-charcoal/10 flex items-center justify-center text-charcoal/70 hover:text-charcoal transition-colors"
                title="Tutup Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Explanation card */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-950 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-forest">
                <Sparkles className="w-4 h-4 text-garden" />
                <span>Mengapa di HP tidak langsung berubah otomatis?</span>
              </div>
              <p className="text-[12px] leading-relaxed text-emerald-900/80">
                Fitur edit langsung di website ini menyimpan data ke dalam memori browser (<em>localStorage</em>) perangkat Anda. Karena memori laptop dan HP terpisah, Anda dapat menggunakan tombol di bawah ini untuk mengirim data ke HP secara instan!
              </p>
            </div>

            {/* Section 1: Kirim ke WhatsApp (Paling Cepat) */}
            <div className="p-5 rounded-2xl bg-softwhite border border-sage/40 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-garden text-softwhite flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <h4 className="font-bold text-sm text-charcoal">
                    Kirim Link ke WhatsApp (Buka di HP)
                  </h4>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Rekomendasi Cepat
                </span>
              </div>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Buat link otomatis yang memuat seluruh produk &amp; editan Anda. Kirim ke WhatsApp pribadi Anda, lalu ketuk link tersebut di HP.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const url = generateSyncUrl('hash');
                    const text = `Halo, ini tautan sinkronisasi katalog NOVIO untuk dibuka di HP:\n\n${url}\n\n(Ketuk tautan di atas untuk langsung menerapkan seluruh produk & editan di HP Anda)`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-softwhite font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Kirim Link via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const url = generateSyncUrl('hash');
                    navigator.clipboard.writeText(url);
                    setSyncCopied(true);
                    setTimeout(() => setSyncCopied(false), 2500);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cream hover:bg-sage/20 text-charcoal border border-sage/60 font-bold text-xs tracking-wider transition-all active:scale-95"
                >
                  {syncCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-forest" />}
                  <span>{syncCopied ? 'Tersalin!' : 'Salin Link'}</span>
                </button>
              </div>
            </div>

            {/* Section 2: Unduh & Impor File JSON */}
            <div className="p-5 rounded-2xl bg-softwhite border border-sage/40 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-forest text-softwhite flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <h4 className="font-bold text-sm text-charcoal">
                    Transfer File Cadangan (.json)
                  </h4>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60 bg-sage/20 px-2 py-0.5 rounded-full">
                  Tanpa Batas Foto
                </span>
              </div>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Jika Anda mengunggah banyak foto resolusi tinggi, unduh file cadangan dari laptop dan buka/unggah file tersebut saat membuka web di HP.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const jsonStr = getExportDataJson();
                    const blob = new Blob([jsonStr], { type: 'application/json' });
                    const blobUrl = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = blobUrl;
                    a.download = `novio-katalog-backup-${new Date().toISOString().slice(0, 10)}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(blobUrl);
                  }}
                  className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-softwhite font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
                >
                  <Download className="w-4 h-4 text-sage" />
                  <span>Unduh File Cadangan</span>
                </button>

                <label className="flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cream hover:bg-sage/20 text-charcoal border border-sage/60 font-bold text-xs uppercase tracking-wider cursor-pointer transition-all active:scale-95">
                  <Upload className="w-4 h-4 text-forest" />
                  <span>Unggah File di HP Ini</span>
                  <input
                    type="file"
                    accept=".json,application/json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const content = ev.target?.result as string;
                        if (content) {
                          const ok = importSyncData(content);
                          if (ok) {
                            alert('✅ Berhasil!\nSeluruh data dan produk baru telah berhasil diterapkan ke browser ini.');
                            setIsSyncModalOpen(false);
                          } else {
                            alert('❌ Gagal membaca file JSON. Pastikan format file benar.');
                          }
                        }
                      };
                      reader.readAsText(file);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Section 3: Tempel Kode Manual */}
            <details className="rounded-2xl border border-sage/30 bg-softwhite/50 p-3 text-xs group">
              <summary className="font-bold text-charcoal/80 cursor-pointer select-none flex items-center justify-between">
                <span>Metode 3: Tempel Kode JSON Secara Manual</span>
                <span className="text-sage text-sm group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="pt-3 space-y-2">
                <p className="text-[11px] text-charcoal/60">
                  Tempelkan teks JSON atau kode cadangan Anda di sini untuk langsung memperbarui katalog browser:
                </p>
                <textarea
                  rows={3}
                  value={syncCodeInput}
                  onChange={(e) => setSyncCodeInput(e.target.value)}
                  placeholder="Tempel teks JSON di sini..."
                  className="w-full p-2.5 rounded-xl bg-cream border border-sage/40 text-charcoal font-mono text-[11px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!syncCodeInput.trim()) return;
                    const ok = importSyncData(syncCodeInput);
                    if (ok) {
                      alert('✅ Berhasil menerapkan data dari teks!');
                      setSyncCodeInput('');
                      setIsSyncModalOpen(false);
                    } else {
                      alert('❌ Format JSON tidak valid.');
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-forest text-softwhite font-bold text-xs uppercase tracking-wider hover:bg-forest-light"
                >
                  Terapkan Kode
                </button>
              </div>
            </details>

            {/* Section 4: Catatan Pengembang / Permanen */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-950 space-y-1">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <span>🌐 Ingin Produk Tampil Permanen untuk Seluruh Pengunjung Dunia?</span>
              </div>
              <p className="leading-relaxed text-amber-900/80">
                Penyimpanan saat ini berada di browser Anda. Jika Anda ingin produk baru atau perubahan teks langsung tampil otomatis bagi siapa saja yang membuka web (tanpa perlu sinkronisasi perangkat), cukup unduh file <strong>.json</strong> di atas lalu bagikan kepada kami (tim pengembang) untuk kami pasang langsung ke server Novio.
              </p>
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
