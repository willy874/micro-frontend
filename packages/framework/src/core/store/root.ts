import { ApplicationContext } from '../contexts';
import {
  CommandBus,
  QueryBus,
  EventBus,
  COMMAND_BUS_TYPE,
  QUERY_BUS_TYPE,
  EVENT_BUS_TYPE,
} from '../services';

export default class RootStore {
  commandBus: CommandBus;
  queryBus: QueryBus;
  eventBus: EventBus;

  constructor(application: ApplicationContext) {
    this.commandBus = application.lookup(COMMAND_BUS_TYPE);
    this.queryBus = application.lookup(QUERY_BUS_TYPE);
    this.eventBus = application.lookup(EVENT_BUS_TYPE);
  }
}
