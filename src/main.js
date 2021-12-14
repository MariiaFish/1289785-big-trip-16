import { RenderPosition, renderTemplate } from './render.js';
import {createSiteMenuTemplate} from './view/trip-menu-view.js';
import { createTripFilters } from './view/trip-filters-view.js';
import { createSort } from './view/sort-trip-view.js';
import { createEditPointForm } from './view/edit-trip-point-form-veiw.js';
import { createTripList } from './view/trip-list-view.js';
import {createNewPoint} from './view/new-trip-point-view.js';
import {generateTripPoint} from './mock/trip-point-data.js';
import { genArray, sortArrayByDate } from './mock/utils.js';
import {createTripInfo} from './view/trip-info.js';


const TRIP_POINT_COUNT = 3;

const tripPointsArray = sortArrayByDate(genArray(TRIP_POINT_COUNT, generateTripPoint));
// console.log(tripPointsArray);
// console.log(sortArrayByDate(tripPointsArray));

const bodyElement = document.querySelector('.page-body');
const tripMainElement = bodyElement.querySelector('.trip-main');
const tripControl = bodyElement.querySelector('.trip-controls');
const tripFilters = bodyElement.querySelector('.trip-controls__filters');
const tripEvent = bodyElement.querySelector('.trip-events');

renderTemplate(tripMainElement, createTripInfo(tripPointsArray), RenderPosition.AFTERBEGIN);
renderTemplate(tripControl, createSiteMenuTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(tripFilters, createTripFilters(), RenderPosition.BEFOREEND);
renderTemplate(tripEvent, createSort(), RenderPosition.BEFOREEND);
renderTemplate(tripEvent, createTripList(), RenderPosition.BEFOREEND);

const tripList = tripEvent.querySelector('.trip-events__list');

renderTemplate(tripList, createEditPointForm(tripPointsArray[0]), RenderPosition.BEFOREEND);

for(let i = 1; i < TRIP_POINT_COUNT; i++) {
  renderTemplate(tripList, createNewPoint(tripPointsArray[i]), RenderPosition.BEFOREEND);
}
