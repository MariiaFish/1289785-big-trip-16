import { getRandomArrayElement, getRandomInteger,genArray} from './utils.js';
import { OFFER_TITLES, MIN_PRICE_VALUE, MAX_PRICE_VALUE } from './consts.js';

class OfferCard {
  constructor() {
    this.offerTitle = getRandomArrayElement(OFFER_TITLES);
    this.offerPrice = getRandomInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE);
  }
}

const createOfferCard = () => Object.assign({}, new OfferCard());

const generateOffersData = (array) => {
  const offers = {};
  array.forEach((type) => {
    offers[type] = genArray(getRandomInteger(1, 5), createOfferCard);
  });
  return offers;
};

const getOffersArr = (offersObj, tripPoint) => offersObj[tripPoint.eventType] ? offersObj[tripPoint.eventType]: '';


export { getOffersArr, generateOffersData };
