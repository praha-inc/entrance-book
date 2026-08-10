import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

const execFileAsync = promisify(execFile);

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    // 各ページの最終更新日時をgitから取得する
    // (--follow: app/*/page.mdからcontent/docsへのリネームを遡って追跡する)
    lastModified: async (filePath) => {
      const { stdout } = await execFileAsync('git', ['log', '--follow', '--format=%cI', '-1', '--', filePath]);
      const date = stdout.trim();
      return date ? new Date(date) : undefined;
    },
  },
});

export default defineConfig();
