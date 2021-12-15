const calcTripPointTotalPrice = (tripPoint) => {
  const { price, offers } = tripPoint;
  const offersTotalPrice = offers
    ? offers.map(({ offerPrice }) => offerPrice).reduce((a, b) => a + b)
    : 0;
  return price + offersTotalPrice;
};

const calcTripCost = (tripPoints) => {
  const tripPointsTotalpricesArray = tripPoints.map((tripPoint) =>
    calcTripPointTotalPrice(tripPoint)
  );
  return `${tripPointsTotalpricesArray.reduce((a, b) => a + b)}`;
};

export {calcTripCost};
