'use client';

import { Navbar } from 'nextra-theme-docs';
import { useEffect } from 'react';

const GOOGLE_FORM_URL = 'docs.google.com/forms/d/1whmNgig8TKm8qTvAAYm5xjYE';
const ENTRY_KEY = 'entry.883602885';
const GA_COOKIE_PATTERN = /_ga=GA\d\.\d\.(\d+\.\d+)/;

const readClientId = () => {
  const match = document.cookie.match(GA_COOKIE_PATTERN);
  return match?.[1] || '';
};

export const CustomNavbar = () => {
  // NextraのナビゲーションとMDX本文の応募リンクをまとめて扱うため、documentへイベントを委譲する。
  // ブラウザでのみイベントを登録し、アンマウント時に解除するためuseEffectで管理する。
  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a');
      if (!anchor || !anchor.href.includes(GOOGLE_FORM_URL)) return;

      // GAのCookieはページ表示後に作られる場合があるため、リンクを操作した時点で取得する。
      const clientId = readClientId();
      if (!clientId) return;

      const url = new URL(anchor.href);
      url.searchParams.set(ENTRY_KEY, clientId);
      url.searchParams.set('usp', 'pp_url');
      anchor.href = url.toString();
    };

    // 中クリックでも遷移前にURLを更新するためpointerdownを使い、キーボード操作はclickで補う。
    // リンク側のイベント処理より先に書き換えるため、キャプチャーフェーズで受け取る。
    document.addEventListener('pointerdown', handlePrefill, true);
    document.addEventListener('click', handlePrefill, true);
    return () => {
      document.removeEventListener('pointerdown', handlePrefill, true);
      document.removeEventListener('click', handlePrefill, true);
    };
  }, []);

  return <Navbar logo={<b>PrAha Entrance Book</b>} projectLink="https://github.com/praha-inc/entrance-book" />;
};
