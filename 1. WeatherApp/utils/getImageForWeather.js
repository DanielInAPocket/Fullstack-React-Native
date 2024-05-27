/* eslint-disable global-require */

export default weatherStateId => {
  if(weatherStateId >= 200 && weatherStateId <= 299) {
    return require('../assets/thunderstorm.png');
  } else if(weatherStateId >= 300 && weatherStateId <= 299) {
    return require('../assets/drizzle.png');
  } else if(weatherStateId >= 500 && weatherStateId <= 501 || weatherStateId >= 512 && weatherStateId <= 599) {
    return require('../assets/rain.png');
  } else if(weatherStateId >= 502 && weatherStateId <= 511) {
    return require('../assets/heavy-rain.png');
  } else if(weatherStateId == 611 || weatherStateId == 612) {
    return require('../assets/sleet.png');
  } else if(weatherStateId >= 600 && weatherStateId <= 610 || weatherStateId >= 613 && weatherStateId <= 699) {
    return require('../assets/snow.png');
  } else if(weatherStateId >= 700 && weatherStateId <= 799) {
    return require('../assets/mist.png');
  } else if(weatherStateId == 801) {
    return require('../assets/few-cloud.png');
  } else if(weatherStateId == 802) {
    return require('../assets/scattered-clouds.png');
  } else if(weatherStateId == 803 || weatherStateId == 804) {
    return require('../assets/broken-cloud.png');
  } else {
    return require('../assets/clear-sky.png');
  }
}
