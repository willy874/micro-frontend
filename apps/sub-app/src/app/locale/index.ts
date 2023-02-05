import { reaction } from 'mobx';
import { ApplicationContext, LocaleInfo } from '@micro-app/framework';
import { Languages, LocaleNamespace } from '@/slices/shared';
import enUsResource from './langs/en-US.json';
import jaJpResource from './langs/ja-JP.json';
import zhTwResource from './langs/zh-TW.json';
import zhCnResource from './langs/zh-CN.json';

export const initTranslation = {
  init(application: ApplicationContext, portalLocale?: LocaleInfo) {
    const { locale, portal } = application.shared;
    if (portalLocale) {
      // reactive locale
      locale.changeLanguage(portalLocale.locale as Languages);
      reaction(
        () => portalLocale.locale as Languages,
        (value) => locale.changeLanguage(value)
      );
      // reactive resources
      locale.addResources(portalLocale.resources, true, true);
      reaction(
        () => portalLocale.resources,
        (value) => locale.addResources(value)
      );
      // observable
      locale.on('languageChanged', (lng: string) => {
        portal.store.setLocaleInfo({ locale: lng });
      });
    }
    locale.addResources(Languages.EN_US, LocaleNamespace.UI, enUsResource);
    locale.addResources(Languages.JA_JP, LocaleNamespace.UI, jaJpResource);
    locale.addResources(Languages.ZH_TW, LocaleNamespace.UI, zhTwResource);
    locale.addResources(Languages.ZH_CN, LocaleNamespace.UI, zhCnResource);
  },
};
