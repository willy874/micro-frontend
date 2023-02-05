import { createRoot, Root } from 'react-dom/client';
import { loadAssets, createAssetsLink } from './utils/remote';
import { AppElement, ApplicationContext, PortalContext } from './core';

export enum AppEventType {
  INIT = 'init',
  RENDER = 'render',
  MOUNTED = 'mounted',
  UNMOUNTED = 'unmounted',
}

export class ApplicationElement extends HTMLElement implements AppElement {
  appName = 'base_app';
  app: Root;
  head: HTMLElement = document.createElement('div');
  body: HTMLElement = document.createElement('div');
  context!: ApplicationContext;

  constructor() {
    super();
    this.head.id = 'head';
    this.body.id = 'body';
    this.app = createRoot(this.body);
  }

  async renderHead() {
    const remoteUrl = this.context.isSelf ? '' : `/apps/${this.appName}`;
    this.head.innerHTML = '';
    await loadAssets(this.appName, remoteUrl);
    const links = createAssetsLink(this.appName, remoteUrl);
    links.forEach((link) => this.head.appendChild(link));
  }

  async renderApp() {
    this.app.render(<></>);
  }

  async init(portalContext: PortalContext) {
    this.dispatchEvent(new CustomEvent(AppEventType.INIT, { detail: this }));
    this.context.init(portalContext, { ...this.dataset });
    await Promise.all([this.renderHead(), this.renderApp()]);
    this.dispatchEvent(new CustomEvent(AppEventType.RENDER, { detail: this }));
  }

  connectedCallback() {
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(this.head);
    root.appendChild(this.body);
    this.dispatchEvent(new CustomEvent(AppEventType.MOUNTED, { detail: this }));
  }

  disconnectedCallback() {
    this.app.unmount();
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = '';
    }
    this.dispatchEvent(
      new CustomEvent(AppEventType.UNMOUNTED, { detail: this })
    );
  }
}
