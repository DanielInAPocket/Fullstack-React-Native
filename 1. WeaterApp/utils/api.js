const appID = '198cad16bbc70a81dae4498382d65b96';
const unitsType = 'metric';

export const fetchWeather = async city => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitsType}&appid=${appID}`,
  );

  const { name, weather, main } = await response.json();

  const currentTemperature = main.temp;
  const currentWeatherState = weather[0].main;
  const currentWeatherStateId = weather[0].id;

  return {
    location: city,
    weatherState: currentWeatherState,
    weatherStateId: currentWeatherStateId,
    temperature: currentTemperature,
  };
};
