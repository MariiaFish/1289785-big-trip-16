import { RenderPosition, render, replace } from './mock/utils/render.js';
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


const TRIP_POINT_COUNT = 5;

const tripPoints = sortArrayByDate(genArray(TRIP_POINT_COUNT, generateTripPoint));
const bodyElement = document.querySelector('.page-body');
const tripEvent = bodyElement.querySelector('.trip-events');
const tripMainElement = bodyElement.querySelector('.trip-main');
const tripControls = tripMainElement.querySelector('.trip-main__trip-controls');

const renderTripPoint = (tripListElement, tripPointCard) => {
  const tripPointComponent = new TripPointView(tripPointCard);
  const tripEditComponent = new EditPointFormView(tripPointCard);

  const replacePointToEditForm = () => {
    replace(tripEditComponent, tripPointComponent);
  };

  const replaceEditFormToPoint = () => {
    replace(tripPointComponent, tripEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  tripPointComponent.setEditClickHandler(() => {
    replacePointToEditForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  tripEditComponent.setFormSubmitHandler(() => {
    replaceEditFormToPoint();
  });

  tripEditComponent.setEditClickHandler(() => {
    replaceEditFormToPoint();
  });

  render(tripListElement, tripPointComponent, RenderPosition.BEFOREEND);
};

render(tripControls, new SiteNavigationView(), RenderPosition.AFTERBEGIN);
render(tripControls, new FilterMenuView(), RenderPosition.BEFOREEND);
render(tripEvent, new SortMenuView(), RenderPosition.BEFOREEND);

const renderTripList = (points) => {
  if (points.length === 0 || !points) {
    render(tripEvent, new EmptyListView(), RenderPosition.BEFOREEND);
  } else {
    const tripListComponent = new TripListView();
    render(tripEvent, tripListComponent, RenderPosition.BEFOREEND);
    render(tripMainElement, new TripInfoView(points), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < TRIP_POINT_COUNT; i++) {
      renderTripPoint(tripListComponent, points[i]);
    }
  }
};

renderTripList(tripPoints);
