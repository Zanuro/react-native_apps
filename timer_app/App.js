import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import {v4 as uuidv4} from 'uuid';

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';

export default class App extends React.Component {

  state = {
    timers: [
      {
        title: 'Do thing one',
        project: 'General',
        id: uuidv4(),
        elapsed: 54000,
        isRunning: true,
      },
      {
        title: 'Do thing two',
        project: 'General',
        id: uuidv4(),
        elapsed: 64321,
        isRunning: false,
      },
    ]
  };

  render (){
    const { timers } = this.state;
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleCointainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm/>
          {timers.map(({ title, project, id, elapsed, isRunning}) => (
            <EditableTimer
            key={id} id={id} title={title} project={project} elapsed={elapsed} isRunning={isRunning} />
          ))}
        </ScrollView>
      </View>
    );
  }
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
