import {
  QueryBus,
  CommandBus,
  QUERY_BUS_TYPE,
  COMMAND_BUS_TYPE,
} from '@/slices/shared';
import Timer from './Timer';
import { LoginHandler } from '../../infra';
import { GetJsonplaceholderPostsHandler } from '../../infra/GetJsonplaceholderPostsHandler';

export default class RootStore {
  timer: Timer;
  queryBus: QueryBus;
  commandBus: CommandBus;

  constructor(application: Core.ApplicationContext) {
    // Query Bus
    this.queryBus = application.lookup(QUERY_BUS_TYPE);
    this.queryBus.registerHandler(
      'get jsonplaceholder posts',
      new GetJsonplaceholderPostsHandler()
    );
    // Command Bus
    this.commandBus = application.lookup(COMMAND_BUS_TYPE);
    this.commandBus.registerHandler('test LoginHandler', new LoginHandler());
    // Store
    this.timer = new Timer(this);
  }
}
