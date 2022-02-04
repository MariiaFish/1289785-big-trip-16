import { TripPointView } from '../view/trip-point-view.js';
import { EditPointFormView } from '../view/edit-trip-point-form-view.js';
import { RenderPosition, render, replace, remove } from '../mock/utils/render.js';
import {UpdateType, UserAction} from '../mock/utils/consts.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class TripPointPresenter {
  #tripListComponent = null;
  #tripPointComponent = null;
  #tripEditComponent = null;
  #tripPoint = null;
  #offers = null;
  #destinations = null;
  #mode = Mode.DEFAULT;

  #changeData = null;
  #changeMode = null;

  constructor(tripListContainer, changeData, changeMode) {
    this.#tripListComponent = tripListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (tripPoints, tripPointsModel) => {
    this.#tripPoint = tripPoints;
    this.#offers = tripPointsModel.offers;
    this.#destinations = tripPointsModel.destinations;

    const prevTripPointComponent = this.#tripPointComponent;
    const prevTripEditComponent = this.#tripEditComponent;

    this.#tripPointComponent = new TripPointView(this.#tripPoint, this.#offers);
    this.#tripEditComponent = new EditPointFormView(this.#tripPoint, this.#offers, this.#destinations);

    this.#tripPointComponent.setEditClickHandler(this.#handlerEditClic);
    this.#tripPointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#tripEditComponent.setEditFormSubmitHandler(this.#handleFormSubmit);
    this.#tripEditComponent.setEditClickHandler(this.#handlerRollupClick);
    this.#tripEditComponent.setDeleteClickHandler(this.#handlerDeleteClic);

    if (prevTripPointComponent === null || prevTripEditComponent === null) {
      render(this.#tripListComponent, this.#tripPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripPointComponent, prevTripPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripEditComponent, prevTripEditComponent);
    }

    remove(prevTripPointComponent);
    remove(prevTripEditComponent);
  };

  destroy = () => {
    remove(this.#tripPointComponent);
    remove(this.#tripEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
  };

  #replacePointToEditForm = () => {
    replace(this.#tripEditComponent, this.#tripPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceEditFormToPoint = () => {
    replace(this.#tripPointComponent, this.#tripEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#tripEditComponent.reset(this.#tripPoint);
      this.#replaceEditFormToPoint();
    }
  };

  #handlerEditClic = () => {
    this.#replacePointToEditForm();
  };

  #handlerDeleteClic = (tripPoint) => {
    this.#changeData(UserAction.DELETE_TRIP_POINT, UpdateType.MINOR, tripPoint);
    this.#replaceEditFormToPoint();
  };

  #handleFormSubmit = (tripPoint, updateType) => {
    this.#changeData(UserAction.UPDATE_TRIP_POINT, updateType, tripPoint);
    this.#replaceEditFormToPoint();
  };

  #handlerRollupClick = () => {
    this.#tripEditComponent.reset(this.#tripPoint);
    this.#replaceEditFormToPoint();
  };

  #handleFavoriteClick = () => {
    // console.log(this.#tripPoint);
    // console.log({...this.#tripPoint, isFavorite: !this.#tripPoint.isFavorite});
    this.#changeData(UserAction.UPDATE_TRIP_POINT, UpdateType.PATCH, {...this.#tripPoint, isFavorite: !this.#tripPoint.isFavorite});
  };
}

export {TripPointPresenter};
