import { NewPointFormView } from '../view/new-point-form-view.js';
import { RenderPosition, render, remove } from '../mock/utils/render.js';
import { UserAction, BLANK_TASK} from '../mock/utils/consts.js';
// import { nanoid } from 'nanoid';


class NewTripPointPresenter {
  #tripListContainer = null;
  #tripEditComponent = null;
  #changeData = null;
  #destroyCallback = null;
  #offers = null;
  #destinations = null;

  constructor(tripListContainer, changeDate) {
    this.#tripListContainer = tripListContainer;
    this.#changeData = changeDate;
  }

  init = (callback, tripPointsModel) => {
    this.#destroyCallback = callback;
    this.#offers = tripPointsModel.offers;
    this.#destinations = tripPointsModel.destinations;

    if (this.#tripEditComponent !== null) {
      return;
    }

    this.#tripEditComponent = new NewPointFormView(BLANK_TASK, this.#offers, this.#destinations);

    this.#tripEditComponent.setEditFormSubmitHandler(this.#handleFormSubmit);
    this.#tripEditComponent.setCancelClickHandler(this.#handleCancelClick);

    render(
      this.#tripListContainer,
      this.#tripEditComponent,
      RenderPosition.AFTERBEGIN
    );
    document.addEventListener('keydown', this.#escKeyDownHandler);

    // console.log(this.#tripEditComponent);
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

  #handleFormSubmit = (tripPoint, updateType) => {
    this.#changeData(UserAction.ADD_TRIP_POINT, updateType, tripPoint);
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
