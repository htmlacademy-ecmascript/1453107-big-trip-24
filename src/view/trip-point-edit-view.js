import flatpickr from 'flatpickr';
import he from 'he';

import { EVENT_TYPES } from '../const.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { humanizeDate } from '../utils/point.js';

import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';


function createOffersSectionTemplate(selectedOffers, allOffers, isDisabled) {

  return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">

        ${allOffers.map((offer) => (`
          <div class="event__offer-selector">
            <input
              class="event__offer-checkbox visually-hidden"
              id="${offer.id}"
              type="checkbox"
              name="${offer.title}"
              ${selectedOffers.includes(offer) ? 'checked' : ''}
              ${isDisabled ? 'disabled' : ''}
            >
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
            `)).join('')}
          </div>
        </div>`)
        : ''
      }

      </section>
    `) : ''}
  `);
}

function createEventTypeList({ activeType, isDisabled }) {

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
              ${type === activeType ? 'checked' : ''}
              ${isDisabled ? 'disabled' : ''}
            >
            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
          </div>
          `)).join('')}

      </fieldset>
    </div>
  `);
}

function addButtons(isNewPoint, isDisabled, isSaving, isDeleting) {
  return (`
    <button
      class="event__save-btn  btn  btn--blue"
      type="submit"
      ${isDisabled ? 'disabled' : ''}
    >
      ${isSaving ? 'Saving...' : 'Save'}
    </button>

    ${isNewPoint
      ? `<button
          class="event__reset-btn"
          type="reset"
      >
      Cancel
      </button>`
      : `<button
          class="event__reset-btn"
          type="reset"
        >
          ${isDeleting ? 'Deleting...' : 'Delete'}
        </button>
        <button
          class="event__rollup-btn"
          type="button"
        >
          <span class="visually-hidden">Open event</span>
        </button>`
    }
  `);
}

function createTripPointEditTemplate(tripPoint, destinationNames, isNewPoint) {

  const {
    type,
    dateFrom,
    dateTo,
    basePrice,
    destination,
    offers,
    allOffers,
    isDisabled,
    isSaving,
    isDeleting,
  } = tripPoint;

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
            <input
              class="event__type-toggle
              visually-hidden"
              id="event-type-toggle-1"
              type="checkbox"
              ${isDisabled ? 'disabled' : ''}
            >

            ${createEventTypeList({ activeType: type, isDisabled })}

          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input
              class="event__input event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${destination ? he.encode(destination.name) : ''}"
              list="destination-list-1"
              required
            >
            <datalist id="destination-list-1">
              ${destinationNames.map((destinationName) => (`
                <option value="${destinationName}"></option>
              `)).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              data-date="dateFrom"
              value="${timeStart}"
              ${isDisabled ? 'disabled' : ''}
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              data-date="dateTo"
              value="${timeEnd}"
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input  event__input--price"
              id="event-price-1"
              type="number"
              name="event-price"
              value="${basePrice}"
              ${isDisabled ? 'disabled' : ''}
              min="1"
              max="100000"
              required
            >
          </div>

          ${addButtons(isNewPoint, isDisabled, isSaving, isDeleting)}

        </header>
        <section class="event__details">

          ${allOffers.length > 0 ? createOffersSectionTemplate(offers, allOffers, isDisabled) : ''}

          ${destination ? createDestinationSectionTemplate(destination) : ''}

        </section>
      </form>
    </li>
  `);
}

export default class TripPointEditView extends AbstractStatefulView {

  #tripPoint = null;

  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleCloseFormClick = null;

  #destinationsModel = null;
  #offersModel = null;

  #destination = null;
  #offers = null;
  #allOffers = null;
  #destinationNames = null;

  #datepickerDateFrom = null;
  #datepickerDateTo = null;

  #isNewPoint = false;

