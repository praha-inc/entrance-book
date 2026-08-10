'use client';

import { usePathname } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import { useFooterItems } from 'fumadocs-ui/utils/use-footer-items';
import { useMemo } from 'react';

import type { FooterProps } from 'fumadocs-ui/layouts/notebook/page';
import type { FC } from 'react';

/**
 * 旧サイト(nextra-theme-docs)のページ送りを再現したカスタムfooter。
 * カード型ではなく「‹ 前ページ名 / 次ページ名 ›」のテキストリンク形式。
 */
export const PageFooter: FC<FooterProps> = ({ items, className: _, ...props }) => {
  const footerList = useFooterItems();
  const pathname = usePathname();

  const { previous, next } = useMemo(() => {
    if (items) return items;
    const index = footerList.findIndex((item) => item.url === pathname);
    if (index === -1) return {};
    return {
      previous: footerList[index - 1],
      next: footerList[index + 1],
    };
  }, [footerList, items, pathname]);

  return (
    <div
      {...props}
      className="border-fd-border mt-12 flex items-center justify-between gap-4 border-t pt-6"
    >
      {previous
        ? (
            <Link
              className="text-fd-muted-foreground hover:text-fd-accent-foreground inline-flex items-center gap-1 text-sm font-medium transition-colors"
              href={previous.url}
            >
              <span aria-hidden>‹</span>
              {previous.name}
            </Link>
          )
        : <span />}
      {next
        ? (
            <Link
              className="text-fd-muted-foreground hover:text-fd-accent-foreground inline-flex items-center gap-1 text-end text-sm font-medium transition-colors"
              href={next.url}
            >
              {next.name}
              <span aria-hidden>›</span>
            </Link>
          )
        : <span />}
    </div>
  );
};
