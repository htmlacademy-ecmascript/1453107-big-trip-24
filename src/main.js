import 'flatpickr/dist/flatpickr.min.css';

import { MOCK_TRIP_POINTS } from './mock/trip-points.js';
import { MOCK_DESTINATIONS } from './mock/destinations.js';
import { MOCK_OFFERS } from './mock/offers.js';

import HeaderPresenter from './presenter/header-presenter.js';
import ListPresenter from './presenter/list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import TripPointsModel from './model/trip-points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';

const headerElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const tripFiltersElement = document.querySelector('.trip-controls__filters');

const tripPointsModel = new TripPointsModel(MOCK_TRIP_POINTS);
const destinationsModel = new DestinationsModel(MOCK_DESTINATIONS);
const offersModel = new OffersModel(MOCK_OFFERS);

const filterModel = new FilterModel();


const listPresenter = new ListPresenter({
  listContainer: tripEventsElement,
  tripPointsModel,
  destinationsModel,
  offersModel,
  filterModel
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripFiltersElement,
  filterModel,
  tripPointsModel,
});

const headerPresenter = new HeaderPresenter({
  headerContainer: headerElement,
});

headerPresenter.init();
filterPresenter.init();
listPresenter.init();
