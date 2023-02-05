import type { BindingName, Binding, BindingMap } from '../services/binding';
import type { Locale } from '@/lib';
import type { PortalContext } from './portal';

export type Router = {
  basename: string;
  routes: Route[];
  registerRouter(routes: Route[]): void;
};

interface BaseRoute {
  caseSensitive?: boolean;
  path: string;
  id?: string;
  /** @typedef {import('react-router-dom').LoaderFunction}  */
  loader?: (args: any) => Promise<Response> | Response | Promise<any> | any;
  /** @typedef {import('react-router-dom').ActionFunction}  */
  action?: (args: any) => Promise<Response> | Response | Promise<any> | any;
  hasErrorBoundary?: boolean;
  /** @typedef {import('react-router-dom').ShouldRevalidateFunction}  */
  shouldRevalidate?: (args: any) => boolean;
  handle?: any;
  element?: JSX.Element | null;
  errorElement?: JSX.Element | null;
}

export interface IndexRoute<T extends true = true> extends BaseRoute {
  index: T;
  children?: undefined;
}

export interface PathRoute<T extends boolean | undefined = false | undefined>
  extends BaseRoute {
  index?: T;
  children?: Route[];
}

export type Route<T extends boolean | undefined = false | undefined> =
  T extends true ? IndexRoute<T> : IndexRoute | PathRoute<T>;

export interface ApplicationShared {
  router: Router;
  portal: PortalContext;
  locale: Locale;
  [key: string]: unknown;
}

export type InitInstance<T> = {
  init: (app: ApplicationContext, options: T) => void;
};

export type InitOptionInstance = {
  init: (app: ApplicationContext) => void;
};

export interface ApplicationContext {
  readonly isSelf?: boolean;
  readonly shared: ApplicationShared;
  init(portal: PortalContext, props: DOMStringMap): void;
  use(initInstance: InitOptionInstance): ApplicationContext;
  use<T>(initInstance: InitInstance<T>, options: T): ApplicationContext;
  registerRouter(route: Route[]): void;
  bind<T extends BindingName>(name: T): Binding<T>;
  lookup<T extends BindingName>(name: T): BindingMap[T];
}
