import dayjs from 'dayjs';
import { AbstractObservable } from '../mock/utils/abstract-observable';
import { dateDown } from '../mock/utils/utils.js';
import {UpdateType} from '../mock/utils/consts.js';
import { calcTimeDuration} from '../mock/utils/event-time.js';


class TripPointsModel extends AbstractObservable {
  #apiService = null;
  #points = [];
  #offers = [];
  #destinations = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  init = async () => {
    try {
      const points = await this.#apiService.points;
      const offers = await this.#apiService.offers;
      const destinations = await this.#apiService.destinations;
      this.#destinations = destinations;
      this.#offers = offers;
      this.#points = points.map(this.#adaptToClient);
      // console.log(this.#points);
      // console.log(this.#destinations);
      // console.log(this.#offers);
    } catch (err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  };

  set points(points) {
    this.#points = [...points];
  }

  get points() {
    return this.#points;
  }

  set offers(offers) {
    this.#offers = [...offers];
  }

  get offers() {
    return this.#offers;
  }

  set destinations(destinations) {
    this.#destinations = [...destinations];
  }

  get destinations() {
    return this.#destinations;
  }

  updatePoint = async (updateType, update) => {
    // console.log(update);
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#apiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ].sort(dateDown);

      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  };

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#apiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error(err);
    }
  };

  deleteTripPoint = async (updateType, update) => {
    const index = this.#points.findIndex((points) => points.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    try {
      // Обратите внимание, метод удаления задачи на сервере
      // ничего не возвращает. Это и верно,
      // ведь что можно вернуть при удалении задачи?
      await this.#apiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  };

  #adaptToClient = (point) => {
    const adaptedPoint = {
      ...point,
      destination: point['destination'],
      endDate: dayjs(point['date_to']),
      startDate: dayjs(point['date_from']),
      eventDuration: calcTimeDuration(dayjs(point['date_to']),dayjs(point['date_from'])),
      eventType: point['type'],
      isFavorite: point['is_favorite'],
      offers: point['offers'],
      price: point['base_price'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];

    return adaptedPoint;
  };
}

export {TripPointsModel};
