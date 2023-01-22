// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Core {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface QueryMap extends Core.BusMap {
    //
  }

  export type QueryName = keyof QueryMap;

  export type QueryInputs<T extends Core.BusMap = QueryMap> = {
    [I in keyof T]: Parameters<T[I]>;
  };

  export type QueryOutputs<T extends Core.BusMap = QueryMap> = {
    [I in keyof T]: ReturnType<T[I]>;
  };
}
