import type { CommandName, CommandOutputs } from '@/core/models/commands';
import { BaseCommandHandler } from '@/core/services';

export default class LogoutHandler<
  T extends CommandName
> extends BaseCommandHandler<T> {
  static readonly key = 'logout';

  async execute(): Promise<CommandOutputs[T]> {
    return Boolean(true);
  }
}
