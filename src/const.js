const POINTS = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Munich'];

const CITIES_INFO = {
  'Amsterdam': {
    description: 'Amsterdam Amsterdam Amsterdam Amsterdam Amsterdam',
    pictures: [],
  },
  'Chamonix': {
    description: '',
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
  'Munich': {
    description: '',
    pictures: '',
  }
};

const OFFERS = {
  'Taxi': [
    {name: 'taxi1', price: '11', inputId: 'taxi1-inputId', inputName: 'taxi1-inputName', isChecked: false},
    {name: 'taxi2', price: '22', inputId: 'taxi2-inputId', inputName: 'taxi1-inputName', isChecked: true},
    {name: 'taxi3', price: '33', inputId: 'taxi3-inputId', inputName: 'taxi1-inputName', isChecked: false},
  ],
  'Bus': [
    {name: 'bus1', price: '11', inputId: 'bus1-inputId', inputName: 'bus1-inputName', isChecked: true},
    {name: 'bus2', price: '22', inputId: 'bus2-inputId', inputName: 'bus1-inputName', isChecked: false},
    {name: 'bus3', price: '33', inputId: 'bus3-inputId', inputName: 'bus1-inputName', isChecked: true},
  ],
  'Train': [
    {name: 'train1', price: '11', inputId: 'train1-inputId', inputName: 'train1-inputName', isChecked: false},
    {name: 'train2', price: '22', inputId: 'train2-inputId', inputName: 'train1-inputName', isChecked: true},
  ],
  'Ship': [
    {name: 'ship1', price: '11', inputId: 'ship1-inputId', inputName: 'ship1-inputName', isChecked: false},
  ],
  'Drive': [
    {name: 'drive1', price: '11', inputId: 'drive1-inputId', inputName: 'drive1-inputName', isChecked: true},
    {name: 'drive2', price: '22', inputId: 'drive2-inputId', inputName: 'drive1-inputName', isChecked: false},
    {name: 'drive3', price: '33', inputId: 'drive3-inputId', inputName: 'drive1-inputName', isChecked: false},
  ],
  'Flight': [],
  'Check-in': [
    {name: 'checkin1', price: '11', inputId: 'checkin1-inputId', inputName: 'checkin1-inputName', isChecked: false},
    {name: 'checkin2', price: '22', inputId: 'checkin2-inputId', inputName: 'checkin1-inputName', isChecked: true},
  ],
  'Sightseeing': [],
  'Restaurant': [
    {name: 'Restaurant1', price: '11', inputId: 'Restaurant1-inputId', inputName: 'Restaurant1-inputName', isChecked: false},
    {name: 'Restaurant2', price: '22', inputId: 'Restaurant2-inputId', inputName: 'Restaurant1-inputName', isChecked: true},
  ],
};

export { POINTS, CITIES, CITIES_INFO, OFFERS };
