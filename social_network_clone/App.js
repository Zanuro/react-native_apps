import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AyncStorage, Modal, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Feed from './screens/Feed';
import Comments from './screens/Comments';
import { checkPropTypes } from 'prop-types';

const ASYNC_STORAGE_COMMENTS_KEY = 'this_is_the_proper_key';

export default class App extends React.Component {

  state = {
    commentsForItem: {},
    showModal: false,
    itemId: null,
  }

  async componentDidMount(){
    try{
      const commentsForItem = await AsyncStorage.getItem(
        ASYNC_STORAGE_COMMENTS_KEY);

      this.setState({
        commentsForItem: commentsForItem ? JSON.parse(commentsForItem) : {},
      });
    }
    catch(err){
      console.log('There has been an error while loading comments!');
    }
  }

  openModalItem = id => {
    this.setState({
      showModal: true,
      itemId: id,
    })
  }

  closeCommentScreen = () => {
    this.setState({
      showModal: false,
      itemId: null,
    })
  }
  onSubmitComment = (text) => {
    const {itemId, commentsForItem } = this.state;
    const comments = commentsForItem[itemId] || [];

    const updated = {
      ...commentsForItem,
      [itemId]: [...comments, text],
    };

    this.setState({
      commentsForItem: updated,
    });

    try{
      AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updated));
    }
    catch(err){
      console.log(`Failed to save comment: ${text} for ${itemId}`);
    }
  }
  
  render(){
    const { commentsForItem, showModal, itemId } = this.state;

    return (
      <View style={styles.container}>
      <Feed style={styles.feed} 
      commentsForItem={commentsForItem}
      onPressComments={this.openModalItem}/>
      <Modal visible={showModal} animationType="slide" onRequestClose={this.closeCommentScreen}> 
        <Comments style={styles.comments} comments={commentsForItem[itemId] || []}
        onClose={this.closeCommentScreen} 
        onSubmitComment={this.onSubmitComment}/>
      </Modal>
      </View>
    )
  }

}

const platformVerion = Platform.OS === 'ios' ? parseInt(Platform.Version, 10) : Platform.Version;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feed : {
    flex: 1,
    marginTop: Platform.OS === 'android' || platformVerion < 14 ? StatusBar.currentHeight : 0,
  },
  comments: {
    flex: 1,
    marginTop: Platform.OS === 'ios' && platformVerion < 11 ? StatusBar.currentHeight : 0
  },
});
