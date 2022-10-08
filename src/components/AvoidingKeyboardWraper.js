import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';

export const AvoidingKeyboardWraper = ({children}) => {
  return (
    <KeyboardAvoidingView style={{flex:1}}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss()}>
            {children}
          </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
