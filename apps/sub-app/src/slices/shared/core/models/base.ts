// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Core {
  export interface Constructor<T> extends Function {
    new (...args: any[]): T;
  }

  export type BusMap = Record<string | symbol, (...args: any) => any>;
}
