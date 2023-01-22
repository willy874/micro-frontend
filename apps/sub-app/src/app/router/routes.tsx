import { createElement, lazy } from 'react';
import { RouteProps } from 'react-router-dom';

export const routesConfig: RouteProps[] = [
  {
    path: '/',
    element: createElement(lazy(() => import('../pages/DefaultPage'))),
  },
];
