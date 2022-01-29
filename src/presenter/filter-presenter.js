import { FilterType } from '../mock/utils/consts';
import {FilterView} from '../view/trip-filter-view.js';
import { RenderPosition, render } from '../mock/utils/render.js';
import {UpdateType} from '../mock/utils/consts.js';
import { remove, replace } from '../mock/utils/render';


class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filterComponent = null;

  constructor(filterContainer, filterModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;

  }

  get filters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: 'everything',
      },
      {
        type: FilterType.FUTURE,
        name: 'future',
      },
      {
        type: FilterType.PAST,
        name: 'past',
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  destroy = () => {
    remove(this.#filterComponent);
    this.#filterComponent = null;

    // this.#tasksModel.removeObserver(this.#handleModelEvent);
    // this.#filterModel.removeObserver(this.#handleModelEvent);

    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  }


  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}

export {FilterPresenter};
