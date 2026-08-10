import { GoogleTagManager } from '@next/third-parties/google';
import { RootProvider } from 'fumadocs-ui/provider/next';

import { PagefindSearchDialog } from '../components/pagefind-search-dialog';
import { GoogleFormClientIdPrefill } from './components/google-form-client-id-prefill';

import type { Metadata } from 'next';
import type { FC, PropsWithChildren } from 'react';

import './global.css';

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

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId="GTM-M5B86HFP" />
      <body className="flex min-h-screen flex-col">
        <GoogleFormClientIdPrefill />
        <RootProvider search={{ SearchDialog: PagefindSearchDialog }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
