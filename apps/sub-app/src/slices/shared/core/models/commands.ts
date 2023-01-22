// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Core {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CommandMap extends BusMap {
    logout: () => Promise<boolean>;
  }

  export type CommandName = keyof CommandMap;

  export type CommandInputs<T extends Core.BusMap = CommandMap> = {
    [I in keyof T]: Parameters<T[I]>;
  };

  export type CommandOutputs<T extends Core.BusMap = CommandMap> = {
    [I in keyof T]: ReturnType<T[I]>;
  };
}
