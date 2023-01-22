export interface LoginCommand extends Core.CommandInputs {
  userName: string;
  password: string;
}

export type LoginResult = Core.CommandOutputs;

export interface GetJsonplaceholderPostsQuery extends Core.QueryInputs {
  id?: number;
}

export type GetJsonplaceholderPostsResult = Core.QueryOutputs;
