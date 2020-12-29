import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {milisecondsToHuman} from '../utils/TimerUtils';
import TimerButton from './TimerButton';

export default function Timer({ title, project, elapsed}){
    const elapsedStr = milisecondsToHuman(elapsed);

    return (
        <View style={styles.timerContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text>{project}</Text>
            <Text style={styles.elapsedTime}>{elapsedStr}</Text>
            <View style={styles.buttonGroup}>
                <TimerButton color="blue" small title="Edit"/>
                <TimerButton color="blue" small title="Remove"/>
            </View>
            <TimerButton color="#21BA45" title="Start"/>
        </View>
    )    
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

