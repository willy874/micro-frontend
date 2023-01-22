import { BaseCommandHandler, RestClient } from '@/slices/shared';
import type {
  GetJsonplaceholderPostsQuery,
  GetJsonplaceholderPostsResult,
} from '../core/models';

export class GetJsonplaceholderPostsHandler extends BaseCommandHandler<'getJsonplaceholderPosts'> {
  async execute(
    input: GetJsonplaceholderPostsQuery
  ): Promise<GetJsonplaceholderPostsResult> {
    let url = 'https://jsonplaceholder.typicode.com/posts';

    if (input.id) {
      url = `${url}/${input.id}`;
    }

    return new RestClient().send({
      url,
      method: 'GET',
    });
  }
}
