import 'flatpickr/dist/flatpickr.min.css';

import { render } from './framework/render.js';

import { MOCK_TRIP_POINTS } from './mock/trip-points.js';
import { MOCK_DESTINATIONS } from './mock/destinations.js';
import { MOCK_OFFERS } from './mock/offers.js';

import { generateFilter } from './mock/filter.js';

import ListFilterView from './view/list-filter-view.js';
import ListPresenter from './presenter/list-presenter.js';
import TripPointsModel from './model/trip-points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';


const tripEventsElement = document.querySelector('.trip-events');
const tripFiltersElement = document.querySelector('.trip-controls__filters');

const tripPointsModel = new TripPointsModel(MOCK_TRIP_POINTS);
const destinationsModel = new DestinationsModel(MOCK_DESTINATIONS);
const offersModel = new OffersModel(MOCK_OFFERS);

const listPresenter = new ListPresenter({
  listContainer: tripEventsElement,
  tripPointsModel,
  destinationsModel,
  offersModel
});

const filters = generateFilter();


render(new ListFilterView({filters}), tripFiltersElement);


listPresenter.init();
