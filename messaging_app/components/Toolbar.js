import React from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons'; 

export default class Toolbar extends React.Component{

    state = {
        text: '',
    };

    static propTypes = {
        isFocused: PropTypes.bool.isRequired,
        onChangeFocus: PropTypes.func,
        onSubmit: PropTypes.func,
        onPressCamera: PropTypes.func,
        onPressLocation: PropTypes.func,
    };

    static defaultProps = {
        onChangeFocus: () => {},
        onSubmit: () => {},
        onPressCamera: () => {},
        onPressLocation: () => {},
    };


    setInputRef = (ref) => {
        this.input = ref;
    };
    

    UNSAFE_componentWillReceiveProps(nextProps){

        if(nextProps.isFocused !== this.props.isFocused){
            if(nextProps.isFocused){
                this.input.focus();
            }
            else {
                this.input.blur();
            }
        }
    }
    handleFocus = () => {
        const { onChangeFocus } = this.props;
        onChangeFocus(true);
    }

    handleBlur = () => {
        const { onChangeFocus } = this.props;
        onChangeFocus(false);
    }

    handleChangeText = (text) => {
        this.setState({ text });
    };

    handleSubmitEditing = () => {
        const { onSubmit } = this.props;
        const { text } = this.state;

        if(!text) return;

        onSubmit(text);
        this.setState({ text: '' });

    };

    render(){
        const { onPressCamera, onPressLocation } = this.props;
        const { text } = this.state;
        return(
            <View style={styles.toolbar}>
                <ToolbarButton title={"camera"} onPress={onPressCamera}/>
                <ToolbarButton title={"location"} onPress={onPressLocation}/>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} underlineColorAndroid={'transparent'}
                    placeholder={'Write your message!'}
                    blurOnSubmit={false}
                    value={text}
                    onChangeText={this.handleChangeText}
                    onSubmitEditing={this.handleSubmitEditing} 
                    ref = {this.setInputRef}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    />
                </View>
            </View>
        )
    }
}

const ToolbarButton = ({ title, onPress }) => {

    if(title === "camera"){
        return (
            <TouchableOpacity onPress={onPress}>
                <AntDesign name="camera" size={24} color="black"/>
            </TouchableOpacity>
        );
    }
    else if(title === "location"){
        return (
            <TouchableOpacity onPress={onPress}>
                <EvilIcons name="location" size={24} color="black" />
            </TouchableOpacity>
        );
    }
}
    

ToolbarButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    toolbar:{
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 5,
        backgroundColor: 'white',
    },
    button: {
        top: -2,
        marginRight: 12,
        fontSize: 20,
        color: 'grey',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.04)',
        borderRadius: 15,
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(0,0,0,0.02)',
    },
    input: {
        flex: 1,
        fontSize: 18,
    },
});