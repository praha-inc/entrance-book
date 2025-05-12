import { GoogleTagManager } from '@next/third-parties/google';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';

import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import 'nextra-theme-docs/style.css';

const companyImage = 'https://storage.googleapis.com/production-os-assets/assets/3e2414da-29eb-4a09-a665-b35ce4ecb451';

export const metadata: Metadata = {
  title: {
    template: '%s | PrAha Entrance Book',
    default: 'PrAha Entrance Book',
  },
  description: '株式会社PrAhaのEntrance Bookです。',
  twitter: {
    card: 'summary_large_image',
    images: companyImage,
  },
  icons: companyImage,
  openGraph: {
    type: 'website',
    images: companyImage,
  },
};

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
    >
      <Head>
        <GoogleTagManager gtmId="GTM-M5B86HFP" />
      </Head>
      <body>
        <Layout
          navbar={(
            <Navbar logo={<b>PrAha Entrance Book</b>} projectLink="https://github.com/praha-inc/entrance-book" />
          )}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/praha-inc/about-us/tree/main"
          editLink="GitHubでこのページの修正を提案する"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          feedback={{ content: null }}
          footer={(
            <Footer>
              ©{new Date().getFullYear()} PrAha Inc. All Rights Reserved
            </Footer>
          )}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
