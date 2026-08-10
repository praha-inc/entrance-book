'use client';

import Link from 'fumadocs-core/link';
import { useNotebookLayout } from 'fumadocs-ui/layouts/notebook';
import { FullSearchTrigger, SearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';

import type { ComponentProps, FC, PropsWithChildren } from 'react';

/**
 * 旧サイト(nextra-theme-docs)のヘッダー構成を再現したカスタムヘッダー。
 * 並び: タイトル | (右寄せ) 外部リンク → 検索 → GitHubアイコン
 * 外部リンクはapp/(docs)/layout.tsxのlinksと重複定義だが、
 * あちらはモバイルドロワー用でこちらはデスクトップヘッダー用。
 */
const externalLinks = [
  { text: '会社ホームページ', url: 'https://www.praha-inc.com/' },
  { text: 'カジュアル面談に応募する', url: 'https://docs.google.com/forms/d/1whmNgig8TKm8qTvAAYm5xjYE-3twTW8IIIen1ZMlyZE/viewform' },
];

export const ExternalLinkIcon: FC = () => (
  <svg
    aria-hidden
    className="size-3 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      d="M7 17L17 7M9 7h8v8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GithubIcon: FC = () => (
  <svg
    aria-hidden
    className="size-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z" />
  </svg>
);

const HamburgerIcon: FC = () => (
  <svg
    aria-hidden
    className="size-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      d="M4 6h16M4 12h16M4 18h16"
      strokeLinecap="round"
    />
  </svg>
);

export const SidebarPanelIcon: FC = () => (
  <svg
    aria-hidden
    className="size-4.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <rect
      height="16"
      rx="2"
      width="18"
      x="3"
      y="4"
    />
    <path d="M9 4v16" />
  </svg>
);

export const SiteHeader: FC<ComponentProps<'header'>> = (props) => {
  const { slots } = useNotebookLayout();
  const SidebarTrigger = slots.sidebar.trigger as FC<PropsWithChildren<{ className?: string }>>;
  const CollapseTrigger = slots.sidebar.collapseTrigger as FC<PropsWithChildren<{ className?: string }>>;

  return (
    <header
      {...props}
      className="bg-fd-background/80 layout:[--fd-header-height:--spacing(14)] sticky top-(--fd-docs-row-1) z-10 flex flex-col backdrop-blur-sm [grid-area:header]"
    >
      <nav className="border-fd-border flex h-14 items-center gap-4 border-b px-4 md:px-6">
        {/* サイドバーを閉じている間だけ表示される展開ボタン */}
        <CollapseTrigger className="text-fd-muted-foreground -ms-1.5 data-[collapsed=false]:hidden max-md:hidden">
          <SidebarPanelIcon />
        </CollapseTrigger>
        <Link
          className="font-bold"
          href="/"
        >
          PrAha Entrance Book
        </Link>
        <div className="flex flex-1 items-center justify-end gap-5">
          {externalLinks.map((link) => (
            <a
              className="text-fd-muted-foreground hover:text-fd-accent-foreground inline-flex items-center gap-1 text-sm transition-colors max-md:hidden"
              href={link.url}
              key={link.url}
              rel="noreferrer"
              target="_blank"
            >
              {link.text}
              <ExternalLinkIcon />
            </a>
          ))}
          <FullSearchTrigger
            className="w-full max-w-56 max-md:hidden"
            hideIfDisabled
          />
          <a
            aria-label="GitHub"
            className="hover:text-fd-accent-foreground transition-colors"
            href="https://github.com/praha-inc/entrance-book"
            rel="noreferrer"
            target="_blank"
          >
            <GithubIcon />
          </a>
          <SearchTrigger className="md:hidden">
            <span className="sr-only">検索</span>
          </SearchTrigger>
          <SidebarTrigger className="md:hidden">
            <HamburgerIcon />
          </SidebarTrigger>
        </div>
      </nav>
    </header>
  );
};
