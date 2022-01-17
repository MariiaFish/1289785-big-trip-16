import { getRandomArrayElement, getRandomInteger,genArray} from './utils/utils.js';
import { OFFER_TITLES, MIN_PRICE_VALUE, MAX_PRICE_VALUE, OFFER_TYPES } from './utils/consts.js';

class OfferCard {
  constructor() {
    this.offerTitle = getRandomArrayElement(OFFER_TITLES);
    this.offerPrice = getRandomInteger(MIN_PRICE_VALUE, MAX_PRICE_VALUE);
  }
}

const createOfferCard = () => new OfferCard();

const generateOffersData = (array) => {
  const offers = {};
  array.forEach((type) => {
    offers[type] = genArray(getRandomInteger(1, 5), createOfferCard);
  });
  return offers;
};

const offerCards = generateOffersData(OFFER_TYPES);

export  { offerCards };
