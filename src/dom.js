import * as Helper from './helper';

const root = document.querySelector('.root');
const renderTemplate = function () {
  root.innerHTML = '';
  const tempHtml = `
        <div class="current">
             <div class="c1"></div>   
             <div class="c2"></div>   
          </div>
         <div class="sideinfo">
          <form class="location-form" action="#">
            <input type="text" name="location" id="location" />
            <button type="submit">Submit</button>
          </form>
          <div class="location-err location-err-hidden">Please make sure the location is a valid <b><i>city, country !</i></b></div>
          </div>
        </div>
        <div class="forecast">
          <div class="forecast-btn">
            <button class="daily-btn btn btn-active">daily</button>
            <button class="hourly-btn btn">hourly</button>
          </div>
        <div class="forecast-data"></div>
        </div>
       
        `;
  root.insertAdjacentHTML('beforeend', tempHtml);
};

const renderCurrent = function (data) {
  const c1 = document.querySelector('.c1');
  const c2 = document.querySelector('.c2');

  const c1Html = `
          <div class="current-main">${Math.round(data.main.feels_like)}°</div>
          <div class="current-status">${data.weather[0].main}</div>
          
  `;
  const c2Html = `
        <img src="http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" />
          <div class="current-humidity">Humidity:${data.main.humidity}%</div>
          <div class="current-wind">Wind:${Math.round(
            data.wind.speed * 3.6
          )} Km/h</div>
  `;

  c1.insertAdjacentHTML('afterbegin', c1Html);
  c2.insertAdjacentHTML('afterbegin', c2Html);
};
const renderSide = function (data) {
  const sideinfo = document.querySelector('.sideinfo');
  const sunrise = Helper.unixToTime(data.sys.sunrise);
  const sunset = Helper.unixToTime(data.sys.sunset);
  const sideHtml = `
  <div class="side-time">As of ${Helper.currentTime()}</div>
  <div class="side-location">${data.name}</div>
  <div class="side-sunrise">Sunrise: ${sunrise}</div>
  <div class="side-sunset">Sunset: ${sunset}</div>
  `;
  sideinfo.insertAdjacentHTML('afterbegin', sideHtml);
};

const renderDaily = function (data) {
  const forecast = document.querySelector('.forecast-data');
  forecast.innerHTML = '';

  let dayHtml = ``;

  data.forEach((day) => {
    dayHtml += `
          <div class="daily">
              <div class="daily-name">${Helper.getDay()}</div>
              <img src="http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png" />
              <div class="daily-max">${Math.round(day.temp.max)}°</div>
              <div class="daily-min">${Math.round(day.temp.min)}°</div>
          </div>
    `;
  });
  forecast.insertAdjacentHTML('beforeend', dayHtml);
  Helper.resetday();
};
const renderHourly = function (data) {
  const forecast = document.querySelector('.forecast-data');
  forecast.innerHTML = '';

  let hourHtml = ``;
  const hours12 = data.slice(0, 12);
  console.log(hours12);
  hours12.forEach((hour) => {
    hourHtml += `
    <div class="hourly">
    <div class="hour-name">hour</div>
    <img src="http://openweathermap.org/img/wn/${
      hour.weather[0].icon
    }@2x.png" />
    <div class="hourly-temp">${Math.round(hour.feels_like)}°</div>
    </div>
    `;
  });
  forecast.insertAdjacentHTML('beforeend', hourHtml);
  Helper.resetday();
};
const renderAll = function (currentdata, fullData) {
  renderTemplate();
  renderCurrent(currentdata);
  renderSide(currentdata);
  renderDaily(fullData.daily);
};

export { renderTemplate, renderHourly, renderAll, renderDaily };
