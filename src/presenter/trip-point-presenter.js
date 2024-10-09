import { UserAction, UpdateType, Mode } from '../const.js';
import { render, replace, remove } from '../framework/render.js';

import TripPointView from '../view/trip-point-view.js';
import TripPointEditView from '../view/trip-point-edit-view.js';


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
      isNewPoint: false,
    });

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      render(this.#tripPointComponent, this.#tripPointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripPointComponent, prevTripPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripPointComponent, prevTripPointEditComponent);
      this.#mode = Mode.DEFAULT;
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

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#tripPointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#tripPointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#tripPointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#tripPointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#tripPointEditComponent.shake(resetFormState);
  }

  #replaceCardToForm() {
    replace(this.#tripPointEditComponent, this.#tripPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    this.#tripPointEditComponent.reset(this.#tripPoint);
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
      {...this.#tripPoint, isFavorite: !this.#tripPoint.isFavorite}
    );
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      this.#tripPoint.dateFrom !== update.dateFrom ||
      this.#tripPoint.dateTo !== update.dateTo ||
      this.#tripPoint.basePrice !== update.basePrice;

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
  };

  #handleDeleteClick = (tripPoint) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      tripPoint
    );
  };
}
