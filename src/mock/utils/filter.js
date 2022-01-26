import { FilterType } from './consts';
import { isFuturePoint, isPastPoint } from './utils';

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isFuturePoint(tripPoint.startDate)),
  [FilterType.PAST]: (tripPoints) => tripPoints.filter((tripPoint) => isPastPoint(tripPoint.endDate)),
};

export {filter};
