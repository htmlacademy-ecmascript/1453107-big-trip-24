export default class TripPointsModel {

  #data;

  constructor(data) {
    this.#data = data;
  }

  get tripPoints() {
    return this.#data;
  }
}
