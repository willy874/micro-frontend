import { BaseCommandHandler } from '@/slices/shared';
import type { LoginCommand, LoginResult } from '../core/models';

export default class LoginHandler extends BaseCommandHandler<'login'> {
  async execute(input: LoginCommand): Promise<LoginResult> {
    console.log('input', input);
    return {} as any;
  }
}
