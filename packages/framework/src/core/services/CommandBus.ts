import type { CommandName, CommandInputs, CommandOutputs } from '../models';
import type { CommandHandler } from './CommandHandler';

/**
 * Contractual interface for the command bus service.
 */
export interface CommandBus {
  execute<T extends CommandName = CommandName>(
    cmdName: T,
    ...inputs: CommandInputs[T]
  ): CommandOutputs[T];

  /**
   * Check if there is a handler registered for the specified command.
   * @param name
   */
  hasHandler<T extends CommandName>(name: T): boolean;

  /**
   * Register the command handler.
   *
   * @param cmdName
   * @param handler
   */
  registerHandler<T extends CommandName>(
    cmdName: T,
    handler: CommandHandler<T>
  ): void;

  /**
   * Unregister the command handler if any.
   *
   * @param cmdName
   */
  unregisterHandler<T extends CommandName>(cmdName: T): void;
}

export const COMMAND_BUS_TYPE = 'CommandBus';
