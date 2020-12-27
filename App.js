import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api';
import obtainImage from './utils/obtainImage';

import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      location: '',
      temperature: 0,
      weather: '',
      humidity: 0,
      minTemp: 0,
      maxTemp: 0,
      time: '',
      n_time: '',
    };
  }

  componentDidMount() {
    this.handleUpdateLocation('San Francisco');
    this.intervalID = setInterval(
      () => this.showTime(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  showTime = () => {  

    var date = this.state.n_time.split(":");
    var h = parseInt(date[0]);
    var m = parseInt(date[1]);
    var s = parseInt(date[2]);


    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s;
    var seconds = time.split(':').reduce((acc, time) => (60 * acc) + +time);
    this.setState({ time: time});
    var new_time = new Date((seconds+1) * 1000).toISOString().substr(11, 8)
    this.setState({ n_time: new_time });
    //setInterval(this.showTime(new_time), 1000);
  }

  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature, humidity, minTemp, maxTemp, time } = await fetchWeather(
          locationId,
        );
        //this.showTime(time);
        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
          humidity,
          minTemp,
          maxTemp,
          time,
          n_time: time,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };

  render() {
    const { loading, error, location, weather, temperature, humidity, minTemp, maxTemp, time, n_time } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={obtainImage(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />

            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Please try with another city!
                  </Text>
                )}

                {!error && (
                  <View>
                    <View>
                      <Text style={[styles.largeText, styles.textStyle, styles.clock]}>
                      {time}
                      </Text>
                    </View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {`${Math.round(temperature)}°`}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      Min: {`${Math.round(minTemp)}°`}   Hum: {humidity}%   Max: {`${Math.round(maxTemp)}°`}
                    </Text>
                  </View>
                )}

                <SearchInput
                  placeholder="Search any city"
                  onSubmit={this.handleUpdateLocation}
                />
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
  clock: {
    position: 'absolute',
    bottom: '50%',
    left: '20%',
    color: '#17D4FE',
    fontSize: 40,
    fontFamily: 'Helvetica',
    letterSpacing: 7,
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
  },
});