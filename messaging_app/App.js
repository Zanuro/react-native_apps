import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, StyleSheet, Text, View, Image, TouchableHighlight, BackHandler } from 'react-native';
import Status from './components/Status';

import ImageGrid from './components/ImageGrid';

import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import { createTextMessage, createImageMessage, createLocationMessage} from './utils/MessageUtils';

import KeyboardState from './components/KeyboardState';
import MessagingContainer, { INPUT_METHOD } from './components/MessagingContainer';
import MeasureLayout from './components/MeasureLayout';

export default class App extends React.Component{


  state = {
    // Initial messages
    messages: [
      createImageMessage('https://unsplash.it/id/410/500/500.jpg'),
      createTextMessage('Hello, how are you?'),
      createTextMessage('Hello, My name is John'),
      createLocationMessage({
        latitude: 44.4268,
        longitude: 26.1025,
      }),
    ],
    fullscreenImageId: null,
    isInputFocused: false,
    inputMethod: INPUT_METHOD.NONE,
  };

  componentDidMount() {
    this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      const { fullscreenImageId } = this.state;

      if(fullscreenImageId){
        this.dismissFullscreenImage();
        return true;
      }

      return false;
    });
  }

  componentWillUnmount(){
    this.subscription.remove();
  }

  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null});
  }

  handlePressToolbarCamera = () => {

    this.setState({
      isInputFocused: false,
      inputMethod: INPUT_METHOD.CUSTOM,
    });
  }

  handlePressToolbarLocation = () => {

    const { messages } = this.state;

    navigator.geolocation.getCurrentPosition((position) => {
      const { coords: {latitude, longitude} } = position;

      this.setState({
        messages:[
          createLocationMessage({
            latitude,
            longitude,
          }),
          ...messages,
        ],
      });
    });
  }

  handleChangeFocus = (isFocused) => {
    this.setState({ isInputFocused: isFocused });
  };

  handleSubmit = (text) => {
    const { messages } = this.state;

    this.setState({
      messages: [createTextMessage(text), ...messages],
    })
  }

  handlePressImage = (uri) => {
    const {messages} = this.state;

    this.setState({
      messages: [createImageMessage(uri), ...messages],
    });
  }


  handlePressMessage = ({id, type}) => {

    switch (type){
      case 'text':
        Alert.alert('Delete this message?', 
        'Are you absolutely sure you want to delete this message?',
        [
          {
            text: 'Cancel',
            style:'cancel'
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              const { messages } = this.state;
              this.setState({ messages: messages.filter(message => message.id !== id)})
            }
          }
        ]);
        break;
      case 'image':
        this.setState({ fullscreenImageId : id, isInputFocused: false });
        break;
      default:
        break;
    }
  };

  handleChangeInputM = (inputM) => {
    this.setState({inputMethod : inputM});
  }


  renderToolbar(){

    const { isInputFocused } = this.state;

    return (
      <View style={styles.toolbar}>
        <Toolbar
        isFocused={isInputFocused}
        onSubmit={this.handleSubmit}
        onChangeFocus={this.handleChangeFocus}
        onPressCamera={this.handlePressToolbarCamera}
        onPressLocation={this.handlePressToolbarLocation}
        />
      </View>
    )

  }

  renderFullScreenImage = () => {
    const { messages, fullscreenImageId } = this.state;

    if(!fullscreenImageId) return null;

    const image = messages.find(message => message.id === fullscreenImageId);

    if(!image) return null;

    const { uri } = image;

    return (
      <TouchableHighlight style={styles.fullscreenOverlay} onPress={this.dismissFullscreenImage}>
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  }


  renderMessageList(){
    
    const { messages } = this.state;

    return (
    <View style={styles.content}>
      <MessageList messages={messages} onPressMessage={this.handlePressMessage}/>
    </View>
    );
  }
  renderInputMethodEditor = () => (
    <View style={styles.inputEdit}>
      <ImageGrid onPressImage={this.handlePressImage}/>
    </View>
  ); 

  render(){

    const { inputMethod } = this.state;

    return(

      <View style={styles.container}>
        <Status />
        <MeasureLayout>
          {layout => (
            <KeyboardState layout={layout}>
              {keyboardInfo => (
                <MessagingContainer {...keyboardInfo} inputMethod={inputMethod}
                onChangeInputMethod={this.handleChangeInputM} renderInputMethodEditor={this.renderInputMethodEditor}>
                  {this.renderMessageList()}
                  {this.renderToolbar()}                  
                </MessagingContainer>
              )}
            </KeyboardState>
          )}
        </MeasureLayout>  
        {this.renderFullScreenImage()}
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputEdit: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  }
});
