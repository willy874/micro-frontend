import type { Constructor } from '../utils';
import type { QueryBus } from './QueryBus';
import type { CommandBus } from './CommandBus';
import type { EventBus } from './EventBus';

export type BindingMap = {
  QueryBus: QueryBus;
  CommandBus: CommandBus;
  EventBus: EventBus;
  [type: string | symbol]: unknown;
};

export type BindingName = keyof BindingMap;

export type Provider<T> = () => T;

export interface Binding<T extends BindingName, V = BindingMap[T]> {
  toValue(value: V): void;
  toClass(clazz: Constructor<V>): void;
  toProvider(provider: Provider<V>): void;
}
