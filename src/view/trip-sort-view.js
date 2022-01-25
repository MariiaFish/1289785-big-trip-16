import { AbstractView } from './abstract-view.js';
import { SortValue } from '../mock/utils/consts.js';

const createSortMenuTemplate = (currentSortValue) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortValue.DEFAULT}" ${currentSortValue === SortValue.DEFAULT ? 'checked' : ''}>
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortValue.TIME_UP}" ${currentSortValue === SortValue.TIME_UP ? 'checked' : ''}>
              <label class="trip-sort__btn" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortValue.PRICE_UP}" ${currentSortValue === SortValue.PRICE_UP ? 'checked' : ''}>
              <label class="trip-sort__btn" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`;

class SortMenuView extends AbstractView {
  #currentSortValue = null;

  constructor (currentSortValue) {
    super();
    this.#currentSortValue = currentSortValue;
  }

  get template() {
    return createSortMenuTemplate(this.#currentSortValue);
  }

  setSortValueChangeHandler = (callback) => {
    this._callback.sortValueChange = callback;
    this.element.addEventListener('change', this.#sortValueChangeHandler);
  };

  #sortValueChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.sortValueChange(evt.target.value);
  };
}

export {SortMenuView};
