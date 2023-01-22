export interface QueryHandler<T extends Core.QueryName> {
  execute(input: Core.QueryInputs[T]): Promise<Core.QueryOutputs[T]>;
}

export abstract class BaseQueryHandler<T extends Core.QueryName>
  implements QueryHandler<T>
{
  abstract execute(input: Core.QueryInputs[T]): Promise<Core.QueryOutputs[T]>;
}
