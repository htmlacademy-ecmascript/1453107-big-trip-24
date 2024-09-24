import { UserAction, UpdateType } from '../const.js';
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
      onDeleteClick: this.#handleDeleteClick,
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

  #handleFormCloseClick = () => {
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#tripPoint, is_favorite: !this.#tripPoint.is_favorite}
    );
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      this.#tripPoint.date_from !== update.date_from ||
      this.#tripPoint.date_to !== update.date_to ||
      this.#tripPoint.base_price !== update.base_price;

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceFormToCard();
  };

  #handleDeleteClick = (tripPoint) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      tripPoint
    );
  };
}
