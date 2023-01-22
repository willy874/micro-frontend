import { BaseCommandHandler } from '@/slices/shared/core';

export default class LogoutHandler<
  T extends Core.CommandName
> extends BaseCommandHandler<T> {
  static readonly key = 'logout';

  async execute(): Promise<Core.CommandOutputs[T]> {
    return Boolean(true);
  }
}
