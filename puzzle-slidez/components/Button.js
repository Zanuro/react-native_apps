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

    constructor(props){

        super(props);

        const { disabled } = props;

        this.state = { pressed: false };
        this.value = new Animated.Value(getVal(false, disabled));

    }
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
        color: '#A96DDE',
        fontSize: 24,
        borderRadius: 80,
    }


    updateVal(nextProps, nextState){

        if(
            this.props.disabled !== nextProps.disabled ||
            this.state.pressed !== nextState.pressed
        ){
            Animated.timing(this.value, {
                duration: 200,
                toValue: getVal(nextState.pressed, nextProps.disabled),
                easing: Easing.out(Easing.quad),
                useNativeDriver: false,
            }).start();
        }
    }


    UNSAFE_componentWillUpdate(nextProps, nextState){
        this.updateVal(nextProps, nextState);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState){
        this.updateVal(nextProps, nextState);
    }

    handlePressIn = () => {
        this.setState({pressed: true});
    }

    handlePressOut = () => {
        this.setState({pressed: false});
    }

    render(){
        const { props: {
            title, onPress, color, height, borderRadius, fontSize
        }} = this;

        const animatedColor = this.value.interpolate({
            inputRange: [0, 1],
            outputRange: ['black', color],
        });

        const animatedScale = this.value.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
        });

        const containerStyle = {
            borderColor: animatedColor,
            borderRadius,
            height,
            transform: [{scale:animatedScale }],
        }
        const titleStyle = {
            color:animatedColor,
            fontSize,
        }


        return (
            <TouchableWithoutFeedback onPress={onPress} onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
                <Animated.View style={[styles.container, containerStyle]}>
                    <Animated.Text style={[styles.title, titleStyle]}>
                        {title}
                    </Animated.Text>
                </Animated.View>
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
        color: '#A96DDE',
      }
});