export default class DestinationsModel {

  #data = null;

  constructor(data) {
    this.#data = data;
  }

  getDestinationInfo(destination) {
    return this.#data
      .filter((destinationItem) => destinationItem.id === destination)[0];
  }

  get destinations() {
    return this.#data;
  }
}
