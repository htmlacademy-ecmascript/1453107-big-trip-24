import { humanizeDate, getDuration } from '../utils/point.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSelectedOffersTemplate(offers) {
  return (`
    <ul class="event__selected-offers">
    ${offers.map(({ title, price }) => (`
        <li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </li>
      `)).join('')}
    </ul>
  `);
}

function createTripEventsItemTemplate(tripPoint, destination, offers) {

  const { type, date_from: dateFrom, date_to: dateTo, base_price: price, is_favorite: isFavorite } = tripPoint;

  const date = humanizeDate(dateFrom, 'date');
  const timeStart = humanizeDate(dateFrom, 'time');
  const timeEnd = humanizeDate(dateTo, 'time');
  const datetime = humanizeDate(dateFrom, 'datetime');
  const duration = getDuration(dateFrom, dateTo);

  const isFavoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';


  return(`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${datetime}>${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${dateFrom}>${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime=${dateTo}>${timeEnd}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>

        ${createSelectedOffersTemplate(offers)}

        <button class="event__favorite-btn ${isFavoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `);
}

export default class TripEventsItemView extends AbstractView {

  #tripPoint = null;
  #destination = null;
  #offers = null;
  #handleEditClick = null;

  constructor({ tripPoint, destination, offers, onEditClick }) {
    super();
    this.#tripPoint = tripPoint;
    this.#destination = destination;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createTripEventsItemTemplate(this.#tripPoint, this.#destination, this.#offers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
