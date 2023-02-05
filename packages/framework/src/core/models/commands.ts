import type { BusMap } from '../utils';

export interface CommandMap extends BusMap {
  logout: () => Promise<boolean>;
}

export type CommandName = keyof CommandMap;

export type CommandInputs<T extends BusMap = CommandMap> = {
  [I in keyof T]: Parameters<T[I]>;
};

export type CommandOutputs<T extends BusMap = CommandMap> = {
  [I in keyof T]: ReturnType<T[I]>;
};
