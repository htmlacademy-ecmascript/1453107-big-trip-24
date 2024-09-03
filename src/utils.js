import dayjs from 'dayjs';

const FORMATS = {
  'date': 'MMM D',
  'time': 'HH:mm',
  'datetime': 'YYYY-MM-DD',
  'eventTime': 'DD/MM/YY HH:mm',
};

function getRandomArrayElement (array) {
  return array[Math.floor(Math.random() * (array.length))];
}

function humanizeDate(date, format) {
  return date ? dayjs(date).format(FORMATS[format]) : '';
}

function getDuration(date1, date2) {
  const differensInMinutes = dayjs(date2).diff(dayjs(date1), 'minute');

  let minutesLeft = differensInMinutes;

  let dayDuration = '';
  let hoursDuration = '';
  let minutesDuration = '';

  if (minutesLeft >= 1440) {
    const days = Math.floor(minutesLeft / 1440);
    dayDuration = `${days}D`;
    minutesLeft = minutesLeft - days * 1440;
  }

  if (minutesLeft >= 60) {
    const hours = Math.floor(minutesLeft / 60);
    hoursDuration = `${hours}H`;
    minutesLeft = minutesLeft - hours * 60;
  }

  minutesDuration = `${minutesLeft}M`;

  return (`${dayDuration} ${hoursDuration} ${minutesDuration}`);
}


export { getRandomArrayElement, humanizeDate, getDuration };
