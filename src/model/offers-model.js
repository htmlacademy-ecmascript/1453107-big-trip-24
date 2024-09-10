export default class OffersModel {

  #data;

  constructor(data) {
    this.#data = data;
  }

  getOffersByType(type) {
    return this.#data
      .filter((offersItem) => offersItem.type === type)[0]
      .offers;
  }

  getSelectedOffersByType(type, offers){
    return this.getOffersByType(type)
      .filter((offersItem) => offers.includes(offersItem.id));
  }

  get offers() {
    return this.#data;
  }
}
