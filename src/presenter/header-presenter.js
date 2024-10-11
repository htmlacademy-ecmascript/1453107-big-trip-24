import { humanizeDate } from '../utils/point.js';
import { render, remove, replace, RenderPosition } from '../framework/render.js';

import HeaderView from '../view/header-view.js';


export default class HeaderPresenter {

  #headerComponent = null;
  #headerContainer = null;

  #tripPointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #tripPoints = [];

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
    this.#tripPoints = this.#tripPointsModel.tripPoints;

    if (this.#tripPoints.length === 0) {
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
    this.#tripPoints = [];
    this.init();
  };

  #getPrice() {
    const price = this.#tripPoints.reduce(
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

    this.#tripPoints.forEach((point) => {
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
    const firstDate = this.#tripPoints.at(0)?.dateFrom;
    const lastDate = this.#tripPoints.at(-1)?.dateTo;

    const dateFrom = humanizeDate(firstDate, 'headerDate');
    const dateTo = humanizeDate(lastDate, 'headerDate');

    if (!firstDate && !lastDate) {
      return '';
    }

    if (new Date(firstDate) === new Date(lastDate)) {
      return `${parseInt(dateFrom, 10)} &mdash; ${dateTo}`;
    }

    return `${dateFrom} &mdash; ${dateTo}`;
  }
}
