import { AbstractObservable } from '../mock/utils/abstract-observable';
import { dateDown } from '../mock/utils/utils.js';


class TripPointsModel extends AbstractObservable {
  #tripPoints = [];

  set tripPoints(tripPoints) {
    this.#tripPoints = [...tripPoints];
  }

  get tripPoints() {
    return this.#tripPoints;
  }

  updatePoint = (updateType, update) => {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#tripPoints = [...this.#tripPoints.slice(0, index), update, ...this.#tripPoints.slice(index + 1)].sort(dateDown);

    this._notify(updateType, update);
  };

  addTripPoint = (updateType, update) => {
    this.#tripPoints = [update, ...this.#tripPoints];

    this._notify(updateType, update);
  }

  deleteTripPoint = (updateType, update) => {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#tripPoints = [...this.#tripPoints.slice(0, index), ...this.#tripPoints.slice(index + 1)];

    this._notify(updateType);
  }


}

export {TripPointsModel};
