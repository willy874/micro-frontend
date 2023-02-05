/**
 * {@link https://www.i18next.com/ (i18next)}
 */
import i18n, { InitOptions, PostProcessorModule } from 'i18next';
/**
 * {@link https://react.i18next.com/ (react-i18next)}
 */
import {
  initReactI18next,
  useTranslation as useI18nTranslation,
  getI18n,
} from 'react-i18next';
import enUsResource from './langs/en-US.json';
import jaJpResource from './langs/ja-JP.json';
import zhTwResource from './langs/zh-TW.json';
import zhCnResource from './langs/zh-CN.json';
import sprintf from '@/plugins/i18next-sprintf-postprocessor';
import postProcessor from './plugins/postProcessor';
import {
  Languages,
  LanguageList,
  LocaleNamespace,
  PROCESS_NAME,
  preserves,
  APP_LOCALE_MAP,
  DEFAULT_LANG,
} from './constants';
import { ApplicationContext, LocaleResourceLanguage } from '@/core';

export * from './constants';

export function getInitLang(): Languages {
  const query = new URLSearchParams(window.location.search);
  const lang =
    query.get('lang') ||
    navigator.language ||
    navigator.languages.find((s) => s.toLowerCase() in APP_LOCALE_MAP) ||
    document.querySelector('html')?.lang ||
    DEFAULT_LANG;

  if (lang.toLowerCase() in APP_LOCALE_MAP) {
    return APP_LOCALE_MAP[lang.toLowerCase()];
  }

  return DEFAULT_LANG;
}

export function isLanguagesIncludes(lang: string): lang is Languages {
  return LanguageList.some((l) => l.toLowerCase() === lang.toLowerCase());
}

export function createLocal() {
  const initConfig: InitOptions = {
    defaultNS: LocaleNamespace.UI,
    lng: Languages.EN_US,
    resources: getDefaultResources(),
    interpolation: {
      escapeValue: false,
      format(value, format) {
        type Preserves = (typeof preserves)[number];
        if (
          typeof value === 'string' &&
          format === 'lowercase' &&
          !preserves.includes(value as Preserves)
        ) {
          return value.toLowerCase();
        }
        return value;
      },
    },
    keySeparator: false,
    postProcess: PROCESS_NAME,
  };
  const instance = i18n.createInstance();
  instance.use(initReactI18next);
  instance.use(postProcessor as PostProcessorModule);
  instance.use(sprintf);
  instance.init(initConfig);
  return getI18n();
}

export function getDefaultLangResources() {
  return {
    [LocaleNamespace.UI]: {},
    [LocaleNamespace.GLOSSARY]: {},
    [LocaleNamespace.ERROR_CLASS]: {},
  };
}

export function getDefaultResources() {
  return {
    [Languages.EN_US]: getDefaultLangResources(),
    [Languages.JA_JP]: getDefaultLangResources(),
    [Languages.ZH_CN]: getDefaultLangResources(),
    [Languages.ZH_TW]: getDefaultLangResources(),
  };
}

export function changeLanguage(lang: Languages) {
  const i18n = getI18n();
  i18n.changeLanguage(lang);
}

export class Locale {
  private current = i18n;
  readonly languages = LanguageList;

  constructor() {
    this.current = createLocal();
  }

  addResources(
    resources: object | LocaleResourceLanguage,
    deep?: boolean,
    overwrite?: boolean
  ): void;
  addResources(
    lang: Languages | string,
    ns?: LocaleNamespace | string,
    resources?: any,
    deep?: boolean,
    overwrite?: boolean
  ): void;
  addResources(...params: any[]) {
    if (typeof params[0] === 'object') {
      const [p, deep = true, overwrite = false] = params;
      const resources = p as LocaleResourceLanguage;
      for (const lang in resources) {
        const langSrc = resources[lang];
        for (const ns in langSrc) {
          const src = langSrc[ns];
          this.current.addResourceBundle(lang, ns, src, deep, overwrite);
        }
      }
    }
    if (typeof params[0] === 'string') {
      const [
        lang,
        ns = LocaleNamespace.UI,
        resources = {},
        deep = true,
        overwrite = false,
      ] = params;
      this.current.addResourceBundle(lang, ns, resources, deep, overwrite);
    }
  }

  getLocale() {
    return this.current;
  }

  getLanguage() {
    return this.current.language;
  }

  changeLanguage(lang: Languages) {
    changeLanguage(lang);
  }

  t(...args: Parameters<typeof i18n.t>): ReturnType<typeof i18n.t> {
    return this.current.t(...args);
  }

  on(...args: Parameters<typeof i18n.on>): ReturnType<typeof i18n.on> {
    return this.current.on(...args);
  }

  off(...args: Parameters<typeof i18n.off>): ReturnType<typeof i18n.off> {
    return this.current.off(...args);
  }
}

export function useTranslation() {
  const translation = useI18nTranslation();
  return {
    locale: translation.i18n,
    t: translation.t,
    changeLanguage,
    ready: translation.ready,
  };
}

export const initTranslation = {
  init(application: ApplicationContext) {
    const { locale } = application.shared;
    locale.addResources(Languages.EN_US, LocaleNamespace.UI, enUsResource);
    locale.addResources(Languages.JA_JP, LocaleNamespace.UI, jaJpResource);
    locale.addResources(Languages.ZH_TW, LocaleNamespace.UI, zhTwResource);
    locale.addResources(Languages.ZH_CN, LocaleNamespace.UI, zhCnResource);
  },
};
