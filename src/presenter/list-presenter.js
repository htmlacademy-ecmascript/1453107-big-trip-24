import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortTripPointsByDay, sortTripPointsByTime, sortTripPointsByPrice } from '../utils/point.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { filter } from '../utils/filter.js';

import TripPointPresenter from './trip-point-presenter.js';
import NewTripPointPresenter from './new-trip-point-presenter.js';

import ListView from '../view/list-view.js';
import ListSortView from '../view/list-sort-view.js';
import NoTripPointsView from '../view/no-trip-points-vew.js';
import LoadingView from '../view/loading-view.js';


export default class ListPresenter {

  #listContainer = null;

  #tripPointsPresenter = new Map();
  #newTripPointPresenter = null;

  #tripPointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #listComponent = new ListView();
  #noTripPointsComponent = null;
  #sortComponent = null;
  #loadingComponent = new LoadingView();

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;


  constructor({ listContainer, tripPointsModel, destinationsModel, offersModel, filterModel, onNewTripPointDestroy }) {
    this.#listContainer = listContainer;

    this.#tripPointsModel = tripPointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newTripPointPresenter = new NewTripPointPresenter({
      tripPointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewTripPointDestroy,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
    });

    this.#tripPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get tripPoints() {
    this.#filterType = this.#filterModel.filter;
    const tripPoints = this.#tripPointsModel.tripPoints;
    const filteredTripPoints = filter[this.#filterType](tripPoints);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredTripPoints.sort(sortTripPointsByDay);
      case SortType.TIME:
        return filteredTripPoints.sort(sortTripPointsByTime);
      case SortType.PRICE:
        return filteredTripPoints.sort(sortTripPointsByPrice);
    }

    return filteredTripPoints;
  }

  init() {
    this.#renderList();
  }

  createTripPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newTripPointPresenter.init();
  }

  #renderTripPoints(tripPoints) {
    tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint));
  }

  #renderNoTripPoints() {
    this.#noTripPointsComponent = new NoTripPointsView({
      filterType: this.#filterType,
    });

    render(this.#noTripPointsComponent, this.#listContainer);
  }

  #renderTripPointsList() {
    this.#renderTripPoints(this.tripPoints);
  }

  #renderList() {
    render(this.#listComponent, this.#listContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const tripPoints = this.tripPoints;
    const tripPointCount = tripPoints.length;

    if (tripPointCount === 0) {
      this.#renderNoTripPoints();
    }

    this.#renderSort();
    this.#renderTripPointsList();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearList({ resetRenderedTripPointsCount: true });
    this.#renderList();
  };

  #handleModeChange = () => {
    this.#newTripPointPresenter.destroy();
    this.#tripPointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripPointsModel.updateTripPoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#tripPointsModel.addTripPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#tripPointsModel.deleteTripPoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPointsPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearList({ resetRenderedTripPointsCount: true, resetSortType: true });
        this.#renderList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderList();
        break;
    }
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#listComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderSort() {
    this.#sortComponent = new ListSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTripPoint(tripPoint) {
    const tripPointPresenter = new TripPointPresenter({
      tripPointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
    });

    tripPointPresenter.init(tripPoint);

    this.#tripPointsPresenter.set(tripPoint.id, tripPointPresenter);
  }

  #clearList({ resetRenderedTripPointsCount = false, resetSortType = false } = {}) {
    const tripPointCount = this.tripPoints.length;

    this.#newTripPointPresenter.destroy();
    this.#tripPointsPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointsPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noTripPointsComponent) {
      remove(this.#noTripPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
