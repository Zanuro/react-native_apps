import React from 'react';
import {StyleSheet, View, Text } from 'react-native';

import TimerForm from './TimerForm';
import TimerButton from './TimerButton';

export default class ToggleableTimerForm extends React.Component{

    state = {
        isOpen: false,
    };

    handleFormOpen = () => {
        this.setState({ isOpen: true });
    }

    render(){
        const { isOpen } = this.state;

        return (
            <View style={[styles.container, !isOpen && styles.buttonPadding]}>
                {isOpen ? <TimerForm /> : <TimerButton title="+" color="black" onPress={this.handleFormOpen} />}
            </View>
        );
    }
    
}


const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
    },
    buttonPadding: {
        paddingHorizontal: 15,
    },
})

