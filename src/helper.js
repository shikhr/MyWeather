import * as DomFn from './dom';
import { initApi } from './api';
import weatherIcon from './icons';
const options = {
  hour: 'numeric',
  minute: 'numeric',
};
const optionsCurrent = {
  weekday: 'long',
  hour: 'numeric',
  minute: 'numeric',
};

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
let currentDayIndex = new Date().getDay();
console.log(currentDayIndex);

const unixToTime = function (unixVal) {
  const date = new Date(unixVal * 1000);
  const time = new Intl.DateTimeFormat('en-US', options).format(date);
  return time;
};
const currentTime = function () {
  const date = new Date();
  const time = new Intl.DateTimeFormat('en-US', optionsCurrent).format(date);
  return time;
};
const setNextDayIndex = function (index) {
  if (currentDayIndex < 6) currentDayIndex++;
  else currentDayIndex = 0;
};

const getDay = function () {
  const currentDay = days[currentDayIndex];
  setNextDayIndex();
  return currentDay;
};

const resetday = function () {
  currentDayIndex = new Date().getDay();
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
    resetday();
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
  eventInit,
  resetday,
  showError,
  hideError,
  currentTime,
  getIcon,
};
