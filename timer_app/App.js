import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';

import {v4 as uuidv4} from 'uuid';

import { newTimer } from './utils/TimerUtils';

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


  componentDidMount(){
    const TIME_STEP = 1000;

    this.intervals = setInterval(() => {
      const {timers} = this.state;

      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning } = timer;

          return {
            ...timer,
            elapsed: isRunning ? elapsed + TIME_STEP : elapsed,
          };
        })
      })
    }, TIME_STEP);
  }

  
  componentWillUnmount(){
    clearInterval(this.intervals);
  }


  handleCreateFormSubmit = timer => {
    const { timers } = this.state;

    this.setState({
      timers: [newTimer(timer), ...timers], /*immutable way to add a new timer using the spread operator */
    });
  }

  handleFormSubmit = attrs => {

    const { timers } = this.state;

    this.setState({
      timers: timers.map(timer => {
        if(timer.id === attrs.id){
          const { title, project } = attrs;

          return {
            ...timer,
            title,
            project,
          };
        }

        return timer;
      }),
    });
  }

  handleRemoveTimer = timerid => {
    this.setState({
      timers: this.state.timers.filter(timer => timer.id !== timerid)
    });
  }

  handleTimeChange = timerid => {

    this.setState(prevState => {
      const { timers } = prevState;

      return {
        timers: timers.map(timer => {
          const {id , isRunning } = timer;

          if (id === timerid){
            return{
              ...timer,
              isRunning: !isRunning,
            }
          }

          return timer;
        })
      }
    })
  };


  render (){
    const { timers } = this.state;
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleCointainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.timerListContainer}>
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit}/>
          {timers.map(({ title, project, id, elapsed, isRunning}) => (
            <EditableTimer
            key={id} id={id} title={title} project={project} elapsed={elapsed} isRunning={isRunning} onFormSubmit={this.handleFormSubmit} onRemovePress={this.handleRemoveTimer} onStartPress={this.handleTimeChange} onStopPress={this.handleTimeChange}/>
          ))}
        </ScrollView>
        </KeyboardAvoidingView>
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
  timerListContainer:{
    flex: 1,
  }
});
