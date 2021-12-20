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
import { EmptyListView } from './view/empty-list-view.js';


const TRIP_POINT_COUNT = 0;

const tripPoints = sortArrayByDate(genArray(TRIP_POINT_COUNT, generateTripPoint));
const bodyElement = document.querySelector('.page-body');
const tripEvent = bodyElement.querySelector('.trip-events');
const tripMainElement = bodyElement.querySelector('.trip-main');
const tripControls = tripMainElement.querySelector('.trip-main__trip-controls');

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

render(tripControls, new SiteNavigationView().element, RenderPosition.AFTERBEGIN);
render(tripControls, new FilterMenuView().element, RenderPosition.BEFOREEND);
render(tripEvent, new SortMenuView().element, RenderPosition.BEFOREEND);

const renderTripList = (points) => {
  if (points.length === 0 || !points) {
    render(tripEvent, new EmptyListView().element, RenderPosition.BEFOREEND);
  } else {
    const tripListComponent = new TripListView();
    render(tripEvent, tripListComponent.element, RenderPosition.BEFOREEND);
    render(
      tripMainElement,
      new TripInfoView(points).element,
      RenderPosition.AFTERBEGIN
    );

    for (let i = 0; i < TRIP_POINT_COUNT; i++) {
      renderTripPoint(tripListComponent.element, points[i]);
    }
  }
};

renderTripList(tripPoints);
