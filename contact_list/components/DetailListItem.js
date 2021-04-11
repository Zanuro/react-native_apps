import { StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import PropTypes from 'prop-types';

export default function DetailListItem({ name, phone, icon}){
    return (
        <View style={styles.borderContainer}>
            <View style={styles.wrapper}>
                <View styles={styles.container}>
                    {icon && (
                        <Icon name={icon} size={20} style={{color: 'black', marginRight: 15}} />
                    )}
                    <View style={styles.contentContainer}>
                        <Text style={[styles.name]}>{name}</Text>
                        {phone && <Text style={styles.phone}>{phone}</Text>}
                    </View>
                </View>
            </View>
        </View>
    )
}

DetailListItem.propTypes = {
    icon: PropTypes.string,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
};

DetailListItem.defaultProps = {
    icon: null,
};

const styles = StyleSheet.create({
    borderContainer: {
        paddingLeft: 20,
    },
    wrapper: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center'
    },

    name: {
        color: 'black',
        fontWeight: bold,
        fontSize: 15,
    },
    phone: {
        color: 'blue',
        fontSize: 15,
        marginTop: 5,
    },
})