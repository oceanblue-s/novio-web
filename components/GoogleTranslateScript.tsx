'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
            layout?: number;
          },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export default function GoogleTranslateScript() {
  useEffect(() => {
    // Only run if Google Translate has actually translated the page
    const restoreNovioBrand = () => {
      try {
        const isTranslated =
          document.documentElement.classList.contains('translated-ltr') ||
          document.documentElement.classList.contains('translated-rtl') ||
          document.body.classList.contains('translated-ltr') ||
          document.body.classList.contains('translated-rtl');

        if (!isTranslated) return;

        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          null
        );

        let node: Node | null;
        while ((node = walker.nextNode())) {
          if (node.nodeValue) {
            let changed = false;
            let val = node.nodeValue;
            if (/\bPACAR\b/.test(val)) {
              val = val.replace(/\bPACAR\b/g, 'NOVIO');
              changed = true;
            }
            if (/\bPacar\b/.test(val)) {
              val = val.replace(/\bPacar\b/g, 'Novio');
              changed = true;
            }
            if (changed) {
              node.nodeValue = val;
            }
          }
        }
      } catch {
        // silent fail
      }
    };

    // Define the global callback function required by Google Translate script
    window.googleTranslateElementInit = () => {
      try {
        if (window.google?.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'id',
              includedLanguages: 'id,en,ja,zh-CN,ar,fr,de',
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }
      } catch {}
    };

    // If script was already loaded in a previous navigation, run init immediately
    if (window.google?.translate && window.googleTranslateElementInit) {
      window.googleTranslateElementInit();
    }

    const interval = setInterval(restoreNovioBrand, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Hidden container for Google Translate widget */}
      <div
        id="google_translate_element"
        aria-hidden="true"
        className="hidden opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
      />
      {/* Load Google Translate Script asynchronously */}
      <Script
        id="google-translate-script"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
