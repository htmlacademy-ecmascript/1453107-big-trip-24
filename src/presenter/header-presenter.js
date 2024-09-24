import { render, RenderPosition } from '../framework/render.js';

import HeaderView from '../view/header-view.js';
import NewTripPointButtonView from '../view/new-trip-point-button-view.js';


export default class HeaderPresenter {

  #headerComponent = null;
  #headerContainer = null;
  #newTripPointButtonView = null;

  constructor({ headerContainer }) {
    this.#headerContainer = headerContainer;
  }

  init() {
    this.#renderHeader();
    this.#renderButton();
  }

  #renderHeader() {

    this.#headerComponent = new HeaderView({

    });

    render(this.#headerComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  #renderButton() {

    this.#newTripPointButtonView = new NewTripPointButtonView({

    });

    render(this.#newTripPointButtonView, this.#headerContainer);
  }
}
