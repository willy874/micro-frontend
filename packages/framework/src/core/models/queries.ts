import type { BusMap } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QueryMap extends BusMap {
  //
}

export type QueryName = keyof QueryMap;

export type QueryInputs<T extends BusMap = QueryMap> = {
  [I in keyof T]: Parameters<T[I]>;
};

export type QueryOutputs<T extends BusMap = QueryMap> = {
  [I in keyof T]: ReturnType<T[I]>;
};
