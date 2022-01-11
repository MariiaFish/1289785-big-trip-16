import { TripListView } from '../view/trip-list-view.js';
import { ControlsNavigationView } from '../view/trip-controls-navigation-view.js';
import { FilterMenuView } from '../view/trip-filter-view.js';
import { TripEventsSection } from '../view/trip-events-section-view.js';
import { ButtonAddEventView } from '../view/add-event-button.js';
import { EmptyListView } from '../view/empty-list-view.js';
import { SortMenuView } from '../view/trip-sort-view.js';
import { RenderPosition, render, updateItem } from '../mock/utils/render.js';
import { TripInfoView } from '../view/trip-info.js';
import { TripPointPresenter } from './trip-point-presenter.js';

const TRIP_POINT_COUNT = 7;

class TripPresenter {

  #tripMainContainer = null;
  #tripEventContainer = null;

  #controlsNavigationComponent = new ControlsNavigationView();
  #filtersFormComponent = new FilterMenuView();
  #addEventButtonComponent = new ButtonAddEventView();
  #sortTripComponent = new SortMenuView();
  #eventsSectionComponent = new TripEventsSection();
  #tripListComponent = new TripListView();
  #emptyListComponent = new EmptyListView();
  #tripPontPresenter = new Map();

  #eventTripPoints = [];

  constructor(tripMainContainer, tripEventContainer) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripEventContainer = tripEventContainer;
  }

  init = (eventTripPoints) => {
    this.#eventTripPoints = [...eventTripPoints];

    render(this.#tripEventContainer, this.#eventsSectionComponent, RenderPosition.BEFOREEND);
    render(this.#tripMainContainer, this.#controlsNavigationComponent, RenderPosition.BEFOREEND);
    render(this.#controlsNavigationComponent, this.#filtersFormComponent, RenderPosition.BEFOREEND);
    render(this.#eventsSectionComponent, this.#tripListComponent, RenderPosition.BEFOREEND);
    render(this.#tripMainContainer, this.#addEventButtonComponent, RenderPosition.BEFOREEND);

    this.#renderEvent();
  }

  #renderNoPoints = () => {
    render(this.#tripEventContainer, this.#emptyListComponent, RenderPosition.BEFOREEND);
  }

  #renderTripPoint = (tripPointCard) => {
    const tripPointPresenter = new TripPointPresenter(this.#tripListComponent, this.#handleTripPointChange, this.#handelModeChange);
    tripPointPresenter.init(tripPointCard);
    this.#tripPontPresenter.set(tripPointCard.id, tripPointPresenter);
  }

  #handelModeChange = () => {
    this.#tripPontPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleTripPointChange = (updatedTripPoint) => {
    this.#eventTripPoints = updateItem(this.#eventTripPoints, updatedTripPoint);
    this.#tripPontPresenter.get(updatedTripPoint.id).init(updatedTripPoint);
  }

  #renderTripPoints = (from, to) => {
    this.#eventTripPoints.slice(from, to).forEach((eventTripPoint) => this.#renderTripPoint(eventTripPoint));
  }

  #renderSort = () => {
    render(this.#eventsSectionComponent, this.#sortTripComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPointsList = () => {
    this.#renderSort();
    this.#renderTripPoints(0, TRIP_POINT_COUNT);
  }

  // #clearPointsList = () => {
  //   this.#tripPontPresenter.forEach((presenter) => presenter.destroy());
  //   this.#tripPontPresenter.clear();
  //   remove(this.#sortTripComponent);
  // }

  #renderTripInfo = () => {
    const tripInfoComponent = new TripInfoView(this.#eventTripPoints);
    render(this.#tripMainContainer, tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  #renderEvent = () => {
    if (this.#eventTripPoints.length === 0 || !this.#eventTripPoints) {
      this.#renderNoPoints();
      return;
    }

    this.#renderPointsList();
    this.#renderTripInfo();
  }
}

export {TripPresenter};
