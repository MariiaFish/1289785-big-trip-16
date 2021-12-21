import { AbstractView } from './abstract-view.js';

const createEmtyListTemplate = () => (
  `<p class="trip-events__msg">
  Click New Event to create your first point
  </p>`
);

class EmptyListView extends AbstractView {

  get template () {
    return createEmtyListTemplate();
  }
}

export {EmptyListView};
