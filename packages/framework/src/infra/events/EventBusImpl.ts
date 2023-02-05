import type { EventBus, Subscription } from '@/core/services';
import type { EventName, EventSubscriber } from '@/core/models';

/**
 * Default implementation of <code>EventBus</code>.
 */
export default class EventBusImpl implements EventBus {
  private subscriberMap: Map<string, Array<EventSubscriber<EventName>>> =
    new Map();

  subscribe<T extends EventName>(
    eventType: T,
    subscriber: EventSubscriber<T>
  ): Subscription {
    const subscribers = this.subscriberMap.get(eventType as string);
    if (subscribers) {
      subscribers.push(subscriber);
    } else {
      this.subscriberMap.set(eventType as string, [subscriber]);
    }

    return {
      unsubscribe: (): void => {
        this.unsubscribe(eventType, subscriber);
      },
    };
  }

  unsubscribe<T extends EventName>(
    eventType: T,
    subscriber: EventSubscriber<T>
  ): void {
    const handlers = this.subscriberMap.get(eventType as string);
    if (!handlers) {
      return;
    }

    const handlersWithoutTarget = handlers.filter((listener) => {
      return listener !== subscriber;
    });

    this.subscriberMap.set(eventType as string, handlersWithoutTarget);
  }

  async publish<T extends EventName>(
    event: T,
    ...params: Parameters<EventSubscriber<T>>
  ): Promise<void> {
    const handlers = this.subscriberMap.get(event as string);
    if (!handlers) {
      return;
    }

    for (const subscriber of handlers) {
      const p = Array.isArray(params) ? [...params] : [params];
      const res = subscriber(...p);
      if (res instanceof Promise) {
        await res;
      }
    }
  }
}
