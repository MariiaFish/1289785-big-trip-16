import { AbstractView } from './abstract-view.js';
import { FilterType } from '../mock/utils/consts.js';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createEmtyListTemplate = (filterType) => {
  const emtyListText = NoTasksTextType[filterType];
  return `<p class="trip-events__msg">
  ${emtyListText}
  </p>`;
};

class EmptyListView extends AbstractView {

  constructor (data) {
    super();
    this._data = data;
  }

  get template() {
    return createEmtyListTemplate(this._data);
  }
}

export {EmptyListView};
