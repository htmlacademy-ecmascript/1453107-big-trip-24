import AbstractView from '../framework/view/abstract-view.js';


function createNoTripEventsTemplate() {
  return (`
    <p class="trip-events__msg">Click New Event to create your first point</p>
  `);
}


export default class NoTripPointsView extends AbstractView {
  get template() {
    return createNoTripEventsTemplate();
  }
}
