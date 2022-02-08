import dayjs from 'dayjs';

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
  offers: [],
  destinationPoint: 'Amsterdam',
  startDate: dayjs(),
  endDate: dayjs(),
  eventDuration: '',
  price: 0,
  isFavorite: false,
  destination: {
    description:
      'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      },
    ],
  },
};

export {
  VALUE_ATR_DATE_FORMATE,
  FULL_DATE_FORMAT,
  MIN_TWO_DIGIT_VALUE,
  MIN_HOUR_VALUE,
  MAX_HOUR_VALUE,
  MIDNIGHT_VALUE,
  MAX_MINUTE_VALUE,
  MIN_MINUTE_VALUE,
  MIN_PRICE_VALUE,
  MAX_PRICE_VALUE,
  MenuItem,
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
};
