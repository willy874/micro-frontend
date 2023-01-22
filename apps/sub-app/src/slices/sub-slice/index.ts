import { RootStore } from './core';
import { initRouter } from './ui/router';
import { initTranslation } from './lib/locale';
export class SubSliceContext implements Core.BaseSliceContext<RootStore> {
  name = 'SubSlice';
  store: RootStore;
  shared: Core.ApplicationShared;

  constructor(application: Core.ApplicationContext) {
    this.store = new RootStore(application);
    this.shared = application.shared;
    application.use(initTranslation);
    application.use(initRouter, this);
  }
}
