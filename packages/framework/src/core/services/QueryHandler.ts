import type { QueryName, QueryInputs, QueryOutputs } from '../models';

export interface QueryHandler<T extends QueryName> {
  execute(input: QueryInputs[T]): Promise<QueryOutputs[T]>;
}

export abstract class BaseQueryHandler<T extends QueryName>
  implements QueryHandler<T>
{
  abstract execute(input: QueryInputs[T]): Promise<QueryOutputs[T]>;
}
