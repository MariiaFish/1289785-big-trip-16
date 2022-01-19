import dayjs from 'dayjs';
import { getRandomInteger} from './utils';
import {MAX_HOUR_VALUE, MIN_HOUR_VALUE, MIDNIGHT_VALUE, MAX_MINUTE_VALUE, MIN_MINUTE_VALUE, MIN_TWO_DIGIT_VALUE} from './consts.js';

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

const generateRandomMinutes = () =>
  processTimeValue(getRandomInteger(MAX_MINUTE_VALUE, MIN_MINUTE_VALUE));

const genRandomTime = () =>
  `${generateRandomHours()}:${generateRandomMinutes()}`;

const calcTimeDuration = (tripPoint) => {
  const {endDate, startDate} = tripPoint;
  tripPoint.eventDuration = dayjs(endDate).diff(dayjs(startDate), 'm');
};

export { calcTimeDuration, generateRandomHours, genRandomTime };
