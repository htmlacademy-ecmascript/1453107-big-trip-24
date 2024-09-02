const POINTS = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva'];

const CITIES_INFO = {
  'Amsterdam': {
    description: 'Amsterdam Amsterdam Amsterdam Amsterdam Amsterdam',
    pictures: [
      'https://loremflickr.com/248/152?random=1',
      'https://loremflickr.com/248/152?random=2',
      'https://loremflickr.com/248/152?random=3',
    ],
  },
  'Chamonix': {
    description: 'Chamonix Chamonix Chamonix Chamonix Chamonix',
    pictures: [
      'https://loremflickr.com/248/152?random=4',
      'https://loremflickr.com/248/152?random=5',
      'https://loremflickr.com/248/152?random=6',
    ],
  },
  'Geneva': {
    description: 'Geneva Geneva Geneva Geneva Geneva',
    pictures: [
      'https://loremflickr.com/248/152?random=7',
      'https://loremflickr.com/248/152?random=8',
      'https://loremflickr.com/248/152?random=9',
    ],
  },
};

const OFFERS = {
  'Taxi': [
    {name: 'taxi1', price: '10'},
    {name: 'taxi1', price: '20'},
    {name: 'taxi1', price: '30'},
  ],
  'Bus': [
    {name: 'bus1', price: '10'},
    {name: 'bus1', price: '20'},
    {name: 'bus1', price: '30'},
  ],
  'Train': [
    {name: 'train1', price: '10'},
    {name: 'train1', price: '20'},
    {name: 'train1', price: '30'},
  ],
  'Ship': [
    {name: 'ship1', price: '10'},
    {name: 'ship1', price: '20'},
    {name: 'ship1', price: '30'},
  ],
  'Drive': [
    {name: 'drive1', price: '10'},
    {name: 'drive1', price: '20'},
    {name: 'drive1', price: '30'},
  ],
  'Flight': [
    {name: 'flight1', price: '10'},
    {name: 'flight1', price: '20'},
    {name: 'flight1', price: '30'},
  ],
  'Check-in': [
    {name: 'checkin1', price: '10'},
    {name: 'checkin1', price: '20'},
    {name: 'checkin1', price: '30'},
  ],
  'Sightseeing': [
    {name: 'sightseeing1', price: '10'},
    {name: 'sightseeing1', price: '20'},
    {name: 'sightseeing1', price: '30'},
  ],
  'Restaurant': [
    {name: 'restaurant1', price: '10'},
    {name: 'restaurant1', price: '20'},
    {name: 'restaurant1', price: '30'},
  ],
};

export { POINTS, CITIES, CITIES_INFO, OFFERS };
