import type { EventName, EventSubscriber } from '../models';

export interface Subscription {
  unsubscribe(): void;
}

/**
 * The event bus mediates event publishing and subscription;
 */
export interface EventBus {
  /**
   * Subscribe to the specified event type.
   *
   * @param eventName
   * @param subscriber
   */
  subscribe<T extends EventName>(
    eventName: T,
    subscriber: EventSubscriber<T>
  ): Subscription;

  /**
   * Unsubscribe from the specified event type.
   *
   * @param eventName
   * @param subscriber
   */
  unsubscribe<T extends EventName>(
    eventName: T,
    subscriber: EventSubscriber<T>
  ): void;

  /**
   * Publish a event to the registered listeners.
   *
   * @param event
   */
  publish<T extends EventName>(
    event: T,
    ...params: Parameters<EventSubscriber<T>>
  ): Promise<void>;
}

export const EVENT_BUS_TYPE = 'EventBus';
