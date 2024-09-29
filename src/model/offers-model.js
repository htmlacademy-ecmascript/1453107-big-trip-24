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
      throw new Error('offers!');
    }
  }

  getOffersByType(type) {
    const offers = this.#offers
      .find((offersItem) => offersItem.type === type)
      .offers;

    return offers;
  }

  getSelectedOffersByType(type, offers){
    const selectedOffers = this.getOffersByType(type)
      .filter((offersItem) => offers.includes(offersItem.id));

    return selectedOffers;
  }

}
