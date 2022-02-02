const calcTripCost = (points) => {
  const totalPrice = points.map((point) => point.price).reduce((a, b) => a + b);
  const offersPoints = points.map(({ offers }) => offers);
  const offersPrices = offersPoints.map((offers) => offers.map(({price}) => price));
  const offersPricesTotal = offersPrices.map((offers) => offers.length ? offers.reduce((a, b) => a + b): 0);
  const totalPricesSum = offersPricesTotal.reduce((a, b) => a + b);

  return `${totalPrice + totalPricesSum}`;
};

export {calcTripCost};
