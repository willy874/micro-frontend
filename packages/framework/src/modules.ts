declare module 'framework' {
  interface QueryMap {
    getUser: () => Promise<boolean>;
  }
  interface CommandMap {
    login: () => Promise<string>;
    logout: () => Promise<boolean>;
  }
  interface EventMap {
    login: () => void;
  }
  interface ApplicationShared {
    [key: string]: unknown;
  }
}
