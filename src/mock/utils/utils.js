import {FALSE, TRUE} from './consts.js';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getLowerCaseEventType = (string) => string.toLowerCase();
const generateBoolean = () => Boolean(getRandomInteger(FALSE, TRUE));
const generatePhotoAdress = () => `http://picsum.photos/248/152?r=${(Math.random()).toFixed(5)}`;


const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const genArray = (length, arrayElement) => Array.from({ length }, arrayElement);

const sortArrayByDate = (array) => {
  const copyArray = Array.from(array);
  copyArray.sort((a, b) => a.eventDate - b.eventDate);
  return copyArray;
};

const getLastArrayElement = (array) => array[array.length - 1];
const getFirstArrayElement = (array) => array[0];

const getRandomArrayLength = (array, length) => {
  const copyArray = array.slice();
  const newArray = [];
  for (let i = 0; i < length; i++) {
    newArray.push(getRandomArrayElement(copyArray));
  }
  return newArray;
};

export {
  getRandomArrayElement,
  getRandomInteger,
  generateBoolean,
  getRandomArrayLength,
  generatePhotoAdress,
  genArray,
  getLowerCaseEventType,
  sortArrayByDate,
  getLastArrayElement,
  getFirstArrayElement,
};
