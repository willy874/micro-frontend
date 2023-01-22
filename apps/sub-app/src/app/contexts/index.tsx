import { createContext } from 'react';

export type ApplicationContext = import('./application').ApplicationContext;

export const AppCtx = createContext({} as ApplicationContext);
