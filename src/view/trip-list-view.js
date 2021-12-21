import { AbstractView } from './abstract-view.js';

const createTripListTemplate = () => (
  `<ul class="trip-events__list">

  </ul>`
);

class TripListView extends AbstractView {

  get template () {
    return createTripListTemplate();
  }
}

export { TripListView };
