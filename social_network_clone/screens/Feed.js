import {ActivityIndicator, Text, ViewPropTypes, SafeAreaView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import { fetchImgs } from '../utils/api';

import CardList from '../components/CardList';

export default class Feed extends React.Component {
    static propTypes = {
        style: ViewPropTypes.style,
        commentsForItem: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
        onPressComments: PropTypes.func.isRequired,
    };

    static defaultProps = {
        style: null,
    };

    state = {
        loading: true,
        error: false,
        items: [],
    };

    async componentDidMount(){
        try{
            const items = await fetchImgs();
            this.setState({
                loading: false,
                items,
            });
        }
        catch(e){
            this.setState({
                loading:false,
                error:true,
            })
        }
    }

    render(){
        const { style, commentsForItem, onPressComments } = this.props;
        const { loading, error, items } = this.state;

        if (loading) {
            return <ActivityIndicator size="large" />;
        }

        if (error){
            return <Text>There has besen an error!</Text>;
        }

        return (
            <SafeAreaView style={style}>
                <CardList items={items} commentsForItem={commentsForItem}
                onPressComments={onPressComments}/>
            </SafeAreaView>
        )





    }


}