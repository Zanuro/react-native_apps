import { Image, StyleSheet, View, Text} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

import formatElapsedTime from '../utils/formatElapsedTime';

export default function Stats({ time, moves }) {
    return (
        <View style={styles.container}>
            <View style={styles.labels}>
                <Text style={[styles.text, styles.textMargin]}>Time</Text>
                <Text style={styles.text}>Moves</Text>
            </View>
            <View style={styles.values}>
                <Text style={[styles.text, styles.textMargin, styles.value]}>{formatElapsedTime}</Text>
                <Text style={[styles.text, styles.values]}>{moves.toString()}</Text>
            </View>
        </View>
    )
}

Stats.propTypes = {
    time: PropTypes.number.isRequired,
    moves: PropTypes.number.isRequired
};

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
      },
      labels: {
        alignItems: 'flex-end',
        marginRight: 15,
      },
      values: {
        alignItems: 'flex-end',
        minWidth: 56,
      },
      text: {
        fontSize: 24,
        color: '#69B8FF',
        backgroundColor: 'transparent',
      },
      value: {
        fontWeight: 'bold',
      },
      textMargin: {
        marginBottom: 10,
      },
})