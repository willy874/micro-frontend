// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Core {
  export type LocaleResources = {
    [lang: string]: LocaleResourceLanguage;
  };

  export type LocaleResourceLanguage = {
    [ns: string]: LocaleResource;
  };

  export type LocaleResource = {
    [key: string]: any;
  };

  export interface LocaleInfo {
    locale: string;
    namespace: string;
    resources: LocaleResources;
  }
  export interface UserInfo {
    uid: string;
    name: string;
  }

  type HttpHandler = (url: string, data?: any, config?: any) => Promise<any>;
  export type HttpInterface = {
    send: (config: any) => Promise<any>;
    get: HttpHandler;
    post: HttpHandler;
    put: HttpHandler;
    patch: HttpHandler;
    delete: HttpHandler;
  };

  export interface PortalStore {
    locale: LocaleInfo;
    user: UserInfo;
    setLocaleInfo(value: Partial<LocaleInfo>): void;
    setUserInfo(value: Partial<UserInfo>): void;
  }

  export interface PortalContext {
    store: PortalStore;
    getCurrentLocale(): LocaleInfo;
    getCurrentUser(): UserInfo;
    checkUserPermission(action: string): boolean;
    getHttpInterface(): HttpInterface;
  }
}
