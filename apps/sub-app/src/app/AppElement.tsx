import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App';
import { loadAssets, createAssetsLink } from './utils/remote';
import { ApplicationContext } from '@/app/contexts/application';
import { APP_ENV_APP_NAME } from '@/app/constants';

export default class SubAppElement
  extends HTMLElement
  implements Core.AppElement
{
  app: Root | null = null;
  head: HTMLElement = document.createElement('div');
  body: HTMLElement = document.createElement('div');
  context: ApplicationContext;

  constructor() {
    super();
    this.head.id = 'head';
    this.body.id = 'body';
    this.context = new ApplicationContext();
  }

  async renderHead() {
    const remoteUrl = this.context.isSelf ? '' : `/apps/${APP_ENV_APP_NAME}`;
    this.head.innerHTML = '';
    await loadAssets(APP_ENV_APP_NAME, remoteUrl);
    const links = createAssetsLink(APP_ENV_APP_NAME, remoteUrl);
    links.forEach((link) => this.head.appendChild(link));
  }

  async renderApp() {
    this.app = createRoot(this.body);
    this.app.render(
      <StrictMode>
        <App
          application={this.context}
          root={this.shadowRoot as ShadowRoot}
          head={this.head}
          body={this.body}
        />
      </StrictMode>
    );
  }

  async init(portalContext: Core.PortalContext) {
    this.context.init(portalContext, { ...this.dataset });
    await Promise.all([this.renderHead(), this.renderApp()]);
  }

  connectedCallback() {
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(this.head);
    root.appendChild(this.body);
  }

  disconnectedCallback() {
    if (this.app) {
      this.app.unmount();
      this.app = null;
    }
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = '';
    }
  }
}
