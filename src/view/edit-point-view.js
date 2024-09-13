import { EVENT_TYPES } from '../const.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { humanizeDate } from '../utils/point.js';
import AbstractView from '../framework/view/abstract-view.js';


function createOffersSectionTemplate(selectedOffers, allOffers) {
  if (allOffers.length > 0) {
    return (`
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">

          ${allOffers.map((offer) => (`
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="${offer.title}" ${selectedOffers.includes(offer) && 'checked'}>
              <label class="event__offer-label" for="${offer.id}">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>
          `)).join('')}

        </div>
      </section>
    `);
  }

  return '';
}

function createDestinationSectionTemplate({ description, pictures }) {
  return (`
    <section class="event__section  event__section--destination">

    ${description
      ? (`<h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>`)
      : ''
    }

    ${pictures.length > 0
      ? (`<div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((picture) => (`
            <img class="event__photo" src="${picture.src}" alt="${picture.description}">
          `))}
        </div>
      </div>`)
      : ''
    }

    </section>
  `);
}

function createEventTypeList() {

  return (`
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>

        ${EVENT_TYPES.map((type) => (`
          <div class="event__type-item">
            <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === 'flight' && 'checked'}>
            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
          </div>
          `)).join('')}

      </fieldset>
    </div>
  `);
}

function createEditPointTemplate(tripPoint, destination, selectedOffers, allOffers) {

  const { type, date_from: dateFrom, date_to: dateTo, base_price: price } = tripPoint;

  const timeStart = humanizeDate(dateFrom, 'eventTime');
  const timeEnd = humanizeDate(dateTo, 'eventTime');

  return(`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            ${createEventTypeList()}

          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeStart}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeEnd}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">

          ${createOffersSectionTemplate(selectedOffers, allOffers)}

          ${createDestinationSectionTemplate(destination)}

        </section>
      </form>
    </li>
  `);
}

export default class EditPointView extends AbstractView {

  #tripPoint = null;
  #destination = null;
  #selectedOffers = null;
  #allOffers = null;
  #handleFormSubmit = null;
  #handleCloseFormClick = null;

  constructor({ tripPoint, destination, selectedOffers, allOffers, onFormSubmit, onCloseFormClick }) {
    super();
    this.#tripPoint = tripPoint;
    this.#destination = destination;
    this.#selectedOffers = selectedOffers;
    this.#allOffers = allOffers;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseFormClick = onCloseFormClick;

    this.element.querySelector('.event.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeFormClickHandler);
  }

  get template() {
    return createEditPointTemplate(this.#tripPoint, this.#destination, this.#selectedOffers, this.#allOffers);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #closeFormClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseFormClick();
  };
}
