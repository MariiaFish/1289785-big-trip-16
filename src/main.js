import {generateTripPoint} from './mock/trip-point-data.js';
import { genArray, sortArrayByDate } from './mock/utils/utils.js';
import { TripPresenter } from './presenter/trip-presenter.js';

const TRIP_POINT_COUNT = 7;

const tripPoints = sortArrayByDate(genArray(TRIP_POINT_COUNT, generateTripPoint));
// console.log(tripPoints);

const bodyElement = document.querySelector('.page-body');
const tripMainContainer = bodyElement.querySelector('.trip-main');
const pageBodyMainContainer = bodyElement.querySelector('.page-main');
const tripEventContainer = pageBodyMainContainer.querySelector('.page-body__container');

const tripPresenter = new TripPresenter(tripMainContainer, tripEventContainer);
tripPresenter.init(tripPoints);

