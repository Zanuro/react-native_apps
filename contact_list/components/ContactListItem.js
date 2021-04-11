import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

export default function ContactListItem({ name, number, avatar, onPress}){
    

    return (
        <TouchableHighlight
        underlayColor="grey"
        style={styles.container}
        onPress={onPress}>
            <View style={styles.contactInfo}>
                <Image style={styles.avatar}
                source = {{ uri: avatar }} />
                <View style={styles.details}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.phone}>{phone}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

ContactListItem.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({

    container: {
        paddingLeft: 20,
    },

    contactInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 25,
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    avatar: {
        borderRadius: 20,
        width: 40,
        height: 40,
    },
    details: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 15,
    },
    name: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    },
    phone: {
        color: 'blue',
        fontSize: 13,
        marginTop: 5,
        marginBottom: 3,
    }

})