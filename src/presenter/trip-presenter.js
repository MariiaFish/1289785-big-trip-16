import { TripListView } from '../view/trip-list-view.js';
import { ControlsNavigationView } from '../view/trip-controls-navigation-view.js';
import { FilterMenuView } from '../view/trip-filter-view.js';
import { TripEventsSection } from '../view/trip-events-section-view.js';
import { ButtonAddEventView } from '../view/add-event-button.js';
import { EmptyListView } from '../view/empty-list-view.js';
import { SortMenuView } from '../view/trip-sort-view.js';
import { RenderPosition, render, updateItem } from '../mock/utils/render.js';
import {timeUp, priceUp} from '../mock/utils/utils.js';
import { TripInfoView } from '../view/trip-info.js';
import { TripPointPresenter } from './trip-point-presenter.js';
import {SortValue} from '../mock/utils/consts.js';

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
  #tripPointPresenterMap = new Map();
  #currentSortValue = SortValue.DEFAULT;

  #eventTripPoints = [];
  #sourcedTripPoints = [];

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

    this.#sourcedTripPoints = [...eventTripPoints];

    this.#renderEvent();
  };

  #renderTripPoint = (tripPointCard) => {
    const tripPointPresenter = new TripPointPresenter(this.#tripListComponent, this.#handleTripPointChange, this.#handelModeChange);
    tripPointPresenter.init(tripPointCard);
    this.#tripPointPresenterMap.set(tripPointCard.id, tripPointPresenter);
  };

  #handleTripPointChange = (updatedTripPoint) => {
    this.#eventTripPoints = updateItem(this.#eventTripPoints, updatedTripPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedTripPoint);
    this.#tripPointPresenterMap.get(updatedTripPoint.id).init(updatedTripPoint);
  };

  #handelModeChange = () => {
    this.#tripPointPresenterMap.forEach((presenter) => presenter.resetView());
  };

  #renderNoPoints = () => {
    render(this.#tripEventContainer, this.#emptyListComponent, RenderPosition.BEFOREEND);
  };

  #renderTripPoints = (from, to) => {
    this.#eventTripPoints.slice(from, to).forEach((presenter) => this.#renderTripPoint(presenter));
  };

  #renderSort = () => {
    render(this.#eventsSectionComponent, this.#sortTripComponent, RenderPosition.AFTERBEGIN);
    this.#sortTripComponent.setSortValueChangeHandler(this.#handleSortValueChange);
  };

  #handleSortValueChange = (sortValue) => {
    if (this.#currentSortValue === sortValue) {
      return;
    }

    this.#sortTripPoints(sortValue);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #sortTripPoints = (sortValue) => {
    switch (sortValue) {
      case SortValue.TIME_UP:
        this.#eventTripPoints.sort(timeUp);
        break;
      case SortValue.PRICE_UP:
        this.#eventTripPoints.sort(priceUp);
        break;
      default:
        this.#eventTripPoints = [...this.#sourcedTripPoints];
    }

    this.#currentSortValue = sortValue;
  };


  #renderPointsList = () => {
    this.#renderTripPoints(0, TRIP_POINT_COUNT);
  };

  #clearPointsList = () => {
    this.#tripPointPresenterMap.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenterMap.clear();
  };

  #renderTripInfo = () => {
    const tripInfoComponent = new TripInfoView(this.#eventTripPoints);
    render(this.#tripMainContainer, tripInfoComponent, RenderPosition.AFTERBEGIN);
  };

  #renderEvent = () => {
    if (this.#eventTripPoints.length === 0 || !this.#eventTripPoints) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
    this.#renderTripInfo();
  };
}

export {TripPresenter};
