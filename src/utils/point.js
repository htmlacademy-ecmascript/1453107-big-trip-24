import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);


const DAY_IN_MINUTES = 1440;
const HOUR_IN_MINUTES = 60;

const FORMATS = {
  'date': 'MMM D',
  'time': 'HH:mm',
  'datetime': 'YYYY-MM-DD',
  'eventTime': 'DD/MM/YY HH:mm',
};


function convertLocalToUtc(localDate) {
  const date = new Date(localDate);
  const timezoneOffset = new Date().getTimezoneOffset() / HOUR_IN_MINUTES;
  const changedDate = date.setHours(date.getHours() - timezoneOffset);
  return new Date(changedDate).toUTCString();
}

function humanizeDate(date, format) {
  return date ? dayjs(date).utc().format(FORMATS[format]) : '';
}

function getDuration(date1, date2) {
  const differensInMinutes = dayjs.utc(date2).diff(dayjs.utc(date1), 'minute');

  let minutesLeft = differensInMinutes;

  let dayDuration = '';
  let hoursDuration = '';
  let minutesDuration = '';

  if (minutesLeft >= DAY_IN_MINUTES) {
    const days = Math.floor(minutesLeft / DAY_IN_MINUTES);
    dayDuration = days;
    minutesLeft = minutesLeft - days * DAY_IN_MINUTES;
  }

  if (minutesLeft >= HOUR_IN_MINUTES) {
    const hours = Math.floor(minutesLeft / HOUR_IN_MINUTES);
    hoursDuration = hours;
    minutesLeft = minutesLeft - hours * HOUR_IN_MINUTES;
  }

  minutesDuration = minutesLeft;

  const DATE = [
    {
      name: 'days',
      number: dayDuration,
      token: 'D'
    },
    {
      name: 'hours',
      number: hoursDuration,
      token: 'H'
    },
    {
      name: 'minutes',
      number: minutesDuration,
      token: 'M'
    },
  ];

  let timeDuration = '';

  DATE.forEach(({ number, token }) => {

    if (Number(number) === 0 && timeDuration !== '') {
      number = '00';
    }

    if (number <= 9 && number >= 1) {
      number = `0${number}`;
    }

    if (number) {
      timeDuration += `${number}${token} `;
    }
  });

  return timeDuration.trim();
}


function sortTripPointsByDay (pointA, pointB) {

  if (dayjs.utc(pointA.date_from).diff(dayjs.utc(pointB.date_from)) < 0) {
    return -1;
  }

  if (dayjs.utc(pointA.date_from).diff(dayjs.utc(pointB.date_from)) > 0) {
    return 1;
  }

  return 0;
}

function sortTripPointsByTime (pointA, pointB) {

  if (dayjs.utc(pointA.date_from).diff(dayjs.utc(pointA.date_to)) <
      dayjs.utc(pointB.date_from).diff(dayjs.utc(pointB.date_to))) {
    return -1;
  }

  if (dayjs.utc(pointA.date_from).diff(dayjs.utc(pointA.date_to)) >
      dayjs.utc(pointB.date_from).diff(dayjs.utc(pointB.date_to))) {
    return 1;
  }

  return 0;
}

function sortTripPointsByPrice (pointA, pointB) {

  if (pointA.base_price > pointB.base_price) {
    return -1;
  }

  if (pointA.base_price < pointB.base_price) {
    return 1;
  }

  return 0;
}

export {
  convertLocalToUtc,
  humanizeDate,
  getDuration,
  sortTripPointsByDay,
  sortTripPointsByTime,
  sortTripPointsByPrice
};
