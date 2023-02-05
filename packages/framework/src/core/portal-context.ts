import type { LocaleInfo, UserInfo } from './contexts';
import {
  HttpInterface,
  PortalContext as PortalContextImpl,
  PortalStore,
} from './contexts/portal';

export function getDefaultPortalContext(): PortalContextImpl {
  const store = getDefaultPortalStore();
  return {
    store,
    getCurrentLocale() {
      return store.locale;
    },
    getCurrentUser() {
      return store.user;
    },
    checkUserPermission(action: string) {
      return action ? !action : false;
    },
    getHttpInterface() {
      return {
        send: (config: any) => Promise.resolve({ ...config } as any),
        get: (url, data, config) =>
          Promise.resolve({ url, data, config } as any),
        post: (url, data, config) =>
          Promise.resolve({ url, data, config } as any),
        put: (url, data, config) =>
          Promise.resolve({ url, data, config } as any),
        patch: (url, data, config) =>
          Promise.resolve({ url, data, config } as any),
        delete: (url, data, config) =>
          Promise.resolve({ url, data, config } as any),
      };
    },
  };
}

export function getDefaultPortalStore(): PortalStore {
  return {
    locale: {
      locale: '',
      namespace: '',
      resources: {},
    },
    user: {
      uid: crypto.randomUUID(),
      name: 'unknown',
    },
    setLocaleInfo(value: Partial<LocaleInfo>) {
      console.log('setLocaleInfo', value);
    },
    setUserInfo(value: Partial<UserInfo>) {
      console.log('setUserInfo', value);
    },
  };
}

const defaultPortalContext = getDefaultPortalContext();

export class PortalContext implements PortalContextImpl {
  store!: PortalStore;

  getCurrentLocale() {
    return defaultPortalContext.getCurrentLocale();
  }
  getCurrentUser() {
    return defaultPortalContext.getCurrentUser();
  }
  checkUserPermission(action: string) {
    return defaultPortalContext.checkUserPermission(action);
  }
  getHttpInterface(): HttpInterface {
    return {
      send: (config: any) => Promise.resolve({ ...config } as any),
      get: (url, data, config) => Promise.resolve({ url, data, config } as any),
      post: (url, data, config) =>
        Promise.resolve({ url, data, config } as any),
      put: (url, data, config) => Promise.resolve({ url, data, config } as any),
      patch: (url, data, config) =>
        Promise.resolve({ url, data, config } as any),
      delete: (url, data, config) =>
        Promise.resolve({ url, data, config } as any),
    };
  }
}
