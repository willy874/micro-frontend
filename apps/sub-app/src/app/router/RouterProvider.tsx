import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { routesConfig } from './routes';

function isIndexRoute(route: Core.Route): route is Core.Route<true> {
  return route.index === true;
}

const getRecursiveRoutes = (routes: Core.Route[]) => {
  return routes.map((route) => {
    if (isIndexRoute(route)) {
      return <Route key={route.path} {...route} />;
    }
    return (
      <Route key={route.path} {...route}>
        {route.children && getRecursiveRoutes(route.children)}
      </Route>
    );
  });
};

const LoadingView = () => <div>Loading...</div>;

interface CustomRouterProps {
  router: Core.Router;
  fallback?: JSX.Element;
}

const RouterProvider = ({ router }: CustomRouterProps) => {
  return (
    <Suspense fallback={<LoadingView />}>
      <BrowserRouter basename={router.basename}>
        <Routes>
          {getRecursiveRoutes(router.routes)}
          {routesConfig.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default RouterProvider;
