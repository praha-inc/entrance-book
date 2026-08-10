/**
 * ビルド出力から除外する非公開ページのslug一覧。
 * ここに含まれるページはHTML生成・sitemap・検索索引のすべてから除外される。
 * (ソースは content/docs/ に残っているため、再公開する場合はこの一覧から削除して
 *  content/docs/meta.json の pages に追加すること)
 */
export const hiddenPages = [
  // 2026/04/07: プラクラシーは一旦非公開
  'pracracy-manual',
  // 2024/03/06: デザイナー募集を一時的に非公開
  'ui-ux-designer-recruit',
];
