import Observable from '../framework/observable.js';

export default class TripPointsModel extends Observable {

  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get tripPoints() {
    return this.#data;
  }

  updateTripPoint(updateType, update) {
    const index = this.#data.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update');
    }

    this.#data = [
      ...this.#data.slice(0, index),
      update,
      ...this.#data.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addTripPoint(updateType, update) {
    this.#data = [
      update,
      ...this.#data,
    ];

    this._notify(updateType, update);
  }

  deleteTripPoint(updateType, update) {
    const index = this.#data.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete');
    }

    this.#data = [
      ...this.#data.slice(0, index),
      ...this.#data.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
