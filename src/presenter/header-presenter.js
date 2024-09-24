import { render, RenderPosition } from '../framework/render.js';
import HeaderView from '../view/header-view.js';


export default class HeaderPresenter {

  #headerComponent = null;
  #headerContainer = null;

  constructor({ headerContainer }) {
    this.#headerContainer = headerContainer;
  }

  init() {
    this.#renderHeader();
  }

  #renderHeader() {

    this.#headerComponent = new HeaderView({

    });

    render(this.#headerComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }
}
