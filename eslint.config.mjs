import { common } from '@agaroot/eslint-config-common';
import { define } from '@agaroot/eslint-config-definer';
import { javascript } from '@agaroot/eslint-config-javascript';
import { next } from '@agaroot/eslint-config-next';
import { react } from '@agaroot/eslint-config-react';
import { style } from '@agaroot/eslint-config-style';
import { typescript } from '@agaroot/eslint-config-typescript';

const config = define([
  common,
  javascript,
  typescript,
  style,
  react,
  next,
]);

export default [
  { ignores: ['next-env.d.ts'] },
  ...config({
    tsconfigPath: './tsconfig.json',
  }),
];
