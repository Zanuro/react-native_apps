import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import EditableForm from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';

export default function App() {
  return (
    <View style={styles.appContainer}>
      <View style={styles.titleCointainer}>
        <Text style={styles.title}>Timers</Text>
      </View>
      <ScrollView style={styles.timerList}>
        <ToggleableTimerForm isOpen={false} />
        <EditableForm id="1" title="First task" 
        project="project 1" elapsed="1000" isRunning/>

        <EditableForm id="2" title="Second task" 
        project="project 2" elapsed="1000" editFormOpen/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleCointainer:{
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList:{
    paddingBottom: 12,
  },
});
