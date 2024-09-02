import { render } from './render.js';

import ListFilterView from './view/list-filter-view.js';
import ListPresenter from './presenter/list-presenter.js';
import TripPointsModel from './model/trip-points-model.js';


const tripEventsElement = document.querySelector('.trip-events');
const tripFiltersElement = document.querySelector('.trip-controls__filters');

const tripPointsModel = new TripPointsModel();

const listPresenter = new ListPresenter({
  listContainer: tripEventsElement,
  tripPointsModel,
});


render(new ListFilterView(), tripFiltersElement);


listPresenter.init();
