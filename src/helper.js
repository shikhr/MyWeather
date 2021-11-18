import * as DomFn from './dom';
import { initApi } from './api';
const options = {
  hour: 'numeric',
  minute: 'numeric',
};

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
let currentDayIndex = new Date().getDay() - 1;

const unixToTime = function (unixVal) {
  const date = new Date(unixVal * 1000);
  const time = new Intl.DateTimeFormat('en-US', options).format(date);
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
  currentDayIndex = new Date().getDay() - 1;
};

const eventInit = function (data) {
  const forecast = document.querySelector('.forecast');
  const form = document.querySelector('.location-form');
  const locationInput = form.querySelector('input');

  forecast.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn')) return;
    const type = e.target.textContent;
    if (type === 'daily') DomFn.renderDaily(data.daily);
    if (type === 'hourly') DomFn.renderHourly(data.hourly);
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();
    if (location === '') {
      alert(`Enter a valid 'city' / 'city,country'`);
      return;
    }
    initApi(location);
    resetday();
  });
};

export { unixToTime, getDay, eventInit, resetday };
