'use client';

import { useEffect } from 'react';

import type { FC } from 'react';

const GOOGLE_FORM_URL = 'docs.google.com/forms/d/1whmNgig8TKm8qTvAAYm5xjYE';
const ENTRY_KEY = 'entry.883602885';
const GA_COOKIE_PATTERN = /_ga=GA\d\.\d\.(\d+\.\d+)/;

const readClientId = () => {
  const match = document.cookie.match(GA_COOKIE_PATTERN);
  return match?.[1] || '';
};

export const GoogleFormClientIdPrefill: FC = () => {
  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a');
      if (!anchor || !anchor.href.includes(GOOGLE_FORM_URL)) return;

      const clientId = readClientId();
      if (!clientId) return;

      const url = new URL(anchor.href);
      url.searchParams.set(ENTRY_KEY, clientId);
      url.searchParams.set('usp', 'pp_url');
      anchor.href = url.toString();
    };

    // clickは左クリックしか捕捉できないため、中クリックやCtrl+クリックにも対応できるようpointerdownでも書き換える
    document.addEventListener('pointerdown', handlePrefill, true);
    document.addEventListener('click', handlePrefill, true);
    return () => {
      document.removeEventListener('pointerdown', handlePrefill, true);
      document.removeEventListener('click', handlePrefill, true);
    };
  }, []);

  return null;
};
