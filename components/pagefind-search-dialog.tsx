'use client';

import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
} from 'fumadocs-ui/components/dialog/search';
import { useEffect, useState } from 'react';

import type { SearchItemType, SharedProps } from 'fumadocs-ui/components/dialog/search';
import type { FC } from 'react';

type PagefindSubResult = {
  url: string;
  title: string;
  excerpt: string;
};

type PagefindDocument = {
  url: string;
  meta: { title?: string };
  sub_results: PagefindSubResult[];
};

type PagefindResult = {
  id: string;
  data: () => Promise<PagefindDocument>;
};

type Pagefind = {
  debouncedSearch: (query: string) => Promise<{ results: PagefindResult[] } | null>;
};

let pagefind: Pagefind | undefined;

const loadPagefind = async (): Promise<Pagefind | undefined> => {
  if (pagefind) return pagefind;
  try {
    // ビルド後に out/_pagefind へ生成されるスクリプトを実行時に読み込む
    // (バンドル対象ではないためnext devでは検索は動作しない)
    const path = '/_pagefind/pagefind.js';
    pagefind = (await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ path)) as Pagefind;
    return pagefind;
  } catch {
    return undefined;
  }
};

// Pagefindの出力するURL(/foo.html#bar)をサイトのURL(/foo#bar)に揃える
const normalizeUrl = (url: string): string => {
  return url.replace(/^\/index\.html/, '/').replace(/\.html/, '');
};

const excerptToNode = (excerpt: string) => {
  // Pagefindのexcerptはハイライトの<mark>タグのみを含むHTML文字列
  return <span dangerouslySetInnerHTML={{ __html: excerpt }} />;
};

export const PagefindSearchDialog: FC<SharedProps> = (props) => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<SearchItemType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    if (!search) {
      setItems(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    void (async () => {
      const client = await loadPagefind();
      if (!client && !cancelled) {
        // next devでは索引(out/_pagefind)が存在しないため検索できない
        setUnavailable(true);
        setIsLoading(false);
        return;
      }
      const response = client ? await client.debouncedSearch(search) : null;
      // debouncedSearchは後続の検索に破棄された場合nullを返す
      if (!response || cancelled) return;

      const results: SearchItemType[] = [];
      for (const result of response.results.slice(0, 10)) {
        const document = await result.data();
        results.push({
          id: result.id,
          type: 'page',
          url: normalizeUrl(document.url),
          content: document.meta.title ?? document.url,
        });
        for (const [index, subResult] of document.sub_results.slice(0, 3).entries()) {
          results.push({
            id: `${result.id}-${index}`,
            type: 'text',
            url: normalizeUrl(subResult.url),
            content: excerptToNode(subResult.excerpt),
          });
        }
      }

      if (cancelled) return;
      setItems(results);
      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [search]);

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput placeholder="検索" />
          <SearchDialogClose />
        </SearchDialogHeader>
        {unavailable
          ? (
              <p className="text-fd-muted-foreground p-4 text-sm">
                検索索引が見つかりません。検索はビルド後のサイトでのみ動作します
                (
                <code>pnpm build && npx serve out</code>
                )
              </p>
            )
          : <SearchDialogList items={items} />}
      </SearchDialogContent>
    </SearchDialog>
  );
};
