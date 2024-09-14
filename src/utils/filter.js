import { FilterType } from '../const.js';

const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => new Date(tripPoint.date_from) > Date.now()),
  [FilterType.PRESENT]: (tripPoints) => tripPoints.filter((tripPoint) => new Date(tripPoint.date_from) <= Date.now() && new Date(tripPoint.date_to) >= Date.now()),
  [FilterType.PAST]: (tripPoints) => tripPoints.filter((tripPoint) => new Date(tripPoint.date_to) < Date.now()),
};

export { filter };
