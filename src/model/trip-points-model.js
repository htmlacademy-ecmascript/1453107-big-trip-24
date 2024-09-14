export default class TripPointsModel {

  #data = null;

  constructor(data) {
    this.#data = data;
  }

  get tripPoints() {
    return this.#data;
  }
}
