import { Binding, BindingMap, BindingName, Provider } from './services/binding';
import { Constructor } from './utils';

export class DefaultBinding<T extends BindingName, V = BindingMap[T]>
  implements Binding<T, V>
{
  provider!: Provider<V>;

  toValue(value: V): void {
    this.provider = () => value;
  }

  toClass(clazz: Constructor<V>): void {
    this.provider = () => new clazz();
  }

  toProvider(provider: Provider<V>): void {
    this.provider = provider;
  }
}

export { Binding, BindingMap, BindingName, Provider };
