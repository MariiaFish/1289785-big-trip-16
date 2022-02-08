import {convertDateToFormat} from '../mock/utils/date.js';
import {FULL_DATE_FORMAT, EVENT_DATE_FORMAT, TIME_FORMAT, DATE_TIME} from '../mock/utils/consts.js';
import { convertDurationTime } from '../mock/convertor-time-duration.js';
import { SmartView } from './smart-view.js';
import { calcTimeDuration} from '../mock/utils/utils.js';

const createOfferElements = (offers) => (
  `<ul class="event__selected-offers ">
                  ${offers.map((offer) => `<li class="event__offer">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>`).join(' ')}
                </ul>`
);

const createNewPointTemplate = (tripPoint) => {
  const { eventType, offers, endDate, startDate, price, isFavorite, destinationPoint} = tripPoint;

  const favoriteClass = isFavorite === true ? 'event__favorite-btn--active' : '';
  const eventDuration = calcTimeDuration(endDate, startDate);
  tripPoint.eventDate = tripPoint.startDate;
  const offersList = offers ? createOfferElements(offers) : '';

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${convertDateToFormat(startDate, FULL_DATE_FORMAT)}">${convertDateToFormat(startDate, EVENT_DATE_FORMAT)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${eventType} ${destinationPoint}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${convertDateToFormat(startDate, DATE_TIME)}">${convertDateToFormat(startDate, TIME_FORMAT)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${convertDateToFormat(endDate, DATE_TIME)}">${convertDateToFormat(endDate, TIME_FORMAT)}</time>
                  </p>
                  <p class="event__duration">${convertDurationTime(eventDuration)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                ${offersList}
                <button class="event__favorite-btn ${favoriteClass}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

class TripPointView extends SmartView {

  constructor(tripPoint) {
    super();
    this._data = TripPointView.parsePointToData(tripPoint);
  }

  get template() {
    return createNewPointTemplate(this._data);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  static parsePointToData = (point) => ({...point});

  static parseDataToPoint = (data) => {
    const point = {...data};
    return point;
  }
}

export { TripPointView };
