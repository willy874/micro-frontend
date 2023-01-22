import { getDefaultPortalContext } from './mock';
import { QUERY_BUS_TYPE, COMMAND_BUS_TYPE, EVENT_BUS_TYPE } from '../services';
import {
  QueryBusImpl,
  CommandBusImpl,
  EventBusImpl,
} from '@/slices/shared/infra';
import { Locale } from '@/slices/shared/lib';

const defaultPortalContext = getDefaultPortalContext();

export class BasePortalContext implements Core.PortalContext {
  store!: Core.PortalStore;

  getCurrentLocale() {
    return defaultPortalContext.getCurrentLocale();
  }
  getCurrentUser() {
    return defaultPortalContext.getCurrentUser();
  }
  checkUserPermission(action: string) {
    return defaultPortalContext.checkUserPermission(action);
  }
  getHttpInterface(): Core.HttpInterface {
    return {
      send: (config: any) => Promise.resolve({ ...config } as any),
      get: (url, data, config) => Promise.resolve({ url, data, config } as any),
      post: (url, data, config) =>
        Promise.resolve({ url, data, config } as any),
      put: (url, data, config) => Promise.resolve({ url, data, config } as any),
      patch: (url, data, config) =>
        Promise.resolve({ url, data, config } as any),
      delete: (url, data, config) =>
        Promise.resolve({ url, data, config } as any),
    };
  }
}

export class ApplicationRouter implements Core.Router {
  basename = '';
  routes: Core.Router['routes'] = [];

  constructor() {
    //
  }

  registerRouter(routes: Core.Route[]) {
    this.routes.push(...routes);
  }
}
type NoteStore = import('../store/Note').default;
export class BaseApplicationContext implements Core.ApplicationContext {
  private slices: Map<string, Core.SliceContext> = new Map();
  private bindings: Map<any, DefaultBinding<any>> = new Map();
  isSelf!: boolean;
  readonly shared: Core.ApplicationShared = {
    portal: getDefaultPortalContext(),
    router: new ApplicationRouter(),
    locale: new Locale(),
    note: {} as NoteStore,
  };

  constructor() {
    this.bind(QUERY_BUS_TYPE).toValue(new QueryBusImpl());
    this.bind(COMMAND_BUS_TYPE).toValue(new CommandBusImpl());
    this.bind(EVENT_BUS_TYPE).toValue(new EventBusImpl());
  }

  init(portal: Core.PortalContext) {
    throw new Error(String(portal));
  }

  use(initInstance: Core.InitOptionInstance): Core.ApplicationContext;
  use<T>(
    initInstance: Core.InitInstance<T>,
    options: T
  ): Core.ApplicationContext;
  use(initInstance: any, options: any = {}) {
    initInstance.init(this, options);
    return this;
  }

  registerRouter(routes: Core.Route[]) {
    this.shared.router.routes.push(...routes);
  }

  createSlice(...sliceClasses: Core.Constructor<Core.SliceContext>[]) {
    for (const Slice of sliceClasses) {
      const instance = new Slice(this);
      this.slices.set(instance.name, instance);
    }
  }

  bind<T extends Core.BindingName>(name: T): Core.Binding<T> {
    if (this.bindings.has(name)) {
      throw new Error(`Duplicate binding: ${String(name)}`);
    }
    const binding = new DefaultBinding();
    this.bindings.set(name, binding);
    return binding;
  }

  lookup<T extends Core.BindingName>(name: T): Core.BindingMap[T] {
    const binding = this.bindings.get(name);
    if (binding) {
      return binding.provider();
    }
    throw new Error(`No binding found for ${String(name)}`);
  }
}

export class DefaultBinding<T extends Core.BindingName, V = Core.BindingMap[T]>
  implements Core.Binding<T, V>
{
  provider!: Core.Provider<V>;

  toValue(value: V): void {
    this.provider = () => value;
  }

  toClass(clazz: Core.Constructor<V>): void {
    this.provider = () => new clazz();
  }

  toProvider(provider: Core.Provider<V>): void {
    this.provider = provider;
  }
}
