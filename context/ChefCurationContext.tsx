'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';
import { safeJsonParse } from '@/lib/imageUtils';

export interface CuratedItem {
  product: Product;
  quantityNote: string;
  addedAt: number;
}

interface ChefCurationContextType {
  curatedItems: CuratedItem[];
  addItem: (product: Product, quantityNote?: string) => void;
  removeItem: (productId: string) => void;
  updateItemNote: (productId: string, note: string) => void;
  clearAll: () => void;
  isItemCurated: (productId: string) => boolean;
  // Drawer state
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  // Command Palette
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
}

const ChefCurationContext = createContext<ChefCurationContextType | undefined>(undefined);

const STORAGE_KEY = 'novio_chef_curation_tray_v1';

export function ChefCurationProvider({ children }: { children: React.ReactNode }) {
  const [curatedItems, setCuratedItems] = useState<CuratedItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = safeJsonParse<CuratedItem[]>(stored, []);
        if (Array.isArray(parsed)) {
          setCuratedItems(parsed);
        }
      }
    } catch {
      // Ignore JSON error
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(curatedItems));
    } catch {
      // Storage quota or disabled
    }
  }, [curatedItems, isLoaded]);

  // Global Keyboard Shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        if (isCommandPaletteOpen) setIsCommandPaletteOpen(false);
        if (quickViewProduct) setQuickViewProduct(null);
        if (isDrawerOpen) setIsDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, quickViewProduct, isDrawerOpen]);

  const addItem = (product: Product, quantityNote: string = '1 batch uji dapur') => {
    setCuratedItems((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      if (exists) {
        return prev;
      }
      return [...prev, { product, quantityNote, addedAt: Date.now() }];
    });
  };

  const removeItem = (productId: string) => {
    setCuratedItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateItemNote = (productId: string, note: string) => {
    setCuratedItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantityNote: note } : item
      )
    );
  };

  const clearAll = () => {
    setCuratedItems([]);
  };

  const isItemCurated = (productId: string) => {
    return curatedItems.some((item) => item.product.id === productId);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openCommandPalette = () => setIsCommandPaletteOpen(true);
  const closeCommandPalette = () => setIsCommandPaletteOpen(false);
  const toggleCommandPalette = () => setIsCommandPaletteOpen((prev) => !prev);

  return (
    <ChefCurationContext.Provider
      value={{
        curatedItems,
        addItem,
        removeItem,
        updateItemNote,
        clearAll,
        isItemCurated,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isCommandPaletteOpen,
        openCommandPalette,
        closeCommandPalette,
        toggleCommandPalette,
      }}
    >
      {children}
    </ChefCurationContext.Provider>
  );
}

export function useChefCuration() {
  const context = useContext(ChefCurationContext);
  if (!context) {
    throw new Error('useChefCuration must be used within a ChefCurationProvider');
  }
  return context;
}
