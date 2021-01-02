import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableHighlightBase } from 'react-native';
import PropTypes from 'prop-types';
import TimerButton from './TimerButton';

export default class TimerForm extends React.Component{

    static propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        project: PropTypes.string,
        timeLimit: PropTypes.number,
        onFormSubmit: PropTypes.func.isRequired,
        onFormClose: PropTypes.func.isRequired,
    };
    
    static defaultProps = {
        id: null,
        title: '',
        project: '',
        timeLimit: null,
    };

    constructor(props){
        super(props);

        const { id, title, project, timeLimit } = props;

        this.state = {
            title: id ? title : '',
            project: id ? project : '',
            timeLimit: id ? timeLimit : null,
        };
    }

    handleChangeTitle = (title) => {
        this.setState({ title: title});
    }

    handleChangeProject = (project) => {
        this.setState({ project: project});
    }

    handleChangeTimeLimit = (timeLimit) => {
        var integer = parseInt(timeLimit, 10);
        this.setState({ timeLimit: integer});
    }


    handleSubmit = () =>{
        const { title, project, timeLimit } = this.state;
        const { id, onFormSubmit } = this.props;

        onFormSubmit({
            id,
            title,
            project,
            timeLimit,
        });
    };

    render (){
        const { id, onFormClose } = this.props;
        const { title, project, timeLimit } = this.state;
        const  submitText =  id ? 'Update' : 'Create';
        return (
            <View style={styles.formContainer}>
                <View style={styles.attributeContainer}>
                    <Text style={styles.textInputTitle}>Title</Text>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} underlineColorAndroid="transparent"
                    value={title} onChangeText={this.handleChangeTitle}/>           
                </View>
                </View>
    
                <View style={styles.attributeContainer}>
                    <Text style={styles.textInputTitle}>Project</Text>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} underlineColorAndroid="transparent"
                    value={project} onChangeText={this.handleChangeProject}/>           
                </View>
                </View>

                <View style={styles.attributeContainer}>
                    <Text style={styles.textInputTitle}>Time Limit(s)</Text>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} underlineColorAndroid="transparent"
                    value={timeLimit} onChangeText={this.handleChangeTimeLimit} maxLength={4} keyboardType='numeric'/>           
                </View>
                </View>
                <View style={styles.buttonGroup}>
                    <TimerButton small color="21BA45" title={submitText} onPress={this.handleSubmit}/>
                    <TimerButton small color="DB2828" title="Cancel" onPress={onFormClose}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: 'white',
        borderColor: '#D6D7DA',
        borderWidth: 2,
        borderRadius: 8,
        padding: 15,
        margin: 15,
        marginBottom: 0
    },
    attributeContainer: {
        marginVertical: 10,
    },
    textInputContainer: {
        borderColor: '#D6D7DA',
        borderRadius: 2,
        borderWidth: 1,
        marginBottom: 5,
    },
    textInput: {
        height: 35,
        padding: 8,
        fontSize: 13,
    },
    textInputTitle:{
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});