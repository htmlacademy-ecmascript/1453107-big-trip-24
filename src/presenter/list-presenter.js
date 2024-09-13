import { render, replace } from '../framework/render.js';

import ListView from '../view/list-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import ListSortView from '../view/list-sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import NoTripEventsView from '../view/no-trip-events-vew.js';


export default class ListPresenter {

  #listContainer = null;
  #tripPointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #listComponent = new ListView();

  #tripPoints = [];

  constructor({ listContainer, tripPointsModel, destinationsModel, offersModel }) {
    this.#listContainer = listContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#tripPoints = [...this.#tripPointsModel.tripPoints];
    this.#renderList();
  }

  #renderList() {
    render(new ListSortView(), this.#listContainer);

    if (this.#tripPoints.length === 0) {
      render(new NoTripEventsView, this.#listContainer);
      return;
    }

    render(this.#listComponent, this.#listContainer);
    for (let i = 0; i < 3; i++) {
      this.#renderTripEvent(this.#tripPoints[i]);
    }
  }

  #getAllTripEventData(tripPoint) {
    return ({
      destination: this.#destinationsModel.getDestinationInfo(tripPoint.destination),
      offers: this.#offersModel.getSelectedOffersByType(tripPoint.type, tripPoint.offers),
      allOffers: this.#offersModel.getOffersByType(tripPoint.type),
    });
  }

  #renderTripEvent(tripPoint) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const { destination, offers, allOffers } = this.#getAllTripEventData(tripPoint);

    const tripPointComponent = new TripEventsItemView({
      tripPoint,
      destination,
      offers,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const tripPointEditComponent = new EditPointView({
      tripPoint,
      destination,
      selectedOffers: offers,
      allOffers,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseFormClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(tripPointEditComponent, tripPointComponent);
    }

    function replaceFormToCard() {
      replace(tripPointComponent, tripPointEditComponent);
    }

    render(tripPointComponent, this.#listComponent.element);
  }
}
