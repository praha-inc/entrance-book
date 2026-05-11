const meta = {
  '*': {
    theme: {
      breadcrumb: false,
    },
  },
  'home-page': {
    type: 'page',
    title: '会社ホームページ',
    href: 'https://www.praha-inc.com/',
  },
  'casual-interview-form': {
    type: 'page',
    title: 'カジュアル面談に応募する',
    href: 'https://docs.google.com/forms/d/1whmNgig8TKm8qTvAAYm5xjYE-3twTW8IIIen1ZMlyZE/viewform',
  },
  'introduction-section': {
    type: 'separator',
    title: 'はじめに',
  },
  'index': 'このサイトは何？',
  'praha-overview-section': {
    type: 'separator',
    title: '会社紹介',
  },
  'praha-overview': 'PrAhaってどんな会社？',
  'business-overview': '事業内容',
  'benefits': '福利厚生',
  'hr-evaluation': '人事評価',
  // 2026/04/07: プラクラシーは一旦非公開
  // 内容を見直して再公開する場合はdisplay: 'hidden'を削除してください
  'pracracy-manual': {
    title: 'プラクラシー',
    display: 'hidden',
  },
  'employee-interview': '社員インタビュー',
  'numbers': '数字で見るPrAha',
  'recruitment-section': {
    type: 'separator',
    title: '採用情報',
  },
  'web-engineer-recruit': 'Webエンジニア',
  // 2024/03/06: デザイナー募集を一時的に非公開
  // 再度募集する際はdisplay: 'hidden'を削除してください
  'ui-ux-designer-recruit': {
    title: 'UI/UXデザイナー',
    display: 'hidden',
  },
};

export default meta;
