import { CommandHandler, CommandBus } from '@/slices/shared/core';

export default class CommandBusImpl implements CommandBus {
  private handlerMap: Map<Core.CommandName, CommandHandler<Core.CommandName>> =
    new Map();

  async execute<T extends Core.CommandName>(key: T, input?: any): Promise<any>;
  async execute<T extends Core.CommandName>(
    key: T,
    input: Core.CommandInputs[T]
  ): Promise<Awaited<Core.CommandOutputs[T]>> {
    const handler = this.handlerMap.get(key);
    if (!handler) {
      throw new Error(`No registered handler for command: ${String(key)}`);
    }

    return await handler.execute(input);
  }

  hasHandler<T extends Core.CommandName>(key: T): boolean {
    return this.handlerMap.has(key);
  }

  registerHandler<T extends Core.CommandName>(
    key: T,
    handler: CommandHandler<T>
  ): void {
    if (this.handlerMap.has(key)) {
      throw new Error(`Duplicate handler for command: ${String(key)}`);
    }

    this.handlerMap.set(key, handler);
  }

  unregisterHandler(key: Core.CommandName): void {
    if (this.handlerMap.has(key)) {
      this.handlerMap.delete(key);
    }
  }
}
