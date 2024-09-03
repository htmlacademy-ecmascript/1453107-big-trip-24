import { render } from '../render.js';

import ListView from '../view/list-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import ListSortView from '../view/list-sort-view.js';
import EditPointView from '../view/edit-point-view.js';


function formTripPointObj(point, destinationsArray, offersArray) {
  const { type, destination, offers } = point;

  const destinationBlock = destinationsArray.filter((destinationItem) => destinationItem.id === destination)[0];
  const offersBlock = offersArray
    .filter((offersItem) => offersItem.type === type)[0]
    .offers
    .filter((offersItem) => offers.includes(offersItem.id));

  const tripPoint = {...point};
  tripPoint.destination = destinationBlock;
  tripPoint.offers = offersBlock;

  return tripPoint;
}


export default class ListPresenter {

  listComponent = new ListView();

  constructor({ listContainer, MOCK_TRIP_POINTS, MOCK_DESTINATIONS, MOCK_OFFERS }) {
    this.listContainer = listContainer;
    this.tripPoints = MOCK_TRIP_POINTS;
    this.destinations = MOCK_DESTINATIONS;
    this.offers = MOCK_OFFERS;
  }

  init() {

    render(new ListSortView(), this.listContainer);

    this.tripPoints.forEach((point, i) => {
      const tripPoint = formTripPointObj(point, this.destinations, this.offers);

      if (i === 0) {
        render(new EditPointView({ tripPoint }), this.listContainer);
      }

      if (i === 1) {
        render(new EditPointView({ }), this.listContainer);
        render(this.listComponent, this.listContainer);
      }

      if (i > 1) {
        render(
          new TripEventsItemView({ tripPoint }),
          this.listComponent.getElement(),
        );
      }
    });
  }
}
