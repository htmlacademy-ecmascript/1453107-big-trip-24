import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class TripPointsApiService extends ApiService {

  get tripPoints() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  async updateTripPoint(tripPoint) {
    const response = await this._load({
      url: `points/${tripPoint.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(tripPoint)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(tripPoint) {

    const adaptedTripPoint = { ...tripPoint,
      'base_price': tripPoint.basePrice,
      'date_from': tripPoint.dateFrom instanceof Date ? tripPoint.dateFrom.toISOString() : tripPoint.dateFrom,
      'date_to': tripPoint.dateTo instanceof Date ? tripPoint.dateTo.toISOString() : tripPoint.dateTo,
      'is_favorite': tripPoint.isFavorite,
    };

    delete adaptedTripPoint.basePrice;
    delete adaptedTripPoint.dateFrom;
    delete adaptedTripPoint.dateTo;
    delete adaptedTripPoint.isFavorite;

    return adaptedTripPoint;
  }

}
