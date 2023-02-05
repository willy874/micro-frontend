type RestClient = import('./rest-client').RestClient;

export interface HttpEventInit<T = any> extends EventInit {
  data: T;
  request: RestClient;
}

export class HttpEvent<T = any> extends Event {
  readonly data: T | null;
  readonly request: RestClient;
  constructor(type: string, options: HttpEventInit<T>) {
    super(type, options);
    this.data = options.data || null;
    this.request = options.request;
  }
}

export const isXhrHandler = function (
  args: any[]
): args is [XMLHttpRequestBodyInit] {
  const value = args[0];
  return (
    typeof value === 'string' ||
    typeof value === 'undefined' ||
    value instanceof Blob ||
    value instanceof FormData ||
    value instanceof URLSearchParams ||
    value instanceof ArrayBuffer ||
    ArrayBuffer.isView(value)
  );
};
