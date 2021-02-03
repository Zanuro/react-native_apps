import React from 'react';

import Grid from './Grid';
import PropTypes from 'prop-types';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

const keyExtractor = ({ uri }) => uri;

export default class ImageGrid extends React.Component{

    
    static propTypes = {
        onPressImage: PropTypes.func,
    };

    static defaultProps = {
        onPressImage: () => {},
    };


    loading = false;
    cursor = null;

    state = {

        images: [],
    };

    componentDidMount(){
        this.getImages();
    }

    getImages = async (after) => {

        const { status } = await MediaLibrary.requestPermissionsAsync();

        if ( status !== 'granted'){
            console.log('Not granted!');
            return;
        }
        
        if(this.loading) return;

        this.loading = true;


        const results = await MediaLibrary.getAssetsAsync({
            first: 20,
            after,
        });

        const {assets} = results;

        var loadedImages = [];

        assets.map((item) => loadedImages.push({id: item.id, uri: item.uri}));

        //console.log(loadedImages);

        this.setState(
            {
                images: this.state.images.concat(loadedImages),
            },
            () => {
                this.loading = false;
            }
        )

    }

    getNextImages = () => {

        if(!this.cursor) return;

        this.getImages(this.cursor);
    };

    renderItem = ({ item: { uri }, size, marginLeft, marginTop }) => {
        
        const { onPressImage } = this.props;

        const style = {
            width: size,
            height: size,
            marginLeft,
            marginTop,
        };

        return ( 
        <TouchableOpacity key={uri}
        activeOpacity={0.75}
        onPress={() => onPressImage(uri)}
        style={style}>
            <Image source={{ uri }} style={styles.image} />
        </TouchableOpacity>
        
        );
    };

    render(){

        const { images } = this.state;

        return (
            <Grid 
            data={images} 
            renderItem={this.renderItem} 
            keyExtractor={keyExtractor}
            onEndReached={this.getNextImages} />
            );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
});