'use client';

import { useNotebookLayout } from 'fumadocs-ui/layouts/notebook';

import { SidebarPanelIcon } from './site-header';
import { ThemeModeSelect } from './theme-mode-select';

import type { ComponentProps, FC, PropsWithChildren } from 'react';

/**
 * 旧サイト(nextra-theme-docs)と同じ構成のサイドバー下部:
 * テーマ切替(左)+サイドバーを閉じるボタン(右)。
 * デフォルトのサイドバーfooterはデスクトップでhiddenになるため、
 * 関数コンポーネントとして渡してclassNameを上書きしている。
 * (childrenにはモバイルドロワー用のアイコンリンク等が渡ってくる)
 */
export const SidebarFooter: FC<ComponentProps<'div'>> = ({ className: _, children, ...props }) => {
  const { slots } = useNotebookLayout();
  const CollapseTrigger = slots.sidebar.collapseTrigger as FC<PropsWithChildren<{ className?: string }>>;

  return (
    <div
      {...props}
      className="border-fd-border text-fd-muted-foreground flex flex-row items-center gap-2 border-t px-4 py-2.5"
    >
      {children}
      <ThemeModeSelect />
      <CollapseTrigger className="hover:text-fd-accent-foreground ms-auto transition-colors max-md:hidden">
        <SidebarPanelIcon />
      </CollapseTrigger>
    </div>
  );
};
