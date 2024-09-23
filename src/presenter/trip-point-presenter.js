import { render, replace, remove } from '../framework/render.js';
import TripPointView from '../view/trip-point-view.js';
import TripPointEditView from '../view/trip-point-edit-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPointPresenter {

  #tripPointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #tripPointComponent = null;
  #tripPointEditComponent = null;

  #tripPoint = null;
  #mode = Mode.DEFAULT;

  #destinationsModel = null;
  #offersModel = null;

  constructor({ tripPointListContainer, onDataChange, onModeChange, destinationsModel, offersModel }) {
    this.#tripPointListContainer = tripPointListContainer;

    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(tripPoint) {
    this.#tripPoint = tripPoint;

    const prevTripPointComponent = this.#tripPointComponent;
    const prevTripPointEditComponent = this.#tripPointEditComponent;

    this.#tripPointComponent = new TripPointView({
      tripPoint,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#tripPointEditComponent = new TripPointEditView({
      tripPoint,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onFormSubmit: this.#handleFormSubmit,
      onCloseFormClick: this.#handleFormCloseClick,
    });

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      render(this.#tripPointComponent, this.#tripPointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripPointComponent, prevTripPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripPointEditComponent, prevTripPointEditComponent);
    }

    remove(prevTripPointComponent);
    remove(prevTripPointEditComponent);
  }

  destroy() {
    remove(this.#tripPointComponent);
    remove(this.#tripPointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#tripPointEditComponent.reset(this.#tripPoint);
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    replace(this.#tripPointEditComponent, this.#tripPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#tripPointComponent, this.#tripPointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = (tripPoint) => {
    this.#handleDataChange(tripPoint);
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#tripPoint, is_favorite: !this.#tripPoint.is_favorite});
  };

  #handleFormCloseClick = () => {
    this.#replaceFormToCard();
  };
}
