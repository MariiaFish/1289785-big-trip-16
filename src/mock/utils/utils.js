import dayjs from 'dayjs';

const getLastArrayElement = (array) => array[array.length - 1];
const getFirstArrayElement = (array) => array[0];

const timeUp = (a, b) => b.eventDuration - a.eventDuration;
const calcTimeDuration = (endDate, startDate) => dayjs(endDate).diff(dayjs(startDate), 'm');

const priceUp = (a, b) => b.price - a.price;
const dateDown = (a, b) => a.startDate - b.startDate;
const upToDown = (a, b) => b[1] - a[1];

const isFuturePoint = (startDate) => dayjs().isSame(startDate) || dayjs().isBefore(startDate);
const isPastPoint = (endDate) => dayjs().isAfter(endDate);
const checkDate = (endDate, startDate) => dayjs(endDate).isAfter(startDate);

const makeItemsUniq = (items) => [...new Set(items)];

const getOfferByEventType = (eventType, offers) => offers.filter((offer) => offer.type === eventType)[0].offers;
const getDestinationByTitle = (name, destinations) => destinations.filter((destination) => destination.name === name)[0];
const getDestinationList = (destinations) => destinations.map((destination) => destination.name);
const getEventTypesList = (offers) => offers.map(((offer) => offer.type));
const isCheckedOffer = (offer, pointOffers) => pointOffers.some((pointOffer) => pointOffer.id === Number(offer.id));

export {
  getOfferByEventType,
  calcTimeDuration,
  getEventTypesList,
  isCheckedOffer,
  getDestinationList,
  getDestinationByTitle,
  getLastArrayElement,
  getFirstArrayElement,
  timeUp,
  priceUp,
  dateDown,
  isFuturePoint,
  isPastPoint,
  checkDate,
  upToDown,
  makeItemsUniq,
};
