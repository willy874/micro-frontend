import { makeObservable, observable, action } from 'mobx';
import { PostList } from '../models';

type RootStore = import('./root').default;

export default class Timer {
  secondsPassed = 0;
  postList: PostList[] = [];

  constructor(private root: RootStore) {
    makeObservable(this, {
      secondsPassed: observable,
      postList: observable,
      increaseTimer: action,
    });
  }

  increaseTimer(): void {
    this.secondsPassed += 1;
  }

  testCommand(): void {
    this.root.commandBus.execute('logout');
  }

  testSharedCommand(): void {
    this.root.commandBus.execute('logout');
  }

  async getPosts(id?: number): Promise<void> {
    const result = await this.root.queryBus.execute(
      'get jsonplaceholder posts',
      {
        id,
      }
    );
    const { data } = result;
    this.postList = (Array.isArray(data) ? data : [data]) as PostList[];
  }
}
