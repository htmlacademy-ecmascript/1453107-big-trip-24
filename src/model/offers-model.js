export default class OffersModel {

  #offers = [];
  #offersApiService = null;

  constructor({ offersApiService }) {
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch (error) {
      // this.#offers = [];
      throw new Error('offers!');
    }
  }

  getOffersByType(type) {
    return this.#offers
      .filter((offersItem) => offersItem.type === type)[0]
      .offers;
  }

  getSelectedOffersByType(type, offers){
    return this.getOffersByType(type)
      .filter((offersItem) => offers.includes(offersItem.id));
  }

}
