import { Text, StatusBar, View, Platform, StyleSheet} from 'react-native';
//import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import NetInfo from '@react-native-community/netinfo';

import React from 'react';

const statusHeight = (Platform.OS === 'ios' ? getStatusBarHeight() : 0);
/*
const subscribe = NetInfo.addEventListener('connectionChange', (status) => {
    console.log('Network status changed', status)
});*/

export default class Status extends React.Component{
    
    state = {
        conInfo: 'none',
    };
    
    /*
    async componentDidMount() {
        this.subscribe = NetInfo.addEventListener('connectionChange', this.handleChange);
    
        const info = await NetInfo.getConnectionInfo();
        console.log(info);
        this.setState({
            conInfo: info
        });

        //setTimeout(() => this.handleChange('none', 3000));
    }

    componentWillUnmount(){
        this.subscribe.remove();
    }

    handleChange = (info) => {
        this.setState({
            conInfo: info
        });
    }*/



    render(){
        
        const { conInfo } = this.state;
        //console.log(conInfo);

        const isCon = conInfo !== 'none';
        const backgroundColor = isCon ? 'white' : 'red';
        
        const statusBar = (
            <StatusBar backgroundColor={backgroundColor}
            barStyle={isCon ? 'dark-content' : 'light-content'}
            animated={false} />
        );

        const messageConnectivity = (
            <View style={styles.messageConnectivity} pointerEvents={'none'}>
                {statusBar}
                {!isCon && (
                    <View style={styles.bubbleMesg}>
                        <Text style={styles.text}>No network connection!</Text>
                    </View>
                )}
            </View>
        )

        if(Platform.OS === 'ios'){
            return <View style={[styles.status, { backgroundColor }]}>{messageConnectivity}</View>
        }   

        return messageConnectivity;
    }
}

const styles = StyleSheet.create({
    status:{
        zIndex: 1,
        height: statusHeight,
    },
    messageConnectivity: {
        zIndex: 1,
        position: 'absolute',
        top: statusHeight + 20,
        right: 0,
        left: 0,
        height: 80,
        alignItems: 'center',
    },
    bubbleMesg: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'red',
    },
    text: {
        color: 'white',
    }
})