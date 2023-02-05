export interface Constructor<T> extends Function {
  new (...args: any[]): T;
}

export type BusMap = Record<string | symbol, (...args: any) => any>;
