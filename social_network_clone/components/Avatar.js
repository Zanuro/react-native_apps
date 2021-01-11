import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {PropTypes} from "prop-types";

export default function Avatar ({ size, backgroundColor, userInitials}){

    const  avatarStyle = {
        width: size,
        height: size,
        backgroundColor: backgroundColor,
        borderRadius: size / 2,
    }
    return ( 
    <View style={[avatarStyle,styles.container]}>
        <Text style={styles.text}>{userInitials}</Text>
    </View>
    )

}

Avatar.propTypes = {
    userInitials: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    //backgroundColor: ColorPropType.isRequired,
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    text :{
        color: 'white',
    }
  });