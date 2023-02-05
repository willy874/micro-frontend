import { LocaleNamespace, getInitLang } from '@/lib';
import type {
  LocaleResource,
  PortalStore as PortalStoreImplements,
} from './contexts';
import { makeObservable, observable, action } from './store/mobx';

class UserInfo {
  uid: string;
  name: string;

  constructor(args: Partial<UserInfo> = {}) {
    this.uid = args.uid = crypto.randomUUID();
    this.name = args.name || 'unknown';
  }
}

class LocaleInfo {
  locale: string;
  namespace: string;
  resources: LocaleResource;

  constructor(args: Partial<LocaleInfo> = {}) {
    this.locale = args.locale || getInitLang();
    this.namespace = args.namespace || LocaleNamespace.UI;
    this.resources = args.resources || {};
  }
}

export default class PortalStore implements PortalStoreImplements {
  locale = new LocaleInfo();
  user = new UserInfo();

  constructor() {
    makeObservable(this, {
      locale: observable,
      setLocaleInfo: action,
      user: observable,
      setUserInfo: action,
    });
  }

  setLocaleInfo(value: Partial<LocaleInfo>) {
    this.locale = new LocaleInfo(value);
  }

  setUserInfo(value: Partial<UserInfo>) {
    this.user = new UserInfo(value);
  }
}
