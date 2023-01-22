import { SharedSliceContext } from '../index';
import {
  getDefaultApplicationContext,
  BaseCommandHandler,
  BaseQueryHandler,
} from '../core';
import {
  CommandBusImpl,
  QueryBusImpl,
  EventBusImpl,
  LogoutHandler,
} from '../infra';

describe('SharedSliceContext', () => {
  const app = getDefaultApplicationContext();
  let shared: SharedSliceContext | null = null;

  test('new Slice', async () => {
    shared = new SharedSliceContext(app);
    expect(Boolean(shared)).toBe(true);
    expect(Boolean(shared.store)).toBe(true);
    expect(Boolean(shared.store.commandBus)).toBe(true);
    expect(shared.store.commandBus.hasHandler(LogoutHandler.key)).toBe(true);
    expect(Boolean(shared.store.note)).toBe(true);
    expect(await shared.store.commandBus.execute('logout')).toBe(true);
  });
});

describe('CommandBus', () => {
  class DummyHandler<T extends Core.CommandName> extends BaseCommandHandler<T> {
    static readonly key = 'dummy';
    async execute(): Promise<Core.CommandOutputs[T]> {
      return 'This is a dummy handler.';
    }
  }
  const handler = new DummyHandler<'dummy'>();
  const commandBus = new CommandBusImpl();

  test('execute', async () => {
    expect(commandBus.hasHandler('dummy')).toBe(false);
    if (!commandBus.hasHandler('dummy')) {
      commandBus.registerHandler('dummy', handler);
    }
    expect(commandBus.hasHandler('dummy')).toBe(true);
    expect(await commandBus.execute('dummy')).toBe('This is a dummy handler.');
  });
  test('remove', async () => {
    commandBus.unregisterHandler('dummy');
    expect(commandBus.hasHandler('dummy')).toBe(false);
  });
});

describe('QueryBus', () => {
  class MockHandler<T extends Core.CommandName> extends BaseQueryHandler<T> {
    static readonly key = 'mock';
    async execute(): Promise<Core.CommandOutputs[T]> {
      return 'This is a mock handler.';
    }
  }
  const handler = new MockHandler<'mock'>();
  const queryBus = new QueryBusImpl();

  test('execute', async () => {
    expect(queryBus.hasHandler('mock')).toBe(false);
    if (!queryBus.hasHandler('mock')) {
      queryBus.registerHandler('mock', handler);
    }
    expect(queryBus.hasHandler('mock')).toBe(true);
    expect(await queryBus.execute('mock')).toBe('This is a mock handler.');
  });
  test('remove', async () => {
    queryBus.unregisterHandler('mock');
    expect(queryBus.hasHandler('mock')).toBe(false);
  });
});

describe('EventBus', () => {
  let trigger = 0;
  const handler = () => trigger++;
  const eventBus = new EventBusImpl();
  test('single event', async () => {
    eventBus.subscribe('trigger', handler);
    expect(trigger).toBe(0);
    eventBus.publish('trigger');
    expect(trigger).toBe(1);
  });
  test('remove event', async () => {
    eventBus.unsubscribe('trigger', handler);
    trigger = 0;
    eventBus.publish('trigger');
    expect(trigger).toBe(0);
  });
  test('multiple event', async () => {
    // action
    eventBus.subscribe('trigger', handler);
    eventBus.subscribe('trigger', handler);
    eventBus.subscribe('trigger', handler);
    eventBus.publish('trigger');
    expect(trigger).toBe(3);
    eventBus.unsubscribe('trigger', handler);
  });
});
