import type { QueryHandler, QueryBus } from '@/core/services';
import type { QueryName, QueryInputs, QueryOutputs } from '@/core/models';

export default class QueryBusImpl implements QueryBus {
  private handlerMap: Map<QueryName, QueryHandler<QueryName>> = new Map();

  async execute<T extends QueryName>(key: T, input?: any): Promise<any>;
  async execute<T extends QueryName>(
    key: T,
    input: QueryInputs[T]
  ): Promise<Awaited<QueryOutputs[T]>> {
    const handler = this.handlerMap.get(key);
    if (!handler) {
      throw new Error(`No registered handler for query: ${String(key)}`);
    }

    return await handler.execute(input);
  }

  registerHandler<T extends QueryName>(key: T, handler: QueryHandler<T>): void {
    if (this.handlerMap.has(key)) {
      throw new Error(`Duplicate handler for query: ${String(key)}`);
    }

    this.handlerMap.set(key, handler);
  }

  unregisterHandler<T extends QueryName>(key: T): void {
    if (this.handlerMap.has(key)) {
      this.handlerMap.delete(key);
    }
  }

  hasHandler<T extends QueryName>(key: T): boolean {
    return this.handlerMap.has(key);
  }
}
