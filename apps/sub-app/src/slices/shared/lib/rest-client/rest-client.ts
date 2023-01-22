import {
  createHttpInstance,
  resolveConfig,
  HttpInterface,
  HttpRequest,
  HttpResponse,
  HttpError,
} from './axios';
import { HttpEvent, isXhrHandler } from './utils';
import {
  useRequestSuccess,
  useRequestError,
  useResponseSuccess,
  useResponseError,
} from './interceptors';

type RestClientEventMap = {
  loadstart: HttpEvent<HttpRequest>;
  load: HttpEvent<HttpResponse>;
  loadend: HttpEvent<null>;
  error: HttpEvent<HttpError>;
  abort: Event;
};

export interface RestClientInit {
  config: Record<string, any>;
  authorization: string;
  http: HttpInterface;
}

export class RestClient extends EventTarget {
  headers: Record<string, string> = {};
  http: HttpInterface;
  abortController = new AbortController();
  defaults: HttpRequest = {} as any;

  constructor(options: Partial<RestClientInit> = {}) {
    super();
    this.headers = {
      authorization: options.authorization || '',
    };
    this.defaults = options.config || ({} as any);
    const instance = createHttpInstance({
      config: this.config as any,
      requestSuccess: useRequestSuccess(this),
      requestError: useRequestError(this),
      responseSuccess: useResponseSuccess(this),
      responseError: useResponseError(this),
    });
    this.http = options.http || instance;
  }

  get config(): Partial<HttpRequest> {
    const config = this.defaults || {};
    return {
      ...config,
      signal: this.abortController.signal,
    };
  }
  set config(value: Partial<HttpRequest>) {
    Object.assign(this.defaults, resolveConfig(value as any));
  }

  /* prettier-ignore */
  on<K extends keyof RestClientEventMap>(type: K, callback: (this: RestClient, event: RestClientEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void
  /* prettier-ignore */
  on(type: string, callback: (this: RestClient, event: Event) => any, options?: boolean | AddEventListenerOptions) {
    if (type === 'abort') {
      this.abortController.signal.addEventListener(type, (event) => callback.call(this, event), options)
    }
    this.addEventListener(type, (event) => callback.call(this, event as HttpEvent), options)
  }

  /* prettier-ignore */
  off<K extends keyof RestClientEventMap>(type: K, callback: (event: RestClientEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void
  /* prettier-ignore */
  off(type: string, callback: (event: any) => void, options?: boolean | AddEventListenerOptions) {
    this.removeEventListener(type, callback, options)
  }

  /* prettier-ignore */
  emit<K extends keyof RestClientEventMap, D = RestClientEventMap[K] extends HttpEvent<infer R> ? R : any>(type: K, data: D): boolean;
  emit<T = any>(type: string, data: T) {
    return this.dispatchEvent(new HttpEvent<T>(type, { data, request: this }));
  }

  send<T extends XMLHttpRequestBodyInit, R = any>(data: T): Promise<R>;
  send<T extends Record<string, any>>(data: T): Promise<any>;
  send(...args: unknown[]): Promise<any> {
    if (isXhrHandler(args)) {
      const [data] = args;
      return this.http.send({ ...this.config, data } as any).finally(() => {
        this.emit('loadend', null);
      });
    }
    if (args[0] && typeof args[0] === 'object') {
      const config = args[0];
      return this.http
        .send({ ...this.config, ...config } as any)
        .finally(() => {
          this.emit('loadend', null);
        });
    }
    return Promise.reject(new Error('This parameter cannot be sent.'));
  }

  abort() {
    this.abortController.abort();
  }

  /* prettier-ignore */
  static handler<T extends (...args: any[]) => any, R = ReturnType<T>, P extends any[] = Parameters<T>>(handler: T, ...params: P): R {
    return handler(...params);
  }
}

export function responseHandler<T = any>(res: any) {
  return Promise.resolve(res as T);
}
