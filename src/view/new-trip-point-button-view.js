import AbstractView from '../framework/view/abstract-view.js';

function createNewTripPointButtonTemplate() {
  return (`
    <button
      class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
      type="button"
      disabled
    >
    New event
    </button>
  `);
}


export default class NewTripPointButtonView extends AbstractView{

  constructor() {
    super();
  }

  get template() {
    return createNewTripPointButtonTemplate();
  }
}
