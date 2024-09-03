import { getRandomArrayElement } from '../utils.js';
import { POINTS, CITIES, CITIES_INFO, OFFERS } from '../const.js';

const mockTripPoints = [
  {
    point: getRandomArrayElement(POINTS),
    destination: getRandomArrayElement(CITIES),
    eventStart: new Date('2024-06-18T10:48:00'),
    eventEnd: new Date('2024-06-18T11:36:00'),
    price: '22',
    isFavorite: true,
  },
  {
    point: getRandomArrayElement(POINTS),
    destination: getRandomArrayElement(CITIES),
    eventStart: new Date('2024-06-18T12:24:00'),
    eventEnd: new Date('2024-06-20T12:06:00'),
    price: '166',
    isFavorite: false,
  },
  {
    point: getRandomArrayElement(POINTS),
    destination: getRandomArrayElement(CITIES),
    eventStart: new Date('2024-06-19T14:47:00'),
    eventEnd: new Date('2024-06-19T16:35:00'),
    price: '188',
    isFavorite: true,
  },
  {
    point: getRandomArrayElement(POINTS),
    destination: getRandomArrayElement(CITIES),
    eventStart: new Date('2024-06-20T15:21:00'),
    eventEnd: new Date('2024-06-20T18:01:00'),
    price: '177',
    isFavorite: false,
  },
  {
    point: getRandomArrayElement(POINTS),
    destination: getRandomArrayElement(CITIES),
    eventStart: new Date('2024-06-21T12:52:00'),
    eventEnd: new Date('2024-06-22T12:13:00'),
    price: '895',
    isFavorite: true,
  },
];


function getRandomTripPoint() {
  const tripPoint = getRandomArrayElement(mockTripPoints);
  const {point, destination} = tripPoint;
  tripPoint.offers = OFFERS[point];
  tripPoint.description = CITIES_INFO[destination].description;
  tripPoint.pictures = CITIES_INFO[destination].pictures;

  return tripPoint;
}

export { getRandomTripPoint };
