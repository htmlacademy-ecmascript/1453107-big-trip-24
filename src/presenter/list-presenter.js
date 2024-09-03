import { render } from '../render.js';

import ListView from '../view/list-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import ListSortView from '../view/list-sort-view.js';
import EditPointView from '../view/edit-point-view.js';


export default class ListPresenter {

  listComponent = new ListView();

  constructor({ listContainer, tripPointsModel }) {
    this.listContainer = listContainer;
    this.tripPointsModel = tripPointsModel;
  }

  init() {
    this.listTripPoints = [...this.tripPointsModel.getTripPoints()];

    render(new ListSortView(), this.listContainer);
    render(new EditPointView({ tripPoint: this.listTripPoints[0] }), this.listContainer);
    render(new EditPointView({}), this.listContainer);
    render(this.listComponent, this.listContainer);

    for (let i = 1; i < this.listTripPoints.length; i++) {
      render(
        new TripEventsItemView({ tripPoint: this.listTripPoints[i] }),
        this.listComponent.getElement()
      );
    }
  }
}
