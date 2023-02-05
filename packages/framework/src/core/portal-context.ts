import { getDefaultPortalContext } from './mock';
import { HttpInterface, PortalContext, PortalStore } from './contexts/portal';

const defaultPortalContext = getDefaultPortalContext();

export class BasePortalContext implements PortalContext {
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
