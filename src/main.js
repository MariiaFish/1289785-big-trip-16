import { RenderPosition, render } from './render.js';
import { SiteNavigationView } from './view/site-navigation-view.js';
import { FilterMenuView } from './view/trip-filter-view.js';
import { SortMenuView } from './view/trip-sort-view.js';
import { EditPointFormView } from './view/edit-trip-point-form-view.js';
import { TripListView } from './view/trip-list-view.js';
import { TripPointView } from './view/trip-point-view.js';
import {generateTripPoint} from './mock/trip-point-data.js';
import { genArray, sortArrayByDate } from './mock/utils/utils.js';
import { TripInfoView } from './view/trip-info.js';


const TRIP_POINT_COUNT = 5;

const tripPoints = sortArrayByDate(genArray(TRIP_POINT_COUNT, generateTripPoint));
// console.log(tripPointsArray);
// console.log(sortArrayByDate(tripPointsArray));

const renderTripPoint = (tripListElement, tripPointCard) => {
  const tripPointComponent = new TripPointView(tripPointCard);
  const tripEditComponent = new EditPointFormView(tripPointCard);

  const replacePointToEditForm = () => {
    tripListElement.replaceChild(tripEditComponent.element, tripPointComponent.element);
  };

  const replaceEditFormToPoint = () => {
    tripListElement.replaceChild(tripPointComponent.element, tripEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToEditForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditFormToPoint();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEditFormToPoint();
  });

  render(tripListElement, tripPointComponent.element, RenderPosition.BEFOREEND);
};

const bodyElement = document.querySelector('.page-body');

const tripMainElement = bodyElement.querySelector('.trip-main');
render(tripMainElement, new TripInfoView(tripPoints).element, RenderPosition.AFTERBEGIN);

const tripControls = tripMainElement.querySelector('.trip-main__trip-controls');
render(tripControls, new SiteNavigationView().element, RenderPosition.AFTERBEGIN);
render(tripControls, new FilterMenuView().element, RenderPosition.BEFOREEND);

const tripEvent = bodyElement.querySelector('.trip-events');

render(tripEvent, new SortMenuView().element, RenderPosition.BEFOREEND);

const tripListComponent = new TripListView();
render(tripEvent, tripListComponent.element, RenderPosition.BEFOREEND);


// render(tripListComponent.element, new EditPointFormView(tripPointsArray[0]).element, RenderPosition.BEFOREEND);

// const tripPointComponent = new TripPointView()

for(let i = 0; i < TRIP_POINT_COUNT; i++) {
  renderTripPoint(tripListComponent.element, tripPoints[i]);
}
