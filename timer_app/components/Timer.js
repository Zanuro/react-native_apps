import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {milisecondsToHuman} from '../utils/TimerUtils';
import TimerButton from './TimerButton';

export default class Timer extends React.Component{

    handleRemoveForm = () => {
        const { id, onRemovePress} = this.props;
        onRemovePress(id);
    }

    handleStartPress = () => {

        const { id, onStartPress } = this.props;
        onStartPress(id);
    }

    handleStopPress = () => {
        const { id, onStopPress } = this.props;
        onStopPress(id);
    }

    renderStartStopButton() {
        const { isRunning } = this.props;

        if(isRunning){
            return (
                <TimerButton color="#DB2828" title="Stop" onPress={this.handleStopPress}/>
            )
        }
        return (
            <TimerButton color="#21BA45" title="Start" onPress={this.handleStartPress}/>

        )
    }

    render(){
    const { elapsed, title, project, onEditPress } = this.props;
    const elapsedStr = milisecondsToHuman(elapsed);
    
    return (
        <View style={styles.timerContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text>{project}</Text>
            <Text style={styles.elapsedTime}>{elapsedStr}</Text>
            <View style={styles.buttonGroup}>
                <TimerButton color="blue" small title="Edit" onPress= {onEditPress}/>
                <TimerButton color="blue" small title="Remove" onPress={this.handleRemoveForm}/>
            </View>
            {this.renderStartStopButton()}
        </View>
    )    
    }
}

const styles = StyleSheet.create({
    timerContainer: {
        backgroundColor: 'white',
        borderColor: '#d6d7da',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    elapsedTime: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

