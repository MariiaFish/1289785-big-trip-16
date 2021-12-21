import { getLowerCaseEventType } from '../mock/utils/utils.js';
import {convertDateToFormat, getDatetimeAtr} from '../mock/utils/date.js';
import {FULL_DATE_FORMAT, EVENT_DATE_FORMAT} from '../mock/utils/consts.js';
import { convertDurationTime } from '../mock/convertor-time-duration.js';
import { AbstractView } from './abstract-view.js';

const createOfferElements = (offers) => (
  `<ul class="event__selected-offers ">
                  ${offers.map(({offerTitle, offerPrice}) => `<li class="event__offer">
                    <span class="event__offer-title">${offerTitle}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offerPrice}</span>
                  </li>`).join(' ')}
                </ul>`
);

const createNewPointTemplate = (tripPointCard) => {
  const { eventDate, eventType, offers, eventTitle, eventTime: {startTime: {startTime}, endTime: {endDate, endTime}, eventDuration}, price, isFavorite} = tripPointCard;

  const favoriteClass = isFavorite === true ? 'event__favorite-btn--active' : '';
  const offersList = offers ? createOfferElements(offers) : '';

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${convertDateToFormat(eventDate, FULL_DATE_FORMAT)}">${convertDateToFormat(eventDate, EVENT_DATE_FORMAT)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${getLowerCaseEventType(eventType)}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${eventTitle}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${getDatetimeAtr(eventDate, startTime)}">${startTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${getDatetimeAtr(endDate, endTime)}">${endTime}</time>
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

class TripPointView extends AbstractView {
  #tripPoint = null;

  constructor(tripPoint) {
    super();
    this.#tripPoint = tripPoint;
  }

  get template() {
    return createNewPointTemplate(this.#tripPoint);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }
}

export { TripPointView };
