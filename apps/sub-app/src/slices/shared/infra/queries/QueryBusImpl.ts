import { QueryHandler, QueryBus } from '@/slices/shared/core';

export default class QueryBusImpl implements QueryBus {
  private handlerMap: Map<Core.QueryName, QueryHandler<Core.QueryName>> =
    new Map();

  async execute<T extends Core.CommandName>(key: T, input?: any): Promise<any>;
  async execute<T extends Core.QueryName>(
    key: T,
    input: Core.QueryInputs[T]
  ): Promise<Awaited<Core.QueryOutputs[T]>> {
    const handler = this.handlerMap.get(key);
    if (!handler) {
      throw new Error(`No registered handler for query: ${String(key)}`);
    }

    return await handler.execute(input);
  }

  registerHandler<T extends Core.QueryName>(
    key: T,
    handler: QueryHandler<T>
  ): void {
    if (this.handlerMap.has(key)) {
      throw new Error(`Duplicate handler for query: ${String(key)}`);
    }

    this.handlerMap.set(key, handler);
  }

  unregisterHandler<T extends Core.QueryName>(key: T): void {
    if (this.handlerMap.has(key)) {
      this.handlerMap.delete(key);
    }
  }

  hasHandler<T extends Core.QueryName>(key: T): boolean {
    return this.handlerMap.has(key);
  }
}
