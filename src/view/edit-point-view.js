import { EVENT_TYPES } from '../const.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { humanizeDate } from '../utils/point.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';


function createOffersSectionTemplate(selectedOffers, allOffers) {

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

function createDestinationSectionTemplate({ description, pictures }) {
  return (`
    ${description || pictures.length > 0 ? (`
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
    `) : ''}
  `);
}

function createEventTypeList({ activeType }) {

  return (`
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>

        ${EVENT_TYPES.map((type) => (`
          <div class="event__type-item">
            <input
            id="event-type-${type}-1"
            class="event__type-input
            visually-hidden"
            type="radio"
            name="event-type"
            value="${type}"
            ${type === activeType ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
          </div>
          `)).join('')}

      </fieldset>
    </div>
  `);
}

function createEditPointTemplate(tripPoint, destinationNames) {

  const { type, date_from: dateFrom, date_to: dateTo, base_price: price, destination, offers, allOffers } = tripPoint;

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

            ${createEventTypeList({ activeType: type })}

          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input
              class="event__input
              event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${destination ? destination.name : ''}"
              list="destination-list-1"
            >
            <datalist id="destination-list-1">
              ${destinationNames.map((destinationName) => (`
                <option value="${destinationName}"></option>
              `)).join('')}
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

          ${createOffersSectionTemplate(offers, allOffers)}

          ${destination ? createDestinationSectionTemplate(destination) : ''}

        </section>
      </form>
    </li>
  `);
}

export default class EditPointView extends AbstractStatefulView {

  #handleFormSubmit = null;
  #handleCloseFormClick = null;

  #destinationsModel = null;
  #offersModel = null;

  #destination = null;
  #offers = null;
  #allOffers = null;
  #destinationNames = null;

  constructor({ tripPoint, destinationsModel, offersModel, onFormSubmit, onCloseFormClick }) {

    super();
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseFormClick = onCloseFormClick;

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#destination = this.#destinationsModel.getDestinationInfoById(tripPoint.destination);
    this.#offers = this.#offersModel.getSelectedOffersByType(tripPoint.type, tripPoint.offers);
    this.#allOffers = this.#offersModel.getOffersByType(tripPoint.type);
    this.#destinationNames = this.#destinationsModel.getDestinationNames();

    this._setState(EditPointView.parseTripPointToState(tripPoint, this.#destination, this.#offers, this.#allOffers));

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#destinationNames);
  }

  reset(tripPoint) {
    const destination = this.#destinationsModel.getDestinationInfoById(tripPoint.destination);
    const offers = this.#offersModel.getSelectedOffersByType(tripPoint.type, tripPoint.offers);
    const allOffers = this.#offersModel.getOffersByType(tripPoint.type);

    this.updateElement(
      EditPointView.parseTripPointToState(tripPoint, destination, offers, allOffers)
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.event.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeFormClickHandler);

    this.element.querySelector('.event.event--edit')
      .addEventListener('change', this.#typeToggleHandler);

    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#offersToggleHandler);

    this.element.querySelector('.event__input.event__input--destination')
      .addEventListener('input', this.#destinationInputHandler);

    this.element.querySelector('.event__input.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);
  }

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      base_price: Number(evt.target.value),
    });
  };

  #offersToggleHandler = (evt) => {
    if (evt.target.type !== 'checkbox') {
      return;
    }
    evt.preventDefault();

    let offers = this._state.offers;

    const selectedOffer = this._state.allOffers.find((offer) => offer.id === evt.target.id);
    const isActive = this._state.offers.some((offer) => offer.id === evt.target.id);

    if (isActive) {
      offers = offers.filter((offer) => offer.id !== selectedOffer.id);
    } else {
      offers.push(selectedOffer);
    }

    this.updateElement({
      offers,
    });
  };

  #typeToggleHandler = (evt) => {
    if (evt.target.type !== 'radio') {
      return;
    }
    evt.preventDefault();

    const allOffers = this.#offersModel.getOffersByType(evt.target.value);
    this.updateElement({
      type: evt.target.value,
      offers: [],
      allOffers
    });
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      destination: evt.target.value,
    });

    if (this.#destinationNames.includes(evt.target.value)) {
      const destination = this.#destinationsModel.getDestinationInfoByName(evt.target.value);
      this.updateElement({
        destination,
      });
    }
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToTripPoint(this._state));
  };

  #closeFormClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseFormClick();
  };

  static parseTripPointToState(tripPoint, destination, offers, allOffers) {
    return {
      ...tripPoint,
      destination,
      offers,
      allOffers,
    };
  }

  static parseStateToTripPoint(state) {
    const tripPoint = { ...state };

    tripPoint.offers = tripPoint.offers.map((offer) => offer.id);
    tripPoint.destination = tripPoint.destination.id;

    delete tripPoint.allOffers;

    return tripPoint;
  }
}
