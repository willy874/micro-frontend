import {
  isFiniteNumber,
  isObject,
  isIterator,
  isEmptyObject,
  isNotEmpty,
} from '../utils/is';

describe('lib/utils/is', () => {
  test('isFiniteNumber', () => {
    expect(isFiniteNumber(0)).toBe(true);
    expect(isFiniteNumber(-1)).toBe(true);
    expect(isFiniteNumber(1)).toBe(true);
    expect(isFiniteNumber(Infinity)).toBe(false);
    expect(isFiniteNumber(NaN)).toBe(false);
  });
  test('isObject', () => {
    expect(isObject({})).toBe(true);
    expect(isObject(new Object())).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(Object)).toBe(false);
  });
  test('isIterator', () => {
    expect(isIterator([])).toBe(true);
    expect(isIterator(new Set())).toBe(true);
    expect(isIterator({})).toBe(false);
  });
  test('isEmptyObject', () => {
    class Test {}
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject([])).toBe(true);
    expect(isEmptyObject(new Set())).toBe(true);
    expect(isEmptyObject(new Map())).toBe(true);
    expect(isEmptyObject(new Blob([]))).toBe(true);
    expect(isEmptyObject(new Test())).toBe(true);
    expect(isEmptyObject(new Function())).toBe(false);
    expect(isEmptyObject(null)).toBe(false);
  });
  test('isNotEmpty', () => {
    expect(isNotEmpty(new Function())).toBe(true);
    expect(isNotEmpty(true)).toBe(true);
    expect(isNotEmpty('')).toBe(true);
    expect(isNotEmpty(0)).toBe(true);
    expect(isNotEmpty(null)).toBe(false);
    expect(isNotEmpty(false)).toBe(false);
    expect(isNotEmpty({})).toBe(false);
    expect(isNotEmpty([])).toBe(false);
  });
});
