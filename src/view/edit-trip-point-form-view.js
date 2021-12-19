import { getLowerCaseEventType } from '../mock/utils/utils.js';
import {getValueAtrTime, getTodayDate, getThisMomentTime} from '../mock/utils/date.js';
import {createEventTypesListTemplate} from './event-type-list-view.js';
import {EVENT_TYPES, EVENT_DESTINATION_POINTS, EVENT_DATE_FORMAT, THIS_MOMENT_TIME_FORMAT} from '../mock/utils/consts.js';
import {createDestinationPointsListTemplate} from './destination-list.js';
import { createElement } from '../render.js';

const BLANK_TASK = {
  eventDate: getTodayDate(EVENT_DATE_FORMAT),
  eventType: '',
  offers: '',
  eventDestination: '',
  eventTime: {
    startTime: {
      startTime: getThisMomentTime(THIS_MOMENT_TIME_FORMAT),
    },
    endTime: {
      endDate: '',
      endTime: getThisMomentTime(THIS_MOMENT_TIME_FORMAT),
    }
  },
  price: '',
  destination: {
    title: '',
    photos: '',
  }
};

const createEventTypesTemplate = (eventType) => {
  const typesList = createEventTypesListTemplate(EVENT_TYPES);
  return `<div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${getLowerCaseEventType(eventType)}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                    ${typesList}
                    </div>`;
};

const createEventTitleEditTemplate = (eventType, eventDestination) => {
  const eventDestinationList = createDestinationPointsListTemplate(EVENT_DESTINATION_POINTS);
  return `<div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${eventType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${eventDestination}" list="destination-list-1">
                    ${eventDestinationList}
                    </div>`;
};

const createEventTimeTemplate = (eventDate, startTime, endDate, endTime) => (
  `<div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getValueAtrTime(eventDate, startTime)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getValueAtrTime(endDate, endTime)}">
                  </div>`
);

const createEventPriceTemplate = (price) => (
  `<div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>`
);


const createOffersSectionTemplate = (offers) => (
  `<section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                    ${offers.map((offer) => `<div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                        <label class="event__offer-label" for="event-offer-luggage-1">
                          <span class="event__offer-title">${offer.offerTitle}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.offerPrice}</span>
                        </label>
                      </div>`).join(' ')}
                    </div>
                  </section>`
);


const createDestinationTitleTemplate = (title) => (
  `<p class="event__destination-description">${title.join(' ')}</p>`
);

const createPhotosContainerTemplate = (photos) => (
  `<div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join(' ')}
                      </div>
                    </div>`
);

const createEditPointFormTemplate = (tripPointCard) => {
  const { eventDate, eventType, eventDestination, eventTime: {startTime: {startTime}, endTime: {endDate, endTime}}, offers,destination: {title, photos}, price} = tripPointCard;

  const typeTemplate = createEventTypesTemplate(eventType);
  const eventTitleTemplate = createEventTitleEditTemplate(eventType, eventDestination);
  const eventTimeTemplate = createEventTimeTemplate(eventDate, startTime, endDate, endTime);
  const priceTemplate = createEventPriceTemplate(price);
  const offersTemplate = offers ? createOffersSectionTemplate(offers) : '';
  const destinationTitleTemplate = createDestinationTitleTemplate(title);
  const destinationPhotosTemplate = createPhotosContainerTemplate(photos);


  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">

                  ${typeTemplate}

                  ${eventTitleTemplate}

                  ${eventTimeTemplate}

                  ${priceTemplate}

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>

                ${offersTemplate}

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    ${destinationTitleTemplate}
                    ${destinationPhotosTemplate}
                  </section>
                </section>
              </form>
            </li>`;
};

class EditPointFormView {
  #element = null;
  #tripPointCard = null;

  constructor(tripPointCard = BLANK_TASK) {
    this.#tripPointCard = tripPointCard;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createEditPointFormTemplate(this.#tripPointCard);
  }

  removeElement() {
    this.#element = null;
  }
}

export { EditPointFormView };
