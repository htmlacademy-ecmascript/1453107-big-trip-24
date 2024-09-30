import { FilterType } from '../const.js';

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => new Date(tripPoint.dateFrom) > Date.now()),
  [FilterType.PRESENT]: (tripPoints) => tripPoints.filter((tripPoint) => new Date(tripPoint.dateFrom) <= Date.now() && new Date(tripPoint.dateTo) >= Date.now()),
  [FilterType.PAST]: (tripPoints) => tripPoints.filter((tripPoint) => new Date(tripPoint.dateTo) < Date.now()),
};

export { filter };
