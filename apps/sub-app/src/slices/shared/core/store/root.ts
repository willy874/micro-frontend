import { CommandBus, COMMAND_BUS_TYPE } from '../services';
import { LogoutHandler } from '@/slices/shared/infra';
import Note from './Note';

export default class RootStore {
  note: Note;
  commandBus: CommandBus;

  constructor(application: Core.ApplicationContext) {
    this.commandBus = application.lookup(COMMAND_BUS_TYPE);
    if (!this.commandBus.hasHandler(LogoutHandler.key)) {
      this.commandBus.registerHandler(LogoutHandler.key, new LogoutHandler());
    }
    this.note = new Note(this);
  }
}