  constructor({ tripPoint, destinationsModel, offersModel, onFormSubmit, onCloseFormClick, onDeleteClick, isNewPoint }) {

    super();
    this.#tripPoint = tripPoint;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleCloseFormClick = onCloseFormClick;

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#destination = this.#destinationsModel.getDestinationInfoById(tripPoint.destination);
    this.#offers = this.#offersModel.getSelectedOffersByType(tripPoint.type, tripPoint.offers);
    this.#allOffers = this.#offersModel.getOffersByType(tripPoint.type);
    this.#destinationNames = this.#destinationsModel.getDestinationNames();

    this.#isNewPoint = isNewPoint;

    this._setState(TripPointEditView.parseTripPointToState(this.#tripPoint, this.#destination, this.#offers, this.#allOffers));

    this._restoreHandlers();
  }

  get template() {
    return createTripPointEditTemplate(this._state, this.#destinationNames, this.#isNewPoint);
  }

  _restoreHandlers() {
    this.element.querySelector('.event.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event.event--edit')
      .addEventListener('change', this.#typeToggleHandler);

    this.element.querySelector('.event__available-offers')
      ?.addEventListener('change', this.#offersToggleHandler);

    this.element.querySelector('.event__input.event__input--destination')
      .addEventListener('input', this.#destinationInputHandler);

    this.element.querySelector('.event__input.event__input--price')
      .addEventListener('blur', this.#priceChangeHandler);

    const resetButton = this.element.querySelector('.event__reset-btn');

    if (this.#isNewPoint) {
      resetButton.addEventListener('click', this.#closeFormClickHandler);

    } else {
      resetButton.addEventListener('click', this.#formDeleteClickHandler);

      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#closeFormClickHandler);
    }

    this.#setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerDateFrom) {
      this.#datepickerDateFrom.destroy();
      this.#datepickerDateFrom = null;
    }

    if (this.#datepickerDateTo) {
      this.#datepickerDateTo.destroy();
      this.#datepickerDateTo = null;
    }
  }

  reset(tripPoint) {
    const destination = this.#destinationsModel.getDestinationInfoById(tripPoint.destination);
    const offers = this.#offersModel.getSelectedOffersByType(tripPoint.type, tripPoint.offers);
    const allOffers = this.#offersModel.getOffersByType(tripPoint.type);

    this.updateElement(
      TripPointEditView.parseTripPointToState(tripPoint, destination, offers, allOffers)
    );
  }

  #setDatepicker() {
    this.#datepickerDateFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: humanizeDate(this._state.dateFrom, 'eventTime'),
        maxDate: humanizeDate(this._state.dateTo, 'eventTime'),
        onClose: this.#dateChangeHandler,
      }
    );

    this.#datepickerDateTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: humanizeDate(this._state.dateTo, 'eventTime'),
        minDate: humanizeDate(this._state.dateFrom, 'eventTime'),
        onClose: this.#dateChangeHandler,
      }
    );
  }

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    const price = Number(evt.target.value);

    if (!price) {
      return;
    }

    this.updateElement({
      basePrice: price,
    });
  };

  #offersToggleHandler = (evt) => {
    if (evt.target.type !== 'checkbox') {
      return;
    }
    evt.preventDefault();

    let offers = this._state.offers;

    const offerId = evt.target.id;

    const selectedOffer = this._state.allOffers.find((offer) => offer.id === offerId);
    const isActive = this._state.offers.some((offer) => offer.id === offerId);

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

    const typeValue = evt.target.value;

    const allOffers = this.#offersModel.getOffersByType(typeValue);
    this.updateElement({
      type: typeValue,
      offers: [],
      allOffers
    });
  };

  #dateChangeHandler = ([userDate], date, config) => {
    if (!date) {
      return;
    }

    this.updateElement({
      [config.element.dataset.date]: new Date(userDate)
    });
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();

    const destinationValue = evt.target.value;

    if (!this.#destinationsModel.getDestinationNames().includes(destinationValue)) {
      return;
    }

    this._setState({
      destination: destinationValue,
    });

    if (this.#destinationNames.includes(destinationValue)) {
      const destination = this.#destinationsModel.getDestinationInfoByName(destinationValue);
      this.updateElement({
        destination,
      });
    }
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    if (!this._state.dateFrom || !this._state.dateTo) {
      this.shake();
      return;
    }

    this.#handleFormSubmit(TripPointEditView.parseStateToTripPoint(this._state));
  };

  #closeFormClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseFormClick();
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(TripPointEditView.parseStateToTripPoint(this._state));
  };

  static parseTripPointToState(tripPoint, destination, offers, allOffers) {
    return {
      ...tripPoint,
      destination,
      offers,
      allOffers,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToTripPoint(state) {
    const tripPoint = { ...state };

    tripPoint.offers = tripPoint.offers.map((offer) => offer.id);
    tripPoint.destination = tripPoint.destination.id;

    delete tripPoint.allOffers;

    delete tripPoint.isDisabled;
    delete tripPoint.isSaving;
    delete tripPoint.isDeleting;

    return tripPoint;
  }
}
