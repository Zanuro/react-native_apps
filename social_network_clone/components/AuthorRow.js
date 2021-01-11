import React from 'react';

import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {PropTypes} from "prop-types";

import Avatar from './Avatar';
import getAvatarColor from '../utils/getAvatarColor';
import getInitials from '../utils/getInitials';

export default function AuthorRow({ fullname, linkCom, onPressLinkCom }) {

    return (
        <View style={styles.container}>
            <Avatar size={35} userInitials={getInitials(fullname)} backgroundColor={getAvatarColor()}/> 
            <Text style={styles.text} numberOfLines={1}>{fullname}</Text>
            {!!linkCom && (
                <TouchableOpacity onPress={onPressLinkCom}>
                    <Text numberOfLines={1}>{linkCom}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

AuthorRow.propTypes = {
    fullname: PropTypes.string.isRequired,
    linkCom: PropTypes.string.isRequired,
    onPressLinkCom: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    text: {
        flex: 1,
        marginHorizontal: 6,
    }
});
