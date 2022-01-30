import { AbstractView } from './abstract-view.js';
import { MenuItem } from '../mock/utils/consts.js';

const createControlsNavigationTemplate = () =>
  `<div class="trip-controls__navigation">
          <h2 class="visually-hidden">Switch trip view</h2>
          <nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn" href="" id="${MenuItem.TABLE}">Table</a>
              <a class="trip-tabs__btn" href="" id="${MenuItem.STATISTICS}">Stats</a>
          </nav>
      </div>`;

class MenuNavigationView extends AbstractView {
  get template() {
    return createControlsNavigationTemplate();
  }

  setMenuNavigationClickHandler = (callback) => {
    this._callback.menuNavigationClick = callback;
    this.element.addEventListener('click', this.#menuNavigationClickHandler);
  };

  setMenuItem = (menuItem) => {
    const item = this.element.querySelector(`[id=${menuItem}]`);

    if (item !== null) {
      item.classList.toggle('trip-tabs__btn--active');
    }
  };

  #menuNavigationClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.menuNavigationClick(evt.target.id);
  };
}

export { MenuNavigationView };
