import type { QueryName, QueryInputs, QueryOutputs } from '../models';
import type { QueryHandler } from './QueryHandler';

/**
 * The service interface for the query bus.
 */
export interface QueryBus {
  execute<T extends QueryName>(
    queryName: T,
    input: QueryInputs[T]
  ): Promise<QueryOutputs[T]>;

  /**
   * Check if there is a handler registered for the specified query.
   * @param name
   */
  hasHandler<T extends QueryName>(name: T): boolean;

  /**
   * Register the query handler.
   *
   * @param queryName
   * @param handler
   */
  registerHandler<T extends QueryName>(
    queryName: T,
    handler: QueryHandler<T>
  ): void;

  /**
   * Unregister the query handler if any.
   *
   * @param queryName
   */
  unregisterHandler<T extends QueryName>(queryName: T): void;
}

export const QUERY_BUS_TYPE = 'QueryBus';
