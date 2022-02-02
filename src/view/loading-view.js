import { AbstractView } from './abstract-view.js';

const createLoadingTemplate = () => (
  `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>

  <p class="trip-events__msg">Loading...</p>
</section>`
);

class LoadingView extends AbstractView {

  get template() {
    return createLoadingTemplate();
  }
}

export { LoadingView };
