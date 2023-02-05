import type { CommandName, CommandInputs, CommandOutputs } from '../models';

/**
 * Interface of command handlers.
 */
export interface CommandHandler<T extends CommandName> {
  execute(input: CommandInputs[T]): Promise<CommandOutputs[T]>;
}

/**
 * The base class for command handlers.
 */
export abstract class BaseCommandHandler<T extends CommandName>
  implements CommandHandler<T>
{
  abstract execute(...inputs: CommandInputs[T]): CommandOutputs[T];
}
