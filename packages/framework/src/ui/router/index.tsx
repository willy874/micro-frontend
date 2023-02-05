import { Route } from 'react-router-dom';
import { Route as AppRoute, Router as AppRouter } from '@/core/contexts';

function isIndexRoute(route: AppRoute): route is AppRoute<true> {
  return route.index === true;
}

const getRecursiveRoutes = (routes: AppRoute[]) => {
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

export interface RecursiveRoutesProps {
  router: AppRouter;
}

export const RecursiveRoutes = ({ router }: RecursiveRoutesProps) => {
  return <>{getRecursiveRoutes(router.routes)}</>;
};
