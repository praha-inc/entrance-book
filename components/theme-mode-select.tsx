'use client';

import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { useTheme } from 'fumadocs-ui/provider/base';
import { useEffect, useState } from 'react';

import type { FC } from 'react';

const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

const SunIcon: FC = () => (
  <svg
    aria-hidden
    className="size-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle
      cx="12"
      cy="12"
      r="4"
    />
    <path
      d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon: FC = () => (
  <svg
    aria-hidden
    className="size-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * 旧サイト(nextra-theme-docs)のテーマ切替を再現したセレクト。
 * 現在の外観アイコン+設定名(Light/Dark/System)のボタンを押すと選択メニューが開く。
 */
export const ThemeModeSelect: FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  // テーマはクライアントでしか分からないため、マウント前はプレースホルダを出す
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = themes.find((item) => item.value === theme) ?? themes[2];

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger className="hover:bg-fd-accent hover:text-fd-accent-foreground inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors">
        {mounted && resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
        {mounted ? current?.label : 'System'}
      </PopoverTrigger>
      <PopoverContent className="flex w-28 flex-col p-1">
        {themes.map((item) => (
          <button
            className={`hover:bg-fd-accent hover:text-fd-accent-foreground rounded-md px-2 py-1.5 text-start text-xs transition-colors ${item.value === theme ? 'bg-fd-primary/10 text-fd-primary' : ''}`}
            key={item.value}
            onClick={() => {
              setTheme(item.value);
              setOpen(false);
            }}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
