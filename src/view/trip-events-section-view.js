import { AbstractView } from './abstract-view.js';

const createTripEventsSection = () =>
  `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>
  </section`;

class TripEventsSection extends AbstractView {
  get template() {
    return createTripEventsSection();
  }
}

export { TripEventsSection };
