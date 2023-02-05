import { StrictMode } from 'react';
import { ApplicationElement } from '@micro-app/framework';
import App from './App';
import { APP_ENV_APP_NAME } from './constants';
import { ApplicationContext } from './contexts';

export default class SubAppElement extends ApplicationElement {
  appName = APP_ENV_APP_NAME;
  context: ApplicationContext;

  constructor() {
    super();
    this.context = new ApplicationContext();
  }

  async renderApp() {
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
}
