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
    const handleClick = (event: MouseEvent) => {
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

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
};
