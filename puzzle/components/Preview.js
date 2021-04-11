import { Image, StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

import { calculateItemSize, itemMargin } from '../utils/grid';


export default function Preview({ image, boardSize }){


    const itemSz = calculateItemSize(boardSize);
    const scaledSz = itemSz < 80 ? itemSz * 2 + itemMargin : itemSz;

    const style = {
        width: scaledSz,
        height: scaledSz,
    };


    return (
        <View style={styles.container}>
            <Image style={[styles.image, style]} source={image}/>
        </View>
    )
}

Preview.propTypes = {
    image:Image.propTypes.source,
    boardSize: PropTypes.number.isRequired,
};

Preview.defaultProps = {
    image: null,
};

const styles = StyleSheet.create({
container: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#1F1E2A',
    },
    image: {
    resizeMode: 'contain',
    },
})