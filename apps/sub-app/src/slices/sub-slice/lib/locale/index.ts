import { Languages, LocaleNamespace } from '@/slices/shared';
import enUsResource from './langs/en-US.json';
import jaJpResource from './langs/ja-JP.json';
import zhTwResource from './langs/zh-TW.json';
import zhCnResource from './langs/zh-CN.json';

export const initTranslation = {
  init(application: Core.ApplicationContext) {
    const { locale } = application.shared;
    locale.addResources(Languages.EN_US, LocaleNamespace.UI, enUsResource);
    locale.addResources(Languages.JA_JP, LocaleNamespace.UI, jaJpResource);
    locale.addResources(Languages.ZH_TW, LocaleNamespace.UI, zhTwResource);
    locale.addResources(Languages.ZH_CN, LocaleNamespace.UI, zhCnResource);
  },
};
