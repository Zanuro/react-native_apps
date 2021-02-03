import { BackHandler, LayoutAnimation, Platform, UIManager, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

if( Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const INPUT_METHOD = {
    NONE: 'NONE',
    KEYBOARD: 'KEYBOARD',
    CUSTOM: 'CUSTOM',
};

export default class MessagingContainer extends React.Component{
    static propTypes = {
        containerHeight: PropTypes.number.isRequired,
        contentHeight: PropTypes.number.isRequired,
        keyboardWillShow: PropTypes.bool.isRequired,
        keyboardWillHide: PropTypes.bool.isRequired,
        keyboardHeight: PropTypes.number.isRequired,
        keyboardVisible: PropTypes.bool.isRequired,
        keyboardAnimationDuration: PropTypes.number.isRequired,


        inputMethod: PropTypes.oneOf(Object.values(INPUT_METHOD)).isRequired,
        onChangeInputMethod: PropTypes.func,

        children: PropTypes.node,
        renderInputMethodEditor: PropTypes.func.isRequired,
    }

    static defaultProps = {
        children: null,
        onChangeInputMethod: () => {},
    };

    componentDidMount() {
        this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
            const { onChangeInputMethod, inputMethod } = this.props;
            
            if (inputMethod === INPUT_METHOD.CUSTOM) {
                onChangeInputMethod(INPUT_METHOD.NONE);
                return true;
            }

            return false;
        });
    }

    componentWillUnmount() {
        this.subscription.remove();
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        const { onChangeInputMethod } = this.props;
        const { keyboardAnimationDuration } = nextProps;

        if(!this.props.keyboardVisible && nextProps.keyboardVisible) {

            onChangeInputMethod(INPUT_METHOD.KEYBOARD);
        }
        else if( this.props.keyboardVisible && !nextProps.keyboardVisible && this.props.inputMethod !== INPUT_METHOD.CUSTOM){
            onChangeInputMethod(INPUT_METHOD.NONE);
        }

        const animation = LayoutAnimation.create(
            keyboardAnimationDuration,
            Platform.OS === 'android' ? LayoutAnimation.Types.easeInEaseOut : LayoutAnimation.Types.keyboard,
            LayoutAnimation.Properties.opacity,
        );
        LayoutAnimation.configureNext(animation);
    }


    render() {
        const { children, renderInputMethodEditor, inputMethod,
                contentHeight, containerHeight, keyboardHeight, 
                keyboardWillHide, keyboardWillShow } = this.props;
        
        const useContentHeight = keyboardWillShow || inputMethod === INPUT_METHOD.KEYBOARD;

        const containerStyle = { height : useContentHeight ? contentHeight : containerHeight, };

        const showCustomInput = inputMethod === INPUT_METHOD.CUSTOM && !keyboardWillShow;
            
        const inputStyle = { height: showCustomInput ? keyboardHeight || 250 : 0, };
        

        return (
            <View style={containerStyle}>
                {children}
                <View style={inputStyle}>{renderInputMethodEditor()}</View>
            </View>
        )
    }
}