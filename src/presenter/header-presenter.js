import { filter } from '../utils/filter.js';
import { render, remove, replace, RenderPosition } from '../framework/render.js';
import { humanizeDate } from '../utils/point.js';

import HeaderView from '../view/header-view.js';


export default class HeaderPresenter {

  #headerComponent = null;
  #headerContainer = null;

  #tripPointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #filteredTripPoints = [];

  constructor({ headerContainer, tripPointsModel, offersModel, destinationsModel, filterModel }) {
    this.#headerContainer = headerContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#setFilteredTripPoints();

    if (this.#filteredTripPoints.length === 0) {
      return;
    }

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
      (accumulator, currentValue) => {
        const totalOffersPrice = this.#offersModel.getTotalOffersPrice(currentValue.type, currentValue.offers);

        accumulator = accumulator + currentValue.basePrice + totalOffersPrice;

        return accumulator;
      },
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

    if (numberOfCities <= 3) {
      const route = cities.reduce(((accumulator, currentValue) => `${accumulator}${currentValue} — `), '').slice(0, -3);
      return route;
    }

    return `${cities[0]} — ... — ${cities[numberOfCities - 1]}`;
  }

  #getDuration() {
    const firstDate = this.#filteredTripPoints.at(0).dateFrom;
    const lastDate = this.#filteredTripPoints.at(-1).dateTo;

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
