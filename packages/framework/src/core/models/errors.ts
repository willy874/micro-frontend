/**
 * Base application error.
 */
export abstract class BaseError extends Error {
  constructor(public message: string, options?: ErrorOptions) {
    super(message, options);
  }
}
