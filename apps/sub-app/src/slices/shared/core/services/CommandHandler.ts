/**
 * Interface of command handlers.
 */
export interface CommandHandler<T extends Core.CommandName> {
  execute(input: Core.CommandInputs[T]): Promise<Core.CommandOutputs[T]>;
}

/**
 * The base class for command handlers.
 */
export abstract class BaseCommandHandler<T extends Core.CommandName>
  implements CommandHandler<T>
{
  abstract execute(...inputs: Core.CommandInputs[T]): Core.CommandOutputs[T];
}
