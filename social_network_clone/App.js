import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Feed from './screens/Feed';

const items = [
  { id: 0, author: 'Abra Kadbra'},
  { id: 1, author: 'Ab Ba'},
  { id: 2, author: 'BB CC'},
];

export default class App extends React.Component {

  render(){
    return (
      <View style={styles.container}>
      <Feed style={styles.feed} />
      </View>
    )
  }

}

const platformVerion = Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : Platform.Version;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feed : {
    flex: 1,
    marginTop: Platform.OS === 'android' || platformVerion < 14 ? StatusBar.currentHeight : 0,
  }
});
