'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
];

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'mobile';
  className?: string;
}

export default function LanguageSwitcher({
  variant = 'navbar',
  className = '',
}: LanguageSwitcherProps) {
  const [currentLang, setCurrentLang] = useState<string>('id');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read saved language from cookie or localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('novio_lang');
    if (saved) {
      setCurrentLang(saved);
      return;
    }

    const match = document.cookie.match(/(^|;\s*)googtrans=\/id\/([a-zA-Z-]+)/);
    if (match && match[2]) {
      setCurrentLang(match[2]);
    }
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    localStorage.setItem('novio_lang', langCode);

    if (langCode === 'id') {
      // Clear cookie to revert to native Indonesian
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      document.cookie = 'googtrans=/id/id; path=/;';
      document.cookie = `googtrans=/id/id; path=/; domain=${window.location.hostname};`;
    } else {
      const target = `/id/${langCode}`;
      document.cookie = `googtrans=${target}; path=/;`;
      document.cookie = `googtrans=${target}; path=/; domain=${window.location.hostname};`;
    }

    // Trigger Google Translate dropdown if available
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  const activeOption = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  if (variant === 'mobile') {
    return (
      <div className={`notranslate pt-3 border-t border-forest-light/60 ${className}`} translate="no">
        <p className="text-xs uppercase tracking-widest text-sage mb-2 font-semibold flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-garden" />
          <span>Bahasa / Language</span>
        </p>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.slice(0, 4).map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelectLanguage(lang.code)}
                className={`flex items-center gap-2 px-3 py-2 rounded text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-garden text-softwhite shadow-sm font-semibold'
                    : 'bg-cream/10 text-cream/90 hover:bg-cream/20'
                }`}
              >
                <span>{lang.flag}</span>
                <span className="truncate">{lang.nativeName}</span>
                {isSelected && <Check className="w-3.5 h-3.5 ml-auto text-sage" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={`notranslate relative inline-block text-left ${className}`} translate="no">
      {/* Trigger Button */}
      <div className="flex items-center rounded-full bg-cream/15 hover:bg-cream/25 border border-sage/40 transition-all p-0.5">
        {/* Quick ID / EN Toggle */}
        <button
          type="button"
          onClick={() => handleSelectLanguage(currentLang === 'id' ? 'en' : 'id')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-cream hover:text-softwhite transition-colors"
          title={`Beralih bahasa ke ${currentLang === 'id' ? 'English' : 'Indonesia'}`}
          aria-label={`Beralih bahasa ke ${currentLang === 'id' ? 'English' : 'Indonesia'}`}
          translate="no"
        >
          <Globe className="w-3.5 h-3.5 text-sage" />
          <span>{activeOption.flag}</span>
          <span className="notranslate font-mono text-[11px]" translate="no">{currentLang.toUpperCase()}</span>
        </button>

        {/* Dropdown Opener for all languages */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-1.5 py-1.5 text-sage hover:text-softwhite transition-colors"
          aria-expanded={isOpen}
          aria-label="Pilih bahasa lain"
          title="Pilih bahasa lain"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-softwhite' : ''
            }`}
          />
        </button>
      </div>

      {/* Language Menu Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl bg-forest/95 backdrop-blur-md border border-sage/40 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-3 py-1.5 border-b border-forest-light/60 mb-1">
            <p className="text-[10px] uppercase tracking-widest text-sage font-semibold">
              Terjemahkan Web / Translate
            </p>
          </div>
          <div className="max-h-64 overflow-y-auto py-1">
            {LANGUAGES.map((lang) => {
              const isSelected = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors ${
                    isSelected
                      ? 'bg-garden/50 text-softwhite font-semibold'
                      : 'text-cream/90 hover:bg-forest-light hover:text-softwhite'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-sm">{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-sage" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
