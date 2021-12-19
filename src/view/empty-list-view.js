import { createElement } from '../render';

const createEmtyListTemplate = () => (
  `<p class="trip-events__msg">
  Click New Event to create your first point
  </p>`
);

class EmptyListView {
  #element = null;

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template () {
    return createEmtyListTemplate();
  }

  removeElement () {
    this.#element = null;
  }
}

export {EmptyListView};
