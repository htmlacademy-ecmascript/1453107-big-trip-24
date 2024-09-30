import 'flatpickr/dist/flatpickr.min.css';

import TripPointsApiService from './api/trip-points-api-service.js';
import DestinationsApiService from './api/destinations-api-service.js';
import OffersApiService from './api/offers-api-service.js';

import { render } from './framework/render.js';

import HeaderPresenter from './presenter/header-presenter.js';
import ListPresenter from './presenter/list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import TripPointsModel from './model/trip-points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';

import NewTripPointButtonView from './view/new-trip-point-button-view.js';
import FailedView from './view/failed-view.js';

const AUTHORIZATION = 'Basic ls2itl0iot0acn2hd';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';


const headerElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const tripFiltersElement = document.querySelector('.trip-controls__filters');


const tripPointsModel = new TripPointsModel({
  tripPointsApiService: new TripPointsApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();


const listPresenter = new ListPresenter({
  listContainer: tripEventsElement,
  tripPointsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewTripPointDestroy: handleNewTripPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripFiltersElement,
  filterModel,
  tripPointsModel,
});

const headerPresenter = new HeaderPresenter({
  headerContainer: headerElement,
  tripPointsModel,
  offersModel,
  destinationsModel,
  filterModel,
});

const newTripPointButtonComponent = new NewTripPointButtonView({
  onClick: handleNewTripPointButtonClick
});

function handleNewTripPointFormClose() {
  newTripPointButtonComponent.element.disabled = false;
}

function handleNewTripPointButtonClick() {
  listPresenter.createTripPoint();
  newTripPointButtonComponent.element.disabled = true;
}

render(newTripPointButtonComponent, headerElement);

(async () => {
  try {
    await destinationsModel.init();
    await offersModel.init();
    await tripPointsModel.init().finally(() => {
      newTripPointButtonComponent.element.disabled = false;
    });

  } catch (error) {
    newTripPointButtonComponent.element.disabled = true;
    render(new FailedView, tripEventsElement);
  }
})();


filterPresenter.init();
headerPresenter.init();
