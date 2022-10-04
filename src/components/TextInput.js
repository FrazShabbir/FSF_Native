import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import React from 'react';
import {color} from '../theme';
export const CustomTextInput = ({icon}) => {
  const getImage=()=> {
    if (icon === 'email') {
        return <Image
        style={style.email}
        source={require('../assets/images/email.png')}
      />
    }
    if (icon === 'user') {
        return <Image
            style={style.user}
            source={require('../assets/images/smallUser.png')}
          />
    }
    return <Image
    style={style.lock}
    source={require('../assets/images/lock.png')}
  />
}
  return (
    <View style={style.input_view}>
      <View style={style.lock_view}>
        {getImage()}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  input_view: {
    height: 50,
    backgroundColor: color.palette.lightwhite,
    justifyContent: 'center',
    width: '100%',
    borderRadius: 15,
  },
  lock_view: {
    padding: 16,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lock: {
    width: 17,
    height: 20,
  },
  user:{
    width:17,
    height:22
  }
});
