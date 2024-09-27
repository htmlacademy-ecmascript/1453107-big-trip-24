export default class DestinationsModel {

  #destinations = [];
  #destinationsApiService = null;

  constructor({ destinationsApiService }) {
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
    } catch (error) {
      // this.#destinations = [];
      throw new Error('destinations!');
    }
  }

  getDestinationInfoById(destinationId) {
    return this.#destinations
      .filter((destinationItem) => destinationItem.id === destinationId)[0];
  }

  getDestinationInfoByName(destinationName) {
    return this.#destinations
      .filter((destinationItem) => destinationItem.name === destinationName)[0];
  }

  getDestinationNames() {
    return this.#destinations.map((destination) => destination.name);
  }
}
