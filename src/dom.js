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

const renderCurrent = function (data, data2) {
  const c1 = document.querySelector('.c1');
  const c2 = document.querySelector('.c2');

  const c1Html = `
          <div class="current-main">${Math.round(data.main.feels_like)}°</div>
          <div class="current-status">${data.weather[0].main}</div>
          
  `;
  const codeClass = Helper.getIcon(data.weather[0].id);
  const c2Html = `
        <i class="${codeClass} mi-5x"></i>
          <div class="current-humidity">Humidity: ${data.main.humidity}%</div>
          <div class="current-wind">Wind: ${Math.round(
            data.wind.speed * 3.6
          )} Km/h</div>
           <div class="current-pop">Chance of Rain: ${data2.pop}%</div>
  `;

  c1.insertAdjacentHTML('afterbegin', c1Html);
  c2.insertAdjacentHTML('afterbegin', c2Html);
};
const renderSide = function (data) {
  const sideinfo = document.querySelector('.sideinfo');
  const sunrise = Helper.unixToTime(data.sys.sunrise);
  const sunset = Helper.unixToTime(data.sys.sunset);
  const sideHtml = `
  <div class="side-time">As of ${Helper.currentTime(data.dt)}</div>
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
    const codeClass = Helper.getIcon(day.weather[0].id);
    const dayVal = Helper.getDay(day.dt);
    dayHtml += `
          <div class="daily">
              <div class="daily-name">${dayVal}</div>
              <i class="${codeClass} mi-4x"></i>
              <div class="daily-max">${Math.round(day.temp.max)}°</div>
              <div class="daily-min">${Math.round(day.temp.min)}°</div>
          </div>
    `;
  });
  forecast.insertAdjacentHTML('beforeend', dayHtml);
};

const renderHourly = function (data) {
  const forecast = document.querySelector('.forecast-data');
  forecast.innerHTML = '';

  let hourHtml = ``;
  const hours12 = data.slice(0, 14);
  hours12.forEach((hour) => {
    const codeClass = Helper.getIcon(hour.weather[0].id);
    const hourVal = Helper.getHour(hour.dt);
    hourHtml += `
    <div class="hourly">
      <div class="hour-name">${hourVal}</div>
      <i class="${codeClass} mi-4x"></i>
      <div class="hourly-temp">${Math.round(hour.feels_like)}°</div>
    </div>
    `;
  });
  forecast.insertAdjacentHTML('beforeend', hourHtml);
};
const renderAll = function (currentdata, fullData) {
  Helper.setTimezone(fullData.timezone);
  renderTemplate();
  renderCurrent(currentdata, fullData.daily[0]);
  renderSide(currentdata);
  renderDaily(fullData.daily);
};

export { renderTemplate, renderHourly, renderAll, renderDaily };
