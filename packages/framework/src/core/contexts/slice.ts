import type { ApplicationShared } from './application';

export type BaseRootStore = Record<string, any>;

export abstract class SliceContext {
  abstract name: string;
}

export abstract class SharedSliceContext extends SliceContext {
  abstract store: import('../store').RootStore;
}

export abstract class BaseSliceContext<
  T extends BaseRootStore
> extends SliceContext {
  abstract shared: ApplicationShared;
  abstract store: T;
}
