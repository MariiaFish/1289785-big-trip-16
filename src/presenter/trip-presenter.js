import { TripListView } from '../view/trip-list-view.js';
import { TripEventsSection } from '../view/trip-events-section-view.js';
import { EmptyListView } from '../view/empty-list-view.js';
import { SortMenuView } from '../view/trip-sort-view.js';
import { RenderPosition, render, remove } from '../mock/utils/render.js';
import {timeUp, priceUp, dateDown} from '../mock/utils/utils.js';
import { TripInfoView } from '../view/trip-info.js';
import { TripPointPresenter } from './trip-point-presenter.js';
import {SortValue, UserAction, UpdateType, FilterType, BLANK_TASK} from '../mock/utils/consts.js';
import {filter} from '../mock/utils/filter.js';
import { LoadingView } from '../view/loading-view.js';
import {NewTripPointPresenter} from './new-trip-point-presenter.js';


class TripPresenter {
  #tripMainContainer = null;
  #tripEventContainer = null;
  #tripPointsModel = null;
  #filterModel = null;
  #sortTripComponent = null;
  #tripInfoComponent = null;
  #emptyListComponent = null;
  #newTripPointPresenter = null;

  #eventsSectionComponent = new TripEventsSection();
  #tripListComponent = new TripListView();
  #tripPointPresenter = new Map();
  #currentSortValue = SortValue.DEFAULT;
  #loadingComponent = new LoadingView();
  #isLoading = true;

  constructor(tripMainContainer, tripEventContainer, tripPointsModel, filterModel) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripEventContainer = tripEventContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#filterModel = filterModel;
    this.#newTripPointPresenter = new NewTripPointPresenter(BLANK_TASK, this.#tripListComponent, this.#handleViewAction);
  }

  get tripPoints() {
    const filterType = this.#filterModel.filter;
    const tripPoints = this.#tripPointsModel.points;
    const filteredTripPoints = filter[filterType](tripPoints);

    switch (this.#currentSortValue) {
      case SortValue.TIME_UP:
        return filteredTripPoints.sort(timeUp);
      case SortValue.PRICE_UP:
        return filteredTripPoints.sort(priceUp);
    }

    return filteredTripPoints.sort(dateDown);
  }

  get offers() {
    return this.#tripPointsModel.offers;
  }

  get destinations() {
    return this.#tripPointsModel.destinations;
  }

  init = () => {
    render(this.#tripEventContainer, this.#eventsSectionComponent, RenderPosition.BEFOREEND);
    render(this.#eventsSectionComponent, this.#tripListComponent, RenderPosition.BEFOREEND);

    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderEvent();
  };

  destroy = () => {
    this.#clearEvent({ resetRenderedTaskCount: true });

    remove(this.#tripListComponent);
    remove(this.#eventsSectionComponent);

    this.#tripPointsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  };

  createTripPoint = (callback) => {
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newTripPointPresenter.init(callback, this.#tripPointsModel);
  };

  #clearEvent = ({ resetSortValue = false } = {}) => {
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();

    remove(this.#sortTripComponent);
    remove(this.#emptyListComponent);
    remove(this.#tripInfoComponent);
    remove(this.#loadingComponent);

    if (resetSortValue) {
      this.#currentSortValue = SortValue.DEFAULT;
    }
  };

  #renderEvent = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const tripPoints = this.tripPoints;
    const offers = this.offers;
    const destinations = this.destinations;

    if (tripPoints.length === 0 || !tripPoints) {
      this.#renderNoPoints(this.#filterModel.filter);
      return;
    }

    this.#renderSort();
    this.#renderTripPoints(tripPoints, offers, destinations);
    this.#renderTripInfo();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TRIP_POINT:
        this.#tripPointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_TRIP_POINT:
        this.#tripPointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_TRIP_POINT:
        this.#tripPointsModel.deleteTripPoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPointPresenter.get(data.id).init(data, this.#tripPointsModel);
        break;
      case UpdateType.MINOR:
        this.#clearEvent();
        this.#renderEvent();
        break;
      case UpdateType.MAJOR:
        this.#clearEvent();
        this.#renderEvent();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderEvent();
        break;
    }
  };

  #renderLoading = () => {
    render(this.#tripEventContainer, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  };

  #renderNoPoints = (filterType) => {
    this.#emptyListComponent = new EmptyListView(filterType);
    render(
      this.#tripEventContainer,
      this.#emptyListComponent,
      RenderPosition.BEFOREEND
    );
  };

  #renderTripPoint = (tripPoint) => {
    const tripPointPresenter = new TripPointPresenter(this.#tripListComponent, this.#handleViewAction, this.#handelModeChange);
    tripPointPresenter.init(tripPoint, this.#tripPointsModel);
    this.#tripPointPresenter.set(tripPoint.id, tripPointPresenter);
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
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
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
