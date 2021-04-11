import React from 'react';

import { StyleSheet, View, TouchableHighlight, TouchableOpacity, Image, Text, ColorPropType } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';


export default function ContactThumbnail({ name, phone, avatar, textColor, onPress}){
    const colorStyle = {
        color: textColor,
    };

    const ImageComponent = onPress ? TouchableOpacity: View;

    return (
        <View style={styles.container}>
            <ImageComponent onPress={onPress}>
                <Image source = {{
                    uri:avatar,
                }}
                style={styles.avatar} />
            </ImageComponent>
            {name !== '' && <Text style={[styles.name,colorStyle]}>{name}</Text>}

            {phone !== '' && (
                <View style={styles.phoneSection}>
                    <Icon name="phone" size={15} style={{ color: textColor }} />
                    <Text style={[styles.phone, colorStyle]}>{phone}</Text>
                </View>
            )}
        </View>
    )
}

ContactThumbnail.defualtProps = {
    name: '',
    phone: '',
    textColor: 'white',
    onPress: null,
};

ContactThumbnail.propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string,
    avatar: PropTypes.string.isRequired,
    textColor: ColorPropType,
    onPress: PropTypes.func,
};


const styles = StyleSheet.create({

    container: {
        paddingVertical: 25,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 1,
    },
    name: {
        fontSize: 15,
        marginTop: 20,
        marginBottom: 3,
        fontWeight: 'bold',
    },
    phoneSection: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    phone: {
        marginLeft: 5,
        fontSize: 15,
        fontWeight: 'bold',
    },
});