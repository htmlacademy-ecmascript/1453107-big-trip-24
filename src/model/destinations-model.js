export default class DestinationsModel {
  constructor(data) {
    this.data = data;
  }

  getDestinationInfo(destination) {
    return this.data
      .filter((destinationItem) => destinationItem.id === destination)[0];
  }

  get() {
    return this.data;
  }
}
