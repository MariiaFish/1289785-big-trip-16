// import {generateTripPoint} from './mock/trip-point-data.js';
// import { genArray } from './mock/utils/utils.js';
import {MenuItem} from './mock/utils/consts.js';
import { TripPresenter } from './presenter/trip-presenter.js';
import { TripPointsModel } from './model/trip-points-model.js';
import { FilterModel } from './model/filter-model.js';
import { RenderPosition, render, remove } from './mock/utils/render.js';
import { FilterPresenter } from './presenter/filter-presenter.js';
import { StatisticsView } from './view/stat-view.js';
import { MenuNavigationView } from './view/menu-navigation-view.js';
import { ButtonAddEventView } from './view/add-new-event-button.js';
import { ApiService } from './api-service.js';

const bodyElement = document.querySelector('.page-body');
const tripMainContainer = bodyElement.querySelector('.trip-main');
const siteMenuContainer = tripMainContainer.querySelector('.trip-main__trip-controls');
const pageBodyMainContainer = bodyElement.querySelector('.page-main');
const tripEventContainer = pageBodyMainContainer.querySelector('.page-body__container');


const AUTHORIZATION = 'Basic ribaRibnaai4746';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';


const tripPointsModel = new TripPointsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const newEventButton = new ButtonAddEventView();

const menuNavigation = new MenuNavigationView();
const tripPresenter = new TripPresenter(tripMainContainer, tripEventContainer, tripPointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMenuContainer, filterModel);


const handleNewEventFormClose = () => {
  newEventButton.element.disabled = false;
};

let statisticsComponent = null;

const handleMenuNavigationClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      // Скрыть статистику
      remove(statisticsComponent);
      // Показать фильтры
      filterPresenter.destroy();
      filterPresenter.init();
      // Показать eventbox
      tripPresenter.destroy();
      tripPresenter.init();
      // Показать форму добавления новой задачи
      tripPresenter.createTripPoint(handleNewEventFormClose);
      // Заблокировать конопку добавления
      newEventButton.setMenuItem();
      // Убрать выделение с ADD NEW TASK после сохранения (эта логика прописана в createTask в trip-presenter)
      break;
    case MenuItem.TABLE:
      // console.log('Menu');
      // Показать фильтры
      filterPresenter.init();
      // Показать eventbox
      tripPresenter.destroy();
      tripPresenter.init();
      // Скрыть статистику
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      // console.log("Menu-gh");
      // Скрыть фильтры
      filterPresenter.destroy();
      // Скрыть eventbox
      tripPresenter.destroy();
      // Показать статистику
      statisticsComponent = new StatisticsView(tripPointsModel.points);
      render(pageBodyMainContainer, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

tripPresenter.init();
filterPresenter.init();


tripPointsModel.init().finally(() => {
  render(siteMenuContainer, menuNavigation, RenderPosition.AFTERBEGIN);
  render(tripMainContainer, newEventButton, RenderPosition.BEFOREEND);
  menuNavigation.setMenuNavigationClickHandler(handleMenuNavigationClick);
  newEventButton.setNewEventClickHandler(handleMenuNavigationClick);
});
