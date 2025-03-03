import { Html, Head, Main, NextScript } from 'next/document';

import type { FC } from 'react';

const Document: FC = () => {
  return (
    <Html lang="ja">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
