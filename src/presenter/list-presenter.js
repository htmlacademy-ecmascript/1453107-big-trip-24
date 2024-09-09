import { render } from '../render.js';

import ListView from '../view/list-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import ListSortView from '../view/list-sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import { BLANK_DESTINATION, BLANK_TRIP_POINT } from '../const.js';


export default class ListPresenter {

  listComponent = new ListView();

  constructor({ listContainer, tripPointsModel, destinationsModel, offersModel }) {
    this.listContainer = listContainer;
    this.tripPointsModel = tripPointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {

    render(new ListSortView(), this.listContainer);

    const tripPoints = [...this.tripPointsModel.get()];

    render(new EditPointView({
      tripPoint: tripPoints[0],
      destination: this.destinationsModel.getDestinationInfo(tripPoints[0].destination),
      selectedOffers: this.offersModel.getSelectedOffersByType(tripPoints[0].type, tripPoints[0].offers),
      allOffers: this.offersModel.getOffersByType(tripPoints[0].type),
    }),
    this.listContainer);
    render(new EditPointView({
      tripPoint: BLANK_TRIP_POINT,
      destination: BLANK_DESTINATION,
      selectedOffers: [],
      allOffers: this.offersModel.getOffersByType(BLANK_TRIP_POINT.type),
    }), this.listContainer);

    render(this.listComponent, this.listContainer);
    for (let i = 1; i < 4; i++) {
      render(
        new TripEventsItemView({
          tripPoint: tripPoints[i],
          destination: this.destinationsModel.getDestinationInfo(tripPoints[i].destination),
          offers: this.offersModel.getSelectedOffersByType(tripPoints[i].type, tripPoints[i].offers),
        }),
        this.listComponent.getElement(),
      );
    }
  }
}
