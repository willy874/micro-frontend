import { createContext as createReactContext, useContext } from 'react';

/**
 * A helper to create a Context and Provider with no upfront default value, and
 * without having to check for undefined all the time.
 *
 * reference: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
 */
export function createContext<A extends Record<any, any>>() {
  const ctx = createReactContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (c === undefined)
      throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
}
