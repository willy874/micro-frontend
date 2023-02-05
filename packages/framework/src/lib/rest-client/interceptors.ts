import { HttpRequest, HttpResponse, HttpError } from './axios';

type RestClient = import('./rest-client').RestClient;

export function useRequestSuccess(instance: RestClient) {
  return (req: HttpRequest) => {
    // console.log('useRequestSuccess:req', req);
    const method = (req.method && req.method.toLowerCase()) || 'get';
    if (method !== 'post') {
      /* prettier-ignore */
      if (req.data instanceof FormData && JSON.stringify(instance.headers).includes('multipart/form-data')) {
        console.warn(
          'Methods other than post cannot use FormDate or "Content-Type=multipart/form-data" as a parameter.'
        );
      }
    }
    req.headers = { ...instance.headers } as any;
    instance.emit('loadstart', req);
    return Promise.resolve(req);
  };
}

export function useRequestError(instance: RestClient) {
  return (err: HttpError) => {
    // console.log('useRequestError:err', err);
    instance.emit('error', err);
    return Promise.resolve(err);
  };
}

export function useResponseSuccess(instance: RestClient) {
  return (res: HttpResponse) => {
    // console.log('useResponseSuccess:res', res);
    instance.emit('load', res);
    return Promise.resolve(res);
  };
}

export function useResponseError(instance: RestClient) {
  return (err: HttpError) => {
    // console.log('useResponseError:err', err);
    instance.emit('error', err);
    return Promise.resolve(err);
  };
}
