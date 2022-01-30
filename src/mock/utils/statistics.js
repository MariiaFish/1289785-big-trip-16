const countPointsByType = (points, type) => {
  const typesSumByType = points.filter(({ eventType }) => eventType === type).length;
  return [type, typesSumByType];
};

const countDurationSumByType = (points, type) => {
  const durationsSumByType = points.filter(({ eventType }) => eventType === type).map(({eventDuration}) => eventDuration).reduce((a, b) => a + b);
  return [type, durationsSumByType];
};

const countPriceSumByType = (points, type) => {
  const pricesSumByType = points.filter(({ eventType }) => eventType === type).map(({price}) => price).reduce((a, b) => a + b);
  return [type, pricesSumByType];
};

export { countPointsByType, countDurationSumByType, countPriceSumByType };
