import { NewPointFormView } from '../view/new-point-form-view.js';
import { RenderPosition, render, remove } from '../mock/utils/render.js';
import {UpdateType, UserAction} from '../mock/utils/consts.js';
import { nanoid } from 'nanoid';


class NewTripPointPresenter {
  #tripListContainer = null;
  #tripEditComponent = null;
  #changeData = null;
  #destroyCallback = null;

  constructor(tripListContainer, changeDate) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeDate;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#tripEditComponent !== null) {
      return;
    }

    this.#tripEditComponent = new NewPointFormView();

    this.#tripEditComponent.setEditFormSubmitHandler(this.#handleFormSubmit);
    this.#tripEditComponent.setCancelClickHandler(this.#handleCancelClick);

    render(this.#tripListContainer, this.#tripEditComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#tripEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#tripEditComponent);
    this.#tripEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (tripPoint) => {
    this.#changeData(UserAction.ADD_TRIP_POINT, UpdateType.MINOR, {id: nanoid(), ...tripPoint});
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}

export { NewTripPointPresenter };
