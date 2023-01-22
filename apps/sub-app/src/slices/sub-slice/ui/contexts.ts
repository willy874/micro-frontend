import { createContext } from '@/slices/shared';

export type SubSliceContext = import('../index').SubSliceContext;

const [useSubSliceCtx, SubSliceCtxProvider] = createContext<SubSliceContext>();

export { useSubSliceCtx, SubSliceCtxProvider };
