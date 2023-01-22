import { CommandHandler } from './CommandHandler';

/**
 * Contractual interface for the command bus service.
 */
export interface CommandBus {
  execute<T extends Core.CommandName = Core.CommandName>(
    cmdName: T,
    ...inputs: Core.CommandInputs[T]
  ): Core.CommandOutputs[T];

  /**
   * Check if there is a handler registered for the specified command.
   * @param name
   */
  hasHandler<T extends Core.CommandName>(name: T): boolean;

  /**
   * Register the command handler.
   *
   * @param cmdName
   * @param handler
   */
  registerHandler<T extends Core.CommandName>(
    cmdName: T,
    handler: CommandHandler<T>
  ): void;

  /**
   * Unregister the command handler if any.
   *
   * @param cmdName
   */
  unregisterHandler<T extends Core.CommandName>(cmdName: T): void;
}

export const COMMAND_BUS_TYPE = 'CommandBus';
