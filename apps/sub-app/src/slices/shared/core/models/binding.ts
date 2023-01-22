// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Core {
  export type BindingMap = {
    QueryBus: import('../services/QueryBus').QueryBus;
    CommandBus: import('../services/CommandBus').CommandBus;
    EventBus: import('../services/EventBus').EventBus;
    [type: string | symbol]: unknown;
  };

  export type BindingName = keyof BindingMap;

  export type Provider<T> = () => T;

  export interface Binding<T extends BindingName, V = BindingMap[T]> {
    toValue(value: V): void;
    toClass(clazz: Constructor<V>): void;
    toProvider(provider: Provider<V>): void;
  }
}
