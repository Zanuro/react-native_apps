import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  render() {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={[styles.largeText, styles.textStyle]}>Brasilia</Text>
        <Text style={[styles.smallText, styles.textStyle]}>Nubes y borasca</Text>
        <Text style={[styles.largeText, styles.textStyle]}>20°</Text>
        <SearchInput placeholder="Search any city" />
        </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  }
});
