const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const BLANK_TRIP_POINT = {
  'id': '000',
  'base_price': 0,
  'date_from': '',
  'date_to': '',
  'destination': '',
  'is_favorite': false,
  'offers': [],
  'type': 'flight'
};

const BLANK_DESTINATION = {
  'name': '',
  'pictures': [],
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const DisabledSortType = [SortType.EVENT, SortType.OFFERS];


export {
  EVENT_TYPES,
  BLANK_TRIP_POINT,
  BLANK_DESTINATION,
  FilterType,
  SortType,
  DisabledSortType,
};
