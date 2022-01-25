import { getLowerCaseEventType, getRandomArrayLength, getRandomInteger, genArray, generatePhotoAdress} from '../mock/utils/utils.js';
import {convertDateToFormat} from '../mock/utils/date.js';
import { updateDescriptionTitle, updateDescriptionPhotos } from '../mock/trip-point-data.js';
import { getTodayDate} from '../mock/utils/date.js';
import {createEventTypesListTemplate} from './event-type-list-view.js';
import {EVENT_TYPES, EVENT_DATE_FORMAT, VALUE_ATR_FULL_DATE_FORMAT, FLATPICKER_SETTINGS, DESTINATION_DISCRIPTION, EVENT_DESTINATION_POINTS, OFFERS} from '../mock/utils/consts.js';
import { SmartView } from './smart-view.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';
import {UpdateType, DateType} from '../mock/utils/consts.js';
import { calcTimeDuration } from '../mock/utils/event-time.js';


const BLANK_TASK = {
  eventDate: getTodayDate(EVENT_DATE_FORMAT),
  eventType: 'Taxi',
  offers: '',
  eventDestination: 'Amsterdam',
  startDate: dayjs(),
  endDate: dayjs(),
  eventDuration: '',
  price: 0,
  destination: {
    title: getRandomArrayLength(DESTINATION_DISCRIPTION, getRandomInteger(1, 5)),
    photos: genArray(getRandomInteger(1, 5),generatePhotoAdress),
  }
};
const createEventTypesTemplate = (eventType) => {
  const typesList = createEventTypesListTemplate(EVENT_TYPES, eventType);
  return `<div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${getLowerCaseEventType(eventType)}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                    ${typesList}
                    </div>`;
};

const createDestinationListTemplate = (destinationList) =>
  `<datalist id="destination-list-1">
      ${destinationList.map((destinationItem) => `<option value="${destinationItem}"></option>`).join(' ')}
  </datalist>`;

const createEventTitleEditTemplate = (eventType, eventDestination, destinationList) => {
  const destinationPoints = createDestinationListTemplate(destinationList);
  return `<div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${eventType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${eventDestination}" list="destination-list-1">
                    ${destinationPoints}
                    </div>`;
};

const createEventTimeTemplate = (startDate, endDate) => (
  `<div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${convertDateToFormat(startDate, VALUE_ATR_FULL_DATE_FORMAT)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${convertDateToFormat(endDate, VALUE_ATR_FULL_DATE_FORMAT)}">
                  </div>`
);

const createEventPriceTemplate = (price) => (
  `<div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
                  </div>`
);


const createOffersSectionTemplate = (offers) => (
  `<section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                    ${offers.map(([offerTitle, offerPrice]) => `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerTitle}" type="checkbox" name="event-offer-${offerTitle}" checked>
                        <label class="event__offer-label" for="event-offer-${offerTitle}">
                          <span class="event__offer-title">${offerTitle}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offerPrice}</span>
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
  const { eventDestination, eventType, endDate, startDate, offers, destination: {title, photos}, price} = tripPointCard;

  const typeTemplate = createEventTypesTemplate(eventType);
  const eventTitleTemplate = createEventTitleEditTemplate(eventType, eventDestination, EVENT_DESTINATION_POINTS);
  const eventTimeTemplate = createEventTimeTemplate(startDate, endDate);
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

class EditPointFormView extends SmartView {
  #datepickerStart = null;
  #datepickerEnd = null;
  #updateType = UpdateType.PATCH;

  constructor(tripPointCard = BLANK_TASK) {
    super();
    this._data = EditPointFormView.parsePointToData(tripPointCard);
    this.#setInnerHandlers();
    this.#setDatapickers();
  }

  get template () {
    return createEditPointFormTemplate(this._data);
  }

  reset = (tripPointCard) => {
    this.updateData(EditPointFormView.parsePointToData(tripPointCard));
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setEditFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setEditClickHandler(this._callback.editClick);
    this.#setDatapickers();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }
  }

  setEditFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  }

  setDatepickerStart = () => {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...FLATPICKER_SETTINGS,
        defaultDate: this._data.startDate.toDate(),
        onClose: this.#handleStartDate,
      }
    );
  }

  setDatapickerEnd = () => {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...FLATPICKER_SETTINGS,
        defaultDate: this._data.endDate.toDate(),
        onClose: this.#handleEndDate,
      }
    );
  }

  #setDatapickers = () => {
    this.setDatepickerStart();
    this.setDatapickerEnd();
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventDestinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#eventPriceChangeHandler);
  }

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      eventType: evt.target.value,
      eventTitle: evt.target.value,
      offers: OFFERS[evt.target.value],
    });
  }

  #eventDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      eventDestination: evt.target.value,
      destination: {title: updateDescriptionTitle(), photos: updateDescriptionPhotos()}
    });
  }

  #eventPriceChangeHandler = (evt) => {
    this.updateData({
      price: Number(evt.target.value),
    });
    this.#updateType = UpdateType.MAJOR;
  }

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditPointFormView.parseDataToPoint(this._data));
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick(EditPointFormView.parseDataToPoint(this._data));
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointFormView.parseDataToPoint(this._data), this.#updateType);
  }

  #handleStartDate = (userDate) => {
    this.#dateChangeHandler(userDate, DateType.START_DATA);
    this.#updateType = UpdateType.MAJOR;
  }

  #handleEndDate = (userDate) => {
    this.#dateChangeHandler(userDate, DateType.END_DATA);
    this.#updateType = UpdateType.MAJOR;
  }

  #dateChangeHandler = (userDate, dateType) => {
    switch (dateType) {
      case DateType.END_DATA:
        this.updateData({
          endDate: dayjs(userDate),
          eventDuration: calcTimeDuration(dayjs(userDate), this._data.startDate)
        });
        break;
      case DateType.START_DATA:
        this.updateData({
          startDate: dayjs(userDate),
          eventDate: dayjs(userDate),
          eventDuration: calcTimeDuration(this._data.endDate, dayjs(userDate)),
        });
        break;
    }
  }

  static parsePointToData = (point) => ({...point});

  static parseDataToPoint = (data) => {
    const point = {...data};
    // еще какая-то логика
    return point;
  }
}

export { EditPointFormView };
