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
  subscribe<T extends Core.EventName>(
    eventName: T,
    subscriber: Core.EventSubscriber<T>
  ): Subscription;

  /**
   * Unsubscribe from the specified event type.
   *
   * @param eventName
   * @param subscriber
   */
  unsubscribe<T extends Core.EventName>(
    eventName: T,
    subscriber: Core.EventSubscriber<T>
  ): void;

  /**
   * Publish a event to the registered listeners.
   *
   * @param event
   */
  publish<T extends Core.EventName>(
    event: T,
    ...params: Parameters<Core.EventSubscriber<T>>
  ): Promise<void>;
}

export const EVENT_BUS_TYPE = 'EventBus';
