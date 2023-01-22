export * from './lib';
export * from './ui';
export * from './core';
export * from './infra';
import { RootStore } from './core';
import { initTranslation } from './lib';

export class SharedSliceContext implements Core.SliceContext {
  name = 'SharedSlice';
  store: RootStore;

  constructor(application: Core.ApplicationContext) {
    this.store = new RootStore(application);
    application.use(initTranslation);
    application.shared.note = this.store.note;
  }
}
