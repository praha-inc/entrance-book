import { loader } from 'fumadocs-core/source';

import { hiddenPages } from './hidden-pages';
import { docs } from '../.source/server';

/**
 * ページタイトル(frontmatterのtitle)とサイドバー表記を変えたいページの対応表。
 * 例: ページタイトルは「Webエンジニアの募集要項」、サイドバーでは「Webエンジニア」
 */
const sidebarLabels: Record<string, string> = {
  '/web-engineer-recruit': 'Webエンジニア',
  '/ui-ux-designer-recruit': 'UI/UXデザイナー',
};

export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
  pageTree: {
    transformers: [
      {
        file: (node) => {
          const label = typeof node.url === 'string' ? sidebarLabels[node.url] : undefined;
          return label ? { ...node, name: label } : node;
        },
      },
    ],
  },
});

export const visiblePages = source.getPages().filter((page) => {
  return !hiddenPages.some((slug) => page.slugs[0] === slug);
});
