import { render } from '../render.js';

import ListView from '../view/list-view.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import ListSortView from '../view/list-sort-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';


export default class ListPresenter {

  listComponent = new ListView();

  constructor({ listContainer }) {
    this.listContainer = listContainer;
  }

  init() {
    render(new ListSortView(), this.listContainer);
    render(new EditPointView(), this.listContainer);
    render(new AddNewPointView(), this.listContainer);
    render(this.listComponent, this.listContainer);

    for (let i = 0; i < 3; i++) {
      render(new TripEventsItemView(), this.listComponent.getElement());
    }
  }
}
