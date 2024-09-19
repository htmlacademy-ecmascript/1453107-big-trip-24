export default class DestinationsModel {

  #data = null;

  constructor(data) {
    this.#data = data;
  }

  getDestinationInfoById(destinationId) {
    return this.#data
      .filter((destinationItem) => destinationItem.id === destinationId)[0];
  }

  getDestinationInfoByName(destinationName) {
    return this.#data
      .filter((destinationItem) => destinationItem.name === destinationName)[0];
  }

  getDestinationNames() {
    return this.#data.map((destination) => destination.name);
  }

  get destinations() {
    return this.#data;
  }
}
