import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class TripPointsModel extends Observable {

  #tripPoints = [];
  #tripPointsApiService = null;

  constructor({ tripPointsApiService }) {
    super();
    this.#tripPointsApiService = tripPointsApiService;
  }

  get tripPoints() {
    return this.#tripPoints;
  }

  async init() {
    try {
      const tripPoints = await this.#tripPointsApiService.tripPoints;
      this.#tripPoints = tripPoints.map(this.#adaptToClient);
    } catch (error) {
      throw new Error('offers!');
    }

    this._notify(UpdateType.INIT);
  }

  async updateTripPoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update');
    }

    try {
      const response = await this.#tripPointsApiService.updateTripPoint(update);
      const updatedTripPoint = this.#adaptToClient(response);

      this.#tripPoints = [
        ...this.#tripPoints.slice(0, index),
        updatedTripPoint,
        ...this.#tripPoints.slice(index + 1),
      ];

      this._notify(updateType, updatedTripPoint);
    } catch {
      throw new Error('Can\'t update');
    }

  }

  addTripPoint(updateType, update) {
    this.#tripPoints = [
      update,
      ...this.#tripPoints,
    ];

    this._notify(updateType, update);
  }

  deleteTripPoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete');
    }

    this.#tripPoints = [
      ...this.#tripPoints.slice(0, index),
      ...this.#tripPoints.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient (tripPoint) {
    const adaptedTripPoint = { ...tripPoint,
      basePrice: tripPoint['base_price'],
      dateFrom: tripPoint['date_from'],
      dateTo: tripPoint['date_to'],
      isFavorite: tripPoint['is_favorite'],
    };

    delete adaptedTripPoint['base_price'];
    delete adaptedTripPoint['date_from'];
    delete adaptedTripPoint['date_to'];
    delete adaptedTripPoint['is_favorite'];

    return adaptedTripPoint;
  }
}
