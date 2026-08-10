import { DocsLayout } from 'fumadocs-ui/layouts/notebook';

import { SidebarFooter } from '../../components/sidebar-footer';
import { SiteHeader } from '../../components/site-header';
import { source } from '../../lib/source';

import type { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <DocsLayout
        tree={source.pageTree}
        nav={{ title: <b>PrAha Entrance Book</b>, mode: 'top' }}
        slots={{ header: SiteHeader }}
        // テーマ切替は旧サイトと同じくサイドバー下部に配置(ヘッダー側のビルトインは無効化)
        themeSwitch={{ enabled: false }}
        sidebar={{
          footer: SidebarFooter,
        }}
        githubUrl="https://github.com/praha-inc/entrance-book"
        links={[
          {
            text: '会社ホームページ',
            url: 'https://www.praha-inc.com/',
            external: true,
          },
          {
            text: 'カジュアル面談に応募する',
            url: 'https://docs.google.com/forms/d/1whmNgig8TKm8qTvAAYm5xjYE-3twTW8IIIen1ZMlyZE/viewform',
            external: true,
          },
        ]}
      >
        {children}
      </DocsLayout>
      <footer className="text-fd-muted-foreground border-fd-border border-t py-6 text-center text-sm">
        ©{new Date().getFullYear()} PrAha Inc. All Rights Reserved
      </footer>
    </>
  );
};

export default Layout;
