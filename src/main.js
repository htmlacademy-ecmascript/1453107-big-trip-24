import { render } from './render.js';

import ListFilterView from './view/list-filter-view.js';
import ListPresenter from './presenter/list-presenter.js';

import { MOCK_TRIP_POINTS } from './mock/trip-points.js';
import { MOCK_DESTINATIONS } from './mock/destinations.js';
import { MOCK_OFFERS } from './mock/offers.js';


const tripEventsElement = document.querySelector('.trip-events');
const tripFiltersElement = document.querySelector('.trip-controls__filters');

const listPresenter = new ListPresenter({
  listContainer: tripEventsElement,
  MOCK_TRIP_POINTS,
  MOCK_DESTINATIONS,
  MOCK_OFFERS
});


render(new ListFilterView(), tripFiltersElement);


listPresenter.init();
