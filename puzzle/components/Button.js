import { Animated, Image, StyleSheet, View,
    Dimensions, Easing, ColorPropType, Text, TouchableWithoutFeedback } from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';


const getVal = (pressed, disabled) => {
    const base = disabled ? 0.5 : 1;
    const delta = disabled ? 0.1 : 0.3;


    return pressed ? base - delta : base;
};

export default class Button extends React.Component{

    static propTypes = {
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func,
        disabled: PropTypes.bool,
        height: PropTypes.number,
        color: ColorPropType,
        fontSize: PropTypes.number,
        borderRadius: PropTypes.number,
    };

    static defaultProps = {
        onPress: () => {},
        disabled: false,
        height: null,
        color: '#FFFFFF',
        fontSize: 24,
        borderRadius: 80,
    }


    render(){
        const { title, height } = this.props;

        return (
            <TouchableWithoutFeedback>
                <View style={[styles.container, { height }]}>
                    <Text>{title}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1F1E2A',
        borderWidth: 2,
      },
      title: {
        backgroundColor: 'transparent',
        fontSize: 24,
      }
});