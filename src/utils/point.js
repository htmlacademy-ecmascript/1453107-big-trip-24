import dayjs from 'dayjs';

const FORMATS = {
  'date': 'MMM D',
  'time': 'HH:mm',
  'datetime': 'YYYY-MM-DD',
  'eventTime': 'DD/MM/YY HH:mm',
};

const MINUTES_IN_MILLISECONDS = 60 * 1000;


function humanizeDate(date, format) {
  const clearDate = new Date(new Date(date).setMilliseconds(new Date().getTimezoneOffset() * MINUTES_IN_MILLISECONDS));
  return date ? dayjs(clearDate).format(FORMATS[format]) : '';
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

export { humanizeDate, getDuration };
