import React from 'react';

import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';

import {PropTypes} from "prop-types";
import AuthorRow from './AuthorRow';

export default class Card extends React.Component{
    static propTypes = {
        fullname: PropTypes.string.isRequired,
        linkCom: PropTypes.string,
        onPressLinkCom: PropTypes.func,
        image: Image.propTypes.source.isRequired,
    };

    static defaultProps = {
        linkCom: '',
        onPressLinkCom: () => {},
    };

    state = {
        loading: true,
    };
    
    handleLoad = () => {
        this.setState( {loading: false });
    }

    // re-render only if the comments to display changes
    shouldComponentUpdate(nextProps){
        return this.props.linkCom !== nextProps.linkCom
    }

    render(){
        const { fullname, linkCom, onPressLinkCom, image} = this.props;
        const { loading } = this.state;
        return (
            <View>
                <AuthorRow fullname={fullname} linkCom={linkCom} onPressLinkCom={onPressLinkCom} />
                <View style={styles.image}>{loading && (
                    <ActivityIndicator style={StyleSheet.absoluteFill} size={'large'}/>
                )}
                <Image style={StyleSheet.absoluteFill} source={image} onLoad={this.handleLoad}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        aspectRatio: 1,
        backgroundColor: 'rgba(0,0,0,0.02)',
    }
});
