import {generateTripPoint} from './mock/trip-point-data.js';
import { genArray } from './mock/utils/utils.js';
import { TripPresenter } from './presenter/trip-presenter.js';
import { TripPointsModel } from './model/trip-points-model.js';
import { FilterModel } from './model/filter-model.js';
// import { RenderPosition, render } from './mock/utils/render.js';
// import {FilterView} from './view/trip-filter-view.js';
import { FilterPresenter } from './presenter/filter-presenter.js';


const TRIP_POINT_COUNT = 7;

const tripPoints = genArray(TRIP_POINT_COUNT, generateTripPoint);

const tripPointsModel = new TripPointsModel();
tripPointsModel.tripPoints = tripPoints;

const filterModel = new FilterModel();

const bodyElement = document.querySelector('.page-body');
const tripMainContainer = bodyElement.querySelector('.trip-main');
const tripControlsContainer = tripMainContainer.querySelector('.trip-main__trip-controls');
const pageBodyMainContainer = bodyElement.querySelector('.page-main');
const tripEventContainer = pageBodyMainContainer.querySelector('.page-body__container');

const tripPresenter = new TripPresenter(tripMainContainer, tripControlsContainer, tripEventContainer, tripPointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsContainer, filterModel);
// render(tripControlsContainer, new FilterView(filters, 'all'), RenderPosition.BEFOREEND);
tripPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createTripPoint();
});

