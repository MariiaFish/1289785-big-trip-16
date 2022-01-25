import { TripListView } from '../view/trip-list-view.js';
import { ControlsNavigationView } from '../view/trip-controls-navigation-view.js';
import { TripEventsSection } from '../view/trip-events-section-view.js';
import { ButtonAddEventView } from '../view/add-event-button.js';
import { EmptyListView } from '../view/empty-list-view.js';
import { SortMenuView } from '../view/trip-sort-view.js';
import { RenderPosition, render, remove } from '../mock/utils/render.js';
import {timeUp, priceUp, dateDown} from '../mock/utils/utils.js';
import { TripInfoView } from '../view/trip-info.js';
import { TripPointPresenter } from './trip-point-presenter.js';
import {SortValue, UserAction, UpdateType, FilterType} from '../mock/utils/consts.js';
import {filter} from '../mock/utils/filter.js';
import {NewTripPointPresenter} from './new-trip-point-presenter.js';


class TripPresenter {
  #tripMainContainer = null;
  #tripControlsContainer = null;
  #tripEventContainer = null;
  #tripPointsModel = null;
  #filterModel = null;

  #tripControlsNavigationComponent = new ControlsNavigationView();
  #addEventButtonComponent = new ButtonAddEventView();
  #eventsSectionComponent = new TripEventsSection();
  #tripListComponent = new TripListView();

  #tripPointPresenterMap = new Map();
  #newTripPointPresenter = null;
  #currentSortValue = SortValue.DEFAULT;
  #sortTripComponent = null;
  #tripInfoComponent = null;
  #emptyListComponent = null;

  constructor(tripMainContainer, tripControlsContainer, tripEventContainer, tripPointsModel, filterModel) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripControlsContainer = tripControlsContainer;
    this.#tripEventContainer = tripEventContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#filterModel = filterModel;
    this.#newTripPointPresenter = new NewTripPointPresenter(this.#tripListComponent, this.#handleViewAction);
    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get tripPoints() {
    const filterType = this.#filterModel.filter;
    const tripPoints = this.#tripPointsModel.tripPoints;
    const filteredTripPoints = filter[filterType](tripPoints);

    switch (this.#currentSortValue) {
      case SortValue.TIME_UP:
        return filteredTripPoints.sort(timeUp);
      case SortValue.PRICE_UP:
        return filteredTripPoints.sort(priceUp);
    }

    return filteredTripPoints.sort(dateDown);
  }

  init = () => {
    render(this.#tripEventContainer, this.#eventsSectionComponent, RenderPosition.BEFOREEND);
    render(this.#tripControlsContainer, this.#tripControlsNavigationComponent, RenderPosition.AFTERBEGIN);
    render(this.#eventsSectionComponent, this.#tripListComponent, RenderPosition.BEFOREEND);
    render(this.#tripMainContainer, this.#addEventButtonComponent, RenderPosition.BEFOREEND);

    this.#renderEvent();
  };

  createTripPoint = () => {
    this.#currentSortValue = SortValue.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newTripPointPresenter.init();
  };

  #clearEvent = ({ resetSortValue = false } = {}) => {
    this.#tripPointPresenterMap.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenterMap.clear();

    remove(this.#sortTripComponent);
    remove(this.#emptyListComponent);
    remove(this.#tripInfoComponent);

    if (resetSortValue) {
      this.#currentSortValue = SortValue.DEFAULT;
    }
  };

  #renderEvent = () => {
    const tripPoints = this.tripPoints;
    if (tripPoints.length === 0 || !tripPoints) {
      this.#renderNoPoints(this.#filterModel.filter);
      return;
    }

    this.#renderSort();
    this.#renderTripPoints(tripPoints);
    this.#renderTripInfo();
  };

  #handleViewAction = (actionType, updateType, update) => {
    // это тот callback который мы передадим во view
    switch (actionType) {
      case UserAction.UPDATE_TRIP_POINT:
        this.#tripPointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_TRIP_POINT:
        this.#tripPointsModel.addTripPoint(updateType, update);
        break;
      case UserAction.DELETE_TRIP_POINT:
        this.#tripPointsModel.deleteTripPoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // это тот callback который мы передадим модели, точнее её обзерверу. Именно этот callback будет вызываться в модели когда там что-то случится с данными

    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPointPresenterMap.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEvent();
        this.#renderEvent();
        break;
      case UpdateType.MAJOR:
        this.#clearEvent();
        this.#renderEvent();
        break;
    }
  };

  #renderNoPoints = (filterType) => {
    this.#emptyListComponent = new EmptyListView(filterType);
    render(this.#tripEventContainer, this.#emptyListComponent, RenderPosition.BEFOREEND);
  };

  #renderTripPoint = (tripPoint) => {
    const tripPointPresenter = new TripPointPresenter(this.#tripListComponent, this.#handleViewAction, this.#handelModeChange);
    tripPointPresenter.init(tripPoint);
    this.#tripPointPresenterMap.set(tripPoint.id, tripPointPresenter);
  };

  #renderTripPoints = (tripPoints) => {
    tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint));
  };

  #renderSort = () => {
    this.#sortTripComponent = new SortMenuView(this.#currentSortValue);
    this.#sortTripComponent.setSortValueChangeHandler(this.#handleSortValueChange);
    render(this.#eventsSectionComponent, this.#sortTripComponent, RenderPosition.AFTERBEGIN);
  };

  #handelModeChange = () => {
    this.#newTripPointPresenter.destroy();
    this.#tripPointPresenterMap.forEach((presenter) => presenter.resetView());
  };

  #handleSortValueChange = (sortValue) => {
    if (this.#currentSortValue === sortValue) {
      return;
    }

    this.#currentSortValue = sortValue;
    this.#clearEvent();
    this.#renderEvent();
  };

  #renderTripInfo = () => {
    const tripPoints = this.tripPoints;
    this.#tripInfoComponent = new TripInfoView(tripPoints);
    render(this.#tripMainContainer, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
  };
}

export {TripPresenter};
