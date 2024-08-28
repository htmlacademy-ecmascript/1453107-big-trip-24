import { render } from './render.js';

import ListFilterView from './view/list-filter-view.js';
import ListPresenter from './presenter/list-presenter.js';


const tripEventsElement = document.querySelector('.trip-events');
const tripFiltersElement = document.querySelector('.trip-controls__filters');


const listPresenter = new ListPresenter({
  listContainer: tripEventsElement
});


render(new ListFilterView(), tripFiltersElement);


listPresenter.init();
