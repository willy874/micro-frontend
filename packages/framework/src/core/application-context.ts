import QueryBusImpl from '@/infra/queries/QueryBusImpl';
import CommandBusImpl from '@/infra/commands/CommandBusImpl';
import EventBusImpl from '@/infra/events/EventBusImpl';
import { Locale } from '@/lib';
import {
  Router,
  Route,
  ApplicationContext as ApplicationContextImpl,
  ApplicationShared,
  InitOptionInstance,
  InitInstance,
  SliceContext,
  PortalContext,
} from './contexts';
import { QUERY_BUS_TYPE, COMMAND_BUS_TYPE, EVENT_BUS_TYPE } from './services';
import { DefaultBinding, Binding, BindingMap, BindingName } from './binding';
import { Constructor } from './utils';
import { getDefaultPortalContext } from './portal-context';

export class ApplicationRouter implements Router {
  basename = '';
  routes: Router['routes'] = [];

  registerRouter(routes: Route[]) {
    this.routes.push(...routes);
  }
}

export class ApplicationContext implements ApplicationContextImpl {
  private slices: Map<string, SliceContext> = new Map();
  private bindings: Map<any, DefaultBinding<any>> = new Map();
  isSelf!: boolean;
  readonly shared: ApplicationShared;

  constructor() {
    this.shared = {
      portal: getDefaultPortalContext(),
      router: new ApplicationRouter(),
      locale: new Locale(),
    };
    this.bind(QUERY_BUS_TYPE).toValue(new QueryBusImpl());
    this.bind(COMMAND_BUS_TYPE).toValue(new CommandBusImpl());
    this.bind(EVENT_BUS_TYPE).toValue(new EventBusImpl());
  }

  init(portal: PortalContext) {
    throw new Error(String(portal));
  }

  use(initInstance: InitOptionInstance): ApplicationContext;
  use<T>(initInstance: InitInstance<T>, options: T): ApplicationContext;
  use(initInstance: any, options: any = {}) {
    initInstance.init(this, options);
    return this;
  }

  registerRouter(routes: Route[]) {
    this.shared.router.routes.push(...routes);
  }

  createSlice(...sliceClasses: Constructor<SliceContext>[]) {
    for (const Slice of sliceClasses) {
      const instance = new Slice(this);
      this.slices.set(instance.name, instance);
    }
  }

  bind<T extends BindingName>(name: T): Binding<T> {
    if (this.bindings.has(name)) {
      throw new Error(`Duplicate binding: ${String(name)}`);
    }
    const binding = new DefaultBinding();
    this.bindings.set(name, binding);
    return binding;
  }

  lookup<T extends BindingName>(name: T): BindingMap[T] {
    const binding = this.bindings.get(name);
    if (binding) {
      return binding.provider();
    }
    throw new Error(`No binding found for ${String(name)}`);
  }
}

export function getDefaultApplicationContext() {
  return new ApplicationContext();
}
