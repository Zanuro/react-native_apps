import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

var httpBridge = require('react-native-http-bridge');

export default class App extends React.Component {

  constructor(props){
    super(props);
  }
  componentWillMount(){
    httpBridge.start(5561, req => {
      if (req.type === "GET" && req.url.split("/")[1] === "users") {
        httpBridge.respond(req.requestId, 200, "application/json", "{\"message\": \"OK\"}");
      } else {
        httpBridge.respond(req.requestId, 400, "application/json", "{\"message\": \"Bad Request\"}");
      }
  });
  }

  componentWillUnmount(){
    httpBridge.stop();
  }
  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>URL Shortener!</Text>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
});
