import { getRandomArrayElement } from '../utils.js';
import { POINTS, CITIES, CITIES_INFO, OFFERS } from '../const.js';

const mockTripPoints = [
  {
    point: getRandomArrayElement(POINTS),
    destination: getRandomArrayElement(CITIES),
    eventStart: new Date('2024-03-18T10:30:00'),
    eventEnd: new Date('2024-03-18T11:00:00'),
    price: '20',
    isFavorite: true,
  },
  {
    point: getRandomArrayElement(POINTS),
    destination: getRandomArrayElement(CITIES),
    eventStart: new Date('2024-03-18T12:30:00'),
    eventEnd: new Date('2024-03-19T12:00:00'),
    price: '160',
    isFavorite: false,
  },
  {
    point: getRandomArrayElement(POINTS),
    destination: getRandomArrayElement(CITIES),
    eventStart: new Date('2024-03-19T14:30:00'),
    eventEnd: new Date('2024-03-19T16:00:00'),
    price: '180',
    isFavorite: true,
  },
  {
    point: getRandomArrayElement(POINTS),
    destination: getRandomArrayElement(CITIES),
    eventStart: new Date('2024-03-20T15:25:00'),
    eventEnd: new Date('2024-03-20T18:00:00'),
    price: '160',
    isFavorite: false,
  },
  {
    point: getRandomArrayElement(POINTS),
    destination: getRandomArrayElement(CITIES),
    eventStart: new Date('2024-03-21T12:05:00'),
    eventEnd: new Date('2024-03-22T12:00:00'),
    price: '700',
    isFavorite: true,
  },
];


// function getRandomTripPoint() {
//   return getRandomArrayElement(mockTripPoints);
// }

function getRandomTripPoint() {
  const tripPoint = getRandomArrayElement(mockTripPoints);
  const {point, destination} = tripPoint;
  tripPoint.offers = OFFERS[point];
  tripPoint.description = CITIES_INFO[destination].description;
  tripPoint.photos = CITIES_INFO[destination].photos;

  return tripPoint;
}

export { getRandomTripPoint };
