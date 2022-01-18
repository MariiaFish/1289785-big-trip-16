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
const OFFER_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'restaurant'];

const DESTINATION_DISCRIPTION = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];

const OFFER_TITLES = ['Order Uber', 'Order Uber Priority', 'Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Rent a car', 'Rent a priority car', 'Rent a lux car', 'Add breakfast', 'Add special TV-channels', 'Add dinner', 'Add laundry services', 'Choose table', 'Add parking place'];

const SortValue = {
  DEFAULT: 'sort-day',
  TIME_UP: 'sort-time',
  PRICE_UP: 'sort-price',
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
  OFFER_TYPES,
  EVENT_DESTINATION_POINTS,
  EVENT_TYPES,
  OFFER_TITLES,
  HOUR_VALUE,
  DAY_VALUE,
  EVENT_DATE_FORMAT,
  THIS_MOMENT_TIME_FORMAT,
  ONLY_NUMBER_DATE_FORMAT,
  SortValue,
  TIME_FORMAT,
  DATE_TIME,
  VALUE_ATR_FULL_DATE_FORMAT,
};
