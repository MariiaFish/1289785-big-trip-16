import { getLastArrayElement, getFirstArrayElement } from '../mock/utils/utils.js';
import { convertDateToFormat, isSameMonth } from '../mock/utils/date.js';
import { EVENT_DATE_FORMAT, ONLY_NUMBER_DATE_FORMAT } from '../mock/utils/consts.js';
import {calcTripCost} from '../mock/utils/total-price.js';
import { createElement } from '../render.js';

const createShortTripInfoTitle = (tripPoints) => tripPoints.map(({eventDestination}) => eventDestination).join('  &mdash; ');

const createLongTripInfoTitle = (tripPoints) => {
  const firstTripPoint = getFirstArrayElement(tripPoints);
  const lastTripPoint = getLastArrayElement(tripPoints);
  return `${firstTripPoint.eventDestination}  &mdash; ... &mdash; ${lastTripPoint.eventDestination}`;
};


const createTripInfoDatesTemplate = (tripPoints) => {

  const {eventTime: {endTime: {endDate}}} = getLastArrayElement(tripPoints);
  const { eventDate } = getFirstArrayElement(tripPoints);

  const startTripDate = convertDateToFormat(eventDate, EVENT_DATE_FORMAT);

  const endTripDate = isSameMonth(eventDate, endDate)
    ? convertDateToFormat(endDate, ONLY_NUMBER_DATE_FORMAT)
    : convertDateToFormat(endDate, EVENT_DATE_FORMAT);

  return `<p class="trip-info__dates">${startTripDate}&nbsp;&mdash;&nbsp;${endTripDate}</p>`;
};

const createTripInfoTemplate = (tripPoints) => {
  const tripCostValue = calcTripCost(tripPoints);
  const tripTitle = tripPoints.length <= 3 ? createShortTripInfoTitle(tripPoints) : createLongTripInfoTitle(tripPoints) ;
  const tripDates = createTripInfoDatesTemplate(tripPoints);

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${tripTitle}</h1>
              ${tripDates}
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCostValue}</span>
            </p>
          </section>`;
};

// const createTripInfo = (tripPoints) => tripPoints.length === 0 || !tripPoints ? '' : createTripInfoTemplate(tripPoints);

class TripInfoView {
  #element = null;
  #tripPoints = null;

  constructor (tripPoints) {
    this.#tripPoints = tripPoints;
  }

  get element () {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template () {
    return this.#tripPoints === 0 || !this.#tripPoints ? '' : createTripInfoTemplate(this.#tripPoints);
  }

  removeElement () {
    this.#element = null;
  }
}

export { TripInfoView };
