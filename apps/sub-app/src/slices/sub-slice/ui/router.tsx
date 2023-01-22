import { SubSliceCtxProvider, SubSliceContext } from './contexts';
import SubSlicePage from './pages/SubSlicePage';
import TimerPage from './pages/TimerPage';

function createRoutes(context: SubSliceContext) {
  return [
    {
      path: '/',
      element: (
        <SubSliceCtxProvider value={context}>
          <SubSlicePage />
        </SubSliceCtxProvider>
      ),
    },
    {
      path: '/timer-page',
      element: (
        <SubSliceCtxProvider value={context}>
          <TimerPage />
        </SubSliceCtxProvider>
      ),
    },
  ];
}

export const initRouter = {
  init(application: Core.ApplicationContext, slice: SubSliceContext) {
    const routes = createRoutes(slice);
    application.shared.router.registerRouter(routes);
  },
};
