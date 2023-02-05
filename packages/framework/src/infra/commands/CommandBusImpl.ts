import type { CommandHandler, CommandBus } from '@/core/services';
import type {
  CommandName,
  CommandInputs,
  CommandOutputs,
} from '@/core/models/commands';

export default class CommandBusImpl implements CommandBus {
  private handlerMap: Map<CommandName, CommandHandler<CommandName>> = new Map();

  async execute<T extends CommandName>(key: T, input?: any): Promise<any>;
  async execute<T extends CommandName>(
    key: T,
    input: CommandInputs[T]
  ): Promise<Awaited<CommandOutputs[T]>> {
    const handler = this.handlerMap.get(key);
    if (!handler) {
      throw new Error(`No registered handler for command: ${String(key)}`);
    }

    return await handler.execute(input);
  }

  hasHandler<T extends CommandName>(key: T): boolean {
    return this.handlerMap.has(key);
  }

  registerHandler<T extends CommandName>(
    key: T,
    handler: CommandHandler<T>
  ): void {
    if (this.handlerMap.has(key)) {
      throw new Error(`Duplicate handler for command: ${String(key)}`);
    }

    this.handlerMap.set(key, handler);
  }

  unregisterHandler(key: CommandName): void {
    if (this.handlerMap.has(key)) {
      this.handlerMap.delete(key);
    }
  }
}
