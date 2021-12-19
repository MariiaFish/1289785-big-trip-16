import dayjs from 'dayjs';
import {FULL_DATE_FORMAT, VALUE_ATR_DATE_FORMATE} from './consts.js';

const generateDate = (interval) => dayjs().add(interval, 'day');
const isSameMonth = (date1, date2) => dayjs(date1).isSame(dayjs(date2), 'month');
const generateEndEventDate = (date, interval) => date.add(interval, 'day');
const convertDateToFormat = (date, dateFormat) => date.format(dateFormat);
const getTodayDate = (dateFormat) => dayjs().format(dateFormat);
const getThisMomentTime = (timeFormat) => dayjs().format(timeFormat);
const getDatetimeAtr = (date, time) => `${convertDateToFormat(date, FULL_DATE_FORMAT)}T${time}`;
const getValueAtrTime = (date, time) => `${convertDateToFormat(date, VALUE_ATR_DATE_FORMATE)} ${time}`;

export {
  generateDate,
  isSameMonth,
  generateEndEventDate,
  getTodayDate,
  getThisMomentTime,
  getDatetimeAtr,
  getValueAtrTime,
  convertDateToFormat
};
