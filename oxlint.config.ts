import { react } from '@praha/oxlint-config-react';
import { standard } from '@praha/oxlint-config-standard';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [
    standard(),
    react(),
  ],
  overrides: [
    {
      // Nextra公式の.tsxを維持するため、このファイルだけ拡張子チェックを除外する。
      files: ['mdx-components.tsx'],
      rules: {
        'react/jsx-filename-extension': 'off',
      },
    },
  ],
});
