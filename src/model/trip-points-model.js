import { getRandomTripPoint } from '../mock/trip-point.js';

const TRIP_POINTS_COUNT = 4;

export default class TripPointsModel {
  tripPoints = Array.from({length: TRIP_POINTS_COUNT}, getRandomTripPoint);

  getTripPoints() {
    return this.tripPoints;
  }
}
