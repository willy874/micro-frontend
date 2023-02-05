import { ApplicationContext } from '../contexts';
import { CommandBus, COMMAND_BUS_TYPE } from '../services';
import LogoutHandler from '@/infra/commands/LogoutHandler';
import NoteStore from './Note';

export default class RootStore {
  note: NoteStore;
  commandBus: CommandBus;

  constructor(application: ApplicationContext) {
    this.commandBus = application.lookup(COMMAND_BUS_TYPE);
    if (!this.commandBus.hasHandler(LogoutHandler.key)) {
      this.commandBus.registerHandler(LogoutHandler.key, new LogoutHandler());
    }
    this.note = new NoteStore(this);
  }
}
