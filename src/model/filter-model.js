import { AbstractObservable } from '../mock/utils/abstract-observable';
import { FilterType } from '../mock/utils/consts';

class FilterModel extends AbstractObservable {
  #filter = FilterType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}

export { FilterModel };
