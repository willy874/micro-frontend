export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function isObject(value: unknown): value is object & Record<any, any> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function isIterator<T = unknown>(
  value: unknown
): value is IterableIterator<T> {
  return Boolean(
    typeof value === 'object' &&
      value &&
      typeof (value as any)[Symbol.iterator] === 'function'
  );
}

export function isEmptyObject(
  value: unknown
): value is object & Record<any, undefined> {
  if (typeof value === 'object' && value) {
    if ('length' in value && value['length'] === 0) {
      return true;
    }
    if ('size' in value && value['size'] === 0) {
      return true;
    }
    if (isObject(value)) {
      return JSON.stringify(value) === '{}';
    }
    return !Object.prototype.valueOf.call(value);
  }
  return false;
}

export function isNotEmpty(value: unknown): boolean {
  if (typeof value === 'object') {
    return value === null ? false : !isEmptyObject(value);
  }
  return value === '' || isFiniteNumber(value) || Boolean(value);
}
