import { checkDate} from '../mock/utils/utils.js';
import {convertDateToFormat} from '../mock/utils/date.js';
import {createEventTypesListTemplate} from './event-type-list-view.js';
import { VALUE_ATR_FULL_DATE_FORMAT, FLATPICKER_SETTINGS, UpdateType} from '../mock/utils/consts.js';
import { SmartView } from './smart-view.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';
import { getDestinationByTitle, getOfferByEventType, getDestinationList, getEventTypesList, isCheckedOffer } from '../mock/utils/utils.js';


const createEventTypesTemplate = (eventType, eventTypesList) => {
  const typesList = createEventTypesListTemplate(eventTypesList, eventType);
  return `<div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                    ${typesList}
                    </div>`;
};

const createDestinationListTemplate = (destinationList) => (
  `<datalist id="destination-list-1">
      ${destinationList.map((destinationItem) => `<option value="${destinationItem}"></option>`).join(' ')}
  </datalist>`
);

const createEventTitleEditTemplate = (eventType, destinationPoint, destinationList) => {
  const destinationPoints = createDestinationListTemplate(destinationList);
  return `<div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${eventType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationPoint}" list="destination-list-1">
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


const createOffersSectionTemplate = (pointOffers) => (`<section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                    ${pointOffers.map(({title, price, id}) => `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden ${title}" id="${id}" type="checkbox" name="event-offer-${title}">
                        <label class="event__offer-label" for="${id}">
                          <span class="event__offer-title">${title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${price}</span>
                        </label>
                      </div>`).join(' ')}
                    </div>
                  </section>`);


const createDestinationTitleTemplate = (title) => (
  `<p class="event__destination-description">${title}</p>`
);

const createPhotosContainerTemplate = (pictures) => (
  `<div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join(' ')}
                      </div>
                    </div>`
);

const createEditPointFormTemplate = (tripPoint, offers, eventTypesList, destinations,  destinationsList) => {
  const { eventType, endDate, startDate, price, destinationPoint } = tripPoint;
  const { name } = tripPoint.destination;

  const pointOffers = getOfferByEventType(eventType, offers);
  const pointDestinations = getDestinationByTitle(name, destinations);

  const isEndDateCorrect = checkDate(endDate, startDate);

  const typeTemplate = createEventTypesTemplate(eventType, eventTypesList);
  const eventTitleTemplate = createEventTitleEditTemplate(eventType, destinationPoint, destinationsList);
  const eventTimeTemplate = createEventTimeTemplate(startDate, endDate);
  const priceTemplate = createEventPriceTemplate(price);
  const offersTemplate = pointOffers ? createOffersSectionTemplate(pointOffers) : '';
  const destinationTitleTemplate = createDestinationTitleTemplate(pointDestinations.description);
  const destinationPhotosTemplate = createPhotosContainerTemplate(pointDestinations.pictures);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">

                  ${typeTemplate}

                  ${eventTitleTemplate}

                  ${eventTimeTemplate}

                  ${priceTemplate}

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isEndDateCorrect ? '' : 'disabled'}>Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
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


class NewPointFormView extends SmartView {
  #datepickerStart = null;
  #datepickerEnd = null;
  #updateType = UpdateType.PATCH;
  #offers = null;
  #destinations = null;
  #destinationList = null;
  #eventTypesList = null;

  constructor(tripPoint, offers, destinations) {
    super();
    this._data = NewPointFormView.parsePointToData(tripPoint);
    this.#offers = offers;
    this.#destinations = destinations;
    this.#destinationList = getDestinationList(this.#destinations);
    this.#eventTypesList = getEventTypesList(this.#offers);
    this.#setInnerHandlers();
    this.#setDatapickers();
    this.#setOffersHandler(this._data.offers);
  }

  get template() {
    return createEditPointFormTemplate(this._data, this.#offers, this.#eventTypesList, this.#destinations, this.#destinationList);
  }

  reset = (tripPoint) => {
    this.updateData(NewPointFormView.parsePointToData(tripPoint));
  };

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setEditFormSubmitHandler(this._callback.formSubmit);
    this.setCancelClickHandler(this._callback.cancelClick);
    this.#setDatapickers();
    this.#setOffersHandler(this._data.offers);
  };

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
  };

  setEditFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setCancelClickHandler = (callback) => {
    this._callback.cancelClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#cancelClickHandler);
  };

  setDatepickerStart = () => {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...FLATPICKER_SETTINGS,
        defaultDate: this._data.startDate.toDate(),
        onChange: this.#handleStartDate,
      }
    );
  };

  setDatapickerEnd = () => {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...FLATPICKER_SETTINGS,
        defaultDate: this._data.endDate.toDate(),
        onChange: this.#handleEndDate,
      }
    );
  };

  #setDatapickers = () => {
    this.setDatepickerStart();
    this.setDatapickerEnd();
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#eventTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#eventDestinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#eventPriceChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#eventPriceChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#eventOffersChangeHandler);
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      eventType: evt.target.value,
      offers: '',
    });
    this.#updateType = UpdateType.MAJOR;
  };

  #setOffersHandler = (pointOffers) => {
    if (this._data.offers) {
      this.element.querySelectorAll('.event__offer-checkbox').forEach((offer) => {
        if (isCheckedOffer(offer, pointOffers)) {
          offer.checked = true;
        }
      });
    }
  };

  #getOffersByType = (eventType) => getOfferByEventType(eventType, this.#offers);
  #getDestinationByTitle = (title) => getDestinationByTitle(title, this.#destinations);

  #eventOffersChangeHandler = (evt) => {
    evt.preventDefault();
    const offersByType = this.#getOffersByType(this._data.eventType);
    const isChecked = evt.target.checked;
    const offerId = evt.target.id;
    const checkedOffer = offersByType.filter(
      (offer) => offer.id === Number(offerId)
    );
    if (isChecked) {
      this.updateData({
        offers: [...this._data.offers, ...checkedOffer],
      });
    } else {
      this.updateData({
        offers: [
          ...this._data.offers.filter(
            (offer) => offer.id !== checkedOffer[0].id
          ),
        ],
      });
    }
    this.#updateType = UpdateType.MAJOR;
  };

  #eventDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      eventDestination: evt.target.value,
      destination: this.#getDestinationByTitle(evt.target.value),
    });
  };

  #eventPriceChangeHandler = (evt) => {
    this.updateDataByInput({
      price: Number(evt.target.value),
    });
    this.#updateType = UpdateType.MAJOR;
  };

  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.cancelClick(NewPointFormView.parseDataToPoint(this._data));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(
      NewPointFormView.parseDataToPoint(this._data),
      this.#updateType
    );
  };

  #handleStartDate = (userDate) => {
    const isDateCorrect = checkDate(this._data.endDate, dayjs(userDate));
    this.#changeDisable(isDateCorrect);

    this.updateDataByInput({
      startDate: dayjs(userDate),
    });

    this.#updateType = UpdateType.MAJOR;
  };

  #handleEndDate = (userDate) => {
    const isDateCorrect = checkDate(dayjs(userDate), this._data.startDate);
    this.#changeDisable(isDateCorrect);

    this.updateDataByInput({
      endDate: dayjs(userDate),
    });
    this.#updateType = UpdateType.MAJOR;
  };

  #changeDisable = (isDateCorrect) => {
    if (isDateCorrect) {
      this.element.querySelector('.event__save-btn').disabled = false;
    } else {
      this.element.querySelector('.event__save-btn').disabled = true;
    }
  };

  static parsePointToData = (point) => ({ ...point });

  static parseDataToPoint = (data) => {
    const point = { ...data };
    return point;
  };
}

export { NewPointFormView };
