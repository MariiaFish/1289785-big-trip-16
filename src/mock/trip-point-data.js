import { getRandomArrayElement, getRandomInteger, generateDate, convertDateToFormat, generateEndEventDate, generateBoolean, getRandomArrayLength, generatePhotoAdress, genArray} from './utils.js';
import { calcTimeDuration } from './duration.js';
import { getOffersArr, generateOffersData } from './offer-data.js';
import {MIN_HOUR_VALUE, MIN_TWO_DIGIT_VALUE, MAX_HOUR_VALUE, MIDNIGHT_VALUE, MAX_MINUTE_VALUE, MIN_MINUTE_VALUE, MAX_DAYS_GAP, MIN_DAYS_GAP, EVENT_TYPES, OFFER_TYPES, EVENT_DESTINATION_POINTS, FULL_DATE_FORMAT, DESTINATION_DISCRIPTION, MIN_PRICE_VALUE, MAX_PRICE_VALUE} from'./consts.js';

const processTimeValue = (value) => {
  let time = value;
  if (value < MIN_TWO_DIGIT_VALUE) {
    time = `0${value}`;
  }
  return time;
};

const generateRandomHours = () => {
  let randomInteger = getRandomInteger(MAX_HOUR_VALUE, MIN_HOUR_VALUE);
  if (randomInteger === MAX_HOUR_VALUE) {
    randomInteger = Number(MIDNIGHT_VALUE);
  }
  return processTimeValue(randomInteger);
};

const generateRandomMinutes = () => processTimeValue(getRandomInteger(MAX_MINUTE_VALUE, MIN_MINUTE_VALUE));

const generateTripPoint = () => {
  const randomDate = generateDate(getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP));
  const randomEndEventDate = generateEndEventDate(randomDate, getRandomInteger(MIN_DAYS_GAP, MAX_DAYS_GAP));
  const eventType = getRandomArrayElement(EVENT_TYPES);
  const offersObj = generateOffersData(OFFER_TYPES);
  const eventDestination = getRandomArrayElement(EVENT_DESTINATION_POINTS);

  const tripPoint = {
    eventDate: randomDate,
    eventType,
    eventDestination,
    eventTitle: `${eventType} ${eventDestination}`,
    eventTime: {
      startTime: {
        startDate: convertDateToFormat(randomDate, FULL_DATE_FORMAT),
        startTime: `${generateRandomHours()}:${generateRandomMinutes()}`,
      },
      endTime: {
        endDate: randomEndEventDate,
        endTime: `${generateRandomHours()}:${generateRandomMinutes()}`,
      },
      eventDuration: '',
    },
    offers: '',
    destination: {
      title: getRandomArrayLength(DESTINATION_DISCRIPTION, getRandomInteger(1, 5)),
      photos: genArray(getRandomInteger(1, 5),generatePhotoAdress),
    },
    price: getRandomInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE),
    isFavorite: generateBoolean(),
  };

  const offersArray = getOffersArr(offersObj, tripPoint);
  tripPoint.offers = offersArray ? getRandomArrayLength(offersArray, getRandomInteger(1, offersArray.length)) : '';
  calcTimeDuration(tripPoint);
  return tripPoint;
};

export {generateTripPoint, generateRandomHours, generateRandomMinutes};
