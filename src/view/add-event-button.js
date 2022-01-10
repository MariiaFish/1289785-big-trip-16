import { AbstractView } from './abstract-view.js';

const createButtonAddEventTemplate = () =>
  `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">
  New event
  </button>`;

class ButtonAddEventView extends AbstractView {

  get template () {
    return createButtonAddEventTemplate();
  }
}

export { ButtonAddEventView };

