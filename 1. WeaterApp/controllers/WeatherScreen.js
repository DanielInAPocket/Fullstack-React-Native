import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Platform, ImageBackground, View, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';

import SearchInput from '../components/SearchInput';
import GLOBALS from '../utils/Globals';
import getImageForWeather from '../utils/getImageForWeather';
import { fetchWeather } from '../utils/api';

export default class WeatherScreen extends React.Component {
  state = {
    loading: false,
    error: false,
    location: '',
    temperature: 0,
    weatherState: '',
    weatherStateId: 0,
  };

  async componentDidMount() {
    try {
      const savedCity = JSON.parse(await AsyncStorage.getItem(GLOBALS.LOCATION_KEY));

      this.handleUpdateLocation(savedCity);
    } catch (e) {
      console.log(e);
    }
  }

  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const { location, weatherState, weatherStateId, temperature } = await fetchWeather(city);

        this.setState({
          loading: false,
          error: false,
          location,
          weatherState,
          weatherStateId,
          temperature,
        }, () => {
          try {
            AsyncStorage.setItem(GLOBALS.LOCATION_KEY, JSON.stringify(city));
          } catch (e) {
            console.log(e);
          }
        });
      } catch (e) {
        console.log(e);
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };

  render() {
    const {
      loading,
      error,
      location,
      weatherState,
      weatherStateId,
      temperature
     } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">

        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weatherStateId)}
          style={styles.imageContainer}
          imageStyle={styles.image} >

          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />

            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different city.
                  </Text>
                )}

                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weatherState}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {`${Math.round(temperature)}°`}
                    </Text>
                  </View>
                )}

                <SearchInput
                  placeholder="Search any city"
                  onSubmit={this.handleUpdateLocation} />
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  }
});
