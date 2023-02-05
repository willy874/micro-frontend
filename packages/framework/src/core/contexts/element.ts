import type { PortalContext } from './portal';
import type { ApplicationContext } from './application';

export interface AppElement extends HTMLElement {
  app: any;
  head: HTMLElement;
  body: HTMLElement;
  renderHead(applicationContext: ApplicationContext): Promise<void>;
  renderApp(applicationContext: ApplicationContext): Promise<void>;
  init(portalContext: PortalContext): Promise<void>;
}
