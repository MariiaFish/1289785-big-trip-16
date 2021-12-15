import { convertDateToFormat } from './utils.js';
import {FULL_DATE_FORMAT} from './consts.js';
import dayjs from 'dayjs';

const getEndDateToCalcDuration = (tripPoint) => {
  const {eventTime: {endTime: {endDate, endTime}}} = tripPoint;
  return `${convertDateToFormat(endDate, FULL_DATE_FORMAT)}T${endTime}`;
};

const getStartDateToCalcDuration = (tripPoint) => {
  const {eventTime: {startTime: {startDate, startTime}}} = tripPoint;
  return `${startDate}T${startTime}`;
};

const calcTimeDuration = (tripPoint) => {
  tripPoint.eventTime.eventDuration = dayjs(getEndDateToCalcDuration(tripPoint)).diff(dayjs(getStartDateToCalcDuration(tripPoint)), 'm');
};

export {calcTimeDuration};
