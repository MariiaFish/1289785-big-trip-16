import { getRandomArrayElement, getRandomInteger, generateBoolean, getRandomArrayLength, generatePhotoAdress, genArray} from './utils/utils.js';
import {generateDate, generateEndEventDate } from './utils/date.js';
import { offerCards } from './offer-data.js';
import { MAX_DAYS_GAP, MIN_DAYS_GAP, EVENT_TYPES, EVENT_DESTINATION_POINTS, DESTINATION_DISCRIPTION, MIN_PRICE_VALUE, MAX_PRICE_VALUE, FULL_DATE_FORMAT} from'./utils/consts.js';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import { convertDateToFormat } from './utils/date.js';
import { genRandomTime, calcTimeDuration} from './utils/event-time.js';

const generateTripPoint = () => {
  const randomDate = generateDate(getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP));
  const randomEndEventDate = generateEndEventDate(randomDate, getRandomInteger(MIN_DAYS_GAP, MAX_DAYS_GAP));
  const eventType = (getRandomArrayElement(EVENT_TYPES)).toLowerCase();
  const eventDestination = getRandomArrayElement(EVENT_DESTINATION_POINTS);

  const tripPoint = {
    id: nanoid(),
    eventDate: randomDate,
    eventType,
    eventDestination,
    eventTitle: `${eventType} ${eventDestination}`,
    startDate: dayjs(`${convertDateToFormat(randomDate, FULL_DATE_FORMAT)}T${genRandomTime()}`),
    endDate: dayjs(`${convertDateToFormat(randomEndEventDate, FULL_DATE_FORMAT)}T${genRandomTime()}`),
    eventDuration: '',
    offers: '',
    destination: {
      title: getRandomArrayLength(DESTINATION_DISCRIPTION, getRandomInteger(1, 5)),
      photos: genArray(getRandomInteger(1, 5),generatePhotoAdress),
    },
    price: getRandomInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE),
    isFavorite: generateBoolean(),
  };

  tripPoint.offers = offerCards[tripPoint.eventType];
  calcTimeDuration(tripPoint);
  return tripPoint;
};

const updateDescriptionTitle = () => getRandomArrayLength(DESTINATION_DISCRIPTION, getRandomInteger(1, 5));
const updateDescriptionPhotos = () => genArray(getRandomInteger(1, 5),generatePhotoAdress);

export {
  generateTripPoint,
  updateDescriptionTitle,
  updateDescriptionPhotos,
};
