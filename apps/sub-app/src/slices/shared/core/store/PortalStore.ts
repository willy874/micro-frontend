import { makeObservable, observable, action } from 'mobx';
import { LocaleNamespace, getInitLang } from '../../lib';

class UserInfo implements Core.UserInfo {
  uid: string;
  name: string;

  constructor(args: Partial<Core.UserInfo> = {}) {
    this.uid = args.uid = crypto.randomUUID();
    this.name = args.name || 'unknown';
  }
}

class LocaleInfo implements Core.LocaleInfo {
  locale: string;
  namespace: string;
  resources: Core.LocaleResource;

  constructor(args: Partial<Core.LocaleInfo> = {}) {
    this.locale = args.locale || getInitLang();
    this.namespace = args.namespace || LocaleNamespace.UI;
    this.resources = args.resources || {};
  }
}

export default class PortalStore implements Core.PortalStore {
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

  setLocaleInfo(value: Partial<Core.LocaleInfo>) {
    this.locale = new LocaleInfo(value);
  }

  setUserInfo(value: Partial<Core.UserInfo>) {
    this.user = new UserInfo(value);
  }
}
