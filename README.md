React Native applications that are implemented as part of reading the "Fullstack React Native - The Complete Guide to React Native" book written by Devin Abbott, Houssein Djirdeh, Anthony Accomazzo and Sophia Shoemaker.

All apps in this repository were initially implemented back in March of 2019 using:
- "expo": "^32.0.0",
- "react": "16.5.0",
- "react-native": "https://github.com/expo/react-native/archive/sdk-32.0.0.tar.gz",

**NOTE 27-05-2024:** Applications were refactored to be launch-able with the up to date versions of React-Native and Expo.

## Applications

### WeatherApp
WeatherApp allows the users to search for any city and view its current weather forecast.

**NOTE:** WeatherApp requires OpenWeatherMap API key with "Current Weather Data" capabilities to work properly. You can genenrate one for yourself on [OpenWeatherMap web page](https://openweathermap.org/api). It should be inserted into `WeatherApp/utils/api.js` file as `appID`.

### TimerApp
TimerApp is a time-tracking app in which user can add, delete and modify various timers. Each timer correspond to a different task that the user would like to keep time for

## Get Started

1. Navigate to app Directory

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
    npx expo start
   ```
