import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

const execFileAsync = promisify(execFile);

// 浅いclone(CI等のfetch-depth: 1)では全ファイルが最新コミットの日付になってしまうため、
// その場合は日付を取得せず「最終更新日時なし」として扱う
const isShallowRepository = await execFileAsync('git', ['rev-parse', '--is-shallow-repository'])
  .then(({ stdout }) => stdout.trim() === 'true')
  .catch(() => true);

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    // 各ページの最終更新日時をgitから取得する
    // (--follow: app/*/page.mdからcontent/docsへのリネームを遡って追跡する)
    lastModified: async (filePath) => {
      if (isShallowRepository) return undefined;
      const { stdout } = await execFileAsync('git', ['log', '--follow', '--format=%cI', '-1', '--', filePath]);
      const date = stdout.trim();
      return date ? new Date(date) : undefined;
    },
  },
});

export default defineConfig();
