import { filter } from '../utils/filter.js';
import { render, remove, replace, RenderPosition } from '../framework/render.js';
import { humanizeDate } from '../utils/point.js';

import HeaderView from '../view/header-view.js';


export default class HeaderPresenter {

  #headerComponent = null;
  #headerContainer = null;

  #tripPointsModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #filteredTripPoints = [];

  constructor({ headerContainer, tripPointsModel, destinationsModel, filterModel, }) {
    this.#headerContainer = headerContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#setFilteredTripPoints();

    const prevHeaderComponent = this.#headerComponent;

    this.#headerComponent = new HeaderView({
      route: this.#getRoute(),
      duration: this.#getDuration(),
      price: this.#getPrice(),
    });

    if (prevHeaderComponent === null) {
      render(this.#headerComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#headerComponent, prevHeaderComponent);
    remove(prevHeaderComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #setFilteredTripPoints() {
    const filterType = this.#filterModel.filter;
    const tripPoints = this.#tripPointsModel.tripPoints;
    this.#filteredTripPoints = filter[filterType](tripPoints);
  }

  #getPrice() {
    const price = this.#filteredTripPoints.reduce(
      (accumulator, currentValue) => accumulator + currentValue.base_price,
      0,
    );
    return price;
  }

  #getRoute() {
    const cities = [];

    this.#filteredTripPoints.forEach((point) => {
      const name = this.#destinationsModel.getDestinationInfoById(point.destination).name;
      if (!cities.includes(name)) {
        cities.push(name);
      }
    });

    const numberOfCities = cities.length;

    if (numberOfCities === 1) {
      return cities[0];
    }

    if (numberOfCities >= 3) {
      return `${cities[0]} — ... — ${cities[numberOfCities - 1]}`;
    }

    return `${cities[0]} — ${cities[1]}`;
  }

  #getDuration() {
    const firstDate = this.#filteredTripPoints.at(0).date_from;
    const lastDate = this.#filteredTripPoints.at(-1).date_to;

    const from = humanizeDate(firstDate, 'headerDate');
    const to = humanizeDate(lastDate, 'headerDate');

    if (this.#filteredTripPoints.length === 1) {
      return from;
    }

    if (new Date(firstDate).getUTCMonth() === new Date(lastDate).getUTCMonth()) {
      return `${parseInt(from, 10)} &mdash; ${to}`;
    }

    return `${from} &mdash; ${to}`;
  }
}
