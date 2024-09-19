import { SortType } from '../const.js';
import { sortTripPointsByDay, sortTripPointsByTime, sortTripPointsByPrice } from '../utils/point.js';
import { updateItem } from '../utils/common.js';
import { render, RenderPosition } from '../framework/render.js';

import TripPointPresenter from './trip-point-presenter.js';

import ListView from '../view/list-view.js';
import ListSortView from '../view/list-sort-view.js';
import NoTripPointsView from '../view/no-trip-points-vew.js';


export default class ListPresenter {

  #listContainer = null;
  #tripPointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #listComponent = new ListView();
  #noTripEventsComponent = new NoTripPointsView();
  #sortComponent = null;

  #tripPoints = [];
  #sourcedTripPoints = [];
  #currentSortType = SortType.DAY;
  #tripPointsPresenter = new Map();


  constructor({ listContainer, tripPointsModel, destinationsModel, offersModel }) {
    this.#listContainer = listContainer;
    this.#tripPointsModel = tripPointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#tripPoints = [...this.#tripPointsModel.tripPoints];

    this.#sourcedTripPoints = [...this.#tripPointsModel.tripPoints];

    this.#renderList();
  }

  #renderTripPoints() {
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripPoint(this.#tripPoints[i]);
    }
  }

  #renderNoTripPoints() {
    render(this.#noTripEventsComponent, this.#listContainer);
  }

  #renderTripPointsList() {
    this.#renderTripPoints();
  }

  #renderList() {
    render(this.#listComponent, this.#listContainer);

    if (this.#tripPoints.length === 0) {
      this.#renderNoTripPoints();
      return;
    }

    this.#renderTripPointsList();
    this.#renderSort();
  }

  #sortTripPoints(sortType) {

    switch (sortType) {
      case SortType.DAY:
        this.#tripPoints.sort(sortTripPointsByDay);
        break;
      case SortType.TIME:
        this.#tripPoints.sort(sortTripPointsByTime);
        break;
      case SortType.PRICE:
        this.#tripPoints.sort(sortTripPointsByPrice);
        break;
      default:
        this.#tripPoints = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTripPoints(sortType);
    this.#clearTripPointList();
    this.#renderTripPoints();
  };

  #handleModeChange = () => {
    this.#tripPointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleTripPointChange = (updatedTripPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedTripPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedTripPoint);
    this.#tripPointsPresenter.get(updatedTripPoint.id).init(updatedTripPoint);
  };

  #renderSort() {
    this.#sortComponent = new ListSortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType,
    });

    render(this.#sortComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  }

  #clearTripPointList() {
    this.#tripPointsPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointsPresenter.clear();
  }

  #renderTripPoint(tripPoint) {
    const tripPointPresenter = new TripPointPresenter({
      tripPointListContainer: this.#listComponent.element,
      onDataChange: this.#handleTripPointChange,
      onModeChange: this.#handleModeChange,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
    });

    tripPointPresenter.init(tripPoint);

    this.#tripPointsPresenter.set(tripPoint.id, tripPointPresenter);
  }
}
