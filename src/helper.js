import * as DomFn from './dom';
import { initApi } from './api';
import weatherIcon from './icons';

const locale = navigator.language;

let timezone;
const setTimezone = function (tz) {
  timezone = tz;
};
const commonOptions = {
  timeZone: timezone,
  hour12: true,
};

const unixToTime = function (unixVal) {
  const date = new Date(unixVal * 1000);
  const time = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    ...commonOptions,
  }).format(date);
  return time;
};
const currentTime = function (unixVal) {
  const date = new Date(unixVal * 1000);
  const time = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    month: 'short',
    day: 'numeric',
    ...commonOptions,
  }).format(date);
  return time;
};

const getDay = function (unixVal) {
  const date = new Date(unixVal * 1000);
  const day = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    ...commonOptions,
  }).format(date);
  return day;
};
const getHour = function (unixVal) {
  const date = new Date(unixVal * 1000);
  const hour = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    ...commonOptions,
  }).format(date);
  return hour;
};

const eventInit = function (data) {
  const forecast = document.querySelector('.forecast');
  const form = document.querySelector('.location-form');
  const locationInput = form.querySelector('input');

  forecast.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn')) return;
    const type = e.target.textContent;
    document.querySelector('.btn-active').classList.remove('btn-active');
    e.target.classList.add('btn-active');
    if (type === 'daily') DomFn.renderDaily(data.daily);
    if (type === 'hourly') DomFn.renderHourly(data.hourly);
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();
    if (location === '') {
      showError();
      return;
    }
    hideError();
    initApi(location);
  });
};

const showError = function () {
  const err = document.querySelector('.location-err');
  err.classList.remove('location-err-hidden');
};
const hideError = function () {
  const err = document.querySelector('.location-err');
  err.classList.add('location-err-hidden');
};

const getIcon = function (code) {
  const prefix = 'wi wi-';
  let icon = weatherIcon[code].icon;

  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = 'day-' + icon;
  }

  icon = prefix + icon;
  return icon;
};

export {
  unixToTime,
  getDay,
  getHour,
  eventInit,
  showError,
  hideError,
  currentTime,
  getIcon,
  setTimezone,
};
