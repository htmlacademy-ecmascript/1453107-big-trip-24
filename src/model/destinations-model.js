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
      throw new Error('destinations!');
    }
  }

  getDestinationInfoById(destinationId) {
    const destinationInfo = this.#destinations
      .find((destinationItem) => destinationItem.id === destinationId);

    return destinationInfo;
  }

  getDestinationInfoByName(destinationName) {
    const destinationInfo = this.#destinations
      .find((destinationItem) => destinationItem.name === destinationName);

    return destinationInfo;
  }

  getDestinationNames() {
    const destinationNames = this.#destinations.map((destination) => destination.name);
    return destinationNames;
  }
}
