import { PostProcessorModule } from 'i18next';

// following translations will keep its form
export const preserves = [
  'MRVN',
  'SSH',
  'SFTP',
  'CDN',
  'URL',
  'IP',
  'FQDN',
  'API',

  // FIXME: need better way to handle the list
  'AWS',
  'Alibaba Cloud',
  'GCP',
  'Tencent Cloud',
  'Azure',
  'VMWare',
  'Nutanix',
  'Godaddy',
  'Akamai',
  'CloudFlare',
  'DNSPod',
  'NS1',
  'Qiniu',
  'Yunpien',
  '106 SMS',
  '106 Jiekou',
] as const;

export enum LocaleNamespace {
  UI = 'ui',
  GLOSSARY = 'glossary',
  ERROR_CLASS = 'errorClass',
}

export enum Languages {
  ZH_CN = 'zh-CN',
  ZH_TW = 'zh-TW',
  EN_US = 'en-US',
  JA_JP = 'ja-JP',
}

export const LanguageList = [
  Languages.EN_US,
  Languages.JA_JP,
  Languages.ZH_CN,
  Languages.ZH_TW,
];

export const PROCESS_NAME = 'pnPostProcessor' as PostProcessorModule['type'];

export const DEFAULT_LANG = Languages.EN_US;

// There is a chance Safari(13) will return language tag with lowercase country.
// Therefore, transform all tag to lowercase to avoid this issue.
// (spec: https://en.wikipedia.org/wiki/IETF_language_tag)
export const APP_LOCALE_MAP: Record<string, Languages> = {
  zh: Languages.ZH_CN,
  'zh-cn': Languages.ZH_CN,
  'zh-tw': Languages.ZH_TW,
  en: Languages.EN_US,
  'en-us': Languages.EN_US,
  ja: Languages.JA_JP,
  'ja-jp': Languages.JA_JP,
};
