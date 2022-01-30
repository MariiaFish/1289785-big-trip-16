import { SmartView } from './smart-view.js';
import { upToDown, makeItemsUniq } from '../mock/utils/utils.js';
import {countPointsByType, countDurationSumByType, countPriceSumByType } from '../mock/utils/statistics.js';
import { convertDurationTime } from '../mock/convertor-time-duration.js';
import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 55;

const renderMoneyChat = (moneyCtx, points) => {
  // получаем массив типов маршрута
  const pointsTypes = points.map((point) => point.eventType);
  // получаем массив уникальных типов маршрута
  const uniqTypes = makeItemsUniq(pointsTypes);
  // получаем массив массивов из двух значений [тип, цена], сортируем его по убыванию
  const priceByTypes = uniqTypes.map((uniqType) => countPriceSumByType(points, uniqType)).sort(upToDown);
  // получаем массив для labels
  const types = priceByTypes.map(([type]) => type.toUpperCase());
  // получаем массив для data
  const pricesData = priceByTypes.map(([, price]) => price);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [
        {
          data: pricesData,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
          barThickness: 44,
          minBarLength: 50,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
        responsive: false,
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChat = (typeCtx, points) => {
  // получаем массив типов маршрута
  const pointsTypes = points.map((point) => point.eventType);
  // получаем массив уникальных типов маршрута
  const uniqTypes = makeItemsUniq(pointsTypes);
  // получаем массив массивов из двух значений [тип, колличество раз], сортируем его по убыванию
  const countByTypes = uniqTypes.map((uniqType) => countPointsByType(points, uniqType)).sort(upToDown);
  // получаем массив для labels
  const types = countByTypes.map(([type]) => type.toUpperCase());
  // получаем массив для data
  const countedTypes = countByTypes.map(([, countedType]) => countedType);

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [
        {
          data: countedTypes,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
          barThickness: 44,
          minBarLength: 50,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
        responsive: false,
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, points) => {
  // получаем массив типов маршрута
  const pointsTypes = points.map((point) => point.eventType);
  // получаем массив уникальных типов маршрута
  const uniqTypes = makeItemsUniq(pointsTypes);
  // получаем массив массивов из двух значений [тип, продолжительность], сортируем его по убыванию
  const durationByTypes = uniqTypes.map((uniqType) => countDurationSumByType(points, uniqType)).sort(upToDown);
  // получаем массив для labels
  const types = durationByTypes.map(([type]) => type.toUpperCase());
  // получаем массив для data
  const durationData = durationByTypes.map(([ , duration]) => duration);

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [
        {
          data: durationData,
          backgroundColor: '#ffffff',
          hoverBackgroundColor: '#ffffff',
          anchor: 'start',
          barThickness: 44,
          minBarLength: 80,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${convertDurationTime(val)}`,
        },
        responsive: false,
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: '#000000',
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


const createStatisticsViewTemplate = () =>
  `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>


          <div class="statistics__item">
            <canvas class="statistics__chart" id="money" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="type" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="time" width="900"></canvas>
          </div>
        </section>`;

class StatisticsView extends SmartView {
  #moneyChat = null;
  #typeChat = null;
  #timeChat = null;

  constructor(tripPoints) {
    super();
    this._data = tripPoints;

    this.#setCharts();
  }

  get template() {
    return createStatisticsViewTemplate();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#moneyChat) {
      this.#moneyChat.destroy();
      this.#moneyChat = null;
    }

    if (this.#typeChat) {
      this.#typeChat.destroy();
      this.#typeChat = null;
    }

    if (this.#timeChat) {
      this.#timeChat.destroy();
      this.#timeChat = null;
    }
  };

  restoreHandlers = () => {
    this.#setCharts();
  };

  #setCharts = () => {
    const tripPoints = this._data;
    const moneyCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time');

    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    this.#moneyChat = renderMoneyChat(moneyCtx, tripPoints);
    this.#timeChat = renderTimeChart(timeCtx, tripPoints);
    this.#typeChat = renderTypeChat(typeCtx, tripPoints);
  };
}


export { StatisticsView };
