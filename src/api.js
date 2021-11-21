import * as DomFn from './dom';
import * as Helper from './helper';

const APIkey = '9a80c04c91325b8fba16eb19c88a32d2';
const part = 'minutely';

const buildCurrentUrl = function (location) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
};

const buildFullUrl = function (coords) {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=${part}&units=metric&appid=${APIkey}`;
};

const getCurrentData = async function (location) {
  try {
    const url = buildCurrentUrl(location);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Enter a valid 'city' / 'city,country'`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getCoords = function (data) {
  const coords = data.coord;
  return coords;
};

const getFullData = async function (coords) {
  try {
    const url = buildFullUrl(coords);
    const response = await fetch(url);
    if (!response.ok) throw new Error('resnotok');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const initApi = async function (location) {
  try {
    const currentData = await getCurrentData(location);
    console.log(currentData);
    if (!currentData) throw new Error(`Enter a valid 'city' / 'city,country'`);
    Helper.hideError();
    const coords = await getCoords(currentData);
    const fullData = await getFullData(coords);
    console.log(fullData);
    DomFn.renderAll(currentData, fullData);
    Helper.eventInit(fullData);
  } catch (err) {
    Helper.showError();
    console.log(err);
  }
};

export { getCurrentData, getFullData, getCoords, initApi };

// `api.openweathermap.org/data/2.5/weather?q=London&appid=9a80c04c91325b8fba16eb19c88a32d2`,
