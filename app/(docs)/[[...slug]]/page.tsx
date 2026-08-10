import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/notebook/page';
import { notFound } from 'next/navigation';

import { PageFooter } from '../../../components/page-footer';
import { ExternalLinkIcon } from '../../../components/site-header';
import { source, visiblePages } from '../../../lib/source';
import { getMDXComponents } from '../../../mdx-components';

import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

// 非公開ページ(lib/hidden-pages.ts)をビルド出力から除外するため、
// generateStaticParamsに含まれないパスは404にする
export const dynamicParams = false;

export const generateStaticParams = () => {
  return visiblePages.map((page) => ({ slug: page.slugs }));
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
  };
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      breadcrumb={{ enabled: false }}
      // 旧サイトに存在しないUIのため無効化(スクロール進捗+現在見出しのポップオーバー)
      tableOfContentPopover={{ enabled: false }}
      slots={{ footer: PageFooter }}
      tableOfContent={{
        style: 'normal',
        footer: (
          <a
            className="text-fd-muted-foreground hover:text-fd-accent-foreground inline-flex items-center gap-1 text-xs transition-colors"
            href={`https://github.com/praha-inc/entrance-book/blob/main/content/docs/${page.path}`}
            rel="noreferrer"
            target="_blank"
          >
            GitHubでこのページの修正を提案する
            <ExternalLinkIcon />
          </a>
        ),
      }}
    >
      {/* data-pagefind-body: Pagefindの索引対象をタイトルと本文に限定する
          (ページ内のナビゲーションや404ページを索引から除外) */}
      <DocsTitle data-pagefind-body="">{page.data.title}</DocsTitle>
      <DocsBody data-pagefind-body="">
        <MDX components={getMDXComponents()} />
      </DocsBody>
      {page.data.lastModified && (
        <p className="text-fd-muted-foreground mt-12 text-end text-sm">
          Last updated on
          {' '}
          {new Date(page.data.lastModified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      )}
    </DocsPage>
  );
};

export default Page;
