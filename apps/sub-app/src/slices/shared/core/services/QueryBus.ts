import { QueryHandler } from './QueryHandler';

/**
 * The service interface for the query bus.
 */
export interface QueryBus {
  execute<T extends Core.QueryName>(
    queryName: T,
    input: Core.QueryInputs[T]
  ): Promise<Core.QueryOutputs[T]>;

  /**
   * Check if there is a handler registered for the specified query.
   * @param name
   */
  hasHandler<T extends Core.QueryName>(name: T): boolean;

  /**
   * Register the query handler.
   *
   * @param queryName
   * @param handler
   */
  registerHandler<T extends Core.QueryName>(
    queryName: T,
    handler: QueryHandler<T>
  ): void;

  /**
   * Unregister the query handler if any.
   *
   * @param queryName
   */
  unregisterHandler<T extends Core.QueryName>(queryName: T): void;
}

export const QUERY_BUS_TYPE = 'QueryBus';
