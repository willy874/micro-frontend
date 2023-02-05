import Axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  // AxiosHeaders,
} from 'axios';
import { HttpMethods } from './constants';

export type HttpRequest<D = any> = AxiosRequestConfig<D>;
export type HttpResponse<T = any, D = any> = AxiosResponse<T, D>;
export type HttpError<T = unknown, D = any> = AxiosError<T, D>;

export interface RequestInstanceOptions {
  config: HttpRequest;
  requestSuccess: (req: HttpRequest) => Promise<any>;
  requestError: (err: HttpError) => Promise<any>;
  responseSuccess: (res: HttpResponse) => Promise<any>;
  responseError: (err: HttpError) => Promise<any>;
}

/* eslint-disable prettier/prettier */
type MethodsType = 'delete' | 'get' | 'head' | 'post' | 'put' | 'patch' | 'options' | 'purge' | 'link' | 'common'
export function isMethod(key: string): key is MethodsType {
  return ['delete', 'get', 'head', 'post', 'put', 'patch', 'options', 'purge', 'link', 'common'].includes(key)
}
/* eslint-enable */

// export function resolveHeaders(config: HttpRequest) {
//   const header = config.headers || new AxiosHeaders();
//   const method = (config.method && config.method.toLowerCase()) || 'get';
//   if (header instanceof AxiosHeaders) {
//     return header;
//   } else {
//     const result = {};
//     let commonHeader = {};
//     let methodHeader = {};
//     header[method] instanceof AxiosHeaders ? header[method] : null;
//     for (const key in header) {
//       const value = header[key];
//       if (isMethod(key)) {
//         const h = header[key];
//         if (h && key === 'common') {
//           commonHeader = h;
//         }
//         if (h && key === method) {
//           methodHeader = h;
//         }
//         delete header[key];
//       }
//       if (value) {
//         result[key] = value;
//       }
//     }
//     return new AxiosHeaders(commonHeader).concat(methodHeader).concat(result);
//   }
// }

export type HttpInterface = {
  [Key in HttpMethods]?: (
    url: string,
    data?: any,
    config?: HttpRequest
  ) => Promise<any>;
} & {
  send: (config: HttpRequest) => Promise<any>;
};

export function resolveConfig<D = any>(
  config: HttpRequest<D> & Record<string, any>
): Partial<HttpRequest<D>> {
  const cof: Partial<HttpRequest> = {
    url: config.url,
    method: config.method,
    baseURL: config.baseURL,
    transformRequest: config.transformRequest,
    transformResponse: config.transformResponse,
    headers: config.headers,
    params: config.params,
    paramsSerializer: config.paramsSerializer,
    data: config.data,
    timeout: config.timeout,
    timeoutErrorMessage: config.timeoutErrorMessage,
    withCredentials: config.withCredentials,
    adapter: config.adapter,
    auth: config.auth,
    responseType: config.responseType,
    responseEncoding: config.responseEncoding,
    xsrfCookieName: config.xsrfCookieName,
    xsrfHeaderName: config.xsrfHeaderName,
    onUploadProgress: config.onUploadProgress,
    onDownloadProgress: config.onDownloadProgress,
    maxContentLength: config.maxContentLength,
    validateStatus: config.validateStatus,
    maxBodyLength: config.maxBodyLength,
    maxRedirects: config.maxRedirects,
    maxRate: config.maxRate,
    beforeRedirect: config.beforeRedirect,
    socketPath: config.socketPath,
    httpAgent: config.httpAgent,
    httpsAgent: config.httpsAgent,
    proxy: config.proxy,
    cancelToken: config.cancelToken,
    decompress: config.decompress,
    transitional: config.transitional,
    signal: config.signal,
    insecureHTTPParser: config.insecureHTTPParser,
    env: config.env && { ...config.env },
    formSerializer: config.formSerializer,
  };
  const result: Partial<HttpRequest> = {};
  for (const key in cof) {
    if (typeof cof[key] !== 'undefined') {
      result[key] = cof[key];
    }
  }
  return result;
}

export function createHttpInstance(
  options: RequestInstanceOptions
): HttpInterface {
  const {
    config,
    requestSuccess,
    requestError,
    responseSuccess,
    responseError,
  } = options;
  const instance = Axios.create(config);
  instance.interceptors.request.use(requestSuccess, requestError);
  instance.interceptors.response.use(responseSuccess, responseError);
  return {
    /* eslint-disable prettier/prettier */
    send: (config) => instance(resolveConfig(config)),
    get: (url, data, config) => instance.get(url, resolveConfig({ ...config, params: data || {} } as any)),
    post: (url, data, config) => instance.post(url, data, resolveConfig(config as any)),
    patch: (url, data, config) => instance.patch(url, data, resolveConfig(config as any)),
    put: (url, data, config) => instance.put(url, data, resolveConfig(config as any)),
    delete: (url, data, config) => instance.delete(url, resolveConfig({ ...config, params: data || {} } as any)),
    /* eslint-enable */
  };
}
