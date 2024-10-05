import AbstractView from '../framework/view/abstract-view.js';


function createHeaderTemplate(route, duration, price) {
  return (`
    <section class="trip-main__trip-info  trip-info">

      <div class="trip-info__main">
        <h1 class="trip-info__title">${route}</h1>
        <p class="trip-info__dates">${duration}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
      </p>

    </section>
  `);
}


export default class HeaderView extends AbstractView {

  #route = null;
  #duration = null;
  #price = null;

  constructor({ route, duration, price }) {
    super();
    this.#route = route;
    this.#duration = duration;
    this.#price = price;
  }

  get template() {
    return createHeaderTemplate(this.#route, this.#duration, this.#price);
  }
}
