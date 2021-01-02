import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Button, Alert, Vibration } from 'react-native';

import {v4 as uuidv4} from 'uuid';

import { newTimer } from './utils/TimerUtils';

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';

export default class App extends React.Component {

  state = {
    timers: []
  };


  componentDidMount(){
    const TIME_STEP = 1000;

    this.intervals = setInterval(() => {
      const {timers} = this.state;

      this.setState({
        timers: timers.map(timer => {
          const { elapsed, isRunning, timeLimit } = timer;

          if(timeLimit != 0 && elapsed === (timeLimit*1000)){     // multiply by 1000 to convert s to ms
            this.timeLimitAlert(timer);
            return{
              ...timer,
              isRunning: false,
              elapsed: elapsed + 1,
          }
          }
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
          const { title, project, timeLimit } = attrs;
          return {
            ...timer,
            title,
            project,
            timeLimit,
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

  timeLimitAlert = (timer) => {

    const ONE_SECOND_IN_MS = 1000;

    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS
    ];
    this.startVibrationAlert(PATTERN, true);
    Alert.alert(
      "Time Limit",
      `Time Limit of timer: ${timer.title} has been surpassed!`,
      [
        {
          text: "Cancel Task",
          onPress: () => this.cancelTask(timer), // Eliminate task X
          style: "cancel"
        },
        { text: "Ok", onPress: () =>  this.stopVibrationAlert()} // Continue
      ],
      { cancelable: false }
    );
  }

  cancelTask = (timer) => {
      this.stopVibrationAlert();
      this.setState({
        timers: this.state.timers.filter(time => time.id !== timer.id)
      });

  }

  startVibrationAlert = (duration) => {
    Vibration.vibrate(duration, true);
  };

  stopVibrationAlert = () => {
    Vibration.cancel();
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
          {timers.map(({ title, project, timeLimit, id, elapsed, isRunning}) => (
            <EditableTimer
            key={id} id={id} title={title} project={project} timeLimit={timeLimit} elapsed={elapsed} isRunning={isRunning} onFormSubmit={this.handleFormSubmit} onRemovePress={this.handleRemoveTimer} onStartPress={this.handleTimeChange} onStopPress={this.handleTimeChange}/>
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
