import React from 'react';
import {StyleSheet, View, Text , FlatList} from 'react-native';
import {PropTypes} from "prop-types";

import { getImageFromId } from '../utils/api';
import Card from './Card';

const keyExtractor = ({ id }) => id.toString();

export default class CardList extends React.Component{

    static propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                author: PropTypes.string.isRequired,
            }),
        ).isRequired,
        commentsForItem: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
        onPressComments: PropTypes.func.isRequired,
    };


    renderItem = (obj) => {
        const id = obj.item.id;
        const author = obj.item.author;
        const { commentsForItem, onPressComments } = this.props;
        const comments = commentsForItem[id];
        return (
            <Card fullname ={author} image={{uri : getImageFromId(id)}} 
            linkCom={`${comments ? comments.length : 0} Comments`}
            onPressLinkCom={() => onPressComments(id)}/>
        )
    }

    render(){
        const { items, commentsForItem } = this.props;
        return (
            <FlatList data={items} renderItem={this.renderItem} 
            keyExtractor={keyExtractor} extraData={commentsForItem}/>
        );
    }
};


