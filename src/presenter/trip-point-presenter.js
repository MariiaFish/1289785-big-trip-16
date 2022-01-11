import { TripPointView } from '../view/trip-point-view.js';
import { EditPointFormView } from '../view/edit-trip-point-form-view.js';
import { RenderPosition, render, replace, remove } from '../mock/utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class TripPointPresenter {
  #tripListComponent = null;
  #tripPointComponent = null;
  #tripEditComponent = null;
  #tripPoint = null;
  #mode = Mode.DEFAULT;

  #changeData = null;
  #changeMode = null;

  constructor(tripListContainer, changeDate, changeMode) {
    this.#tripListComponent = tripListContainer;
    this.#changeData = changeDate;
    this.#changeMode = changeMode;
  }

  init = (tripPoint) => {
    this.#tripPoint = tripPoint;

    const prevTripPointComponent = this.#tripPointComponent;
    const prevTripEditComponent = this.#tripEditComponent;

    this.#tripPointComponent = new TripPointView(this.#tripPoint);
    this.#tripEditComponent = new EditPointFormView(this.#tripPoint);

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
    remove(this.#tripEditComponent);
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
      this.#replaceEditFormToPoint();
    }
  };

  #handlerEditClic = () => {
    this.#replacePointToEditForm();
  };

  #handlerDeleteClic = () => {
    this.#replaceEditFormToPoint();
    remove(this.#tripPointComponent);
  };

  #handleFormSubmit = () => {
    this.#replaceEditFormToPoint();
  };

  #handlerRollupClick = () => {
    this.#replaceEditFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#tripPoint, isFavorite: !this.#tripPoint.isFavorite,});
  };
}

export {TripPointPresenter};
