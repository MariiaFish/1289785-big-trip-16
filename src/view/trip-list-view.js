import {createElement} from '../render.js';

const createTripListTemplate = () => (
  `<ul class="trip-events__list">

  </ul>`
);

class TripListView {
  #element = null;

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template () {
    return createTripListTemplate();
  }

  removeElement () {
    this.#element = null;
  }
}

export { TripListView };
