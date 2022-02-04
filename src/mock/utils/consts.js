import dayjs from 'dayjs';

const FALSE = 0;
const TRUE = 1;

const MAX_DAYS_GAP = 14;
const MIN_DAYS_GAP = 1;

const MIN_HOUR_VALUE = 1;
const MAX_HOUR_VALUE = 24;

const MIDNIGHT_VALUE = '00';

const MAX_MINUTE_VALUE = 59;
const MIN_MINUTE_VALUE = 1;

const MIN_PRICE_VALUE = 10;
const MAX_PRICE_VALUE = 300;

const HOUR_VALUE = 60;
const DAY_VALUE = 1440;

const MIN_TWO_DIGIT_VALUE = 10;

const FULL_DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME = 'YYYY-MM-DDTHH:mm';
const VALUE_ATR_DATE_FORMATE = 'DD/MM/YY';
const VALUE_ATR_FULL_DATE_FORMAT = 'DD/MM/YY HH:mm';
const EVENT_DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const THIS_MOMENT_TIME_FORMAT = 'HH mm';
const ONLY_NUMBER_DATE_FORMAT = 'DD';

const EVENT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const EVENT_DESTINATION_POINTS = ['Amsterdam', 'Geneva', 'Chamonix'];

const OFFERS = {
  taxi: [{title: 'order-uber', price: 30, isChecked: true }, {title: 'order-uber-priority', price: 50, isChecked: true }, {title: 'add-luggage', price: 10, isChecked: true }, {title: 'switch-to-comfort-class', price: 15, isChecked: true }],
  bus: [{title: 'add-luggage', price: 10, isChecked: true }, {title: 'choose-seats', price: 10, isChecked: true }],
  train: [{title: 'add-luggage', price: 10, isChecked: true }, {title: 'choose-seats', price: 10, isChecked: true }, {title: 'add-meal', price: 24, isChecked: true }],
  ship: [{title: 'add-luggage', price: 10, isChecked: true }, {title: 'choose-seats', price: 10, isChecked: true }, {title: 'add-meal', price: 24, isChecked: true }],
  drive: [{title: 'rent-car', price: 100, isChecked: true }, {title: 'rent-priority-car', price: 300, isChecked: true }, {title: 'rent-lux-car', price: 500, isChecked: true }],
  flight: [{title: 'add-luggage', price: 10, isChecked: true }, {title: 'choose-seats', price: 10, isChecked: true }, {title: 'add-meal', price: 24, isChecked: true }],
  'check-in': [{title: 'add-breakfast', price: 40, isChecked: true }, {title: 'add-special-tv-channels', price: 5, isChecked: true }, {title: 'add-dinner', price: 40, isChecked: true},  {title: 'add-laundry-services', price: 30, isChecked: true }, {title: 'add-parking-place', price: 10, isChecked: true }],
  restaurant: [{title: 'choose-table', price: 5, isChecked: true }, {title: 'add-parking-place', price: 5, isChecked: true }],
};

const DESTINATION_DISCRIPTION = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];

const SortValue = {
  DEFAULT: 'sort-day',
  TIME_UP: 'sort-time',
  PRICE_UP: 'sort-price',
};

const FLATPICKER_SETTINGS = {
  dateFormat: 'd/m/y H:i',
  enableTime: true,
  'time_24hr': true,
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const UserAction = {
  UPDATE_TRIP_POINT: 'UPDATE_TRIP_POINT',
  ADD_TRIP_POINT: 'ADD_TRIP_POINT',
  DELETE_TRIP_POINT: 'DELETE_TRIP_POINT',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const EmptyListType = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PAST: 'There are no past events now',
};

const DateType = {
  START_DATA: 'startDate',
  END_DATA: 'endDate',
};

const MenuItem = {
  ADD_NEW_POINT: 'ADD_NEW_POINT',
  TABLE: 'TABLE',
  STATISTICS: 'STATISTICS',
};

const BLANK_TASK = {
  eventType: 'taxi',
  offers: '',
  startDate: dayjs(),
  endDate: dayjs(),
  eventDuration: '',
  price: 0,
  isFavorite: false,
  destination: {
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building'
      }
    ],
    name: 'Chamonix',
  }
};


export {
  FALSE,
  TRUE,
  VALUE_ATR_DATE_FORMATE,
  FULL_DATE_FORMAT,
  MIN_TWO_DIGIT_VALUE,
  MAX_DAYS_GAP,
  MIN_DAYS_GAP,
  MIN_HOUR_VALUE,
  MAX_HOUR_VALUE,
  MIDNIGHT_VALUE,
  MAX_MINUTE_VALUE,
  MIN_MINUTE_VALUE,
  MIN_PRICE_VALUE,
  MAX_PRICE_VALUE,
  DESTINATION_DISCRIPTION,
  MenuItem,
  EVENT_DESTINATION_POINTS,
  EVENT_TYPES,
  BLANK_TASK,
  HOUR_VALUE,
  DAY_VALUE,
  EVENT_DATE_FORMAT,
  THIS_MOMENT_TIME_FORMAT,
  ONLY_NUMBER_DATE_FORMAT,
  SortValue,
  TIME_FORMAT,
  DATE_TIME,
  VALUE_ATR_FULL_DATE_FORMAT,
  FLATPICKER_SETTINGS,
  UpdateType,
  UserAction,
  FilterType,
  EmptyListType,
  DateType,
  OFFERS,
};
