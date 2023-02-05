import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { routesConfig } from './routes';
import { RecursiveRoutes } from '@micro-app/framework';

/**
 *
 */

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
          <RecursiveRoutes router={router} />
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
