import type { BusMap } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EventMap extends BusMap {
  //
}

export type EventName = keyof EventMap;

export type EventSubscriber<T extends EventName> = EventMap[T];

export type EventInputs = {
  [I in EventName]: Parameters<EventMap[I]>;
};

export type EventOutputs = {
  [I in EventName]: ReturnType<EventMap[I]>;
};
