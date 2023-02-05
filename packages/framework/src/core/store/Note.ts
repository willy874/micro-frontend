import { makeObservable, observable, action } from './mobx';
import RootStore from './root';

export default class Note {
  nextThing = 'empty';

  constructor(private root: RootStore) {
    makeObservable(this, {
      nextThing: observable,
      updateNextThing: action,
    });
  }

  updateNextThing(newThing: string): void {
    this.nextThing = newThing;
  }
}
