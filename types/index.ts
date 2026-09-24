export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  gallery: string[];
  category: string;
  features: string[];
  published: boolean;
  specifications?: Record<string, string>;
  origin?: string;
  environment?: 'Bright Indirect' | 'Low-Light Quiet' | 'AC-Resilient' | 'Veranda & Balcony';
  hotspots?: {
    x: number; // percentage from left (0 - 100)
    y: number; // percentage from top (0 - 100)
    title: string;
    description: string;
  }[];
}

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

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  shortBio: string;
  order: number;
}

export interface Office {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  mapEmbedUrl: string;
  googleMapsLink: string;
  isHeadquarter?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export type ProjectCategory =
  | 'Luxury Hospitality'
  | 'Bespoke Residential'
  | 'Corporate Biophilic'
  | 'Commercial & Cafe'
  | 'Perhotelan Mewah'
  | 'Residensial Kustom'
  | 'Korporat Biofilik'
  | 'Komersial & Kafe';

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
  beforeLabel?: string;
  afterLabel?: string;
  excerpt: string;
  challenge: string;
  solution: string;
  curatedSpecimens: string[];
  specs?: Record<string, string>;
  testimonial?: {
    quote: string;
    clientName: string;
    clientRole: string;
  };
  featured: boolean;
}

export interface ServiceWorkflowStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  keyDeliverable: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
  category?: string;
}

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
