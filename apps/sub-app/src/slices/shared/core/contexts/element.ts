namespace Core {
  export interface AppElement extends HTMLElement {
    app: any;
    head: HTMLElement;
    body: HTMLElement;
    renderHead(applicationContext: Core.ApplicationContext): Promise<void>;
    renderApp(applicationContext: Core.ApplicationContext): Promise<void>;
    init(portalContext: Core.PortalContext): Promise<void>;
  }
}
