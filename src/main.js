import { RenderPosition, renderTemplate } from './render.js';
import {createSiteMenuTemplate} from './view/trip-menu-view.js';
import { createTripFilters } from './view/trip-filters-view.js';
import { createSort } from './view/sort-trip-view.js';
import { createEditPointForm } from './view/edit-trip-point-form-veiw.js';
import { createTripList } from './view/trip-list-view.js';
import {createNewPoint} from './view/new-trip-point-view.js';

const TRIP_POINT_COUNT = 3;

const tripMainElement = document.querySelector('.page-body');
const tripMainNavigation = tripMainElement.querySelector('.trip-controls__navigation');
const tripFilters = tripMainElement.querySelector('.trip-controls__filters');
const tripEvent = tripMainElement.querySelector('.trip-events');

renderTemplate(tripMainNavigation, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripFilters, createTripFilters(), RenderPosition.BEFOREEND);
renderTemplate(tripEvent, createSort(), RenderPosition.BEFOREEND);
renderTemplate(tripEvent, createTripList(), RenderPosition.BEFOREEND);

const tripList = tripEvent.querySelector('.trip-events__list');

renderTemplate(tripList, createEditPointForm(), RenderPosition.BEFOREEND);

for(let i = 0; i < TRIP_POINT_COUNT; i++) {
  renderTemplate(tripList, createNewPoint(), RenderPosition.BEFOREEND);
}

