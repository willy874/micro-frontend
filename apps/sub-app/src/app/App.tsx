import { RouterProvider } from './router';
import { AppCtx, ApplicationContext } from './contexts';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
// import 'antd/dist/reset.css';
// import './style.scss';

interface AppProps {
  application: ApplicationContext;
  root: ShadowRoot;
  head: HTMLElement;
  body: HTMLElement;
}

const App = ({ application, head, body }: AppProps) => {
  return (
    <AppCtx.Provider value={application}>
      <StyleProvider container={head}>
        <ConfigProvider
          locale={application.shared.portal.getCurrentLocale()}
          getPopupContainer={() => body}
          getTargetContainer={() => body}
          theme={(application as any).theme}
        >
          <RouterProvider router={application.shared.router} />
        </ConfigProvider>
      </StyleProvider>
    </AppCtx.Provider>
  );
};

export default App;
