import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, View } from 'react-native';

export default class CommentInput extends React.Component{
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        placeholder: PropTypes.func.toString,
    }

    static defaultPros = {
        placeholder: '',
    };

    state = {
        commentText: '',
    }

    handleChangeText = text => {
        this.setState({
            commentText: text,
        })
    }
    handleSubmitEditing = () => {
        const { onSubmit } = this.props;
        const { commentText } = this.state;


        if(!commentText)
            return;
        
        onSubmit(commentText);

        this.setState({
            commentText: '',
        });
    }

    render(){
        const { placeholder } = this.props;
        const { commentText } = this.state;

        return(
            <View style={styles.container}>
                <TextInput style={styles.input} value={commentText} placeholder={placeholder} onChangeText={this.handleChangeText} onSubmitEditing={this.handleSubmitEditing} underlineColorAndroid="transparent" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        paddingHorizontal: 20,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    input: {
        flex: 1,
    },
})